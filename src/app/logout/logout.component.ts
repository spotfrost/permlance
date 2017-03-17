import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginStatusService} from './../login-status.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private storage:SessionStorageService,private _login:LoginStatusService) { }

  ngOnInit() {
    console.log('in logout on init');
    this._login.pushData('Login');
    this.storage.clear('loggedInId');
    this.router.navigate(['']);
  }
}
