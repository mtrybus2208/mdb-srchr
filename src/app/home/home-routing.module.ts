import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 
import { HomeComponent } from './home.component'

const authRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: ':nazwa', component: HomeComponent},
  ]},
]

@NgModule({
  imports: [ 
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
}) 
export class HomeRoutingModule {}
 