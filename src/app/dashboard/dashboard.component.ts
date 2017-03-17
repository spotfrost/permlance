import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private storage:SessionStorageService,private router: Router) { }
    private userId=this.storage.retrieve('loggedInId');
  ngOnInit() {
    if(!this.userId){
      this.router.navigate(['/login']);
    }
  }
} 
