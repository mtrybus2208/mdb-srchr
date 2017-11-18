import { Component, OnInit, Input,  ElementRef, ViewChild, HostListener } from '@angular/core';
import { FilmThumb } from './../../../shared/models/film-thumb.model';
import { SearchFilmsService } from './search-films.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  results: FilmThumb[];
  showBanner: boolean = false;  

  constructor(private searchService: SearchFilmsService, private router: Router) { }

  ngOnInit() {
    this.searchService.resultsChanges
    .subscribe(
      (value: {results:FilmThumb[], showBanner?: boolean})=>{ this.results = value.results; this.showBanner = value.showBanner}
    )
    this.results = [];   
  }
  onHomeNavigate(){
    this.router.navigate(['']);
    this.searchService.resetResults()
  }  
}
