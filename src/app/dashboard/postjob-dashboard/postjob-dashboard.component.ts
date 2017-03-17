import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { globalConstants } from './../../common';

@Component({
  selector: 'app-postjob-dashboard',
  templateUrl: './postjob-dashboard.component.html',
  styleUrls: ['./postjob-dashboard.component.css']
})
export class PostjobDashboardComponent implements OnInit {

  constructor(private _http:HttpService,private storage:SessionStorageService,private router: Router) { }
  private userId=this.storage.retrieve('loggedInId');
  private userRole=this.storage.retrieve('loggedInRole');
  private formData={};
  private error;
  private result;
  private showloading:boolean=false;

  skills:any[]=[];
  levels:any[]=[];
  compensations:any[]=[];
  companyTypes:any[]=[];
  showValidations=false;
  // defaults={
  //   'compensation':'selectc',
  //   'skill':'selects',
  //   'level':'selectl',
  //   'companyType':"selectco"
  // };

  OPTIONS_SKILLS=[
    {value:1,label:"Design & User Experience"},
    {value:2,label:"Front End Engineering"},
    {value:3,label:"Back End Engineering"},
    {value:4,label:"Apps"},
    {value:5,label:"Product Management"},
    {value:6,label:"Marketing & Sales"},
    {value:7,label:"Customer & Community"},
    {value:8,label:"Management"},
    {value:9,label:"Miscellaneous"},
  ];

  OPTIONS_LEVELS=[
    {value:1,label:"Founder/Co-Founder"},
    {value:2,label:"Chief Officer"},
    {value:3,label:"Director/Manager"},
    {value:4,label:"Lead"},
    {value:5,label:"Senior"},
    {value:6,label:"Mid"},
    {value:7,label:"Junior"},
    {value:8,label:"Freelancer"},
    {value:9,label:"Student"},
  ];

  OPTIONS_COMPENSATIONS=[
    {value:1,label:"Tier 1 (Under $29,000)"},
    {value:2,label:"Tier 2 ($30,000–$49,000)"},
    {value:3,label:"Tier 3 ($50,000–$74,000)"},
    {value:4,label:"Tier 4 ($75,000–$99,000)"},
    {value:5,label:"Tier 5 ($100,000–$149,000)"},
    {value:6,label:"Tier 6 ($150,000–$199,000)"},
    {value:7,label:"Tier 7 ($200,000 or more)"}
  ];

  OPTIONS_COMPANYTYPES=[
    {value:1,label:"Startup"},
    {value:2,label:"Studio"},
    {value:3,label:"Small Business"},
    {value:4,label:"Mid-Sized Business"},
    {value:5,label:"Large Organization"},
    {value:6,label:"Educational Institution"},
    {value:7,label:"Non-Profit"}
  ];

  jobType = [
    { id: 1, title: 'Free',price:'0' },
    { id: 2, title: 'Paid',price:'50' },
  ];

  private showComanyTypeError:boolean=false;
  private showCompensationError:boolean=false;
  private showLevelError:boolean=false;
  private showSkillsError:boolean=false;


  ngOnInit() {
    if(!this.userId){
      this.router.navigate(['/login']);
    }
  }

  selectChange(event){
    console.log(event);
  }

  saveJobFromDashboard(form:NgForm,event){
      event.preventDefault();
      form.value.createdBy=this.userId;

      form.value.angularHost=globalConstants.angularHost;
      if(form.valid) {
        this.showloading=true;
        this._http.saveJobFromDashboard(form.value)
          .subscribe(
          data => {
            this.result = data.success;
            this.showloading=false;
            form.reset();
          }, (err: any) => { this.error = err.json();this.showloading=false; }
          );
      }
  }
}
