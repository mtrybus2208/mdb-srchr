import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from './../../shared/globals';
import { FilmThumb } from './../models/film-thumb.model'; 
import { RequestResults } from './../models/request-results.model';
import { Cast } from './../models/cast.model';
import { Crew} from './../models/crew.model';
import { Details } from './../models/film-details.model';
import { UserFavoriteFilm } from './../models/user-favorite-film.model';

@Injectable()
export class RequestService {

  imgUrl: string;

  constructor(private http: HttpClient) { 
    this.imgUrl = GlobalVariable.IMG_URL;
  }

  mdbRequest( query:string ){
    return this.http.get<any>( query ).map( (response) => { 
       return {
         requestDetails : new RequestResults({
           totalPages: response.total_pages,
           totalResults: response.total_results
         }),
         requestResults : response.results.map((v,i)=>{
           let genres = []; 
           GlobalVariable.MOVIE_GENRES.forEach((obj,i)=>{			
             if(genres.length < 2){ v.genre_ids.forEach((v,i)=>{
                 if(v == obj.id){ genres.push(obj.name) }
               })}
            })              
            return new FilmThumb({
              id: v.id,
              title: v.title,
              imgPoster: v.poster_path == null ? null : this.imgUrl + 'w150' + v.poster_path,
              imgBackDrop: v.backdrop_path == null ? null : this.imgUrl + 'w500' + v.backdrop_path, 
              description: v.overview,
              ranking: v.vote_average,
              date: v.release_date,
              genres: genres.join(", ")
            });
          })
       }	 
     }) 
   }//mdbRequest

  movieDetailsRequest( query:string ){ 
    return this.http.get<any>( query ).map((r) => {
      console.log(r.original_title)
      return new Details({
        title: r.title,
        originalTitle: r.original_title,
        overview: r.overview,
        backdropPath: r.backdrop_path == null ? null : this.imgUrl + 'w500' + r.backdrop_path,
        posterPath: r.poster_path == null ? null : this.imgUrl + 'w300' + r.poster_path,
        voteAverage: r.vote_average,
        voteCount: String(r.vote_count),
        budget: String(r.budget),
        genres: r.genres.map((v,i)=>{ return v.name }).join(', '),
        homepage: r.homepage,
        id:  r.id,
        origLanguage: r.original_language,
        popularity: typeof r.popularity == 'number' ? String(Math.round(r. popularity)) : r.popularity,
        prodCompanies: r.production_companies.map((v,i)=>{ return v.name }).join(', '),
        prodCountries: r.production_countries.map((v,i)=>{ return v.name }).join(', '),
        releaseDate: r.release_date,
        spokenLanguages: r.spoken_languages.map((v,i)=>{ return v.name }).join(', '),
        tagline: r.tagline,
        video: r.video,
      }) 
    })
  }
   castDetailsRequest(query:string) {
    return this.http.get<any>(query).map((response) => {
      let castArr = response.cast.map((r, i) => {    
        return new Cast({
         castId: r.cast_id, 
         character: r.character,
         creditId :r.credit_id,
         id: r.id,
         name: r.name,
         order: r.order,
         profilePath: r.profile_path == null ? null : this.imgUrl + 'w150' + r.profile_path
       })
      });
      let crewArr = response.crew.map((res, index) => {     
        return new Crew({
          name: res.name,
          job: res.job,
          profilePath: res.profile_path == null ? null : this.imgUrl + 'w150' + res.profile_path,
          creditId: res.credit_id,
          department: res.department,
          id: res.id,
        })
      }) 
      return {
        cast: castArr,
        crew: crewArr
      }
    })
  }
}
