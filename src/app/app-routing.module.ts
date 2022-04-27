/**
 * The AppRoutingModule is used to create and configure a module containing the providers and 
 * directives required by the Router service for in-app navigation. The app is imported in the 
 * app.module file to make routing available throughout the application.
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }