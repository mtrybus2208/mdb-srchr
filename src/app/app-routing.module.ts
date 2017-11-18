import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FilmsCategoryComponent } from './films-category/films-category.component';

const routes: Routes = [
  {path: '', redirectTo: '/category/top-rated/1', pathMatch:'full'}, // temporary redirect to category page
  // {path: '', loadChildren: './home/home.module#HomeModule'}, // current rount to home component
  {path: 'details', loadChildren: './details/details.module#DetailsModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'category/:category/:page', component: FilmsCategoryComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},  
]
 
@NgModule({
  imports: [ 
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
}) 
export class AppRoutingModule {}
 