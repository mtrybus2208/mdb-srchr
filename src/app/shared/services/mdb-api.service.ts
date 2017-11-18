import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from './../../shared/globals';
import { RequestService } from './request.service';
import { FilmThumb } from './../models/film-thumb.model';
import { RequestResults } from './../models/request-results.model';
 
@Injectable()
export class MdbApiService {

	searchUrl: string;
	filmAPI: string;
	basicParams: Array<any>;
	isResults: boolean;
 
  constructor( private http: HttpClient, private request: RequestService ) {
		this.searchUrl = 'https://api.themoviedb.org/3/';
		this.filmAPI = 'api_key=cf986a35a1d7ce7f4b1d46517213797f';
		this.basicParams = [ this.filmAPI, `language=pl-PL`, `include_adult=false` ];
  }//constructor

	searchFilms( params: any ): Observable<any> {
		const url = `${this.searchUrl}search/movie`;
		const finalparams =  [ this.basicParams.join('&'), `page=${params.page}`, `query=${params.userInput}` ].join('&');	
		return this.request.mdbRequest( `${url}?${finalparams}` ) 
	}//searchFilms

	getPopular( params: any ): Observable<any> {
		const url = `${this.searchUrl}discover/movie`;
		const finalparams =  [ this.basicParams.join('&'), `page=${params.page}`, `sort_by=popularity.desc`	].join('&');
		return this.request.mdbRequest( `${url}?${finalparams}` );
	}//getPopular

	getUpcoming( params: any  ): Observable<any> {
		const dt =  new Date();
		const nextWeek = (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+14)).toISOString().slice(0,10);
		const today = dt.toISOString().slice(0,10);
		const url = `${this.searchUrl}discover/movie`;
		const finalparams =  [ 
			this.basicParams.join('&'), 
			`page=${params.page}`, 
			`primary_release_date.gte=${today}`, 
			`primary_release_date.lte=${nextWeek}`,
			`release_date.asc `
		].join('&');
		return this.request.mdbRequest( `${url}?${finalparams}` );
	}//getUpcoming

	getTopRated( params: any ){
		const url = `${this.searchUrl}discover/movie`;
		const finalparams =  [ this.basicParams.join('&'), `page=${params.page}`, `sort_by=vote_average.desc`, `vote_count.gte=150`	].join('&');
		return this.request.mdbRequest( `${url}?${finalparams}` );
	}//getTopRated

	getNowPlaying( params: any ){
		const dt =  new Date();
		const startDate = (new Date(dt.getFullYear(), dt.getMonth()-1, dt.getDate())).toISOString().slice(0,10);
		const today = dt.toISOString().slice(0,10);
		const url = `${this.searchUrl}discover/movie`;
		const finalparams =  [ 
			this.basicParams.join('&'), 
			`page=${params.page}`, 
			`primary_release_date.gte=${startDate}`, 
			`primary_release_date.lte=${today}`
		].join('&');
		return this.request.mdbRequest( `${url}?${finalparams}` );
	}//getNowPlaying

	
	getDetails( id: any ){
		const urlCredits = `${this.searchUrl}movie/${id}/credits`;
		const urlMovie = `${this.searchUrl}movie/${id}`;
		const finalparams =  [ 
			this.basicParams.join('&'),
			 `external_source=imdb_id`
		].join('&');
		const requestResults = [
			this.request.castDetailsRequest( `${urlCredits}?${finalparams}` ), 
			this.request.movieDetailsRequest( `${urlMovie}?${finalparams}` )
		];
		return Observable.forkJoin( requestResults )
	}//getDetails
 
}
 