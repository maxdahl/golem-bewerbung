import BaseComponent from "./BaseComponent.js";

class KeywordsList extends BaseComponent {
  constructor(keywords, onKeywordClick, onClearFiltersClick) {
    super({ keywords, onKeywordClick, onClearFiltersClick });
  }

  render() {
    const { keywords, onKeywordClick, onClearFiltersClick } = this.props;
    const kwContainer = document.getElementById("keywords-container");

    kwContainer.innerHTML = "";

    const clearKWElement = document.createElement("div");
    clearKWElement.innerHTML =
      "<img src='https://img.icons8.com/ios-filled/50/000000/clear-filters.png'/>";
    clearKWElement.className = "keyword";
    clearKWElement.addEventListener("click", onClearFiltersClick);
    kwContainer.appendChild(clearKWElement);

    for (const keyword of Object.keys(keywords)) {
      const keywordElement = document.createElement("div");
      keywordElement.addEventListener("click", onKeywordClick);
      keywordElement.textContent = keyword;
      keywordElement.className = "keyword";
      keywordElement.setAttribute("name", keyword);
      kwContainer.appendChild(keywordElement);

      if (keywords[keyword]) {
        keywordElement.classList.add("selected");
      } else {
        keywordElement.classList.remove("selected");
      }
    }
  }
}

export default KeywordsList;
