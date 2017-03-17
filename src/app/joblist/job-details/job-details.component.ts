import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private httpService:HttpService) { }
  public jobDetails=[];
  private jobname;
  private showloading:boolean=false;
  public defaultImgSrc='assets/images/usericon.png';
  ngOnInit() {
    this.showloading=true;
    this.route.params.forEach((params: Params) => {
     if (params['id'] !== undefined) {
       this.jobname=params['jobname'];
       this.httpService.getJobDetails(params['id']).subscribe(
         (data:any)=>{
          this.showloading=false;
         this.jobDetails = data[0];
         }
       );
     } else {
       console.log('Job details not found');
     }
   });

  }

}
