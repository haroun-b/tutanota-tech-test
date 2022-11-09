import { fakeFetch } from "./fake-fetch.js";

const form = document.querySelector("form");
const urlInput = document.querySelector("#url");
const responseMsg = document.querySelector("#resource");

const regex = new RegExp(urlInput.pattern, "g");
let abort;


// prevents form submission
form.addEventListener("submit", (e) => { e.preventDefault() });

urlInput.addEventListener("input", handleInput);


async function handleInput() {
  try {
    if (abort) abort(); // aborts the previous fakeFetch
    responseMsg.hidden = true;

    const url = urlInput.value;

    const urlMatchesRegex = url.match(regex) ?
      url.match(regex)[0].length === url.length :
      false;

    if (!urlMatchesRegex) return;

    const { host, protocol, pathname } = new URL(url); // also acts as a guard clause, throws an exception if url in invalid

    const path = pathname.split("/").filter(bit => bit.length);
    if (!path.length) return;

    const origin = [...host.split(".").reverse(), protocol.match(/\w+/g)[0].slice(0, 4)];  // ["com", "example", "http"]


    let response;
    [response, abort] = fakeFetch({ origin, path });

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
};