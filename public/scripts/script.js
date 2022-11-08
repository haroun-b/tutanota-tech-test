const form = document.querySelector("form");
const urlInput = document.querySelector("#url");
const responseMsg = document.querySelector("#resource");

const regex = new RegExp(urlInput.pattern, "g"); //TODO tweak regex
let abort;



urlInput.addEventListener("input", async (e) => {
  try {
    if (abort) abort(); // aborts the previous fakeFetch
    responseMsg.hidden = true;

    const url = urlInput.value;

    const isUrlValid = url.match(regex) ?
      url.match(regex)[0].length === url.length :
      false;

    if (!isUrlValid) return;

    let response;
    [response, abort] = fakeFetch(url);

    const resourceType = await response;

    responseMsg.textContent = `The path leads to a ${resourceType}`;
    responseMsg.className = "found";
    responseMsg.hidden = false;
  } catch (error) {
    if (error === 404) {
      responseMsg.textContent = `Resource not found!`;
      responseMsg.className = "not-found";
      responseMsg.hidden = false;
    }
  }
});

// prevents form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
});