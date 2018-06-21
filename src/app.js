import config from './config/config.json';
import { User, Product } from './models';
import DirWatcher from './models/DirWatcher';

console.log(config.app);

const testUser = new User();
const testProduct = new Product();

const watcher = new DirWatcher();

watcher.watch('./data', 1000);
