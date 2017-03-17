import { Component, Input,OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'underscore';
import { globalConstants } from './../common';

@Component({
  selector: 'app-post-ajob',
  templateUrl: './post-ajob.component.html',
  styleUrls: ['./post-ajob.component.css']
})
export class PostAJobComponent implements OnInit {
  @Input() hidden: boolean;
  public uploadedFile;
  private showloading:boolean=false;
  public heroPhotoFile;
  showAnimation: boolean = true;
  private jobTypeSelected;
  private showPayment:boolean=true;

  // radioClicked(event){
  //   this.jobTypeSelected=event.target.id;
  //   if(this.jobTypeSelected==1){
  //     this.showPayment=false;
  //   }else{
  //     this.showPayment=true;
  //   }
  // }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.uploadedFile=file;
  }

  handleInputChangeHeroPhoto(e){
    var image = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.heroPhotoFile=image;
  }

  showDiv = 1;
  hideIt = true;
  result;
  error;

  OPTIONS_SKILLS=[
    {value:'selects',label:"Choose One..."},
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

  OPTIONS_MONTHS=[
      {value:'selectm',label:"Exp Month..."},
      {value:"01",label:"01"},
      {value:"02",label:"02"},
      {value:"03",label:"03"},
      {value:"04",label:"04"},
      {value:"05",label:"05"},
      {value:"06",label:"06"},
      {value:"07",label:"07"},
      {value:"08",label:"08"},
      {value:"09",label:"09"},
      {value:"10",label:"10"},
      {value:"11",label:"11"},
      {value:"12",label:"12"}
  ];

  OPTIONS_YEARS=[
    {value:'selecty',label:"Exp Year..."},
    {value:"2017",label:"2017"},
    {value:"2018",label:"2018"},
    {value:"2019",label:"2019"},
    {value:"2020",label:"2020"},
    {value:"2021",label:"2021"},
    {value:"2022",label:"2022"},
    {value:"2023",label:"2023"},
    {value:"2024",label:"2024"},
    {value:"2025",label:"2025"},
    {value:"2026",label:"2026"},
    {value:"2027",label:"2027"},
    {value:"2028",label:"2028"},
    {value:"2029",label:"2029"},
    {value:"2030",label:"2030"}
  ];

  OPTIONS_LEVELS=[
    {value:'selectl',label:"Choose One..."},
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
    {value:'selectc',label:"Choose One..."},
    {value:1,label:"Tier 1 (Under $29,000)"},
    {value:2,label:"Tier 2 ($30,000–$49,000)"},
    {value:3,label:"Tier 3 ($50,000–$74,000)"},
    {value:4,label:"Tier 4 ($75,000–$99,000)"},
    {value:5,label:"Tier 5 ($100,000–$149,000)"},
    {value:6,label:"Tier 6 ($150,000–$199,000)"},
    {value:7,label:"Tier 7 ($200,000 or more)"}
  ];

  OPTIONS_COMPANYTYPES=[
    {value:'selectco',label:"Choose One..."},
    {value:1,label:"Startup"},
    {value:2,label:"Studio"},
    {value:3,label:"Small Business"},
    {value:4,label:"Mid-Sized Business"},
    {value:5,label:"Large Organization"},
    {value:6,label:"Educational Institution"},
    {value:7,label:"Non-Profit"}
  ];

  private formData = {};

  public steps = ["10",
    "100",
    "1000"];

  public selection = this.steps[0];
  skills:any[]=[];
  levels:any[]=[];
  compensations:any[]=[];
  companyTypes:any[]=[];
  showValidations=false;
  private amount;

  public selectcompensation = 'select';

  jobType = [
    { id: 1, title: 'Free',price:'0' },
    { id: 2, title: 'Paid',price:'50' }
  ];

  constructor(private httpService: HttpService) { }

  onCompensationChange(value){
    this.selectcompensation = value;
  }

  getCurrentStepIndex() {
    return _.indexOf(this.steps, this.selection);
  }

  goToStep(index) {
    if (!_.isUndefined(this.steps[index])) {
      this.selection = this.steps[index];
    }
  }
  hasNextStep() {
    var stepIndex = this.getCurrentStepIndex();
    var nextStep = stepIndex + 1;
    return !_.isUndefined(this.steps[nextStep]);
  }
  hasPreviousStep() {
    var stepIndex = this.getCurrentStepIndex();
    var previousStep = stepIndex - 1;
    return !_.isUndefined(this.steps[previousStep]);
  }

  incrementStep(form:NgForm) {
    this.showDiv = this.showDiv + 1;
    document.documentElement.scrollTop =0;
    document.body.scrollTop =0;
  }

  decrementStep() {
    this.showDiv = this.showDiv - 1;
      document.documentElement.scrollTop =0;
      document.body.scrollTop =0;
  }

  hideFrstThirdShowSecond() {
    this.hidden = true;
  }

  hideSecondThirdShowFirst() {
    this.hidden = true;
  }

  ngOnInit() {
    this.getSkills();
    this.getLevels();
    this.getCompensations();
    this.getCompanyTypes();
  }

  getSkills(){
    this.httpService.getSkills()
    .subscribe(
      data=>{
      const  myArray=[];
        for (let key in data.rows){
          myArray.push(data.rows[key]);
        }
        this.skills=myArray;
      }
    );
  }

  getCompanyTypes(){
    this.httpService.getCompanyTypes()
    .subscribe(
      data=>{
      const  myArray=[];
        for (let key in data.rows){
          myArray.push(data.rows[key]);
        }
        this.companyTypes=myArray;
      }
    );
  }

  getCompensations(){
    this.httpService.getCompensations()
    .subscribe(
      data=>{
      const  myArray=[];
        for (let key in data.rows){
          myArray.push(data.rows[key]);
        }
        this.compensations=myArray;
      }
    );
  }

  getLevels(){
    this.httpService.getLevels()
    .subscribe(
      data=>{
      const  myArray=[];
        for (let key in data.rows){
          myArray.push(data.rows[key]);
        }
        this.levels=myArray;
      }
    );
  }

  saveJob(form: NgForm) {
    this.error='';
    if(form.valid){
      this.showloading=true;
      let body = new FormData();
      var formValues = form.value;
      if(form.value.jobType==1){
        this.amount=0;
      }else{
        this.amount=10000;
      }
      body.append('image', this.uploadedFile);
      body.append('heroImage',this.heroPhotoFile);
      body.append('jobType', formValues.jobType);
      body.append('skills', formValues.skills);
      body.append('level', formValues.level);
      body.append('compensation', formValues.compensation);
      body.append('location', formValues.location);
      body.append('jobTitle', formValues.jobTitle);
      body.append('description', formValues.description);
      body.append('perks', formValues.perks);
      body.append('companyType', formValues.companyType);
      body.append('companyUrl', formValues.companyUrl);
      body.append('elevatorPitch', formValues.elevatorPitch);
      body.append('twitter', formValues.twitter);
      body.append('firstName', formValues.firstName);
      body.append('lastName', formValues.lastName);
      body.append('email', formValues.email);
      body.append('addressLine1', formValues.addressLine1);

      if(formValues.addressLine2){
        body.append('addressLine2', formValues.addressLine2);
      }

      body.append('city', formValues.city);
      if(formValues.state){
        body.append('state', formValues.state);
      }

      body.append('zip', formValues.zip);
      if(formValues.country){
        body.append('country', formValues.country);
      }
      if(formValues.phone){
        body.append('phone', formValues.phone);
      }
      if(formValues.website){
        body.append('website', formValues.website);
      }
      if(formValues.contactEmail){
        body.append('contactEmail', formValues.contactEmail);
      }

      body.append('companyName', formValues.companyName);
      body.append('confidential', '1');
      body.append('status', '1');
      body.append('expiryMonth', formValues.expiryMonth);
      body.append('expiryYear', formValues.expiryYear);
      body.append('cardNumber', formValues.cardNumber);
      body.append('cvc', formValues.cvc);
      body.append('amount', this.amount);
      body.append('password', formValues.password);
      body.append('remote', '0');
      body.append('relocationAssistance', '0');
      body.append('visaSponsorship','0');
      body.append('role','2');
      body.append('angularHost',globalConstants.angularHost);
      body.append('applicationInstructions', 'These are demo application instructions');

      this.httpService.saveJob(body)
        .subscribe(
        data => {
          this.showloading=false;
          this.result = data.success;
          form.reset();
          this.showDiv = 1;
        }, (err: any) => { this.error =err.json();this.showloading=false;}
        );
    }else{
        this.showValidations=true;
        console.log(form);
        console.log('form is not valid');
    }
  }
}
