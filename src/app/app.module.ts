import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { Section1Component } from './component/application-form/section1/section1.component';
import { Section2Component } from './component/application-form/section2/section2.component';
import { Section3Component } from './component/application-form/section3/section3.component';
import { Section4Component } from './component/application-form/section4/section4.component';
import { Section5Component } from './component/application-form/section5/section5.component';
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
import { MoreInformationShareComponent } from './component/application-form/more-information-share/more-information-share.component';
import { ViewFormComponent } from './component/application-form/view-form/view-form.component';
import { DraftFormComponent } from './component/dashboard/draft-form/draft-form.component';
import { ApplicationProgressComponent } from './component/dashboard/application-progress/application-progress.component';
import { ViewProgressComponent } from './component/dashboard/view-progress/view-progress.component';
import { ReportComponent } from './component/dashboard/report/report.component';
import { MyProfileComponent } from './component/profile/my-profile/my-profile.component';
import { MySubscriptionComponent } from './component/profile/my-subscription/my-subscription.component';
import { ChangePasswordComponent } from './component/profile/change-password/change-password.component';
import { ManageUsersComponent } from './component/profile/manage-users/manage-users.component';
import { CreateUsersComponent } from './component/profile/create-users/create-users.component';
import { SubscriptionHistoryComponent } from './component/profile/subscription-history/subscription-history.component';

import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpModifierInterceptor } from './services.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { MySubscriptionDetailsComponent } from './component/profile/my-subscription-details/my-subscription-details.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { FavoriteCoursesComponent } from './component/favorite-courses/favorite-courses.component';
import { NotificationComponent } from './component/notification/notification.component';
import { PaymentComponent } from './component/profile/payment/payment.component';
import { HowItComponent } from './component/how-it/how-it.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
    Section6Component,
    Section7Component,
    Section8Component,
    Section9Component,
    Section10Component,
    Section11Component,
    Section12Component,
    Section13Component,
    Section14Component,
    Section15Component,
    ApplicationFormPreviewComponent,
    MatchingUniversitiesComponent,
    MoreInformationShareComponent,
    ViewFormComponent,
    DraftFormComponent,
    ApplicationProgressComponent,
    ViewProgressComponent,
    ReportComponent,
    MyProfileComponent,
    MySubscriptionComponent,
    ChangePasswordComponent,
    ManageUsersComponent,
    CreateUsersComponent,
    SubscriptionHistoryComponent,
    LoginComponent,
    MySubscriptionDetailsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    FavoriteCoursesComponent,
    NotificationComponent,
    PaymentComponent,
    HowItComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    MatAutocompleteModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpModifierInterceptor,
      multi: true
  },
],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
