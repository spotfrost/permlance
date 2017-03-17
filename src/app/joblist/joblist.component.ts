import { Component, OnInit,Input} from '@angular/core';
import { HttpService } from './../http.service';
import { Response } from '@angular/http';
import { LimitcharactersPipe } from './../limitcharacters.pipe';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  constructor(private httpService:HttpService) { }
  private showloading:boolean=false;
  public items=[];
  private profilePhoto;
  private src;
  private val;
  private error;
  private remoteChecked:boolean=true;
  private keyword;
  private showPagination:boolean=true;
  private selectedIndex;

  skills='1,2,3,4,5,6,7,8,9';
  jobTypes='1,2,3,4,5,6';
  remote='0,1'
  relocation='0,1';
  visa='0,1';
  level='1,2,3,4,5,6,7,8,9';
  companytype='1,2,3,4,5,6,7';
  compensation='1,2,3,4,5,6,7';

  defaultImgSrc='assets/images/usericon.png';

  highlightJob(item,event){
    this.selectedIndex=item;
  }

  setItems(data){
    if(data){
      this.items=data;
    }else{
      this.items=[];
    }
    this.error={};
  }

  setLoading(){
    this.showloading=!this.showloading;
  }

  ngOnInit() {
    this.error={};
    this.showloading=true;
      this.httpService.getJobsList(this.jobTypes,this.skills,this.remote,this.relocation,this.visa,this.level,this.companytype,this.compensation,this.keyword)
      .subscribe(
        data=>{
          this.items=data;
          this.showloading=false;
        },(err: any) => {this.error=err.json(); this.showloading=false; }
      );

  }

  setError(error){
    console.log('set error called');
    this.error=error;
    this.showloading=false;
    this.items=[];
    this.showPagination=false;
  }

  ImageSrcNotFound(event){
    console.debug(event);
  }
  getJobsList(){
    this.showloading=true;
    this.httpService.getJobsList(this.jobTypes,this.skills,this.remote,this.relocation,this.visa,this.level,this.companytype,this.compensation,this.keyword)
    .subscribe(
      data=>{
        this.showloading=false;
        this.items=data;
      }, (err: any) => { console.log(); this.error =err.json()}
    );
  }
}
