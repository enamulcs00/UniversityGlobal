import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
declare var $:any

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  accountData: any;
  userList :any
  deleteId: any;

  constructor(private service:ServicesService) { }

  ngOnInit() {    
    window.scroll(0,0)
    this.accountData = JSON.parse(localStorage.getItem('myProfile'))
    this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
    this.getUserList()
  }

  getUserList(){
    this.userList = []
    this.service.showSpinner()
    this.service.getApi(`account/filter-user-details?roleStatus=REPRESENTATIVE_USER`,1).subscribe((res:any) => {
      if(res.body.status == 200){
        this.userList = res.body.data.list
      }
      this.service.hideSpinner()
      console.log('res-->>',this.userList)
    })
  }

  deleteModal(id){
    this.deleteId = id

    $('#deleteModal').modal('show');
  }

  deleteUser(){
    $('#deleteModal').modal('hide');
    this.service.showSpinner()
    this.service.getApi(`account/delete-user-detail-otherRole?userId=${this.deleteId}`,1).subscribe((res:any) => {
      console.log("res-->>",res)
      if(res.body.status == 200){
        this.getUserList()
      }
      this.service.hideSpinner()
    })
  }

}
