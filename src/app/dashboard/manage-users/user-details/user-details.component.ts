import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../../http.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  public userDetails=[];
  private loggedInUserId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');

  private error;
  ngOnInit() {
    if(!this.loggedInUserId){
      this.router.navigate(['/login']);
    }else{
      this.route.params.forEach((params: Params) => {
       if (params['id'] !== undefined) {
         this._http.getUserDetails(params['id'])
         .subscribe(
           data=>{
             this.userDetails=data;
           },(err: any) => { this.error = err}
         );
       } else {
         console.log('User details not found');
       }
     });
    }





  }
}
