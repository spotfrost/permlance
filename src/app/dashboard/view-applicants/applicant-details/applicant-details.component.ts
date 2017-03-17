import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../http.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  public applicationDetails=[];
  public attachments=[];
  private jobId;
  private showloading:boolean=false;
  private jobTitle;
  private files;
  ngOnInit() {
    if(!this.userId){
      this.router.navigate(['/login']);
    }else{
      this.route.params.forEach((params: Params) => {
       if (params['id'] !== undefined) {
         //this.showloading=true;
         this._http.getApplicationDetails(params['id']).subscribe(
           (data:any)=>{
           this.applicationDetails = data;
           //this.showloading=false;
           this.changeApplicationDetails(this.applicationDetails);
           }
         );
       } else {
         console.log('Application details not found');
       }
     });
    }




  }

  changeApplicationDetails(applicaitonDetails1){
    if(applicaitonDetails1.files){
      var ff=applicaitonDetails1.files;
      this.attachments=ff.split(',');
    }
  }

}
