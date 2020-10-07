import gallery from "../gallery-items.js";
document.body.insertAdjacentHTML(
  "afterbegin",
  `<img src="${gallery[0].original}" />`
);
