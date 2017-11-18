import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdbApiService } from './../../../../shared/services/mdb-api.service';
import { AuthService } from './../../../../auth/auth.service'; 
import { FilmThumb } from './../../../../shared/models/film-thumb.model';
import { RequestResults } from './../../../../shared/models/request-results.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Renderer2 } from '@angular/core';
import { SearchFilmsService } from './../search-films.service'; 

@Component({
  selector: 'app-search-input', 
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {
   
  isLogged: boolean;
  name: string = null;
  resultDisplay: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private mdbService: MdbApiService, private searchService: SearchFilmsService,
    private router: Router, private authSerivice: AuthService, private renderer: Renderer2) { }

  /* Reset a input value on click */
  onInputClear(){
    this.searchService.resetResults();
  }

  ngOnInit() {
    /* Subscribe to auth */
    this.authSerivice.currentUserObservable
    .takeUntil(this.ngUnsubscribe)
    .subscribe((state)=>{
      if(state){
        this.isLogged = true;
        state.displayName ? this.name = state.displayName : this.name = state.email;
      }else{
        this.isLogged = false;
        this.name = 'Zaloguj się';
      }
    })
    this.searchService.onClickSearch( this.searchInput.nativeElement );
    this.searchService.resultsChanges.subscribe(()=>{
      this.resultDisplay = true;
    });
    /* Subscribe to resetSearch Subject */
    this.searchService.resetSearch.subscribe((status)=>{
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', '');
      this.resultDisplay = false;
    })
  }
  onLogginCheck(){
    (this.authSerivice.authenticated) ? this.router.navigate(['auth/user']) : this.router.navigate(['auth/login']);
    this.searchService.resetResults();
  }
  ngOnDestroy(){
    // console.log("DESTROY")  // uncomment for debugging
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete(); 
  }
} 
 