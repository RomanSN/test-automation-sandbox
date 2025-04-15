import { environment } from "../../../environments/environment";

export const ARTICLES_API_URL = {
    articles: `${environment.apiUrl}/articles`,
    addArticle: `${environment.apiUrl}/articles/add`,
    editArticle: `${environment.apiUrl}/articles/edit`,
    deleteArticle: `${environment.apiUrl}/articles/delete`,
}