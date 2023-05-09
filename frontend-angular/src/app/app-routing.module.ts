import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MiniaturesComponent} from "./content/miniatures/miniatures.component";
import {CreatorsComponent} from "./content/creators/creators.component";

const routes: Routes = [
  { path: '', component: MiniaturesComponent },
  { path: 'miniatures', component: MiniaturesComponent },
  { path: 'creators', component: CreatorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
