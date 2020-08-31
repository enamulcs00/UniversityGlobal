import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchKey : any;
  formId : any;
  fromDate : any;
  toDate : any;
  submittedFormsList : any = [];
  accountDetails: any;

  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit() {
      localStorage.removeItem('section1')
      localStorage.removeItem('section2')
      localStorage.removeItem('section3')
      localStorage.removeItem('section4')
      localStorage.removeItem('section5')
      localStorage.removeItem('section6')
      localStorage.removeItem('section7')
      localStorage.removeItem('section8')
      localStorage.removeItem('section9')
      localStorage.removeItem('section10')
      localStorage.removeItem('section11')
      localStorage.removeItem('section12')
      localStorage.removeItem('section13')
      localStorage.removeItem('section14')
    window.scrollTo(0, 0);
    this.accountDetails = JSON.parse(localStorage.getItem('myProfile'))
   // this.getSubmiitedForms()
  }

  getSubmiitedForms(){
    this.service.showSpinner()
    let url = `course/filter-forms-details?page=0&formFillStatus=COMPLETE&representativeId=${this.accountDetails.representativeDetailsId}`
    if(this.searchKey && this.formId != 'search_by_form_id'){
      url = url + `&search=${this.searchKey}`
    }
    if(this.fromDate){
      url = url + `&fromDate=${this.convertIntoTimeStamp(this.fromDate)}`
    }
    if(this.toDate){
      url = url + `&toDate=${this.convertIntoTimeStamp(this.toDate)}`
    }
    if(this.formId && this.formId != 'search_by_form_id'){
      url = url + `&formId=${this.searchKey}`
    }
    this.service.getApi(url,1).subscribe((res:any) => {
      console.log("res -->",res)
      if(res.body.status == 200){
        this.submittedFormsList = res.body.data.list
        this.service.hideSpinner()
      }
    })
  }

  reset(){
    this.searchKey = undefined
    this.formId = undefined
    this.fromDate = undefined
    this.toDate = undefined
    this.getSubmiitedForms()
  }

  convertIntoTimeStamp(myDate) {
    myDate = myDate.split("-");
    var newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];
    console.log(new Date(newDate).getTime());
    return (new Date(newDate).getTime())
  }

  viewHistory(id){
    this.router.navigateByUrl(`view-form/${id}`)
  }

  applicationProgress(id){
    this.router.navigateByUrl(`application-progress/${id}`)
  }
}
