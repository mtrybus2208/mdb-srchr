import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdbApiService } from './../shared/services/mdb-api.service';
import { Cast } from './../shared/models/cast.model';
import { Crew } from './../shared/models/crew.model';
import { Details } from './../shared/models/film-details.model';
import { AuthService } from './../auth/auth.service'; 
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  host: {'class': 'col-12  col-md-12  film-category_results '}
})
export class DetailsComponent implements OnInit, OnDestroy {
  
  paramChangeHandler: {next: any, error: any};
  cast: Cast[];
  crew: Crew[];
  details : Details;
  loading: boolean;
  userInfo: any // reference to user profile from db
  isFavorite: boolean = null;  // true if the user have the current film in database, initialy false
  filmID: string  // extracted from router params, used in onAddToFavorites()/onDeletefromFavorites()
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(  private route: ActivatedRoute, private apiService: MdbApiService, private authSerivice: AuthService ) {  }

  ngOnInit() {
    this.loading = false;

    this.paramChangeHandler = {
      next: (results)=>{
        // Create Reference to results 
        this.cast = results[0].cast;
        this.crew = results[0].crew;
        this.details = results[1];  
        this.loading = true;
        /* Subscription to favoriteFilms$ for fetch the information 
        ** about favorites film from user doc in FireStore
        */
        this.authSerivice.favoriteFilms$
          .subscribe((userDoc)=>{
            if(userDoc)
              userDoc.favoriteFilms
              .hasOwnProperty(this.filmID) ? this.isFavorite = true : this.isFavorite = false;
          })
      }, // next
      error: (error)=>{
          console.log( error )
      }
    }   
    // Subscribe to Params Change
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe(       
      (params: Params)=>{ 
        this.loading = false; 
        this.filmID = params['id']; 
        this.apiService.getDetails( params['id'] )
          .takeUntil(this.ngUnsubscribe)
          .subscribe( this.paramChangeHandler) },
      (err)=>{ console.log(err) }
    )
  } // OnInit
  // function to add current film from db
  // this function run a addFavoriteFilms function from this.authSerivice 
  onAddToFavorites(){ 
    this.authSerivice.addFavoriteFilms(this.filmID, this.details);
  }
  // function to remove current film from db
  // this function run a removeFromFavorites function from this.authSerivice
  removeFromFavorites(){
    this.authSerivice.removeFavoriteFilms(this.filmID)
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

