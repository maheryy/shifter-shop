function isLocalStorageAvailable() {
  try {
    const storage = window.localStorage;
    const x = "__storage_test__";

    storage.setItem(x, x);
    storage.removeItem(x);

    return true;
  } catch (error) {
    return false;
  }
}

export default isLocalStorageAvailable;
