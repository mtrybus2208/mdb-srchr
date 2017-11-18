import { Component, OnInit, Input } from '@angular/core';
import { trigger, state,style, animate, transition } from '@angular/animations';
import { FilmThumb } from './../../shared/models/film-thumb.model';
import { ActivatedRoute, Params, Router  } from '@angular/router';

@Component({
  selector: 'app-film-thumb',
  templateUrl: './film-thumb.component.html',
  styleUrls: ['./film-thumb.component.css'],
  animations: [
    /* image animation on load */
    trigger('onLoadfade', [
      state('in', style({ 
        opacity: 1     
      })),
      state('out', style({
        opacity: 0 
      })),
      transition('out <=> in', animate('300ms ease-in'))
    ]),
    /* image animation on load */
  ]
})
export class FilmThumbComponent implements OnInit {

  state = 'out';

  @Input() currentFilm: FilmThumb;

  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {}

  getDetails(){ 
    this.router.navigate( ['details',this.currentFilm.id] )
  }
}

 