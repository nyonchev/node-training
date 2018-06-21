import { readdir } from 'fs';
import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

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
            } else if (this.isArrayChanged(this.dirContent, files)) {
                this.dirContent = files;
                this.emitChanged(this.dirContent);
            }
        });
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

    emitChanged = (data) => {
        myEmitter.emit('changed', data);
    }
}
