import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { GridComponent } from './components/sandbox/grid/grid.component';
import { CalendarComponent } from './components/sandbox/calendar/calendar.component';
import { DropdownsComponent } from './components/sandbox/dropdowns/dropdowns.component';
import { ClockComponent } from './components/sandbox/clock/clock.component';
import { DragDropComponent } from './components/sandbox/drag-drop/drag-drop.component';
import { IframeComponent } from './components/sandbox/iframe-component/iframe-component.component';
import { CaptchaComponent } from './components/sandbox/captcha/captcha.component';
import { FileActionsComponent } from './components/sandbox/file-actions/file-actions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'add', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'playground', component: SandboxComponent, children: [
    { path: '', component: GridComponent },
    { path: 'grid', component: GridComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'dropdowns', component: DropdownsComponent },
    { path: 'clock', component: ClockComponent },
    { path: 'drag-drop', component: DragDropComponent },
    { path: 'iframe', component: IframeComponent },
    { path: 'captcha', component: CaptchaComponent },
    { path: 'file-actions', component: FileActionsComponent },
  ]},
  { path: '**', redirectTo: '/home' }
];
