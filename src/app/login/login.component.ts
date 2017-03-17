import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from './../http.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LoginStatusService} from './../login-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private _http:HttpService,private router: Router,private storage:SessionStorageService,private _login:LoginStatusService) { }
  private formData={};
  private error;
  private userdata;
  private showloading:boolean=false;
  ngOnInit() {

  }

  login(form:NgForm,event) {
    event.preventDefault();
    if(form.valid){
      this.showloading=true;
      this.error='';
      this._http.login(form.value)
        .subscribe(
        data => {
          this._login.pushData('Logout');
          this.showloading=false;
          this.userdata=data;
          this.storage.store('loggedInId',this.userdata.id);
          this.storage.store('loggedInRole',this.userdata.role);
          this.router.navigateByUrl('/dashboard/viewjobs');
        }, (err: any) => { this.error = err.json() ;this.showloading=false;}
        );
    }
 }
}
