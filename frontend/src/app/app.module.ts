import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SignupComponent } from './components/signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatTooltipModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleListComponent,
    ArticleFormComponent,
    SignupComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },    
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
