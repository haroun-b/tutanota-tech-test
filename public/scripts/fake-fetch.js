const fakeFetch = (() => {
  const drive = {
    "books": {
      "flowers-for-algernon": "epub",
      "the-power-of-habits": "pdf",
      "when-all-is-said": "epub",
      "the-brain": "pdf"
    },
    "videos": {
      "films": {
        "eternal-sunshine-of-the-spotless-mind": "mov",
        "everything-everywhere-all-at-once": "mkv",
        "spirited-away": "avi",
        "pulp-fiction": "mkv",
        "in-bruges": "mp4"
      },
      "series": {
        "its-always-sunny-in-philadelphia": {},
        "rick-and-morty": {},
        "bobs-burgers": {},
        "breaking-bad": {},
        "utopia-uk": {},
        "mr-robot": {}
      }
    }
  };

  Object.freeze(drive);

  return function (url) {
    const delay = Math.floor(Math.random() * 100) + 700;
    let currentDir = JSON.parse(JSON.stringify(drive));
    let timeoutId = null;

    const pathBits = url.split("/")
      .map(bit => bit.trim())
      .filter(bit => bit.length);


    const response = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        for (const bit of pathBits) {
          if (!currentDir[bit]) {
            reject(404);
          }

          currentDir = currentDir[bit];
        }

        resolve(typeof currentDir === "object" ? "[Folder]" : "[File]");
      }, delay);
    });

    // returns an array. with response as a promise that resolves or reject after a random delay (700-800)ms, it resolves if the url exists, otherwise it rejects with a 404. the second element is a function to abort the fake server call.
    return [response, () => { clearTimeout(timeoutId) }];
  };
})();