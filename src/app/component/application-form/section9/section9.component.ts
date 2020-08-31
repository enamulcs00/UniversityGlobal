import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
declare var $:any;
@Component({
  selector: 'app-section9',
  templateUrl: './section9.component.html',
  styleUrls: ['./section9.component.css']
})
export class Section9Component implements OnInit {

  section9Form : FormGroup;
  submitted:boolean = false;
  description : any = '';
  section1Data :any
  section2Data :any
  section3Data :any
  section4Data :any
  section5Data :any
  section6Data :any
  section7Data :any
  section8Data: any;
  academicQualificationFormDto :any = []

  constructor(private router:Router,private service:ServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeForm()
  }
  

  initializeForm(){
    this.section9Form = new FormGroup({
      "currentlyFundingForStudy" : new FormControl(null,Validators.required),
      "applyForExternalFunding" : new FormControl(null,Validators.required),
      "externalFundingDescription" : new FormControl(''),
      "applyForUniversityFunding" : new FormControl(null,Validators.required),
      "universityFundingDescription" : new FormControl(''),
      "wishForUniversityScholarship" : new FormControl(null,Validators.required),
      "wishForUniversityScholarshipDescription" : new FormControl('')
    })
    if(localStorage.getItem('section9')){
      let section9Data = JSON.parse(localStorage.getItem('section9'));
      console.log("sextion-->",section9Data)
      this.section9Form.patchValue({
        "currentlyFundingForStudy" : section9Data.currentlyFundingForStudy,
        "applyForExternalFunding" : section9Data.applyForExternalFunding,
        "externalFundingDescription" : section9Data.externalFundingDescription,
        "applyForUniversityFunding" : section9Data.applyForUniversityFunding,
        "universityFundingDescription" : section9Data.universityFundingDescription,
        "wishForUniversityScholarship" : section9Data.wishForUniversityScholarship,
        "wishForUniversityScholarshipDescription" : section9Data.wishForUniversityScholarshipDescription,
      })
    }
  }

  saveAndQuit(){
    this.submitted = true
    console.log('--->>>',this.section9Form.value)
    if(this.section9Form.invalid){
      return false;
    }
    this.fillForm()
  }

  continue(){
    this.submitted = true
    if(this.section9Form.invalid){
      return false;
    }
    console.log('--->>>',this.section9Form.value)
    localStorage.setItem('section9',JSON.stringify(this.section9Form.value))
    this.router.navigateByUrl('section10');
  }

  change(event){
    // if(event.target.value == 'YES'){
    //   this.section9Form.controls["externalFundingDescription"].setValidators(Validators.required);
    // }
  }
  
