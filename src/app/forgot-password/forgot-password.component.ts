import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from './../http.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {globalConstants} from './../common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _http:HttpService,private router: Router,private storage:SessionStorageService) { }
  private formData={};
  private error;
  private result;
  private showloading:boolean=false;
  ngOnInit() {

  }

  forgot(form:NgForm,event) {
    event.preventDefault();
    this.error='';
    if(form.valid){
      this.showloading=true;
      form.value.angularHost=globalConstants.angularHost;
      this._http.forgotPassword(form.value)
        .subscribe(
        data => {
          this.showloading=false;
          this.result=data.success;
        }, (err: any) => { this.error = err.json();this.showloading=false; }
        );
    }
 }

}
