import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'add', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' }
];
