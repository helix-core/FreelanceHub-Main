import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { SignupclientComponent } from './client-side/signupclient/signupclient.component';
import { SignupfreelancerComponent } from './freelancer-side/signupfreelancer/signupfreelancer.component';
import { RoleSelectionComponent } from './common-pages/role-selection/role-selection.component';
import { ClientService } from './client.service';
import { RoleService } from './role.service';
import { LoginComponent } from './common-pages/login/login.component';
import { LandingComponent } from './common-pages/landing/landing.component';
import { PostjobComponent } from './client-side/postjob/postjob.component';
import { PostedJobsComponent } from './client-side/postedjobs/postedjobs.component';
import { AssignedjobsComponent } from './client-side/assignedjobs/assignedjobs.component';
import { BiddingComponent } from './client-side/bidding/bidding.component';
import { FreelancerEditComponent } from './freelancer-side/edit-freelancer/edit-freelancer.component';
import { FreelancerProfileComponent } from './freelancer-side/freelancerprofile/freelancerprofile.component';
import { ApplyjobComponent } from './freelancer-side/applyjob/applyjob.component';
import { AppliedjobsComponent } from './freelancer-side/appliedjobs/appliedjobs.component';
import { AcceptedjobsComponent } from './freelancer-side/acceptedjobs/acceptedjobs.component';
import { ExploreComponent } from './common-pages/explore/explore.component';
import { EditClientFormComponent } from './client-side/edit-client-form/edit-client-form.component';
import { NotificationComponent } from './common-pages/notification/notification.component';
import { NotificationService } from './notification.service';
import { ClientprofileComponent } from './client-side/clientprofile/clientprofile.component';
import { WalletComponent } from './common-pages/wallet/wallet.component';
import { WalletService } from './wallet.service';
import { ResetPasswordComponent } from './common-pages/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupclientComponent,
    SignupfreelancerComponent,
    RoleSelectionComponent,
    LoginComponent,
    LandingComponent,
    PostjobComponent,
    PostedJobsComponent,
    AssignedjobsComponent,
    BiddingComponent,
    FreelancerEditComponent,
    FreelancerProfileComponent,
    ApplyjobComponent,
    AppliedjobsComponent,
    AcceptedjobsComponent,
    ExploreComponent,
    ClientprofileComponent,
    EditClientFormComponent,
    FreelancerEditComponent,
    FreelancerProfileComponent,
    ExploreComponent,
    NotificationComponent,
    WalletComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(
      withFetch()
      // withInterceptors([AuthInterceptor])
    ),
    ClientService,
    RoleService,
    NotificationService,
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
