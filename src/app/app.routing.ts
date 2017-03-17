import { Routes,RouterModule } from "@angular/router";
import { PostAJobComponent } from "./post-ajob/post-ajob.component";
import { PricingComponent } from "./pricing/pricing.component";
import { GuaranteeComponent } from "./guarantee/guarantee.component";
import { LoginComponent } from "./login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { JobDetailsComponent } from "./joblist/job-details/job-details.component";
import { ApplyJobComponent } from "./joblist/job-details/apply-job/apply-job.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ViewJobsComponent } from "./dashboard/view-jobs/view-jobs.component";
import { ViewApplicantsComponent } from "./dashboard/view-applicants/view-applicants.component";
import { ApplicantDetailsComponent } from "./dashboard/view-applicants/applicant-details/applicant-details.component";
import { LogoutComponent } from "./logout/logout.component";
import { EditProfileComponent } from "./dashboard/edit-profile/edit-profile.component";
import { PostjobDashboardComponent } from "./dashboard/postjob-dashboard/postjob-dashboard.component";
import { ManageUsersComponent } from "./dashboard/manage-users/manage-users.component";
import { UserDetailsComponent } from "./dashboard/manage-users/user-details/user-details.component";
import { ViewJobsUsersComponent } from "./dashboard/manage-users/view-jobs-users/view-jobs-users.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";


const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'postajob', component: PostAJobComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'guarantee', component: GuaranteeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'jobs/:id/:jobname', component: JobDetailsComponent },
  { path: 'apply/:id/:jobname', component: ApplyJobComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/viewjobs', component: ViewJobsComponent },
  { path: 'dashboard/viewapplicants/:id/:jobname', component: ViewApplicantsComponent },
  { path: 'dashboard/viewapplications/application/:id', component: ApplicantDetailsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard/editprofile', component: EditProfileComponent },
  { path: 'dashboard/postjob', component: PostjobDashboardComponent },
  { path: 'dashboard/manage-users', component: ManageUsersComponent },
  { path: 'dashboard/manage-users/:id', component: UserDetailsComponent },
  { path: 'dashboard/manage-users/view-jobs/:id', component: ViewJobsUsersComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
];

export const routing=RouterModule.forRoot(APP_ROUTES);
