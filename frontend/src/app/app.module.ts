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
import { GridComponent } from './components/sandbox/grid/grid.component';
import { DropdownsComponent } from './components/sandbox/dropdowns/dropdowns.component';
import { ClockComponent } from './components/sandbox/clock/clock.component';
import { DragDropComponent } from './components/sandbox/drag-drop/drag-drop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { DelayDialogComponent } from './components/sandbox/clock/clock-dialog/delay-dialog.component';
import { CustomDropdownComponent } from './components/sandbox/dropdowns/custom-dropdown/custom-dropdown.component';
import { SearchableDropdownComponent } from './components/sandbox/dropdowns/searchable-dropdown/searchable-dropdown.component';
import { MultiselectDropdownComponent } from './components/sandbox/dropdowns/multiselect-dropdown/multiselect-dropdown.component';
import { CascadeDropdownComponent } from './components/sandbox/dropdowns/cascade-dropdown/cascade-dropdown.component';
import { CommonModule } from '@angular/common';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { CalendarComponent } from './components/sandbox/calendar/calendar.component';
import { IframeComponent } from './components/sandbox/iframe-component/iframe-component.component';
import { CaptchaComponent } from './components/sandbox/captcha/captcha.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    FlatpickrDirective,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatTooltipModule,
    AgGridModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgSelectModule,
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
    DropdownsComponent,
    CustomDropdownComponent,
    SearchableDropdownComponent,
    MultiselectDropdownComponent,
    CascadeDropdownComponent,
    ClockComponent,
    CalendarComponent,
    DragDropComponent,
    DelayDialogComponent,
    IframeComponent,
    CaptchaComponent
  ],
  providers: [
    provideFlatpickrDefaults(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },    
    AuthService,
    AuthGuard
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
