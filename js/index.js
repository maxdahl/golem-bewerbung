import App from "./components/App.js";

function init() {
  const app = new App();
  app.render();
}

window.addEventListener("load", () => init());
