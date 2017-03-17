import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  private error;
  public userDetails=[];
  private result;
  public uploadedFile;
  public heroPhotoFile;

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.uploadedFile=file;
  }

  handleInputChangeHeroPhoto(e){
    var image = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.heroPhotoFile=image;
  }
  ngOnInit() {
    if(!this.userId){
      this.router.navigate(['/login']);
    }else{
      this._http.getUserDetails(this.userId)
      .subscribe(
        data=>{
          this.userDetails=data;
          console.log(this.userDetails);
        },(err: any) => { console.log(); this.error = err._body;this.userDetails=[]; }
      );
    }  }

  updateProfile(form:NgForm){
    if(form.valid){
      let body = new FormData();
      var formValues = form.value;
      body.append('id',this.userId);
      body.append('firstName', formValues.firstName);
      body.append('lastName', formValues.lastName);
      body.append('addressLine1', formValues.addressLine1);
      body.append('addressLine2', formValues.addressLine2);
      body.append('city', formValues.city);
      body.append('state', formValues.state);
      body.append('zip', formValues.zip);
      body.append('country', formValues.country);
      body.append('phone', formValues.phone);
      body.append('website', formValues.website);
      body.append('companyName', formValues.companyName);
      body.append('image', this.uploadedFile);
      body.append('heroImage',this.heroPhotoFile);
      this._http.updateProfile(body).delay(800).subscribe(
        data => {
          this.result = data.success;
          console.log(this.result);
          this.ngOnInit();
        }, (err: any) => { console.log(); this.error = err._body }
        );
    }
  }

}
