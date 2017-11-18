import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  host: {'class': 'loader-wrapper_default'}
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
