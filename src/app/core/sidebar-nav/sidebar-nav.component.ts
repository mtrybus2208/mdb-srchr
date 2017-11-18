import { Component, OnInit } from '@angular/core';
import { MdbApiService } from './../../shared/services/mdb-api.service';
import { FilmThumb } from './../../shared/models/film-thumb.model'; 
import { ActivatedRoute, Params, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  activeCategory: string;

  constructor(private apiService: MdbApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => { 
      this.activeCategory = event.url.split('/')[2];
    });
  }
  /* Checks if the router params is the same as clicked link */
  isLinkActive(){
    return true;
  }  
}
 
 
