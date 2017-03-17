import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private _http:HttpService,private storage:SessionStorageService,private router: Router) { }

  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');

  private users:any[]=[];
  private defaultImgSrc='assets/images/usericon.png';
  private selectedIndex;

  ngOnInit() {
    if(!this.userId){
        this.router.navigate(['/login']);
    }else{
      if(this.userRole==1){
        this._http.getSubUsers()
        .subscribe(
          data=>{
          const  myArray=[];
            for (let key in data.rows){
              myArray.push(data.rows[key]);
            }
            this.users=myArray;
          }
        );
      }
    }
  }

  highlightUser(item,event){
    this.selectedIndex=item;
  }

}
