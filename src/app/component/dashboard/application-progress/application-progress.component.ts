import { ServicesService } from '../../../services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-application-progress',
  templateUrl: './application-progress.component.html',
  styleUrls: ['./application-progress.component.css']
})
export class ApplicationProgressComponent implements OnInit {
  subscriptionList:  any = [];
  accountDetails: any;
  form_Id: any;
  accountData:any;


  constructor(private service:ServicesService,private activateRoute:ActivatedRoute) {}

  ngOnInit() {
    window.scroll(0,0)
    this.accountDetails = JSON.parse(localStorage.getItem('myProfile'))
    this.activateRoute.params.subscribe((res:any) => {
      this.form_Id = res;
      console.log('FormResponse'+res)
      console.log("ResId is-:"+res.id)
      console.log(this.form_Id)
      this.getApplicationProgress()
    }) 
  }
 getApplicationProgress(){
   let formId = this.form_Id.id;
   let accountData = this.acc
    this.service.showSpinner()
    this.service.getApi(`course/get-application-status-for-progress-view?formId=${this.form_Id.id}
    &representativeId=${this.accountDetails.representativeDetailsId}`,1)
    .subscribe((res:any) => {
        console.log('Response is---->',res)
         this.service.hideSpinner()
    })
  }


}
// ngOnInit() {
//   window.scroll(0,0)
//   this.accountData = JSON.parse(localStorage.getItem('myProfile'))
//   this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
//   this.getSubscriptionHistoryList()
// }

