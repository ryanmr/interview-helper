export function parseHtml(html) {
  const parsedHtml = new DOMParser().parseFromString(html, "text/html");
  return parsedHtml;
}

export function getMarkdownContentFromHtmlElement(
  htmlDocument,
  selector = ".__markdown"
) {
  const element = htmlDocument.querySelector(selector);
  if (!element) {
    throw new Error(`no element found with selector '${selector}'`);
  }
  const markdownContent = htmlDocument.querySelector(selector).innerHTML;
  if (markdownContent && typeof markdownContent === "string") {
    return markdownContent.trim();
  } else {
    throw new Error("content was not a string");
  }
}

export function getMarkdownContentFromHtml(html, fallback = "") {
  // const regex = /\s*<!--\s*%%markdown\s*(.*)\s*-->\s*/g;
  const regex = /<!--\s*%%markdown\s*([\s\S]*)\s*-->/gm;
  const results = regex.exec(html);
  console.log(results);
  const result = (results && results.length === 2 && results[1]) || fallback;
  return result;
}
