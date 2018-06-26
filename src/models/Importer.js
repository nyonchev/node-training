import csv from 'csvtojson';
import myEmitter from './MyEmitter';

export default class Importer {
    constructor(importType) {
        this.importedFiles = [];
        this.importType = importType;

        myEmitter.on('dirwatcher:changed', this.importCsv);
    }

    importCsv = (data, path) => {
        console.log('import csv', data, path)
        const newFiles = this.getNewItems(this.importedFiles, data);
        console.log('new files', newFiles)

        if (this.importType === 'sync') {
            this.importSync(newFiles, path);
        } else {
            this.importAsync(newFiles, path);
        }
    }

    importAsync = (data, path) => {
        console.log('import async', data, path);

        data.map( file => csv({
                output:"line",
                noheader: true
            })
            .fromFile(`${path}/${file}`)
            .subscribe((json)=>{
                console.log('asyn promise', json)
                return new Promise((resolve,reject)=>{
                    if (json !== undefined && json !== null) {
                        resolve(json);
                    } else {
                        reject('JSON not parsed correctly');
                    }
                })
            })
            .then( json => {
                console.log(json);
                this.importedFiles.push(file)
            })
            .catch( err => console.log('error occured. File will not be processed', err))
        );
    }

    importSync = (data, path) => {
        console.log('import sync', data, path);

        data.map( file => csv({
                output:"line",
                noheader: true
            })
            .fromFile(`${path}/${file}`)
            .then( json => {
                console.log(json);
                this.importedFiles.push(file)
            })
            .catch( err => console.log('error occured. File will not be processed', err))
        )
    }

    getNewItems = (oldArray, newArray) =>
        newArray.filter( item => oldArray.indexOf(item) === -1 );


}
