import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  constructor(private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  public  items=[];
  private error;
  private showloading:boolean=false;
  private selectedIndex;
  private showPagination:boolean=true;
  defaultImgSrc='assets/images/usericon.png';
  ngOnInit() {
    this.showloading=true;
    if(this.userId){
      this._http.getMyJobs(this.userId)
      .subscribe(
        data=>{
          this.items=data;
          this.showloading=false;
        },(err: any) => { this.error = err;this.showloading=false; }
      );
    }else{
        this.router.navigate(['/login']);
    }

  }
  highlightJob(item,event){
    this.selectedIndex=item;
  }

}
