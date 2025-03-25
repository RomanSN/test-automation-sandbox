import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  getInvalidArticleRequestMessage,
  ammountArticlesCreatedByAuthor,
  containsBadWords,
} from "../utils/articles-helper.js";

const articlesdbFile = resolve("./databases/articles_db.json");
const loadArticlesDb = () => JSON.parse(readFileSync(articlesdbFile, "utf8"));

export function getArticles(req, res) {
  res.json(loadArticlesDb());
}

export async function addArticle(req, res) {
  const { author, content, title } = req.body;
  const violatingContent = await containsBadWords(content);
  const violatingTitle = await containsBadWords(title);
  const violatingWords = violatingContent.concat(violatingTitle);
  const invalidRequestMessage = getInvalidArticleRequestMessage(req, false);
  const articles = loadArticlesDb();
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  if (violatingWords.length > 0) {
    return res.status(403).json({
      message: `Your article content is violating the site rules. Forbidden words: ${violatingWords.join(
        ", "
      )}`,
    });
  }
  if (ammountArticlesCreatedByAuthor(articles, author) >= 10) {
    return res.status(409).json({
      message: "Articles added by user reached max count 10",
    });
  }
  const timeStamp = Date.now();
  const articleId = timeStamp.toString().slice(5);
  const newArticle = { id: +articleId, ...req.body, dateCreated: timeStamp };
  articles.unshift(newArticle);
  writeFileSync(articlesdbFile, JSON.stringify(articles, null, 2));
  res.json(newArticle);
}

export function deleteArticle(req, res) {
  const articles = loadArticlesDb();
  const modifiedArticles = articles.filter(
    (article) => article.id != req.params.id
  );
  writeFileSync(articlesdbFile, JSON.stringify(modifiedArticles, null, 2));
  res.json({ message: "Article deleted" });
}

export function editArticle(req, res) {
  const invalidRequestMessage = getInvalidArticleRequestMessage(req, true);
  const articles = loadArticlesDb();
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  const modifiedArticles = articles.map((article) =>
    article.id == req.params.id ? { ...article, ...req.body } : article
  );
  writeFileSync(articlesdbFile, JSON.stringify(modifiedArticles, null, 2));
  res.json({ message: "Article updated" });
}
