import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
declare var $:any;
@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.css']
})
export class Section6Component implements OnInit {

  submitted :boolean = false;
  section6Form :FormGroup;
  section1Data:any;
  section2Data:any
  section3Data:any
  section4Data:any
  academicQualificationFormDto:any = []
  section5Data: any;

  constructor(private router:Router,private service:ServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeForm()
  }
  
  initializeForm() {
    this.section6Form = new FormGroup({
      title : new FormControl(null,Validators.required),
      subject : new FormControl(null,Validators.required),
      date : new FormControl(null,Validators.required),
      proffessionalBody : new FormControl(null),
    })
    if(localStorage.getItem('section6')){
      let sectionData  = JSON.parse(localStorage.getItem('section6'))
      this.section6Form.setValue({
        title : sectionData.title,
        subject : sectionData.subject,
        date : sectionData.date,
        proffessionalBody : sectionData.proffessionalBody,
      })
    }
  }

  saveAndQuit() {
    this.submitted = true
    if(this.section6Form.invalid){
      return false
    }
    this.fillForm()
  }

  continue(){
    this.submitted = true
    if(this.section6Form.invalid){
      return false
    }
    localStorage.setItem('section6',JSON.stringify(this.section6Form.value))
    this.router.navigateByUrl('section7')
  }

  fillForm(){
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    this.section4Data = JSON.parse(localStorage.getItem('section4'))
    this.section5Data = JSON.parse(localStorage.getItem('section5'))  // Data not binded as keys not available
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
      "aboutReference1": "",
      "aboutReference2": "",
      "academicQualificationFormDto": this.academicQualificationFormDto,
      "address": this.section3Data.address,
      "addressForMba": "",
      "applicationStatus": "CONDITIONAL_OFFER",
      "applyForExternalFunding": true,
      "applyForExternalFundingDescription": "",
      "areResponsibleForWorkingWithBudgets": true,
      "areUNativeOfEnglishSpeakingCountry": this.section5Data.nativeOfEnglishSpeakingCountry == 'true'? true : false,
      "arehavecreativetalent": true,
      "awardedDate": this.section6Form.value.date + 'T00:00:00.000Z',
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
      "pageFillNumber": "section6",
      "passportNumber": this.section2Data.passportNumber,
      "permanentResidenceCountry": this.section2Data.permanentResidenceCountry,
      "persionalDescription": "",
      "personalStatementDescription": "",
      "pgtJobTitle": "",
      "phoneNo": 0,
      "preferredName": this.section2Data.prefferedName,
      "primarilyAchieves": "",
      "processesOrTechnology": "",
      "professionalBodyMembership": this.section6Form.value.proffessionalBody,
      "professionalQualificationSubject": this.section6Form.value.subject,
      "qualificationTitle": this.section6Form.value.title,
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
      "wishtoApplyForUniversityFunding": true,
      "wishtoApplyForUniversityFundingDescription": "",
      "wishtoApplyForUniversityscholarship": true,
      "wishtoApplyForUniversityscholarshipDescription": "",
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