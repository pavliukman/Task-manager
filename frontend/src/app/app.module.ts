import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';

// services
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    DashboardComponent,
    ProjectDetailComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProjectService,
    UserService, 
    AuthService,
    AuthGuard,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [TaskDialogComponent]
})
export class AppModule { }
