import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../../http.service';
@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {

  constructor(private route: ActivatedRoute,private httpService: HttpService) { }

  private formData={};
  public uploadedFile;
  private showloading:boolean=false;
  public uploadedAttachments=[];

  public jobId;
  public jobTitle;
  result;
  error;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
     if (params['id'] !== undefined) {
       this.jobId=params['id'];
       this.jobTitle=params['jobname'];
     } else {
       console.log('Job details not found');
     }
   });

  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files: e.target.files;
    for(var i=0;i<file.length;i++){
      this.uploadedAttachments.push(file[i]);
    }
  }

applyJob(form: NgForm) {

  if(form.valid){
    this.error='';
  this.showloading=true;
  let body = new FormData();
  var formValues = form.value;
  body.append('image', this.uploadedFile);
  body.append('jobId',this.jobId);
  body.append('coverLetter', formValues.coverLetter);
  body.append('fullName', formValues.fullName);
  body.append('email', formValues.email);

  if(formValues.authenticProsUsername){
    body.append('authenticProsUsername', formValues.authenticProsUsername);
  }

  if(formValues.skype){
    body.append('skype', formValues.skype);
  }
  if(formValues.hangouts){
    body.append('hangouts', formValues.hangouts);
  }
  if(formValues.twitter){
    body.append('twitter', formValues.twitter);
  }
  body.append('location', formValues.location);
  if(formValues.websites){
    body.append('websites', formValues.websites);
  }
  body.append('createdBy', 1);
  if(this.uploadedAttachments){
    for(var i=0;i<this.uploadedAttachments.length;i++){
      body.append('image', this.uploadedAttachments[i]);
    }
  }
  this.httpService.applyJob(body)
    .subscribe(
    data => {
      this.result = data.success;
      this.showloading=false;
      form.reset();
    }, (err: any) => {  console.log(err);this.error = err.json(); this.showloading=false;}
    );
}else{
  console.log('form is not valid');
  console.log(form);
}
}

}
