import BaseComponent from "./BaseComponent.js";
import { formatDateTime } from "../utils/date.js";

class ArticlesTable extends BaseComponent {
  constructor(articles, searchQuery, selectedKeywords) {
    super({ articles, searchQuery, selectedKeywords });
    this.table = document.createElement("table");

    const tableContainer = document.querySelector("#articles-table");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(this.table);

    this.state = {
      sortBy: "",
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(e) {
    this.setState("sortBy", e.target.getAttribute("name"));
  }

  filterArticles() {
    const { articles, searchQuery, selectedKeywords } = this.props;
    const { sortBy } = this.state;

    const filteredArticles = articles.filter((article) => {
      let match = true;
      if (searchQuery)
        match = article.headline
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      if (match && selectedKeywords.length > 0)
        match = article.keywords.some((keyword) =>
          selectedKeywords.includes(keyword)
        );

      return match;
    });

    if (sortBy === "titel")
      filteredArticles.sort((a, b) => a.headline.localeCompare(b.headline));
    else if (sortBy === "veröffentlichung")
      filteredArticles.sort((a, b) => a.published - b.published);

    return filteredArticles;
  }

  clearTable() {
    this.table.innerHTML = "";
  }

  addTableHeaders() {
    const headers = ["", "Titel", "Veröffentlichung"];
    const headerRow = this.table.insertRow();

    headers.forEach((header) => {
      const cell = document.createElement("th");
      cell.textContent = header;
      if (header !== "") {
        cell.setAttribute("name", header.toLowerCase());
        cell.addEventListener("click", this.onSort);
      }
      headerRow.appendChild(cell);
    });
  }

  addTableCell(row, content, href = null) {
    const td = row.insertCell();
    if (href !== null) {
      const a = document.createElement("a");
      const linkText = document.createTextNode(content);

      a.title = content;
      a.href = href;

      a.appendChild(linkText);
      td.appendChild(a);
    } else {
      td.textContent = content;
    }

    return td;
  }

  render() {
    this.clearTable();
    this.addTableHeaders();

    const articles = this.filterArticles();
    articles.forEach((article) => {
      const row = this.table.insertRow();
      this.addTableCell(row, article.kicker);
      this.addTableCell(row, article.headline, article.url);

      this.addTableCell(row, formatDateTime(article.published));
    });
  }
}

export default ArticlesTable;
