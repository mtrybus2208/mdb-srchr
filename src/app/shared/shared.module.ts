import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LoaderComponent } from './loader/loader.component';
import { HardSpacePipe } from './pipes/hard-space.pipe'; 
 
@NgModule({
  declarations: [
    ShortenPipe,
    LoaderComponent,
    HardSpacePipe
  ], 
  exports: [
    CommonModule,
    ShortenPipe,
    LoaderComponent,
    HardSpacePipe
  ] 
})
export class SharedModule {}
