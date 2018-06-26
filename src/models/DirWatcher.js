import { readdir } from 'fs';
import myEmitter from './MyEmitter';

export default class DirWarcher {
    constructor() {
        this.dirContent = [];
    }

    watch = (path, delay) => {
        setInterval(() => this.readDir(path), delay);
    }

    readDir = (path) => {
        readdir(path, (err, files) => {
            if (err) {
                this.dirContent = [];
                this.emitChanged(dirContent);

                return;
            }

            const csvOnly = this.getCsvFiles(files);

            if (this.isArrayChanged(this.dirContent, csvOnly)) {
                this.dirContent = csvOnly;
                this.emitChanged(this.dirContent, path);
            }
        });
    }

    getCsvFiles = (files) =>
        files.filter( item => this.getExtention(item) === 'csv' );

    getExtention = (fileName) => {
        const fileNameParticles = fileName.split('.');

        return fileNameParticles[fileNameParticles.length - 1];
    }

    isArrayChanged = (oldArray, newArray) => {
        if (!oldArray ||
            !newArray ||
            oldArray.length != newArray.length ||
            this.isArrayItemsDiffer(oldArray, newArray)
        ) {
            return true;
        }

        return false;
    }

    isArrayItemsDiffer = (oldArray, newArray) =>
        oldArray.filter((item, index) => item != newArray[index]).length

    emitChanged = (data, path) => {
        myEmitter.emit('dirwatcher:changed', data, path);
    }
}
