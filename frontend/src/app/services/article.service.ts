import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../../../typing';
import { ARTICLES_API_URL } from '../data/urls/article-api-urls.enum';
import { LOCAL_STORAGE_ITEMS } from '../data/local-storage-items.enum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articleSource = new BehaviorSubject<Article[]>([]);
  articles = this.articleSource.asObservable();

  async getArticles(): Promise<void> {
    const response = await axios.get(ARTICLES_API_URL.articles);
    this.articleSource.next(response.data);
  }

  async addArticle(article: Article): Promise<void> {
    const token = localStorage.getItem(LOCAL_STORAGE_ITEMS.token);
    await axios.post(ARTICLES_API_URL.articles, article, {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.getArticles();
  }

  async editArticle(article: Article): Promise<void> {
    const token = localStorage.getItem(LOCAL_STORAGE_ITEMS.token);
    await axios.put(`${ARTICLES_API_URL.editArticle}/${article.id}`, article, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.getArticles();
  }

  async deleteArticle(id: number): Promise<void> {
    const token = localStorage.getItem(LOCAL_STORAGE_ITEMS.token);
    await axios.delete(`${ARTICLES_API_URL.deleteArticle}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    this.getArticles();
  }
}
