import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import {
  Article,
  SortDirection,
  SortState,
  SortType,
} from '../../../../typing';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { getErrorMessage } from '../../utils/error-handler.util';
import { articlesHelper } from './article-list-helper';
import { LOCAL_STORAGE_ITEMS } from '../../data/local-storage-items.enum';
import { ROUTES } from '../../data/urls/routes.enum';
import { ARTICLES_ACTION_BUTTONS } from '../../data/labels/articles-action-buttons.enum';
import { ARTICLES_PAGE_TEXTS } from '../../data/labels/articles-page-texts.enum';

@Component({
  selector: 'app-article-list',
  standalone: false,
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  // texts
  texts = ARTICLES_PAGE_TEXTS;
  buttons = ARTICLES_ACTION_BUTTONS;
  // action properties
  myArticlesOnly = false;
  showArticleModal = false;
  showLoginRequiredDialog = false;
  showConfirmDeleteArticleDialog = false;
  isLoggedIn = false;
  currentUser = '';
  selectedArticle!: Article | null;
  articles: Article[] = [];
  originalArticles: Article[] = []; // Preserve original order
  paginatedArticles: Article[] = [];
  // Pagination properties
  pageSize = 5;
  currentPage = 0;
  searchControl = new FormControl('');
  searchQuery = '';
  searchPlaceholder: string = ARTICLES_PAGE_TEXTS.initialSearchPlaceholder;
  sortState: SortState = {
    author: 'default',
    title: 'default',
  };

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.articleService.getArticles();
    this.authService.isLoggedIn.subscribe((state) => {
      this.isLoggedIn = state;
      if(this.isLoggedIn) {
        this.currentUser = this.authService.getCurrentUser()!;
      }
    });
    this.subscribeOnArticles();
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchQuery = value || ''; // Handle `null` values
      this.onSearch();
    });
  }

  subscribeOnArticles(): void {
    this.articleService.articles.subscribe((data) => {
      this.articles = this.myArticlesOnly
        ? data.filter((article) => article.author === this.currentUser)
        : data;
      this.originalArticles = [...data];
      this.loadSortState(); // Load persisted sort state and apply it
      this.updatePaginatedArticles();
    });
  }

  // add article
  attemptToAddArticle(): void {
    if (this.isLoggedIn) {
      this.showArticleModal = true;
    } else {
      this.showLoginRequiredDialog = true;
    }
  }

  navigateToLogin(): void {
    this.showLoginRequiredDialog = false;
    this.router.navigate([ROUTES.login]);
  }

  closeLoginRequiredDialog(): void {
    this.showLoginRequiredDialog = false;
  }

  closeArticleModal(): void {
    this.showArticleModal = false;
    this.selectedArticle = null;
  }

  // edit article
  canEditArticle(article: Article): boolean {
    return article.author === this.currentUser;
  }

  editArticle(article: Article): void {
    this.selectedArticle = article;
    this.showArticleModal = true;
  }

  // delete article
  attemptToDeleteArticle(article: Article): void {
    this.showConfirmDeleteArticleDialog = true;
    this.selectedArticle = article;
  }

  cancelArticleDeletion(): void {
    this.showConfirmDeleteArticleDialog = false;
    this.selectedArticle = null;
  }

  async deleteArticle(): Promise<void> {
    this.showConfirmDeleteArticleDialog = false;
    try {
      await this.articleService.deleteArticle(this.selectedArticle!.id);
      alert(
        `Article "${
          this.selectedArticle!.title
        }" has been successfully deleted.`
      );
    } catch (error: any) {
      const message = getErrorMessage(error);
      alert(`Article deletion failed with error: ${message}`);
    }
    this.selectedArticle = null;
  }

  toggleMyArticles() {
    if (this.myArticlesOnly) {
      this.articles = this.originalArticles;
      this.updatePaginatedArticles();
      this.myArticlesOnly = !this.myArticlesOnly;
    } else {
      const filteredArticles = this.articles.filter(
        (article) => article.author === this.currentUser
      );
      this.articles = filteredArticles;
      this.updatePaginatedArticles();
      this.myArticlesOnly = !this.myArticlesOnly;
      this.sortState.author = 'default';
      this.sortState.title = 'default';
    }
  }

  onSearch(): void {
    let filteredArticles;
    if (this.searchQuery.length === 0) {
      this.searchPlaceholder = ARTICLES_PAGE_TEXTS.initialSearchPlaceholder;
      this.articles = [...this.originalArticles];
      this.loadSortState();
    } else if (this.searchQuery.length < 3) {
      this.searchPlaceholder =
        ARTICLES_PAGE_TEXTS.typeMinSignsNumberPlaceholder;
      this.articles = [...this.originalArticles];
      this.loadSortState();
    } else {
      this.searchPlaceholder = '';
      filteredArticles = this.articles.filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.articles = filteredArticles;
    }
    this.updatePaginatedArticles();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchPlaceholder = ARTICLES_PAGE_TEXTS.initialSearchPlaceholder;
    this.articles = [...this.originalArticles];
    this.searchControl.setValue('');
    this.loadSortState();
    this.updatePaginatedArticles();
  }

  toggleSort(field: SortType): void {
    let order = this.sortState[field];

    if (order === 'default') {
      order = 'asc';
    } else if (order === 'asc') {
      order = 'desc';
    } else {
      order = 'default';
    }

    this.sortState[field] = order;
    // Reset the other field's sorting state
    const otherField = field === 'author' ? 'title' : 'author';
    this.sortState[otherField] = 'default';
    articlesHelper.saveSortState(this.sortState); // Save the sort state to localStorage
    this.sortArticles(field, order);
  }

  private sortArticles(field: SortType, order: SortDirection): void {
    if (order === 'asc') {
      this.articles.sort((a, b) =>
        articlesHelper.compareValues(a[field], b[field], 'asc')
      );
    } else if (order === 'desc') {
      this.articles.sort((a, b) =>
        articlesHelper.compareValues(a[field], b[field], 'desc')
      );
    } else {
      this.articles = [...this.originalArticles];
      this.onSearch();
    }
    this.updatePaginatedArticles();
  }

  private loadSortState(): void {
    const savedSortState = localStorage.getItem(LOCAL_STORAGE_ITEMS.sortState);
    if (savedSortState) {
      this.sortState = JSON.parse(savedSortState);
      this.applySavedSort(); // Apply the saved sorting state
    }
  }

  private applySavedSort(): void {
    for (const field of ['author', 'title']) {
      const order = this.sortState[field as keyof typeof this.sortState];
      if (order !== 'default') {
        this.sortArticles(field as SortType, order); // Apply saved sorting
      }
    }
  }

  updatePaginatedArticles(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.articles.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedArticles();
  }
}
