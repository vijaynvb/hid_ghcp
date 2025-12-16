import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks/tasks-page.component';
import { TasksGeneratedComponent } from './pages/tasks/tasks-generated.component';
import { UsersPageComponent } from './pages/users/users-page.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'tasks-generated', component: TasksGeneratedComponent },
  { path: 'users', component: UsersPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
