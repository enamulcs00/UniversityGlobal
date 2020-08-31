import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
declare var $:any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationList:any = [];
  accountDeatails:any;
  selectedId: any;

  constructor(private service:ServicesService) { }

  ngOnInit() {
    this.accountDeatails = JSON.parse(localStorage.getItem('myProfile'))
    this.getNotification()        
    console.log('------->',this.accountDeatails)
  }
  
  getNotification(){
    this.service.showSpinner()
    this.service.getApi(`course/get-notification-list?page=0&pageSize=100&representativeId=${this.accountDeatails.representativeDetailsId}`,1).subscribe((res:any) => {
      console.log("res--->>",res)
      if(res.body.status == 200){
        this.notificationList = res.body.data.formdata.content
      }
      this.service.hideSpinner()
      this.seen()
    })
  }
  
  seen(){
    this.service.postApi(`course/set-seen-true-notification-list?representativeId=${this.accountDeatails.representativeDetailsId}`,{},1).subscribe((res:any) => {
      console.log("res seen-->>",res)
    })
  }

  deleteModal(item){
    $('#deleteModal').modal('show')
    this.selectedId = item;
  }

  deleteNotification(){
    $('#deleteModal').modal('hide')
    this.service.showSpinner()
    this.service.getApi(`course/delete-notification-particular?notificationId=${this.selectedId.notificationId}&representativeId=${this.accountDeatails.representativeDetailsId}`,1).subscribe((res:any) => {
      console.log("res-->>",res)
      if(res.body.status == 206){
        this.getNotification()
      }
      this.service.hideSpinner()
    })
  }

  clearAll(){
    this.service.showSpinner()
    this.service.getApi(`course/delete-notification-list?representativeId=${this.accountDeatails.representativeDetailsId}`,1).subscribe((res:any) => {
      console.log("res-->",res)
      if(res.body.status == 206){
        this.getNotification()
      }
      this.service.hideSpinner()
    })
  }
}
