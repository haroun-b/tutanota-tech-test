import { default as db } from "./db.js";

const fakeFetch = (() => {

  function getOriginFromDb(origin, db) {
    let currentDir = db;

    for (const part of origin) {
      if (!currentDir[part]) {
        return false;
      }

      currentDir = currentDir[part];
    }

    return currentDir;
  }


  return function ({ origin, path }) {
    const delay = Math.floor(Math.random() * 100) + 700;
    let currentDir = JSON.parse(JSON.stringify(db));
    let timeoutId = null;


    const response = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        currentDir = getOriginFromDb(origin, currentDir);
        if (!currentDir) reject(404);

        for (const part of path) {
          if (!currentDir[part]) {
            reject(404);
          }

          currentDir = currentDir[part];
        }

        resolve(typeof currentDir === "object" ? "[Folder]" : "[File]");
      }, delay);
    });

    // returns an array. with response as a promise that resolves or reject after a random delay (700-800)ms, it resolves if the url exists, otherwise it rejects with a 404. the second element is a function to abort the fake server call.
    return [response, () => { clearTimeout(timeoutId) }];
  };
})();


export { fakeFetch };