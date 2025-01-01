import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupclientComponent } from './client-side/signupclient/signupclient.component';
import { SignupfreelancerComponent } from './freelancer-side/signupfreelancer/signupfreelancer.component';
import { RoleSelectionComponent } from './common-pages/role-selection/role-selection.component';
import { LoginComponent } from './common-pages/login/login.component';
import { LandingComponent } from './common-pages/landing/landing.component';
import { PostjobComponent } from './client-side/postjob/postjob.component';
import { PostedJobsComponent } from './client-side/postedjobs/postedjobs.component';
import { AssignedjobsComponent } from './client-side/assignedjobs/assignedjobs.component';
import { BiddingComponent } from './client-side/bidding/bidding.component';
import { FreelancerProfileComponent } from './freelancer-side/freelancerprofile/freelancerprofile.component';
import { FreelancerEditComponent } from './freelancer-side/edit-freelancer/edit-freelancer.component';
import { ExploreComponent } from './common-pages/explore/explore.component';
import { ApplyjobComponent } from './freelancer-side/applyjob/applyjob.component';
import { AppliedjobsComponent } from './freelancer-side/appliedjobs/appliedjobs.component';
import { AcceptedjobsComponent } from './freelancer-side/acceptedjobs/acceptedjobs.component';
import { ClientprofileComponent } from './client-side/clientprofile/clientprofile.component';
import { EditClientFormComponent } from './client-side/edit-client-form/edit-client-form.component';
import { WalletComponent } from './common-pages/wallet/wallet.component';
import { ResetPasswordComponent } from './common-pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'signup/client', component: SignupclientComponent },
  { path: 'signup/freelancer' ,component: SignupfreelancerComponent},
  { path: 'signup/selection', component: RoleSelectionComponent},
  { path: 'login', component: LoginComponent},
  { path:'landing', component: LandingComponent},
  { path: 'postjob',component:PostjobComponent},
  { path: 'posted-jobs',component:PostedJobsComponent},
  { path: 'assigned-jobs', component: AssignedjobsComponent},
  { path: 'bidding', component: BiddingComponent},
  { path: 'profile/freelancer/:freeId', component:FreelancerProfileComponent },
  {path:'freelancer/edit/:userId' ,component:FreelancerEditComponent},
  { path: 'verify-reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'explore', component: ExploreComponent },
  {path:'apply',component:ApplyjobComponent},
  {path:'applied-jobs',component:AppliedjobsComponent},
  {path:'accepted-jobs',component:AcceptedjobsComponent},
  {path:'profile/client',component:ClientprofileComponent},
  {path:'profile-client-edit/:userId',component:EditClientFormComponent},
  { path: 'payment',component: WalletComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
