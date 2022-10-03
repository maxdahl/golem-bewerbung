import BaseComponent from "./BaseComponent.js";
import KeywordsList from "./KeywordsList.js";
import ArticlesTable from "./ArticlesTable.js";

class App extends BaseComponent {
  constructor() {
    super();

    this.state = {
      articles: [],
      keywords: {},
      searchQuery: "",
      isLoading: true,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onKeywordClick = this.onKeywordClick.bind(this);
    this.onClearFiltersClick = this.onClearFiltersClick.bind(this);
    this.initApp = this.initApp.bind(this);

    this.initApp();
  }

  async initApp() {
    if (this.state.isLoading === false) this.setState("isLoading", true);

    document
      .getElementById("searchbar")
      .addEventListener("input", this.onSearch);
    document
      .getElementById("reload-btn-container")
      .addEventListener("click", this.initApp);

    await this.fetchArticles();
    this.getUniqueKeywords();

    this.setState("isLoading", false);
  }

  async fetchArticles() {
    const res = await fetch("https://www.golem.de/devs/articles.php");
    const data = await res.json();

    this.setState("articles", data);
  }

  getUniqueKeywords() {
    const { articles } = this.state;
    const keywords = [];

    articles.forEach((article) => keywords.push(...article.keywords));
    this.setState(
      "keywords",
      Object.assign(...keywords.map((kw) => ({ [kw]: false })))
    );
  }

  onSearch(e) {
    this.setState("searchQuery", e.target.value);
  }

  onKeywordClick(e) {
    const keywords = { ...this.state.keywords };
    const kwName = e.target.getAttribute("name");

    keywords[kwName] = !keywords[kwName];
    this.setState("keywords", keywords);
  }

  onClearFiltersClick() {
    const keywords = { ...this.state.keywords };
    this.setState(
      "keywords",
      Object.assign(...Object.keys(keywords).map((kw) => ({ [kw]: false })))
    );
  }

  render() {
    const { isLoading, articles, keywords, searchQuery } = this.state;

    if (isLoading) {
      document.getElementById("loader-container").style.display = "flex";
      return;
    } else {
      document.getElementById("loader-container").style.display = "none";
    }

    const selectedKeywords = Object.keys(keywords).filter(
      (kw) => keywords[kw] === true
    );

    const kwList = new KeywordsList(
      keywords,
      this.onKeywordClick,
      this.onClearFiltersClick
    );

    const articlesTable = new ArticlesTable(
      articles,
      searchQuery,
      selectedKeywords
    );

    kwList.render();
    articlesTable.render();
  }
}

export default App;
