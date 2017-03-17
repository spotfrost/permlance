import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpService } from './../http.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {globalConstants} from './../common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _http:HttpService,private router: Router,private storage:SessionStorageService) { }
  private formData={};
  private error;
  private result;
  private showloading:boolean=false;
  private resetToken;
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
     if (params['token'] !== undefined) {
       console.log(params);
       this.resetToken=params['token'];
     } else {
       console.log('Job details not found');
     }
   });
  }

  reset(form:NgForm,event) {
    event.preventDefault();
      this.error='';
    if(form.valid){
      this.showloading=true;
      form.value.token=this.resetToken;
      form.value.angularHost=globalConstants.angularHost;
      console.log(form.value);
      this._http.resetPassword(form.value)
        .subscribe(
        data => {
          this.showloading=false;
          this.result=data.success;
        }, (err: any) => { this.error = err.json();this.showloading=false; }
        );
    }
 }

}
