import { default as db } from "./db.js";


function fakeFetch({ urlFormated, ext }) {
  const delay = Math.floor(Math.random() * 100) + 700;
  let currentResource = JSON.parse(JSON.stringify(db));
  let timeoutId = null;


  const response = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {

      for (const part of urlFormated) {
        if (!currentResource?.[part]) return reject(404);
        currentResource = currentResource[part];
      }

      if (currentResource && !Array.isArray(currentResource)) return resolve("[Folder]");
      if (!ext || currentResource.includes(ext)) return resolve("[File]");

      reject(404);
    }, delay);
  });

  // returns an array. with response as a promise that resolves or reject after a random delay (700-800)ms, it resolves if the url exists, otherwise it rejects with a 404. the second element is a function to abort the fake server call.
  return [response, () => { clearTimeout(timeoutId) }];
};


export { fakeFetch };