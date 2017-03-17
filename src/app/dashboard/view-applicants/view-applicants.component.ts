import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../http.service';
import { LimitcharactersPipe } from './../../limitcharacters.pipe';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  private jobId;
  private applicants=[];
  private error;
  private jobTitle='';
  private showloading:boolean=false;

  ngOnInit() {
    if(!this.userId){
      this.router.navigate(['/login']);
    }else{
      this.route.params.forEach((params: Params) => {
       if (params['id'] !== undefined) {
         this.showloading=true;
         this.jobId=params['id'];
         this.jobTitle=params['jobname'];
         this._http.getApplicantsForJob(this.jobId)
         .subscribe(
           data=>{
             this.applicants=data;
             this.showloading=false;
           },(err: any) => {this.showloading=false; this.error = err.json();console.log(err.json()) }
         );
       } else {
         console.log('Job details not found');
       }
     });
    } 
  }
}
