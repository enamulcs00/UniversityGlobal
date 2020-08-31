import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  styleUrls: ['./subscription-history.component.css']
})
export class SubscriptionHistoryComponent implements OnInit {

  accountData: any;
  subscriptionList :any  = []

  constructor(private service:ServicesService) { }

  ngOnInit() {
      window.scroll(0,0)
      this.accountData = JSON.parse(localStorage.getItem('myProfile'))
      this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
      this.getSubscriptionHistoryList()
  }

  getSubscriptionHistoryList(){
      this.service.showSpinner()
      this.service.getApi(`university/get-subscription-list-from-cart?page=0&pageSize=10&representativeId=${this.accountData.representativeDetailsId}&paymentStatus=PAID`,1).subscribe((res:any) => {
          console.log('res---->',res)
          if(res.body.status == 200){
              this.subscriptionList = res.body.data.resultList.content
          }
          this.service.hideSpinner()
      })
  }

}