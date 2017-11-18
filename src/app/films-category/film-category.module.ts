import { NgModule } from '@angular/core'; 
import { PaginationComponent } from './pagination/pagination.component';
import { FilmsCategoryComponent } from './films-category.component';
import { FilmThumbComponent } from './film-thumb/film-thumb.component';
import { SharedModule } from './../shared/shared.module'; 
 
@NgModule({
  declarations: [
    FilmsCategoryComponent,
    FilmThumbComponent,
    PaginationComponent
  ],
  imports: [  
    SharedModule
  ],
  exports: [ 
  ] 
})

export class FilmCategoryModule {}
