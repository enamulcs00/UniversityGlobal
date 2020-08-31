import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
declare var $:any
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  countryList : any = [];
  stateList : any = [];
  myProfileForm:FormGroup;
  submitted:boolean = false
  myProfileImage = ''
  fileData: any;
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom,CountryISO.India];
  validHomeTelephoneNo: boolean = true;
  validmobileNumber : boolean = true;
  profiledata: any;
  responseMessage: any = '';

  constructor(private service:ServicesService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.service.getCountryStates().subscribe((res: any) => {
      this.countryList = res
      this.getMyProfile()
    })
    this.initializeForm()
  }

  initializeForm(){
    this.myProfileForm = new FormGroup({
      "firstName" : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]),
      "lastName" : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]),
      "telephoneNumber" : new FormControl('',[Validators.required]),
      "mobileNumber" : new FormControl('',[Validators.required]),
      "businessName" :  new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]),
      "email" : new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      "address1" : new FormControl('',[Validators.required]),
      "address2" : new FormControl('',[Validators.required]),
      "address3" : new FormControl('',[Validators.required]),
      "zipCode" : new FormControl('',[Validators.required]),
      "city" : new FormControl('',[Validators.required]),
      "state" : new FormControl('',[Validators.required]),
      "country" : new FormControl('',[Validators.required]),
    })
  }

  homeTelephoneValidOrNot(){
    let key = this.myProfileForm.controls['telephoneNumber'].errors
    if(key){
      if(key['validatePhoneNumber']){
        this.validHomeTelephoneNo = key['validatePhoneNumber'].valid
      }else{
        this.validHomeTelephoneNo = true
      }
    }else{
      this.validHomeTelephoneNo = true
    }
  }

  contactValidOrNot(){
    let key = this.myProfileForm.controls['mobileNumber'].errors
    if(key){
      if(key['validatePhoneNumber']){
        this.validmobileNumber = key['validatePhoneNumber'].valid
      }else{
        this.validmobileNumber = true
      }
    }else{
      this.validmobileNumber = true
    }
  }

  getState(event){
    // this.section3Form.patchValue({
    //   state : ''
    // })
    if(event){
      var States = []
      States = this.countryList.filter((res) => res.country === event)
      this.stateList = States[0].states;
    }
  }

  getMyProfile() {
    this.service.showSpinner()
    this.service.getApi('account/my-account', 1).subscribe((res:any) => {
      console.log('profileeeee', res)
      if (res.status == 200) {
        this.profiledata = res.body.data
        localStorage.setItem('myProfile',JSON.stringify(res.body.data))
          this.myProfileImage = this.profiledata.imageUrl ? this.profiledata.imageUrl : 'assets/images/pick-1.png';
          this.myProfileForm.patchValue({
            'firstName': this.profiledata.firstName,
            'lastName': this.profiledata.lastName,
            'city': this.profiledata.city,
            'state': this.profiledata.state,
            'businessName': this.profiledata.representativeName,
            'country': this.profiledata.country,
            'address1': this.profiledata.address1,
            'address2': this.profiledata.address2,
            'address3': this.profiledata.address3,
            'email': this.profiledata.email,
            'telephoneNumber': this.profiledata.phoneNo,
            'mobileNumber': this.profiledata.mobileNumber,
            'zipCode': this.profiledata.zipcode
          })
          this.getState(this.profiledata.country)
        }
        this.service.hideSpinner()        
    })
  }

  save(){
    this.submitted = true
    console.log('save-->',this.myProfileForm.value)
    if(this.myProfileForm.invalid){
      return false;
    }
    this.service.showSpinner()
    let object = 
    {
      "address": "string",
      "address1": this.myProfileForm.value.address1,
      "address2": this.myProfileForm.value.address2,
      "address3": this.myProfileForm.value.address3,
      "city": this.myProfileForm.value.city,
      "state": this.myProfileForm.value.state,
      "country": this.myProfileForm.value.country,
      "firstName": this.myProfileForm.value.firstName,
      "lastName": this.myProfileForm.value.lastName,
      "imageUrl": this.myProfileImage ? this.myProfileImage : '',
      "dob": "string",
      "gender": "string",
      "mobileNumber": this.myProfileForm.value.mobileNumber.internationalNumber,
      "phoneNo": this.myProfileForm.value.telephoneNumber.internationalNumber,
      "universityName": "string",
      "zipcode": this.myProfileForm.value.zipCode
    }
    console.log('objectttttt====>>>', object)
    this.service.postApi('account/profile-update', object, 1).subscribe((res :any) => {
      this.service.hideSpinner()
      if(res.status == 200){
        this.responseMessage = res.body.message;
        $('#exampleModalCenter').modal('show')
        this.service.getApi('account/my-account', 1).subscribe((res:any) => {
          console.log('profileeeee', res)
          if (res.status == 200) {
              localStorage.setItem('myProfile',JSON.stringify(res.body.data))
          }
        })
      }
    })
  }

  handleFileInput(event) {
    console.log(event)
    //var self = this;
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        this.fileData = event.target.files[0];
        console.log('this.fileData', this.fileData)
        this.uploadFile()
        var reader = new FileReader()
        reader.onload = (e) => {
        }
      }
    }
  }

  uploadFile() {
   this.service.showSpinner()
    var formData = new FormData()
    formData.append('file', this.fileData)
    this.service.postMethodMultipart('account/upload-file', formData).subscribe((res) => {
      console.log(res)
      this.myProfileImage = res.data
      this.service.hideSpinner()
      console.log('myProfileImage==>>>', this.myProfileImage)
    })

  }
}
