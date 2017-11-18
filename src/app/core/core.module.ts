import { NgModule } from '@angular/core';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { SearchBoxComponent } from './search-films/search-box/search-box.component';
import { SearchInputComponent } from './search-films/search-box/search-input/search-input.component';
import { SearchResultsComponent } from './search-films/search-box/search-results/search-results.component';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { MdbApiService } from './../shared/services/mdb-api.service';
import { SearchFilmsService } from './../core/search-films/search-box/search-films.service';
import { RequestService } from './../shared/services/request.service';
import { AuthService } from './../auth/auth.service'
 
@NgModule({
  declarations: [
    SidebarNavComponent,
    SearchBoxComponent,
    SearchInputComponent,
    SearchResultsComponent
  ],
  imports: [ 
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    SidebarNavComponent,
    SearchBoxComponent
  ],
  providers: [MdbApiService, SearchFilmsService, RequestService, AuthService],
})

export class CoreModule {}
