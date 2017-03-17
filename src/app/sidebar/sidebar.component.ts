import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from './../http.service';
import { Response } from '@angular/http';
import { JoblistComponent } from '../joblist/joblist.component';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  private items=[];

  jobType=[
    {title:'Free',color:'#e98210',id:'1',done:false,price:'0'},
    {title:'Paid',color:'#f44b42',id:'2',done:false,price:'50'}
  ];

  skills=[
    {title:'Design & User Experience',color:'#222222',id:'1',done:false},
    {title:'Front-end Engineering',color:'#222222',id:'2',done:false},
    {title:'Back-end Engineering',color:'#222222',id:'3',done:false},
    {title:'Apps',color:'#222222',id:'4',done:false},
    {title:'Product Management',color:'#222222',id:'5',done:false},
    {title:'Content & Copywriting',color:'#222222',id:'6',done:false},
    {title:'Marketing & Sales',color:'#222222',id:'7',done:false},
    {title:'Customer & Community',color:'#222222',id:'8',done:false},
    {title:'Management',color:'#222222',id:'9',done:false},
    {title:'Miscellaneous',color:'#222222',id:'10',done:false}
  ];

  levels=[
    {title:'Founder/Co-Founder',color:'#222222',id:'1',done:false},
    {title:'Chief Officer',color:'#222222',id:'2',done:false},
    {title:'Director/Manager',color:'#222222',id:'3',done:false},
    {title:'Lead',color:'#222222',id:'4',done:false},
    {title:'Senior',color:'#222222',id:'5',done:false},
    {title:'Mid',color:'#222222',id:'6',done:false},
    {title:'Junior',color:'#222222',id:'7',done:false},
    {title:'Freelancer',color:'#222222',id:'8',done:false},
    {title:'Student',color:'#222222',id:'9',done:false}
  ];

  companyTypes=[
    {title:'Startup',color:'#222222',id:'1',done:false},
    {title:'Studio',color:'#222222',id:'2',done:false},
    {title:'Small business',color:'#222222',id:'3',done:false},
    {title:'Mid-sized business',color:'#222222',id:'4',done:false},
    {title:'Large organization',color:'#222222',id:'5',done:false},
    {title:'Educational institution',color:'#222222',id:'6',done:false},
    {title:'Non-Profit',color:'#222222',id:'7',done:false}
  ];

  locations=[
    {title:'Relocation assistance',color:'#222222',id:'1',done:false,type:'relocation'},
    {title:'Visa sponsorship',color:'#222222',id:'2',done:false,type:'visa'}
  ];

  compensations=[
    {title:'Tier 1 (Under $29,000)',color:'#222222',id:'1',done:false},
    {title:'Tier 2 ($30,000–$49,000)',color:'#222222',id:'2',done:false},
    {title:'Tier 3 ($50,000–$74,000)',color:'#222222',id:'3',done:false},
    {title:'Tier 4 ($75,000–$99,000)',color:'#222222',id:'4',done:false},
    {title:'Tier 5 ($100,000–$149,000)',color:'#222222',id:'5',done:false},
    {title:'Tier 6 ($150,000–$199,000)',color:'#222222',id:'6',done:false},
    {title:'Tier 7 ($200,000 or more)',color:'#222222',id:'7',done:false}
  ];

  constructor(private httpService:HttpService,
  private JoblistComponent:JoblistComponent) { }
  private currentQueryParams:any;
  private selectedJobTypes=[];
  private selectedSkills=[];
  private selectedCompanyTypes=[];
  private selectedCompensations=[];
  private selectedLevels=[];
  private jobTypes:any;
  private selectedJobTypesComma;
  private selectedSkillsComma;
  private selectedCompanyTypesComma;
  private selectedLevelsComma;
  private selectedCompensationsComma;
  private emptyArray=[];
  private wifiblue:boolean=false;
  private selectedIndex=0;
  private allJobsFalse:boolean=true;
  private relocationSelected:boolean=false;
  private visaSelected:boolean=false;
  private allJobs='1,2,3,4,5,6';
  private allSkills='1,2,3,4,5,6,7,8,9';
  private allCompanyTypes='1,2,3,4,5,6,7';
  private allCompensations='1,2,3,4,5,6,7';
  private allLevels='1,2,3,4,5,6,7,8,9';
  private remote='0,1'
  private relocation='0,1';
  private keyword;
  visa='0,1';
    onSelect(i): void {
        this.selectedIndex =i;
    }

    callService(){
      this.JoblistComponent.setLoading();
      /* FOR EACH JOBS */
      if(this.relocationSelected==false){
        this.relocation='0,1';
      }else{
        this.relocation='1';
      }

      if(this.visaSelected==false){
        this.visa='0,1';
      }else{
        this.visa='1';
      }

      this.jobType.forEach((item)=>{
        if(item.done==true){
          this.allJobsFalse=false;
            if(this.selectedJobTypes.indexOf(item.id) ==-1){
              this.selectedJobTypes.push(item.id);
            }
        }else{
          if(this.selectedJobTypes.indexOf(item.id)>=0){
            this.selectedJobTypes.splice(this.selectedJobTypes.indexOf(item.id), 1);
          }
        }
      });

      /* FOR EACH SKILLS */
      this.skills.forEach((item)=>{
        if(item.done==true){
            if(this.selectedSkills.indexOf(item.id) ==-1){
              this.selectedSkills.push(item.id);
            }
        }else{
          if(this.selectedSkills.indexOf(item.id)>=0){
            this.selectedSkills.splice(this.selectedSkills.indexOf(item.id), 1);
          }
        }
      });

      /* FOR EACH COMPANY TYPES */
      this.companyTypes.forEach((item)=>{
        if(item.done==true){
            if(this.selectedCompanyTypes.indexOf(item.id) ==-1){
              this.selectedCompanyTypes.push(item.id);
            }
        }else{
          if(this.selectedCompanyTypes.indexOf(item.id)>=0){
            this.selectedCompanyTypes.splice(this.selectedCompanyTypes.indexOf(item.id), 1);
          }
        }
      });

      /* FOR EACH LEVELS */

      this.levels.forEach((item)=>{
        if(item.done==true){
            if(this.selectedLevels.indexOf(item.id) ==-1){
              this.selectedLevels.push(item.id);
            }
        }else{
          if(this.selectedLevels.indexOf(item.id)>=0){
            this.selectedLevels.splice(this.selectedLevels.indexOf(item.id), 1);
          }
        }
      });

      this.compensations.forEach((item)=>{
        if(item.done==true){
            if(this.selectedCompensations.indexOf(item.id) ==-1){
              this.selectedCompensations.push(item.id);
            }
        }else{
          if(this.selectedCompensations.indexOf(item.id)>=0){
            this.selectedCompensations.splice(this.selectedCompensations.indexOf(item.id), 1);
          }
        }
      });

      if(this.selectedJobTypes.length>0){
          this.selectedJobTypesComma=this.selectedJobTypes.toString();
      }else{
          this.selectedJobTypesComma=this.allJobs;
      }

      if(this.selectedSkills.length>0){
        this.selectedSkillsComma=this.selectedSkills.toString();
      }else{
          this.selectedSkillsComma=this.allSkills;
      }

      if(this.selectedCompanyTypes.length>0){
        this.selectedCompanyTypesComma=this.selectedCompanyTypes.toString();
      }else{
          this.selectedCompanyTypesComma=this.allCompanyTypes;
      }

      if(this.selectedLevels.length>0){
        this.selectedLevelsComma=this.selectedLevels.toString();
      }else{
          this.selectedLevelsComma=this.allLevels;
      }

      if(this.selectedCompensations.length>0){
        this.selectedCompensationsComma=this.selectedCompensations.toString();
      }else{
          this.selectedCompensationsComma=this.allCompensations;
      } 

      /* PASS SELECTED TO PARAMETERS */
      this.httpService.getJobsList(this.selectedJobTypesComma,this.selectedSkillsComma,this.remote,this.relocation,this.visa,this.selectedLevelsComma,this.selectedCompanyTypesComma,this.selectedCompensationsComma,this.keyword)
      .subscribe(
        data=>{
            this.JoblistComponent.setItems(data);
            this.JoblistComponent.setLoading();
        },(err: any) => {this.JoblistComponent.setError(err.json())} ) ;
    }

    searchByKeyword(event){
      this.keyword=event.target.value;
      this.callService();
    }

    clickRemote(event){
      if(event.target.checked){
        this.remote='1';
        this.wifiblue=true;
      }else{
        this.remote='0,1';
        this.wifiblue=false;
      }
      this.callService();
    }

    clicked(i:number,event:any){
          event.preventDefault();
          if(this.jobType[i]){
            this.jobType[i]['done']=!this.jobType[i]['done'];
          }
          this.callService();
    }

    clickedRelocation(event:any){
      event.preventDefault();
      this.relocationSelected=!this.relocationSelected;
      this.callService();
    }

    clickedVisa(event:any){
      event.preventDefault();
      this.visaSelected=!this.visaSelected;
      this.callService();
    }


    clickedCompensation(i:number,event:any){
      event.preventDefault();
      if(this.compensations[i]){
        this.compensations[i]['done']=!this.compensations[i]['done'];
      }
      this.callService();
    }

    clickedSkills(i:number,event:any){
          event.preventDefault();
          if(this.skills[i]){
            this.skills[i]['done']=!this.skills[i]['done'];
          }
          this.callService();
    }

    clickedCompanyTypes(i:number,event:any){
      event.preventDefault();
      if(this.companyTypes[i]){
        this.companyTypes[i]['done']=!this.companyTypes[i]['done'];
      }
      this.callService();
    }

    clickedLevels(i:number,event:any){
      event.preventDefault();
      if(this.levels[i]){
        this.levels[i]['done']=!this.levels[i]['done'];
      }
      this.callService();
    }



  ngOnInit() {

  }
  // handleClick(event){
  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var idAttr = target.attributes.id;
  //   var value = idAttr.nodeValue;
  //   this.route.queryParams.subscribe(qparams => {
  //
  //   this.currentQueryParams= qparams;
  //   console.log(this.currentQueryParams);
  //   });
  // }
}
