import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormControlName } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.css']
})
export class Section4Component implements OnInit {

  section4Form: FormGroup;
  qualificationArr: FormArray;
  countryList: any = []
  resultTypeList: any = []
  SubjectTypeList: any = []
  academicQualifiationList: any = []
  academicQualificationFormDto: any = []
  submitted: boolean = false
  section1Data: any;
  section2Data: any;
  section3Data: any;
  resultType: any = 'text';


  constructor(private fb: FormBuilder, private service: ServicesService, private router: Router) {
    this.section4Form = this.fb.group({
      stateHighestQualification: new FormControl(null, Validators.required),
      achieved: new FormControl(null, Validators.required),
      qualificationArr: this.fb.array([])
    });

    if (localStorage.getItem('section4')) {
      console.log("--->", localStorage.getItem('section4'))
      let section4Data = JSON.parse(localStorage.getItem('section4'))
      this.section4Form.patchValue({
        stateHighestQualification: section4Data.stateHighestQualification,
        achieved: section4Data.achieved,
      })      
      this.qualificationArr = this.section4Form.get('qualificationArr') as FormArray;
      section4Data.qualificationArr.forEach((element,i) => {
        this.getAcedemicQulification(element.country,i)
        this.qualificationArr.push(this.createCall(element.country, element.qualification, element.resultGrade, element.subject1, element.subject1Grade, element.subject2, element.subject2Grade, element.institutionName, element.startDate, element.endDate))
      });
    } else {
      this.addQualification()
    }
  }

  ngOnInit() {
    this.service.getCountryStates().subscribe((res: any) => {
      this.countryList = res
    })
    window.scrollTo(0, 0);
    this.getAdminData()
  }

  getAdminData(){
    this.service.showSpinner()
    // RESULT TYPE list APi
    this.service.getApi(`course/get-allData-serchByName?page=0&pageSize=1000`,1).subscribe((res:any) => {
      if(res.status == 200){
        this.resultTypeList = res.body.data.allData.content
        console.log("resut -->",this.resultTypeList)
      }
    })
    // SUBJECT MANAGEMENT list api
    this.service.getApi(`course/get-search-all-global-subject-details?page=0&pagesize=1000`,1).subscribe((res:any) => {
      if(res.status){
        this.SubjectTypeList = res.body.data.getAllData.content
        console.log("subject -->",this.SubjectTypeList)
      }
    })
    setTimeout(e => {
      this.service.hideSpinner()
    },3000)
  }

  changeResult(event){
    let data = this.resultTypeList.filter(x => x.resultName == event.target.value)
    this.resultType = data[0].datatype
  }

  getAcedemicQulification(event,index){
    this.service.showSpinner()
    this.service.getApi(`course/get-search-all-global-academic-qualification-details?page=0&pagesize=1000&name=${event}`,1).subscribe((res:any) => {
      this.service.hideSpinner()
      if(res.status == 200){
        this.academicQualifiationList[index] = res.body.data.getDataByName.content
        console.log("eve-->>",this.academicQualifiationList)
      }
    })
  }

  createCall(country, qualification, resultGrade, subject1, subject1Grade, subject2, subject2Grade, institutionName, startDate, endDate): FormGroup {
    return this.fb.group({
      country: new FormControl(country, Validators.required),
      qualification: new FormControl(qualification, Validators.required),
      resultGrade: new FormControl(resultGrade, Validators.required),
      subject1: new FormControl(subject1, Validators.required),
      subject1Grade: new FormControl(subject1Grade, Validators.required),
      subject2: new FormControl(subject2, Validators.required),
      subject2Grade: new FormControl(subject2Grade, Validators.required),
      institutionName: new FormControl(institutionName, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
    });
  }

  addQualification(): void {
    this.qualificationArr = this.section4Form.get('qualificationArr') as FormArray;
    this.qualificationArr.push(this.createCall("", "", "", "", "", "", "","", "", ""));
    console.log("form data-->", this.qualificationArr.value)
  }

  remove(index){
    console.log("index-->>",index)
    this.qualificationArr.removeAt(index);
    // delete this.academicQualifiationList[index]
    this.academicQualifiationList.splice(index,1)
    console.log("-->",this.academicQualifiationList)
  }

  cancel() {
    this.section4Form = this.fb.group({
      qualificationArr: this.fb.array([])
    });
    this.addQualification()
  }

  saveAndQuit() {
    this.submitted = true;
    if (this.section4Form.invalid) {
      return false
    }
    console.log("value-->", this.section4Form.value)
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    this.qualificationArr.value.forEach(element => {
      this.academicQualificationFormDto.push( {
        "academicQualifications": element.qualification,
        "achieved": this.section4Form.value.achieved,
        "countryOfStudy": element.country,
        "enddate": element.endDate,
        "highestAcademicQualification": this.section4Form.value.stateHighestQualification,
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
    console.log("academicQualificationFormDto--->",this.academicQualificationFormDto)
    this.fillForm()
  }

  continue() {
    this.submitted = true;
    if (this.section4Form.invalid) {
      return false
    }
    localStorage.setItem('section4', JSON.stringify(this.section4Form.value))
    this.router.navigateByUrl('section5');
  }

  fillForm(){
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
      "areUNativeOfEnglishSpeakingCountry": true,
      "arehavecreativetalent": true,
      "awardedDate": "",
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
      "homeAddress": this.section3Data.homeAddress,
      "homeEmail":  this.section3Data.homeEmail,
      "homeTeliphoneNo": this.section3Data.homeTelephoneNo ? Object.keys(this.section3Data.homeTelephoneNo).length != 0 ? this.section3Data.homeTelephoneNo.internationalNumber: this.section3Data.homeTelephoneNo : "null",
      "homeTeliphoneNo2": this.section3Data.homeTelephoneNo1 ? Object.keys(this.section3Data.homeTelephoneNo1).length != 0 ? this.section3Data.homeTelephoneNo1.internationalNumber: this.section3Data.homeTelephoneNo1 : "null",
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
      "pageFillNumber": "section4",
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
      "state": this.section3Data.state,
      "technicalResponsibility": true,
      "telephoneNo": this.section3Data.telephoneNo ? (Object.keys(this.section3Data.telephoneNo).length != 0 ? this.section3Data.telephoneNo.internationalNumber: this.section3Data.telephoneNo) : 'null',
      "telephoneNumber": this.section3Data.contactPhoneNo ? (Object.keys(this.section3Data.contactPhoneNo).length != 0 ? this.section3Data.contactPhoneNo.internationalNumber: this.section3Data.contactPhoneNo) : "null",
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