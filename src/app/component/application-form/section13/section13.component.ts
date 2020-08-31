import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-section13',
  templateUrl: './section13.component.html',
  styleUrls: ['./section13.component.css']
})
export class Section13Component implements OnInit {
  fileData: any;
  section13Form:FormGroup;
  submitted :Boolean = false;
  mbaExist :Boolean = false;
  executiveMbaExist :Boolean = false;
  section1Data :any
  section2Data :any
  section3Data :any
  section4Data :any
  section5Data :any
  section6Data :any
  section7Data :any
  section8Data : any;
  section9Data : any;
  section10Data: any;
  section11Data: any;
  academicQualificationFormDto :any = [];

  constructor(private service :ServicesService,private router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeForm()
    if(JSON.parse(localStorage.getItem('section1')).searchCourse.toLowerCase().includes('mba')){
        this.mbaExist = true;
        if(JSON.parse(localStorage.getItem('section1')).searchCourse.toLowerCase().includes('executive')){
            this.executiveMbaExist = true;
        }
    }
  }
  

  initializeForm(){
    this.section13Form = new FormGroup({
      "personalStatement" : new FormControl(null,Validators.required),
      "researchPersonal" : new FormControl(null,Validators.required),
      "cv" : new FormControl(null,Validators.required),
      "transcript" : new FormControl(null,Validators.required),
      "degreeCertificate" : new FormControl(null,Validators.required),
      "englishLanguageCertificate" : new FormControl(null,Validators.required),
      "otherDocument" : new FormControl(null,Validators.required),
      "disclaimer" : new FormControl(null),
      "checkForDisclaimer" : new FormControl(null,Validators.required),
    })
    if(localStorage.getItem('section12')){
      let section12Data = JSON.parse(localStorage.getItem('section12'))
      this.section13Form.setValue({
        "personalStatement" : section12Data.personalStatement,
        "researchPersonal" : section12Data.researchPersonal,
        "cv" : section12Data.cv,
        "transcript" : section12Data.transcript,
        "degreeCertificate" : section12Data.degreeCertificate,
        "englishLanguageCertificate" : section12Data.englishLanguageCertificate,
        "otherDocument" : section12Data.otherDocument,
        "disclaimer" : section12Data.disclaimer,
        "checkForDisclaimer":null
      })
    }
  }


