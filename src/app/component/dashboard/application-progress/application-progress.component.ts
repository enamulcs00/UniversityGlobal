import { ServicesService } from '../../../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-progress',
  templateUrl: './application-progress.component.html',
  styleUrls: ['./application-progress.component.css']
})
export class ApplicationProgressComponent implements OnInit {
  subscriptionList:  any = [];
  accountData: any;
  formId: any;


  constructor(private service:ServicesService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.accountData = JSON.parse(localStorage.getItem('myProfile'))
    this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
    this.getApplicationProgress()
  }

  getApplicationProgress(){
    this.service.showSpinner()
    this.service.getApi(`course/get-application-status-for-progress-view`,1).subscribe((res:any) => {
        console.log('res---->',res)
        if(res.body.status == 200){
            this.subscriptionList = res.body.data.resultList.content
        }
        this.service.hideSpinner()
    })
}

}
