import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions,URLSearchParams } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {globalConstants} from './common';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  constructor(private http: Http) { }
  public val;
  private serviceUrl;

  private apiUrl=globalConstants.nodeHost;

  setValue(){
    this.val='savu';
  }

  getMyJobs(userId){
    return this.http.get(this.apiUrl+'/job/jobscreatedbyuser/'+userId).map((res: Response) => res.json())
  }

  getJobsList(jobTypes:any,skills:any,remote:any,relocation:any,visa:any,level:any,companytype:any,compensation:any,keyword:any) {
    console.log('here');
    this.serviceUrl=this.apiUrl+'/job/jobs?jobtype='+jobTypes+'&remote='+remote+'&skills='+skills+'&relocation='+relocation+'&visa='+visa+'&level='+level+'&companytype='+companytype+'&compensation='
    +compensation;
    if(keyword){
      this.serviceUrl+='&keyword='+keyword;
    }
    return this.http.get(this.serviceUrl).map((res: Response) => res.json())
  }

  login(userdata: any) {
    const body = JSON.stringify(userdata);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/user/login', body, { headers: headers })
      .map((data: Response) => data.json())
      ;
  }

  getSkills(){
    return this.http.get(this.apiUrl+'/skill/skills')
      .map((res: Response) => res.json())
  }

  getSubUsers(){
    return this.http.get(this.apiUrl+'/user/getsubusers')
      .map((res: Response) => res.json())
  }

  getLevels(){
    return this.http.get(this.apiUrl+'/level/levels')
      .map((res: Response) => res.json())
  }
  getCompanyTypes(){
    return this.http.get(this.apiUrl+'/company/companytypes')
      .map((res: Response) => res.json())
  }

  getCompensations(){
    return this.http.get(this.apiUrl+'/compensation/compensations')
      .map((res: Response) => res.json())
  }

  saveJob(job: any) {
    return this.http.post(this.apiUrl+'/user/addJobUser', job)
      .map((data: Response) => data.json())
  }

  updateProfile(profile: any) {
    return this.http.post(this.apiUrl+'/user/editprofile', profile)
      .map((data: Response) => data.json())
  }

  applyJob(details:any){
    return this.http.post(this.apiUrl+'/job/apply', details)
      .map((data: Response) => data.json())
  }

  getJobDetails(id: number){
    return this.http.get(this.apiUrl+'/job/jobdetails/'+id)
      .map((res: Response) => res.json())
  }

  getApplicantsForJob(jobId:any){
    return this.http.get(this.apiUrl+'/application/viewapplicantsofjob/'+jobId).map((res: Response) => res.json())
  }

  getApplicationDetails(id: number){
    return this.http.get(this.apiUrl+'/application/applicationdetails/'+id)
      .map((res: Response) => res.json())
  }

  getUserDetails(id: number){
    return this.http.get(this.apiUrl+'/user/userdetails/'+id)
      .map((res: Response) => res.json())
  }

  saveJobFromDashboard(jobdata:any){
    const body = JSON.stringify(jobdata);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/job/createjobfromdashboard', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  resetPassword(jobdata:any){
    const body = JSON.stringify(jobdata);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/user/resetpassword', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  forgotPassword(userdata:any){
    const body = JSON.stringify(userdata);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/user/forgotpasword', body, { headers: headers })
      .map((res: Response) => res.json());
  }

}
