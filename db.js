import PouchDB from 'pouchdb-react-native';
import find from 'pouchdb-find';

PouchDB.plugin(find);

const db = new PouchDB('aircare_database');
export default db;