  handleFileInput(event,key) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      this.fileData = event.target.files[0];
      var FileSize = this.fileData.size / 1024 / 1024; // in MB
        if (FileSize > 2) {
            $('#exceedStorage').modal('show')
        }else{
          this.uploadFile(key)
        }
      // if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
      //   var reader = new FileReader()
      //   reader.onload = (e) => {
      //   }
      // }
    }
  }

  uploadFile(key) {
    var formData = new FormData()
    formData.append('file', this.fileData)
    this.section13Form.controls[key].setValue('https://res.cloudinary.com/dmabxaha1/image/upload/v1597384229/gx08xkx1xwunkplmltvi.jpg');
    // this.service.showSpinner()
    // this.service.postMethodMultipart('account/upload-file', formData).subscribe((res) => {
    //   this.section13Form.controls[key].setValue(res.data);
    //   console.log(res.data)
    //   this.service.hideSpinner()
    // })
  }

  saveAndQuit(){
    console.log("save-->",this.section13Form.value)
    this.submitted = true;
    if(this.section13Form.invalid || this.section13Form.value.checkForDisclaimer != true){
      return false
    }    
    // this.fillForm()
  }

  continue(){
    console.log("save-->",this.section13Form.value)
    this.submitted = true;
    if(this.section13Form.invalid || this.section13Form.value.checkForDisclaimer != true){
      return false
    }
    localStorage.setItem('section12',JSON.stringify(this.section13Form.value))
    // if(this.mbaExist &&  !this.executiveMbaExist){
    //   this.router.navigateByUrl('section13')
    // }else{
    //   this.router.navigateByUrl('section14')
    // }
    
    // this.router.navigateByUrl('application-form-preview')
  }
  
  preview(){
    console.log("save-->",this.section13Form.value)
    this.submitted = true;
    if(this.section13Form.invalid || this.section13Form.value.checkForDisclaimer != true){
      return false
    }
    localStorage.setItem('section12',JSON.stringify(this.section13Form.value))
    this.router.navigateByUrl('application-form-preview')
  }


  fillForm(){
    this.section1Data  = JSON.parse(localStorage.getItem('section1'))
    this.section2Data  = JSON.parse(localStorage.getItem('section2'))
    this.section3Data  = JSON.parse(localStorage.getItem('section3'))
    this.section4Data  = JSON.parse(localStorage.getItem('section4'))
    this.section5Data  = JSON.parse(localStorage.getItem('section5'))  // Data not binded as keys not available
    this.section6Data  = JSON.parse(localStorage.getItem('section6'))
    this.section7Data  = JSON.parse(localStorage.getItem('section7'))
    this.section8Data  = JSON.parse(localStorage.getItem('section8'))  // Data not binded as keys not available
    this.section9Data  = JSON.parse(localStorage.getItem('section9'))
    this.section10Data = JSON.parse(localStorage.getItem('section10'))
    this.section11Data = JSON.parse(localStorage.getItem('section11'))
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
      "applyForExternalFunding": this.section9Data.applyForExternalFunding == 'true' ? true:false,
      "applyForExternalFundingDescription": this.section9Data.externalFundingDescription,
      "areResponsibleForWorkingWithBudgets": true,
      "areUNativeOfEnglishSpeakingCountry": this.section5Data.nativeOfEnglishSpeakingCountry == 'true'? true : false,
      "arehavecreativetalent": true,
      "awardedDate": this.section6Data.date + 'T00:00:00.000Z',
      "briefDuties": this.section11Data.briefDuties,
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
      "dateAppointed": this.section11Data.employedFrom,
      "dateTaken": "",
      "dates": "",
      "description": this.section2Data.descriptionForDisablity,
      "descriptionForMba": "",
      "disability": this.section2Data.disability == 'true' ? true: false,
      "doUHaveprofessionalQualification": this.section5Data.professionalQualification == 'true' ? true : false,
      "doUoyRequireVisatoStudtInTheUk": this.section2Data.requireVisaForUK  == 'true'? true : false,
      "doYouCurrentlyHaveFundingForYourChosenProgrammeofStudy": this.section9Data.currentlyFundingForStudy == 'true' ? true :false,
      "dob": this.section2Data.dateOfBirth + 'T00:00:00.000Z',
      "email": this.section2Data.email,
      "emailForMba": "",
      "employerName": this.section11Data.employersBusiness,
      "employersName": this.section11Data.employersName,
      "ethenticity": this.section2Data.ethnicity,
      "formFillStatus": "INCOMPLETE",
      "formId": 0,
      "forname": this.section2Data.foreName,
      "gender": this.section2Data.gender,
      "graduateWorkExperience": 0,
      "grossAnnualSalary": Number(this.section11Data.annualSalary),
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
      "pageFillNumber": "section12",
      "passportNumber": this.section2Data.passportNumber,
      "permanentResidenceCountry": this.section2Data.permanentResidenceCountry,
      "persionalDescription": "",
      "personalStatementDescription": this.section8Data.description,
      "pgtJobTitle": this.section11Data.jobTitle,
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
      "researchProposalForPGR": this.section10Data.researchProposal ? true : false,
      "researchProposalForPGRDescription": this.section10Data.researchProposalDescription,
      "responsibleForManageProject": true,
      "responsibleFordeployCreativetalent": true,
      "resultType": "",
      "selectCountry": this.section1Data.countryName,
      "sirName": this.section2Data.surName,
      "solveProblemsAndDeliverResults": "",
      "state": this.section3Data.state,
      "technicalResponsibility": true,
      "telephoneNo": this.section3Data.telephoneNo ? (Object.keys(this.section3Data.telephoneNo).length != 0 ? this.section3Data.telephoneNo.internationalNumber: this.section3Data.telephoneNo) : 'null',
      "telephoneNumber": this.section3Data.contactPhoneNo ? (Object.keys(this.section3Data.contactPhoneNo).length != 0 ? this.section3Data.contactPhoneNo.internationalNumber: this.section3Data.contactPhoneNo) : "null",
      "title": this.section2Data.title,
      "totalWorkExperience": this.section11Data.totalExperience,
      "typeOfEnglishQualification": this.section5Data.typeOfEnglishQualification,
      "universityId": 0,
      "urlCv": this.section13Form.value.cv,
      "urlDegree": this.section13Form.value.degreeCertificate,
      "urlDocuments": this.section13Form.value.otherDocument,
      "urlEnglishLanguageCertificate": this.section13Form.value.englishLanguageCertificate,
      "urlResearchProposal": this.section13Form.value.researchPersonal,
      "urlStatement": this.section13Form.value.disclaimer,  // disclaimer
      "urlTranscript": this.section13Form.value.transcript,
      "urlpersonalStatement": this.section13Form.value.personalStatement,
      "wishtoApplyForUniversityFunding": this.section9Data.applyForUniversityFunding == 'true' ? true :false,
      "wishtoApplyForUniversityFundingDescription": this.section9Data.universityFundingDescription,
      "wishtoApplyForUniversityscholarship": this.section9Data.wishForUniversityScholarship == 'true' ? true :false,
      "wishtoApplyForUniversityscholarshipDescription": this.section9Data.wishForUniversityScholarshipDescription,
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