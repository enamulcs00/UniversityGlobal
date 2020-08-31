import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
declare var $:any

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:FormGroup;
  submitted:boolean = false
  responseMessage:any = ''
  accountData :any

  constructor(private service:ServicesService) { }

  ngOnInit() {
    this.initializeForm()
    window.scroll(0,0)
    this.accountData = JSON.parse(localStorage.getItem('myProfile'))
    this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
  }

  initializeForm(){
    this.passwordForm = new FormGroup({
      'oldPassword': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      'password': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      'cnfrmPassword': new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }

  submit(){
    this.submitted = true
    if(this.passwordForm.invalid){
      return false
    }
    this.service.showSpinner()
    let object={
      "oldPassword"       : this.passwordForm.value.oldPassword,
      "newPassword"       : this.passwordForm.value.password,
      "confirmPassword"   : this.passwordForm.value.cnfrmPassword 
    }

    this.service.postApi('account/change-password',object,1).subscribe((res:any) => {
      this.service.hideSpinner()
      this.responseMessage = res.body.message
      $('#exampleModalCenter').modal('show')
      if(res.body.status == 200){
        console.log('res==>>',res.body)
        this.passwordForm.reset()
      }
    })
  }

}
