import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdbApiService } from './../shared/services/mdb-api.service';
import { FilmThumb } from './../shared/models/film-thumb.model';
import { PaginationComponent } from './pagination/pagination.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-films-category',
  templateUrl: './films-category.component.html',
  styleUrls: ['./films-category.component.css'],
  host: {'class': 'col-12  col-md-12  film-category_results'}
  
})
export class FilmsCategoryComponent implements OnInit, OnDestroy {

  @ViewChild(PaginationComponent) paginationComponent;

  films: FilmThumb[];
  loading:boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>(); // = new Subject() 
  observer: {next: any, error: any};
  categorySearch$: any;
 
  constructor(  private route: ActivatedRoute, private apiService: MdbApiService, private http: HttpClient ) {
     
  }

  ngOnInit() { 
    this.loading = true;

    this.route.params.debounceTime(400).subscribe({
      'next': (params: Params)=>{
        const cat = params['category'];
        const page = params['page'];
        if(cat == 'popular') this.categorySearch$ = this.apiService.getPopular( {'page': page} );  
        if(cat == 'upcoming') this.categorySearch$ = this.apiService.getUpcoming( {'page': page} );
        if(cat == 'top-rated') this.categorySearch$ = this.apiService.getTopRated( {'page': page} );
        if(cat == 'now-playing') this.categorySearch$ = this.apiService.getNowPlaying( {'page': page} );

        this.categorySearch$.subscribe({
          next: (value) => {
            this.paginationComponent.onUpdateRouteStatus(value.requestDetails)
            this.loading = false;
            this.films = value.requestResults;
          },
          error: (error) => {console.log(error)}
        })
      }//next
    });//subs
  }
  ngOnDestroy(){
    // console.log("DESTROY")  // uncomment for debugging
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }

}
