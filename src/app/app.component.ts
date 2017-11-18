import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { GlobalVariable } from './shared/globals';
import { SearchFilmsService } from './core/search-films/search-box/search-films.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('main') searchInput: ElementRef;

  constructor( private searchService: SearchFilmsService, private renderer: Renderer2) { }

  ngOnInit() {
    this.searchService.resultsChanges.subscribe(()=>{
      this.renderer.addClass(this.searchInput.nativeElement, 'd-none');
    });
    this.searchService.resetSearch.subscribe(()=>{
      this.renderer.removeClass(this.searchInput.nativeElement, 'd-none');
    })
  }
}
 