import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdbApiService } from './../../shared/services/mdb-api.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  showPagination: boolean;
  routeObserver: {next: any, error: any};
  currentCategory:string;
  currentPage: number; 
  totalPages: number;
 

  constructor( private router: Router,  private route: ActivatedRoute, private apiService: MdbApiService ) {
    this.showPagination = false;
   }

  ngOnInit() {
    this.routeObserver = {
      next: (params: Params) => {                
        this.currentCategory = params['category'];  this.currentPage = params['page']; 
      },
      error: (error) => { console.log(error) } 
    }
    this.route.params.subscribe( this.routeObserver )
  }//onInit

  onUpdateRouteStatus(pageinfo:any){
    this.showPagination = true;
    this.totalPages = pageinfo.totalPages;    //po przyjsciu requesta updatuje ile stron jest max
  }

  onPageChange(target:any){
    let dir:any = target == 'next' ? ++this.currentPage : --this.currentPage;
    this.router.navigate(['category', this.currentCategory, dir])
  }

}
 