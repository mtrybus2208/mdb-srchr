import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FilmThumb } from './../../../../shared/models/film-thumb.model';
import { SearchFilmsService } from './../search-films.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  host: {'class': 'col-12 col-lg-6'}
})
export class SearchResultsComponent implements OnInit {

  @Input() result: FilmThumb;
  @Output() public showResults = new EventEmitter<boolean>();
  
  constructor( private router: Router, private searchService: SearchFilmsService ) { }

  ngOnInit() {
  }
  onGetDetails(){
    this.searchService.resetResults();
    this.router.navigate( ['details',this.result.id] )
  }

}
