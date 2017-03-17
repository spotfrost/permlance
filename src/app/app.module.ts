import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Pipe } from '@angular/core';
import { FormsModule, ReactiveFormsModule,NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray  } from '@angular/forms';

import { AccordionModule } from 'ng2-bootstrap/accordion';
import { AppComponent } from './app.component';
import { PostAJobComponent } from './post-ajob/post-ajob.component';
import {routing} from "./app.routing";
import { PricingComponent } from './pricing/pricing.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { LoginStatusService } from './login-status.service';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JoblistComponent } from './joblist/joblist.component';
import { CustomFormsModule } from 'ng2-validation';
import { SelectModule } from 'angular2-select';
import { JobDetailsComponent } from './joblist/job-details/job-details.component';
import { ApplyJobComponent } from './joblist/job-details/apply-job/apply-job.component';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { LimitcharactersPipe } from './limitcharacters.pipe';
import { RemoveSpacesWithHyphensPipe } from './remove-spaces-with-hyphens.pipe';
import { SearchSidebarComponent } from './search-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewJobsComponent } from './dashboard/view-jobs/view-jobs.component';
import { ViewApplicantsComponent } from './dashboard/view-applicants/view-applicants.component';
import { Ng2Webstorage } from 'ng2-webstorage';
import { ApplicantDetailsComponent } from './dashboard/view-applicants/applicant-details/applicant-details.component';
import { LogoutComponent } from './logout/logout.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { PostjobDashboardComponent } from './dashboard/postjob-dashboard/postjob-dashboard.component';
import { ReturnerrorfromjsonPipe } from './returnerrorfromjson.pipe';
import { IfemptyPipe } from './ifempty.pipe';
import { ManageUsersComponent } from './dashboard/manage-users/manage-users.component';
import {globalConstants} from './common';
import { UserDetailsComponent } from './dashboard/manage-users/user-details/user-details.component';
import { ViewJobsUsersComponent } from './dashboard/manage-users/view-jobs-users/view-jobs-users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostAJobComponent,
    SidebarComponent,
    PricingComponent,
    GuaranteeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    JoblistComponent,
    JobDetailsComponent,
    ApplyJobComponent,
    LimitcharactersPipe,
    RemoveSpacesWithHyphensPipe,
    SearchSidebarComponent,
    LoginComponent,
    DashboardComponent,
    ViewJobsComponent,
    ViewApplicantsComponent,
    ApplicantDetailsComponent,
    LogoutComponent,
    EditProfileComponent,
    PostjobDashboardComponent,
    ReturnerrorfromjsonPipe,
    IfemptyPipe,
    ManageUsersComponent,
    UserDetailsComponent,
    ViewJobsUsersComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    CustomFormsModule,
    SelectModule,
    Angular2FontAwesomeModule,
    Ng2Webstorage,
    Ng2PaginationModule,
    CKEditorModule
  ],
  providers: [HttpService,LoginStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
