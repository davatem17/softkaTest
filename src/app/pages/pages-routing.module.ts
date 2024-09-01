import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'create', component: CreateEditComponent },
  { path: 'edit/:id', component: CreateEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
