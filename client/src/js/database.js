import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => 
{
  console.log('PUT to database');

  // add connection + version of databse
  const jateDb = await openDB('jate', 1);

  // create and specify which database and its data privelages
  const tx = jateDb.transaction('jate', 'readwrite');

  
  // choose which object store you want to use
  const store = tx.objectStore('jate');

  
  // use put method for store and pass content
  const request = store.put({ id: 1, value: content });

  
  // request confirmation
  const result = await request;
  console.log('all data succesfuly saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
{
  console.log('GET from database');

  // create connection to databse and version selection
  const jateDb = await openDB('jate', 1);

  
  // create and specify database and privelages
  const tx = jateDb.transaction('jate', 'readonly');

  
  // open chosen object
  const store = tx.objectStore('jate');

 
  // get method to grab all data in database
  const request = store.getAll();

  
  // confirmation request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
