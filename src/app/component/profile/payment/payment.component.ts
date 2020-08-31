import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  accountData: any;
  paymentForm: FormGroup;
  submitted: boolean = false;
  amount: any;
  responseMessage: any;
  globalSubscriptionId: any;
  countryList: any = [];
  stateList: any = [];

  constructor(private service: ServicesService, private activateRoute: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.initializeForm()
    window.scroll(0, 0)
    this.activateRoute.queryParams.subscribe((res: any) => {
      if (res) {
        this.amount = Number(res.amount)
        this.globalSubscriptionId = res.id
        console.log("res-->", this.amount)
      }
    })
    this.accountData = JSON.parse(localStorage.getItem('myProfile'))
    this.accountData.imageUrl = this.accountData.imageUrl ? this.accountData.imageUrl : 'assets/images/pick-1.png';
  }

  initializeForm() {
    this.paymentForm = new FormGroup({
        nubmer: new FormControl(null, [Validators.required, Validators.pattern(/^\d{16}$/)]),
        cvv: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}$/)]),
        date: new FormControl(null, [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]),
        name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]),
        address1 : new FormControl(null,[Validators.required]),
        address2 : new FormControl(null,[Validators.required]),
        zipcode : new FormControl(null,[Validators.required]),
        city : new FormControl(null,[Validators.required]),
        state : new FormControl('',[Validators.required]),
        country : new FormControl('',[Validators.required]),
    })

    this.service.getCountryStates().subscribe((res: any) => {
       this.countryList = res
    })
  }

  getState(event){
      var States = []
      States = this.countryList.filter((res) => res.country === event.target.value)
      this.stateList = States[0].states;
  }

  proceed() {
      this.submitted = true
      if (this.paymentForm.invalid) {
        return false
      }

      this.service.showSpinner();

      let paymentDto = {
            "address1": this.paymentForm.value.address1,
            "address2": this.paymentForm.value.address2,
            "amount": this.amount,
            "cardId": "string",
            "city": this.paymentForm.value.city,
            "country": this.paymentForm.value.country,
            "currency": "USD",
            "customer": this.paymentForm.value.name,
            "cvc": this.paymentForm.value.cvv,
            "email": this.accountData.email,
            "representativeID": this.accountData.representativeDetailsId,
            "exp_month": this.paymentForm.value.date.split('/')[0],
            "exp_year": this.paymentForm.value.date.split('/')[1],
            "nubmer": this.paymentForm.value.nubmer,
            "formId": 0,
            "state":  this.paymentForm.value.state,
            "universityId": 0,
            "zipcode": this.paymentForm.value.zipcode
        }

      this.service.postApi(`stripe/payment/charge`,paymentDto,1).subscribe((res :any ) => {
          this.responseMessage = res.body;
          this.service.hideSpinner()

          if(res.body.status == 200){          
            this.responseMessage.message = "Payment successful"
          }
          else{
            this.responseMessage.message = "Payment Got failed"
          }
          $('#paymentSuccess').modal('show')
      },(error :any) => {
          this.service.hideSpinner()
          this.responseMessage.message = error.body
          $('#paymentSuccess').modal('show')
      })
  }

  addToCartSubscription(){
    if(this.responseMessage.status == 200){
      let paymentStatus = this.responseMessage.status == 200 ? 'PAID' : 'PENDING';
      let transactionId = this.responseMessage.data.txnId ;
      let representativeID = this.accountData.representativeDetailsId ;
      let subscriptionId = this.globalSubscriptionId ;
      this.service.postApi(`university/make-payment?addCartToSubscriptionId=${subscriptionId}&paymentStatus=${paymentStatus}&representativeId=${representativeID}&transactionId=${transactionId}`,{},1).subscribe((res:any) => {
        console.log("res-->>",res)
          this.responseMessage = res.body
          $('#subscriptionSuccess').modal('show')
      })
    }
  }

  checkStatus(){
      this.router.navigateByUrl('subscription-history')
  }
}
