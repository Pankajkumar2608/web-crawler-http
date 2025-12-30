const { JSDOM } = require("jsdom");


async function crawlPage(currentURL){
  console.log(`crawling ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if(resp.status > 399){
        console.log(`error ${resp.status} on page ${currentURL}`);
        return;
    }
    const contentType = resp.headers.get("content-type");
    if(!contentType.includes("text/html")){
        console.log(`${currentURL} is not html`);
        return;
    }
    const body = await resp.text();
    const urls = getURLsFromHTML(body, currentURL);
    console.log(`found ${urls.length} on ${currentURL}`);
    return urls;
  } catch (error) {
    console.log(error.message);
    
  }
}
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage
};
