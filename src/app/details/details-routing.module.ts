import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
  
const detailsRoutes: Routes = [
  {path: '', children: [
    {path: ':id', component: DetailsComponent},
  ]}, 
]

@NgModule({
  imports: [ 
    RouterModule.forChild(detailsRoutes)
  ],
  exports: [RouterModule]
}) 
export class DetailRoutingModule {}
 