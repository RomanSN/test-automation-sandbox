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
import { DropdownComponent } from './components/sandbox/dropdown/dropdown.component';
import { ClockComponent } from './components/sandbox/clock/clock.component';
import { DragDropComponent } from './components/sandbox/drag-drop/drag-drop.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'add', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'playground', component: SandboxComponent, children: [
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: 'grid', component: GridComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'dropdown', component: DropdownComponent },
    { path: 'clock', component: ClockComponent },
    { path: 'drag-drop', component: DragDropComponent },
  ]},
  { path: '**', redirectTo: '/home' }
];
