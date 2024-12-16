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
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
