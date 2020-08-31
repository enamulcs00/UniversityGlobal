import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.css']
})
export class Section3Component implements OnInit {

  section3Form:FormGroup
  submitted:boolean = false;
  countryList:any = []
  stateList:any = []
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom,CountryISO.India];
  validPhoneNo:Boolean = true
  validContactNo:Boolean = true;
  validHomeTelephoneNo:Boolean = true;
  validHome1TelephoneNo:Boolean = true;
  responseMessage :any = ""
  section1Data: any;
  section2Data: any;

  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit() {
    this.initializeForm()  
    window.scrollTo(0, 0);
  }


  changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  phoneValidOrNot(){
    let key = this.section3Form.controls['telephoneNo'].errors
    if(key){
      if(key['validatePhoneNumber']){
        this.validPhoneNo = key['validatePhoneNumber'].valid
      }else{
        this.validPhoneNo = true
      }
    }else{
      this.validPhoneNo = true
    }
  }

  contactValidOrNot(){
    let key = this.section3Form.controls['contactPhoneNo'].errors
    if(key){
      if(key['validatePhoneNumber']){
        this.validContactNo = key['validatePhoneNumber'].valid
      }else{
        this.validContactNo = true
      }
    }else{
      this.validContactNo = true
    }
  }

  homeTelephoneValidOrNot(){
    let key = this.section3Form.controls['homeTelephoneNo'].errors
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

  homeTelephone1ValidOrNot(){
    let key = this.section3Form.controls['homeTelephoneNo1'].errors
    if(key){
      if(key['validatePhoneNumber']){
        this.validHome1TelephoneNo = key['validatePhoneNumber'].valid
      }else{
        this.validHome1TelephoneNo = true
      }
    }else{
      this.validHome1TelephoneNo = true
    }
  }

  initializeForm() {
    this.section3Form = new FormGroup({
      "country" : new FormControl('',Validators.required),
      "state" : new FormControl('',Validators.required),
      "address" : new FormControl('',Validators.required),
      "zipCode" : new FormControl('',Validators.required),
      "telephoneNo" : new FormControl('',Validators.required),
      "contactPhoneNo" : new FormControl('',Validators.required),
      "email" : new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      "checkForHomeAddress" : new FormControl(false,Validators.required),
      "homeAddress" : new FormControl('',Validators.required),
      "homeTelephoneNo" : new FormControl('',Validators.required),
      "homeTelephoneNo1" : new FormControl('',Validators.required),
      "homeEmail" : new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
    })
    this.service.getCountryStates().subscribe((res: any) => {
      this.countryList = res
      if(localStorage.getItem('section3')){
        let section3Data = JSON.parse(localStorage.getItem('section3'))
        var States = []
        States = this.countryList.filter((res) => res.country == section3Data.country)
        this.stateList = States[0].states;
        this.section3Form.setValue({
          "country" : section3Data.country ,
          "state" : section3Data.state ,
          "address" : section3Data.address ,
          "zipCode" : section3Data.zipCode ,
          "telephoneNo" : section3Data.telephoneNo ,
          "contactPhoneNo" : section3Data.contactPhoneNo ,
          "email" : section3Data.email ,
          "checkForHomeAddress" : section3Data.checkForHomeAddress ,
          "homeAddress" : section3Data.homeAddress ,
          "homeTelephoneNo" : section3Data.homeTelephoneNo ,
          "homeTelephoneNo1" : section3Data.homeTelephoneNo1 ,
          "homeEmail" : section3Data.homeEmail ,
        })
      }
    })
  }

  getState(event){
    this.section3Form.patchValue({
      state : ''
    })
    var States = []
    States = this.countryList.filter((res) => res.country === event.target.value)
    this.stateList = States[0].states;
  }

  checkForAddress(event){
    console.log("-->",event.srcElement.checked)
    if(event.srcElement.checked){
      this.section3Form.patchValue({
        homeAddress : this.section3Form.value.address + ',' + this.section3Form.value.state + ',' + this.section3Form.value.country + ',' + this.section3Form.value.zipCode,
        homeTelephoneNo : this.section3Form.value.telephoneNo,
        homeTelephoneNo1 : this.section3Form.value.contactPhoneNo,
        homeEmail : this.section3Form.value.email,
      })
    }else{
      this.section3Form.patchValue({
        homeAddress : '',
        homeTelephoneNo : '',
        homeTelephoneNo1 : '',
        homeEmail : ''
      })
    }
  }

  saveAndQuit(){
    this.submitted = true;
    if(this.section3Form.invalid){
      return false
    }
    console.log("form value -->>",this.section3Form.value)
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.fillForm()
  }

  continue(){
    this.submitted = true;
    if(this.section3Form.invalid){
      return false
    }
    localStorage.setItem('section3',JSON.stringify(this.section3Form.value))
    this.router.navigateByUrl('section4');
  }

  fillForm(){
    let formDetailsDto = {
      "aboutReference1": "",
      "aboutReference2": "",
      "academicQualificationFormDto": [
      ],
      "address": this.section3Form.value.address,
      "addressForMba": "",
      "applicationStatus": "CONDITIONAL_OFFER",
      "applyForExternalFunding": true,
      "applyForExternalFundingDescription": "",
      "areResponsibleForWorkingWithBudgets": true,
      "areUNativeOfEnglishSpeakingCountry": true,
      "arehavecreativetalent": true,
      "awardedDate": "",
      "briefDuties": "",
      "coOrdinatingTeam": "",
      "contactEmail": this.section3Form.value.email,
      "country": this.section3Form.value.country,
      "countryOfBirth": this.section2Data.CountryOfBirth,
      "courseCountry": this.section1Data.countryName,
      "courseEnddate": "",
      "courseId": this.section1Data.courseId,
      "courseName": this.section1Data.searchCourse,
      "courseSttartDate": this.section1Data.courseStartDate,
      "criminalDescription": this.section2Data.criminalConviction,
      "currentEmployment": "",
      "dateAppointed": "",
      "dateTaken": "",
      "dates": "",
      "description": this.section2Data.descriptionForDisablity,
      "descriptionForMba": "",
      "disability": this.section2Data.disability == 'true' ? true: false,
      "doUHaveprofessionalQualification": true,
      "doUoyRequireVisatoStudtInTheUk": this.section2Data.requireVisaForUK  == 'true'? true : false,
      "doYouCurrentlyHaveFundingForYourChosenProgrammeofStudy": true,
      "dob": this.section2Data.dateOfBirth + 'T00:00:00.000Z',
      "email": this.section2Data.email,
      "emailForMba": "",
      "employerName": "",
      "employersName": "",
      "ethenticity": this.section2Data.ethnicity,
      "formFillStatus": "INCOMPLETE",
      "formId": 0,
      "forname": this.section2Data.foreName,
      "gender": this.section2Data.gender,
      "graduateWorkExperience": 0,
      "grossAnnualSalary": 0,
      "homeAddress": this.section3Form.value.homeAddress,
      "homeEmail":  this.section3Form.value.homeEmail,
      "homeTeliphoneNo": this.section3Form.value.homeTelephoneNo ? Object.keys(this.section3Form.value.homeTelephoneNo).length != 0 ? this.section3Form.value.homeTelephoneNo.internationalNumber: this.section3Form.value.homeTelephoneNo : "null",
      "homeTeliphoneNo2": this.section3Form.value.homeTelephoneNo1 ? Object.keys(this.section3Form.value.homeTelephoneNo1).length != 0 ? this.section3Form.value.homeTelephoneNo1.internationalNumber: this.section3Form.value.homeTelephoneNo1 : "null",
      "ifNoThenAddAboutRecentEnglishLanguage": "",
      "ifNoThenAddHighestEnglishQualification": "",
      "ifYesSelectCountryForSpeakingCountry": "",
      "ifYesThenAddProfessionalQualification": "",
      "indivisualBandScore1": 0,
      "indivisualBandScore2": 0,
      "indivisualBandScore3": 0,
      "indivisualBandScore4": 0,
      "intakeNotApply": "",
      "isPersionalStatementFeel": true,
      "isresponsibility": true,
      "jobTitle": "",
      "managementWorkExperience": 0,
      "matchingUniversityDto": [
      ],
      "meetingFinancial": "",
      "multiCulturalAxposure": "",
      "natureofEmployersBusiness": "",
      "operationaActivities": "",
      "overallResult": "",
      "overallResultForEnglishQualification": "",
      "pageFillNumber": "section3",
      "passportNumber": this.section2Data.passportNumber,
      "permanentResidenceCountry": this.section2Data.permanentResidenceCountry,
      "persionalDescription": "",
      "personalStatementDescription": "",
      "pgtJobTitle": "",
      "phoneNo": 0,
      "preferredName": this.section2Data.prefferedName,
      "primarilyAchieves": "",
      "processesOrTechnology": "",
      "professionalBodyMembership": "",
      "professionalQualificationSubject": "",
      "qualificationTitle": "",
      "referee1Address": "",
      "referee1Email": "",
      "referee1Name": "",
      "referee1TelephoneNumber": 0,
      "referee1Title": "",
      "referee2Address": "",
      "referee2Email": "",
      "referee2Name": "",
      "referee2TelephoneNumber": 0,
      "referee2Title": "",
      "relevantCriminalConvictions": this.section2Data.criminalConviction == "true" ? true  : false,
      "representativeId": JSON.parse(localStorage.getItem('myProfile')).representativeDetailsId,
      "representativeName": JSON.parse(localStorage.getItem('myProfile')).representativeName,
      "representativeEmail": JSON.parse(localStorage.getItem('myProfile')).email,
      "requireSpecificTechnical": "",
      "researchProposalDescription": "",
      "researchProposalForPGR": true,
      "researchProposalForPGRDescription": "",
      "responsibleForManageProject": true,
      "responsibleFordeployCreativetalent": true,
      "resultType": "",
      "selectCountry": "",
      "sirName": this.section2Data.surName,
      "solveProblemsAndDeliverResults": "",
      "state": this.section3Form.value.state,
      "technicalResponsibility": true,
      "telephoneNo": this.section3Form.value.telephoneNo ? (Object.keys(this.section3Form.value.telephoneNo).length != 0 ? this.section3Form.value.telephoneNo.internationalNumber: this.section3Form.value.telephoneNo) : 'null',
      "telephoneNumber": this.section3Form.value.contactPhoneNo ? (Object.keys(this.section3Form.value.contactPhoneNo).length != 0 ? this.section3Form.value.contactPhoneNo.internationalNumber: this.section3Form.value.contactPhoneNo) : "null",
      "title": this.section2Data.title,
      "totalWorkExperience": 0,
      "typeOfEnglishQualification": "",
      "universityId": 0,
      "urlCv": "",
      "urlDegree": "",
      "urlDocuments": "",
      "urlEnglishLanguageCertificate": "",
      "urlResearchProposal": "",
      "urlStatement": "",
      "urlTranscript": "",
      "urlpersonalStatement": "",
      "wishtoApplyForUniversityFunding": true,
      "wishtoApplyForUniversityFundingDescription": "",
      "wishtoApplyForUniversityscholarship": true,
      "wishtoApplyForUniversityscholarshipDescription": "",
      "zipcode": this.section3Form.value.zipCode
    }
    this.service.showSpinner()
    let url = `course/form-fill-up-as-a-user`;
    if(localStorage.getItem('formId')){
      url  = `course/update-form`
      formDetailsDto.formId = JSON.parse(localStorage.getItem('formId'));
    }
    console.log('url--->',url)
    this.service.postApi(url,formDetailsDto,1).subscribe((res:any) => {
      console.log("res-->",res)
      this.service.hideSpinner()
      localStorage.removeItem('section1')
      $('#exampleModalCenter').modal('show')
    })
  }
}