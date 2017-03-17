import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../http.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
@Component({
  selector: 'app-view-jobs-users',
  templateUrl: './view-jobs-users.component.html',
  styleUrls: ['./view-jobs-users.component.css']
})
export class ViewJobsUsersComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _http:HttpService,private storage:SessionStorageService,private router: Router) { }

  private loggedInUserId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  private showloading:boolean=false;
  public  items=[];
  private selectedIndex;
  private error;
  ngOnInit() {
    if(!this.loggedInUserId){
      this.router.navigate(['/login']);
    }else{
      this.route.params.forEach((params: Params) => {
       if (params['id'] !== undefined) {
         this.showloading=true;
         this._http.getMyJobs(params['id'])
         .subscribe(
           data=>{
             this.items=data;
             this.showloading=false;
           },(err: any) => { this.error = err.json();this.showloading=false; }
         );
       } else {
         console.log('Job details not found');
       }
     });
    }



  }
  highlightJob(item,event){
    this.selectedIndex=item;
  }

}
