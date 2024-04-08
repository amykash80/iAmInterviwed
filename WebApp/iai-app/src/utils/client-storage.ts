/**
 * This helper object takes care of storing/retrieving
 * key-value pair in the underlying storage. Other modules of
 * application are not supposed to directly deal with the storage
 * and must make call to this object only to access the storage.
 */

class StorageHelper {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
const storageHelper = new StorageHelper();
export default storageHelper;