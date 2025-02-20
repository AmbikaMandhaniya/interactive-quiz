import { useState, useEffect } from 'react';
import { openDB } from 'idb';

export const useIndexedDB = (dbName, storeName, version) => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDB = async () => {
      try {
        const dbInstance = await openDB(dbName, version, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
          },
        });
        setDb(dbInstance);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, [dbName, storeName, version]);

  const getAll = async () => {
    if (!db) return [];
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      return await store.getAll();
    } catch (err) {
      setError(err);
      return [];
    }
  };

  const add = async (item) => {
    if (!db) return null;
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const id = await store.add(item);
      return id;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const get = async (id) => {
    if (!db) return null;
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      return await store.get(id);
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const remove = async (id) => {
    if (!db) return false;
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      await store.delete(id);
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  return {
    db,
    error,
    isLoading,
    getAll,
    add,
    get,
    remove,
  };
};