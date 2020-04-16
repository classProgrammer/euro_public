import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeGridComponent} from './home-grid/home-grid.component';
import {DetailFormComponent} from './detail-form/detail-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeGridComponent },
  { path: 'edit/:id', component: DetailFormComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
