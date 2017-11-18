import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailRoutingModule } from './details-routing.module';
import { SharedModule } from './../shared/shared.module'; 
 
@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [  
    CommonModule,
    DetailRoutingModule,
    SharedModule
  ],
  exports: [ 
  ] 
})

export class DetailsModule {}
