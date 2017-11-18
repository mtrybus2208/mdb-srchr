import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from './../auth.service';
import { MdbApiService } from './../../shared/services/mdb-api.service';
import { Subject } from 'rxjs/Subject';
import { UserFavoriteFilm, UserProfileInfo } from './../../shared/models/user-favorite-film.model';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  host: {'class': 'col-12  col-md-12  film-category_results film-category_results-scroll'}
})
export class UserComponent implements OnInit, OnDestroy{

  userInfo: UserProfileInfo =  null;
  userfavoriteFilms: UserFavoriteFilm[] =  null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  objectKeys = Object.keys;

  constructor( private authSerivice: AuthService, private apiService: MdbApiService  ) { }

  ngOnInit() {
    /* Subscription to favoriteFilms$ for fetch the information 
    ** about favorites film from user doc in FireStore
    */
    this.authSerivice.favoriteFilms$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((user)=>{
        if(user){
          this.userInfo = {
            name: user.name,
            email: user.email
          };
          this.userfavoriteFilms = user.favoriteFilms;
        }
    })
  } // ngOnInit
  onLogout(){  
    this.authSerivice.logOut()
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
  onFilmDelete(event: any, filmId: string){
    event.stopPropagation();
    this.authSerivice.removeFavoriteFilms(filmId);
  }

}