import {
  minTitleLength,
  maxTitleLength,
  minContentLength,
  maxContentLength,
} from "../data/article.input.length.js";

export function ammountArticlesCreatedByAuthor(articles, author) {
  const articlesByAuthor = articles.filter(
    (article) => article.author === author
  );
  return articlesByAuthor.length;
}

export async function containsBadWords(content) {
  const profanities = await import("profanities");
  const badwords = profanities.profanities;
  return badwords.filter(
    (word) =>
      !!content
        .toLowerCase()
        .match(new RegExp(`(?<![a-zA-Z0-9])${word}(?![a-zA-Z0-9])`))?.[0]
  );
}

export function getInvalidArticleRequestMessage(req, idRequired) {
  const idExists = !!req.body.id;
  const author = !!req.body.author ? req.body.author : "";
  const content = !!req.body.content ? req.body.content : "";
  const title = !!req.body.title ? req.body.title : "";
  const authorValid = author === req.user.username;
  const contentValid =
    content.length >= minContentLength && content.length <= maxContentLength;
  const titleValid =
    title.length >= minTitleLength && title.length <= maxTitleLength;
  if (!authorValid) {
    return "Invalid author";
  } else if (!contentValid) {
    return `Content must be between ${minContentLength} - ${maxContentLength} characters`;
  } else if (!titleValid) {
    return `Title must be between ${minTitleLength} - ${maxTitleLength} characters`;
  } else if (idExists && !idRequired) {
    return "Article id should not exist";
  } else if (!idExists && idRequired) {
    return "Article id is not provided";
  }

  return null;
}
