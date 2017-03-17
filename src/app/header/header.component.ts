import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LoginStatusService} from './../login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private storage:SessionStorageService,private _login:LoginStatusService) { }
  private userId=this.storage.retrieve('loggedInId');
  private loginStatus='';
  private routerLink='';
  private showDashboard;

  ngOnInit() {
    if(this.userId){
      this.loginStatus='Logout';
      this.routerLink='logout';
      this.showDashboard=true;
    }else{
      this.loginStatus='Login';
      this.routerLink='login';
      this.showDashboard=false;
    }

    this._login.pushedData.subscribe(
      data=>{
        this.loginStatus=data;
        if(this.loginStatus=='Login'){
          console.log('login subscribed');
          this.routerLink='login';
          this.showDashboard=false;
        }
        if(this.loginStatus=='Logout'){
          console.log('logout subscribed');
          this.routerLink='logout';
          this.showDashboard=true;
        }

      }
    );
  }
}
