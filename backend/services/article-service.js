import {
  getInvalidArticleRequestMessage,
  ammountArticlesCreatedByAuthor,
  containsBadWords,
} from "../utils/articles-helper.js";
import { articleModel } from "../data/models/article.model.js";

export async function getArticles(req, res) {
  const articles = await articleModel.find().sort({ dateCreated: -1 });
  res.json(articles);
}

export async function addArticle(req, res) {
  const { content, title } = req.body;
  const author = req.user.username;
  const violatingContent = await containsBadWords(content);
  const violatingTitle = await containsBadWords(title);
  const violatingWords = violatingContent.concat(violatingTitle);
  const invalidRequestMessage = getInvalidArticleRequestMessage(req, false);
  const articles = await articleModel.find();
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
  articleModel
    .create(newArticle)
    .then(() => {
      res.json(newArticle);
    })
    .catch((err) => {
      res.json(503).json({ message: `Error creating article ${err}` });
    });
}

export async function deleteArticle(req, res) {
  articleModel
    .findOneAndDelete({ id: req.params.id, author: req.user.username })
    .then(() => {
      res.json({ message: "Article successfully deleted" });
    })
    .catch((err) => {
      res.json(503).json({ message: `Error deleting article ${err}` });
    });
}

export async function editArticle(req, res) {
  const invalidRequestMessage = getInvalidArticleRequestMessage(req, true);
  if (invalidRequestMessage) {
    return res.status(400).json({ message: invalidRequestMessage });
  }
  articleModel
    .updateOne(
      { id: req.params.id, author: req.user.username },
      { $set: { title: req.body.title, content: req.body.content } }
    )
    .then(() => {
      res.json({ message: "Article successfully updated" });
    })
    .catch((err) => {
      res.json(503).json({ message: `Error updating article ${err}` });
    });
}
