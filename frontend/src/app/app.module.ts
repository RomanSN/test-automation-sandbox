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
import { AgGridModule } from 'ag-grid-angular';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { CalendarComponent } from './components/sandbox/calendar/calendar.component';
import { GridComponent } from './components/sandbox/grid/grid.component';
import { DropdownComponent } from './components/sandbox/dropdown/dropdown.component';
import { ClockComponent } from './components/sandbox/clock/clock.component';
import { DragDropComponent } from './components/sandbox/drag-drop/drag-drop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DelayDialogComponent } from './components/sandbox/clock/clock-dialog/delay-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatTooltipModule,
    AgGridModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleListComponent,
    ArticleFormComponent,
    SignupComponent,
    LoginComponent,
    SandboxComponent,
    GridComponent,
    CalendarComponent,
    DropdownComponent,
    ClockComponent,
    DragDropComponent,
    DelayDialogComponent,
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
