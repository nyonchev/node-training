import config from './config/config.json';
import { User, Product } from './models';
import DirWatcher from './models/DirWatcher';
import Importer from './models/Importer';

console.log(config.app);

const testUser = new User();
const testProduct = new Product();

const watcher = new DirWatcher();
const importer = new Importer('async');

watcher.watch('./data', 1000);
