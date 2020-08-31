import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.css']
})
export class MySubscriptionComponent implements OnInit {

  accountData:any;
  subscriptionList:any = []

  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit() {
    window.scroll(0,0)
    this.accountData = JSON.parse(localStorage.getItem('myProfile'))
    this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
    this.getSubscriptionList()
  }

  getSubscriptionList(){
    this.service.showSpinner()
    this.subscriptionList = []
    this.service.getApi(`university/get-subscription-list?page=0&pageSize=10`,1).subscribe((res:any) => {
      console.log('res-->',res)
      if(res.body.status == 200){
        this.subscriptionList = res.body.data.resultList.content
      }
      this.service.hideSpinner()
    })
  }

  viewDetails(id){
    console.log('item----->>',id)
    this.router.navigateByUrl(`my-subscription-details/${id}`)
  }
}
