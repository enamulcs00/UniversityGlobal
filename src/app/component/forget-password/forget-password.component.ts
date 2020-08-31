import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
declare var $ : any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  loginForm: FormGroup
  constructor(private service:ServicesService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      "email": new FormControl("", Validators.compose([Validators.required, Validators.maxLength(60), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]))
    })
  }

  forgotPassword() {
    this.service.showSpinner()
    let url = this.service.representativeBaseUrl +'reset-password'
    let object = {
      "webUrl": url,
      "email": this.loginForm.value.email
    }
    console.log('object', object)
    this.service.getApi(`account/forget-password?email=${this.loginForm.value.email}&webUrl=${url}`, 0).subscribe((res:any) => {
      if (res.status == 200) {
        this.service.hideSpinner();
        $('#verifyEmail').modal('show');
      } else {
        this.service.hideSpinner()
        this.service.toastErr(res.status)
      }
    }, error => {
      this.service.hideSpinner()
      this.service.toastErr(error.status)
    })
  }
}
