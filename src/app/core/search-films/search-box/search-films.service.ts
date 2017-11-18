import { Injectable } from '@angular/core';
import { MdbApiService } from './../../../shared/services/mdb-api.service';
import { FilmThumb } from './../../../shared/models/film-thumb.model';
import { RequestResults } from './../../../shared/models/request-results.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchFilmsService {

  resultsChanges = new Subject<any>();
  resetSearch = new Subject<any>();
  results: FilmThumb[];
  
  constructor( private mdbService: MdbApiService ) { }

  onClickSearch(element: any) {
    Observable.fromEvent(element, 'keyup')
    .debounceTime(400)
    .map((e:any)=>{
      if(e.target.value == ''){ this.resetResults(); return false; }
      return e.target.value;   
    })
    .filter((text: string)=> {  
      return text.length >= 1;
    })
    .map(( query: string )=> {     
      return this.mdbService.searchFilms({'userInput': query, 'page': 1});
    })
    .switch()
    .subscribe((results: {requestDetails:RequestResults, requestResults:FilmThumb[]}) => {
      let showBanner: boolean = results.requestResults.length < 1 ? true : false; 
      this.results = results.requestResults;
      console.log(this.results);
      this.resultsChanges.next({results: this.results,  showBanner: showBanner})
    });  
  }//onClickSearch

  resetResults(){
    this.results = [];
    this.resultsChanges.next({results: this.results, showBanner: false});
    this.resetSearch.next(true);
  }//resetResults

}
