import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './component/terms-condition/terms-condition.component';
import { AboutUsComponent } from './component/about-us/about-us.component';

import { HowToApplyComponent } from './component/how-to-apply/how-to-apply.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { Section1Component } from './component/application-form/section1/section1.component';
import { Section2Component } from './component/application-form/section2/section2.component';
import { Section3Component } from './component/application-form/section3/section3.component';
import { Section5Component } from './component/application-form/section5/section5.component';
import { Section4Component } from './component/application-form/section4/section4.component';
import { Section6Component } from './component/application-form/section6/section6.component';
import { Section7Component } from './component/application-form/section7/section7.component';
import { Section8Component } from './component/application-form/section8/section8.component';
import { Section9Component } from './component/application-form/section9/section9.component';
import { Section10Component } from './component/application-form/section10/section10.component';
import { Section11Component } from './component/application-form/section11/section11.component';
import { Section12Component } from './component/application-form/section12/section12.component';
import { Section13Component } from './component/application-form/section13/section13.component';
import { Section14Component } from './component/application-form/section14/section14.component';
import { Section15Component } from './component/application-form/section15/section15.component';
import { ApplicationFormPreviewComponent } from './component/application-form/application-form-preview/application-form-preview.component';
import { MatchingUniversitiesComponent } from './component/application-form/matching-universities/matching-universities.component';
import { DraftFormComponent } from './component/dashboard/draft-form/draft-form.component';
import { ViewFormComponent } from './component/application-form/view-form/view-form.component';
import { ApplicationProgressComponent } from './component/dashboard/application-progress/application-progress.component';
import { ViewProgressComponent } from './component/dashboard/view-progress/view-progress.component';
import { ReportComponent } from './component/dashboard/report/report.component';
import { MyProfileComponent } from './component/profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './component/profile/change-password/change-password.component';
import { CreateUsersComponent } from './component/profile/create-users/create-users.component';
import { ManageUsersComponent } from './component/profile/manage-users/manage-users.component';
import { MySubscriptionComponent } from './component/profile/my-subscription/my-subscription.component';
import { SubscriptionHistoryComponent } from './component/profile/subscription-history/subscription-history.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth.guard';
import { MySubscriptionDetailsComponent } from './component/profile/my-subscription-details/my-subscription-details.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { FavoriteCoursesComponent } from './component/favorite-courses/favorite-courses.component';
import { NotificationComponent } from './component/notification/notification.component';
import { PaymentComponent } from './component/profile/payment/payment.component';
import { HowItComponent } from './component/how-it/how-it.component';
import { ServicesComponent } from './component/services/services.component';
import { CoursesComponent } from './component/courses/courses.component';
import { FaqComponent } from './component/faq/faq.component';
import { HelpComponent } from './component/help/help.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  { path: 'login', component: LoginComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'favourite-courses',   component: FavoriteCoursesComponent,canActivate :[AuthGuard] },
  { path: 'notification',   component: NotificationComponent,canActivate :[AuthGuard] },
  { path: 'how-it',component:HowItComponent,canActivate :[AuthGuard] },
  { path: 'services',component:ServicesComponent,canActivate :[AuthGuard] },
  { path: 'courses',component:CoursesComponent,canActivate :[AuthGuard] },
  { path: 'find-univ',component:CoursesComponent,canActivate :[AuthGuard] },
  { path: 'dashboard',   component: DashboardComponent,canActivate :[AuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'draft-form', component: DraftFormComponent,canActivate :[AuthGuard] },
  { path: 'application-progress/:id', component: ApplicationProgressComponent,canActivate :[AuthGuard] },
  { path: 'view-progress', component : ViewProgressComponent,canActivate :[AuthGuard] },
  { path: 'report', component : ReportComponent,canActivate :[AuthGuard] },
  { path: 'payment', component : PaymentComponent ,canActivate :[AuthGuard] },
  { path: 'my-profile', component : MyProfileComponent,canActivate :[AuthGuard] },
  { path: 'change-password', component : ChangePasswordComponent,canActivate :[AuthGuard] },
  { path: 'create-users', component : CreateUsersComponent,canActivate :[AuthGuard] },
  { path: 'manage-users', component : ManageUsersComponent,canActivate :[AuthGuard] },
  { path: 'my-subscription', component : MySubscriptionComponent,canActivate :[AuthGuard] },
  { path: 'my-subscription-details/:id', component : MySubscriptionDetailsComponent,canActivate :[AuthGuard] },
  { path: 'subscription-history', component : SubscriptionHistoryComponent,canActivate :[AuthGuard] },

  { path: 'section2', component: Section1Component,canActivate :[AuthGuard] },
  { path: 'section1', component: Section2Component,canActivate :[AuthGuard] },
  { path: 'section3', component: Section3Component,canActivate :[AuthGuard] },
  { path: 'section4', component: Section4Component,canActivate :[AuthGuard] },
  { path: 'section5', component: Section5Component,canActivate :[AuthGuard] },
  { path: 'section6', component: Section6Component,canActivate :[AuthGuard] },
  { path: 'section7', component: Section7Component,canActivate :[AuthGuard] },
  { path: 'section8', component: Section8Component,canActivate :[AuthGuard] },
  { path: 'section9', component: Section9Component,canActivate :[AuthGuard] },
  { path: 'section10', component: Section10Component,canActivate :[AuthGuard] },
  { path: 'section11', component: Section11Component,canActivate :[AuthGuard] },
  // { path: 'section12', component: Section12Component,canActivate :[AuthGuard] },
  { path: 'section12', component: Section13Component,canActivate :[AuthGuard] },
  { path: 'section13', component: Section14Component,canActivate :[AuthGuard] },
  { path: 'section14', component: Section15Component,canActivate :[AuthGuard] },
  { path: 'application-form-preview', component: ApplicationFormPreviewComponent,canActivate :[AuthGuard] },
  { path: 'matching-universities', component: MatchingUniversitiesComponent,canActivate :[AuthGuard] },
  { path: 'view-form/:id', component: ViewFormComponent,canActivate :[AuthGuard] },
  { path: 'faq', component: FaqComponent,canActivate :[AuthGuard] },
  { path: 'help', component: HelpComponent,canActivate :[AuthGuard] },
  { path: 'how-to-apply', component: HowToApplyComponent,canActivate :[AuthGuard] },
  
  { path: 'about-us', component: AboutUsComponent,canActivate :[AuthGuard] },
  { path: 'terms-conditions', component: TermsConditionComponent,canActivate :[AuthGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent,canActivate :[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
