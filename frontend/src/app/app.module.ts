import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatTableModule, MatGridListModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

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
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

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
        TaskDialogComponent,
        ProfileDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatTableModule,
        MaterialModule,
        MatGridListModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        MatSelectModule
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
