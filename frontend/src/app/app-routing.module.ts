import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: ProjectsComponent, canActivate: [AuthGuard], data: { title: 'Main' } },
			{ path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard], data: { title: 'Projects' } },
			{ path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
			// { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Dashboard' } },
			{ path: 'user/:user-id', component: ProfileDetailComponent, canActivate: [AuthGuard] }
		]
	},
	{ path: '', redirectTo: '/home/projects', pathMatch: 'full' }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