  fillForm(){
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    this.section4Data = JSON.parse(localStorage.getItem('section4'))
    this.section5Data = JSON.parse(localStorage.getItem('section5'))  // Data not binded as keys not available
    this.section6Data = JSON.parse(localStorage.getItem('section6'))
    this.section7Data = JSON.parse(localStorage.getItem('section7'))
    this.section8Data = JSON.parse(localStorage.getItem('section8'))  // Data not binded as keys not available
    this.section4Data.qualificationArr.forEach(element => {
      this.academicQualificationFormDto.push( {
        "academicQualifications": element.qualification,
        "achieved": this.section4Data.achieved,
        "countryOfStudy": element.country,
        "enddate": element.endDate,
        "highestAcademicQualification": this.section4Data.stateHighestQualification,
        "instituteName": element.institutionName,
        "resultType": element.resultGrade,
        "startDate": element.startDate + 'T00:00:00.000Z',
        "subject1": element.subject1,
        "subject1grade1": element.subject1Grade,
        "subject1grade2": element.subject2,
        "subject2": element.subject2Grade,
        "value": 0
      })
    });
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    this.section4Data = JSON.parse(localStorage.getItem('section4'))
    this.section5Data = JSON.parse(localStorage.getItem('section5'))  // Data not binded as keys not available
    this.section6Data = JSON.parse(localStorage.getItem('section6'))
    this.section7Data = JSON.parse(localStorage.getItem('section7'))
    this.section4Data.qualificationArr.forEach(element => {
      this.academicQualificationFormDto.push( {
        "academicQualifications": element.qualification,
        "achieved": this.section4Data.achieved,
        "countryOfStudy": element.country,
        "enddate": element.endDate,
        "highestAcademicQualification": this.section4Data.stateHighestQualification,
        "instituteName": element.institutionName,
        "resultType": element.resultGrade,
        "startDate": element.startDate + 'T00:00:00.000Z',
        "subject1": element.subject1,
        "subject1grade1": element.subject1Grade,
        "subject1grade2": element.subject2,
        "subject2": element.subject2Grade,
        "value": 0
      })
    });
    let formDetailsDto = {
      "aboutReference1": this.section7Data.refree1Description,
      "aboutReference2": this.section7Data.refree2Description,
      "academicQualificationFormDto": this.academicQualificationFormDto,
      "address": this.section3Data.address,
      "addressForMba": "",
      "applicationStatus": "CONDITIONAL_OFFER",
      "applyForExternalFunding": this.section9Form.value.applyForExternalFunding == 'true' ? true:false,
      "applyForExternalFundingDescription": this.section9Form.value.externalFundingDescription,
      "areResponsibleForWorkingWithBudgets": true,
      "areUNativeOfEnglishSpeakingCountry": this.section5Data.nativeOfEnglishSpeakingCountry == 'true'? true : false,
      "arehavecreativetalent": true,
      "awardedDate": this.section6Data.date + 'T00:00:00.000Z',
      "briefDuties": "",
      "coOrdinatingTeam": "",
      "contactEmail": this.section3Data.email,
      "country": this.section3Data.country,
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
      "doUHaveprofessionalQualification": this.section5Data.professionalQualification == 'true' ? true : false,
      "doUoyRequireVisatoStudtInTheUk": this.section2Data.requireVisaForUK  == 'true'? true : false,
      "doYouCurrentlyHaveFundingForYourChosenProgrammeofStudy": this.section9Form.value.currentlyFundingForStudy == 'true' ? true :false,
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
      "homeAddress": this.section3Data.homeAddress,
      "homeEmail":  this.section3Data.homeEmail,
      "homeTeliphoneNo": this.section3Data.homeTelephoneNo ? Object.keys(this.section3Data.homeTelephoneNo).length != 0 ? this.section3Data.homeTelephoneNo.internationalNumber: this.section3Data.homeTelephoneNo : "null",
      "homeTeliphoneNo2": this.section3Data.homeTelephoneNo1 ? Object.keys(this.section3Data.homeTelephoneNo1).length != 0 ? this.section3Data.homeTelephoneNo1.internationalNumber: this.section3Data.homeTelephoneNo1 : "null",
      "ifNoThenAddAboutRecentEnglishLanguage": this.section5Data.englishLanguageTestDetails,
      "ifNoThenAddHighestEnglishQualification": this.section5Data.highestAcedemicQualification,
      "ifYesSelectCountryForSpeakingCountry": this.section5Data.nativeEnglishSpeakingCountryName,
      "ifYesThenAddProfessionalQualification": this.section5Data.englishQualificationName,
      "indivisualBandScore1": this.section5Data.englishQualificationScore1,
      "indivisualBandScore2": this.section5Data.englishQualificationScore2,
      "indivisualBandScore3": this.section5Data.englishQualificationScore3,
      "indivisualBandScore4": this.section5Data.englishQualificationScore4,
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
      "overallResultForEnglishQualification": this.section5Data.overallResult,
      "pageFillNumber": "section9",
      "passportNumber": this.section2Data.passportNumber,
      "permanentResidenceCountry": this.section2Data.permanentResidenceCountry,
      "persionalDescription": "",
      "personalStatementDescription": this.section8Data.description,
      "pgtJobTitle": "",
      "phoneNo": 0,
      "preferredName": this.section2Data.prefferedName,
      "primarilyAchieves": "",
      "processesOrTechnology": "",
      "professionalBodyMembership": this.section6Data.proffessionalBody,
      "professionalQualificationSubject": this.section6Data.subject,
      "qualificationTitle": this.section6Data.title,
      "referee1Address": this.section7Data.refree1address,
      "referee1Name": this.section7Data.refree1name,
      "referee1TelephoneNumber": this.section7Data.refree1phoneNumber ? Object.keys(this.section7Data.refree1phoneNumber).length != 0 ? this.section7Data.refree1phoneNumber.internationalNumber: this.section7Data.refree1phoneNumber : "null",
      "referee1Title": this.section7Data.refree1title,
      "referee2Address": this.section7Data.refree2address,
      "referee2Name":  this.section7Data.refree2name,
      "referee2TelephoneNumber":  this.section7Data.refree2phoneNumber ? Object.keys(this.section7Data.refree2phoneNumber).length != 0 ? this.section7Data.refree2phoneNumber.internationalNumber: this.section7Data.refree2phoneNumber : "null",
      "referee2Title": this.section7Data.refree2title,
      "referee1Email": this.section7Data.refree1email,
      "referee2Email": this.section7Data.refree2email,
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
      "state": this.section3Data.state,
      "technicalResponsibility": true,
      "telephoneNo": this.section3Data.telephoneNo ? (Object.keys(this.section3Data.telephoneNo).length != 0 ? this.section3Data.telephoneNo.internationalNumber: this.section3Data.telephoneNo) : 'null',
      "telephoneNumber": this.section3Data.contactPhoneNo ? (Object.keys(this.section3Data.contactPhoneNo).length != 0 ? this.section3Data.contactPhoneNo.internationalNumber: this.section3Data.contactPhoneNo) : "null",
      "title": this.section2Data.title,
      "totalWorkExperience": 0,
      "typeOfEnglishQualification": this.section5Data.typeOfEnglishQualification,
      "universityId": 0,
      "urlCv": "",
      "urlDegree": "",
      "urlDocuments": "",
      "urlEnglishLanguageCertificate": "",
      "urlResearchProposal": "",
      "urlStatement": "",
      "urlTranscript": "",
      "urlpersonalStatement": "",
      "wishtoApplyForUniversityFunding": this.section9Form.value.applyForUniversityFunding == 'true' ? true :false,
      "wishtoApplyForUniversityFundingDescription": this.section9Form.value.universityFundingDescription,
      "wishtoApplyForUniversityscholarship": this.section9Form.value.wishForUniversityScholarship == 'true' ? true :false,
      "wishtoApplyForUniversityscholarshipDescription": this.section9Form.value.wishForUniversityScholarshipDescription,
      "zipcode": this.section3Data.zipCode
    }
    console.log("form--->",formDetailsDto)
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