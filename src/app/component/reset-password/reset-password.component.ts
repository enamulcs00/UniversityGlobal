import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
declare var $ : any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup;
  responseMessage: any;
  token : any;
  constructor(private activateRoute:ActivatedRoute,private service:ServicesService) { }

  ngOnInit() {
    this.initializeform()
    this.activateRoute.queryParams.subscribe((query :any) => {
      if(query.token){
        console.log('token--->>',query.token)
        this.token = query.token
        // this.verifyEmail(query.token)
      }
    });
  }

  initializeform(){
    this.resetPasswordForm = new FormGroup({
      password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      cnfmpassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    })
  }

  verifyEmail(token){
      this.service.showSpinner()
      this.service.getApi(`account/verify-user?token=${token}`,2).subscribe((res:any) => {
        console.log("verify mail res--->",res)
        this.service.hideSpinner()
        this.responseMessage = res.body.message
        $('#verifyEmail').modal('show')
      },error => {
        this.service.hideSpinner()
      })
  }

  changePassword(){
    let resetPasswordDto = {
      "password": this.resetPasswordForm.value.password,
      "token": this.token
    }
    this.service.postApi(`account/reset-password`,resetPasswordDto,1).subscribe((res:any) => {
      console.log('res-->>',res)
      this.responseMessage = res.body.message
      $('#resetPassword').modal('show');
    })
  }

}
