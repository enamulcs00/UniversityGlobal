import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-matching-universities',
  templateUrl: './matching-universities.component.html',
  styleUrls: ['./matching-universities.component.css']
})
export class MatchingUniversitiesComponent implements OnInit {

  countryList: any = []
  universityList: any = []
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  countryName: any = ''
  selectall: boolean = false
  section1Data: any
  section2Data: any
  section3Data: any
  section4Data: any
  section5Data: any
  section6Data: any
  section7Data: any
  section8Data: any;
  section9Data: any;
  section10Data: any;
  section11Data: any;
  section12Data: any;
  academicQualificationFormDto: any = []
  section14Data: any;
  section13Data: any;
  matchingDto: any = [];
  constructor(private service: ServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    let country = JSON.parse(localStorage.getItem('section1'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    console.log('section3 -->', (this.section3Data.homeTelephoneNo.e164Number))
    this.service.getCountryStates()
      .subscribe((data) => {
        this.countryList = data
        this.myControl.patchValue(country.countryName)
        this.getUniversity()
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }, (error) => {
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.country.toLowerCase().includes(filterValue));
  }

  selectCountry() {
    // console.log("-->",this.myControl.value)
  }

  reset() {
    this.countryName = '';
  }

  getUniversity() {
    this.service.showSpinner()
    this.countryName = this.myControl.value
    this.service.getApi(`university/v1.1/web/get-university-by-country-for-most-popular-university?country=${this.countryName}&page=0&pageSize=1000`, 2).subscribe((res: any) => {
      console.log("res--->", res)
      this.selectall = false
      this.universityList = []
      this.service.hideSpinner()
      if (res.status == 200 && res.body.data.searchData) {
        res.body.data.searchData.forEach(element => {
          this.universityList.push({
            selected: false,
            ...element
          })
        });
      }
    })
  }

  selectAll(event) {
    this.universityList.forEach(element => {
      element.selected = event.srcElement.checked
    });
  }

  select(event, index) {
    this.universityList[index].selected = event.srcElement.checked
  }

  submit() {
    console.log("-->>", this.universityList)
    this.universityList.forEach(element => {
      if (element.selected) {
        this.matchingDto.push({
          "universityEmail": element.primaryEmail,
          "universityId": element.universityDetailsId,
          "universityName": element.universityName
        })
      }

    });

    // [routerLink]="['/dashboard']"    
    this.fillForm()
  }

  fillForm() {
    this.service.showSpinner()
    this.section1Data = JSON.parse(localStorage.getItem('section1'))
    this.section2Data = JSON.parse(localStorage.getItem('section2'))
    this.section3Data = JSON.parse(localStorage.getItem('section3'))
    this.section4Data = JSON.parse(localStorage.getItem('section4'))
    this.section5Data = JSON.parse(localStorage.getItem('section5'))  // Data not binded as keys not available
    this.section6Data = JSON.parse(localStorage.getItem('section6'))
    this.section7Data = JSON.parse(localStorage.getItem('section7'))
    this.section8Data = JSON.parse(localStorage.getItem('section8'))  // Data not binded as keys not available
    this.section9Data = JSON.parse(localStorage.getItem('section9'))
    this.section10Data = JSON.parse(localStorage.getItem('section10'))
    this.section11Data = JSON.parse(localStorage.getItem('section11'))
    this.section12Data = JSON.parse(localStorage.getItem('section12'))
    this.section13Data = JSON.parse(localStorage.getItem('section13'))
    this.section14Data = JSON.parse(localStorage.getItem('section14'))

    this.section4Data.qualificationArr.forEach(element => {
      this.academicQualificationFormDto.push({
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
      "applicationStatus": "NEW_APPLICATION",
      "applyForExternalFunding": this.section9Data.applyForExternalFunding == 'true' ? true : false,
      "applyForExternalFundingDescription": this.section9Data.externalFundingDescription,
      "areResponsibleForWorkingWithBudgets": true,
      "areUNativeOfEnglishSpeakingCountry": this.section5Data.nativeOfEnglishSpeakingCountry == 'true' ? true : false,
      "arehavecreativetalent": true,
      "awardedDate": this.section6Data.date + 'T00:00:00.000Z',
      "briefDuties": this.section11Data.briefDuties,
      "coOrdinatingTeam": this.section14Data ? this.section14Data.coordinatingInTeam : '',
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
      "disability": this.section2Data.disability == 'true' ? true : false,
      "doUHaveprofessionalQualification": this.section5Data.professionalQualification == 'true' ? true : false,
      "doUoyRequireVisatoStudtInTheUk": this.section2Data.requireVisaForUK == 'true' ? true : false,
      "doYouCurrentlyHaveFundingForYourChosenProgrammeofStudy": this.section9Data.currentlyFundingForStudy == 'true' ? true : false,
      "dob": this.section2Data.dateOfBirth + 'T00:00:00.000Z',
      "email": this.section2Data.email,
      "emailForMba": "",
      "employerName": this.section11Data.employersBusiness,
      "employersName": this.section11Data.employersName,
      "ethenticity": this.section2Data.ethnicity,
      "formFillStatus": "COMPLETE",
      "formId": 0,
      "forname": this.section2Data.foreName,
      "gender": this.section2Data.gender,
      "graduateWorkExperience": this.section13Data ? this.section13Data.graduateWorkExperience : 0,
      "grossAnnualSalary": Number(this.section11Data.annualSalary),
      "homeAddress": this.section3Data.homeAddress,
      "homeEmail": this.section3Data.homeEmail,
      "homeTeliphoneNo": Object.keys(this.section3Data.homeTelephoneNo).length != 0 ? this.section3Data.homeTelephoneNo.internationalNumber : this.section3Data.homeTelephoneNo,
      "homeTeliphoneNo2": Object.keys(this.section3Data.homeTelephoneNo1).length != 0 ? this.section3Data.homeTelephoneNo1.internationalNumber : this.section3Data.homeTelephoneNo1,
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
      "jobTitle": this.section11Data.jobTitle,
      "managementWorkExperience": this.section14Data ? this.section14Data.fullTimeManagerialExperience : '',
      "matchingUniversityDto": this.matchingDto,
      "meetingFinancial": this.section14Data ? this.section14Data.meetingFinancialTargets : '',
      "multiCulturalAxposure": this.section14Data ? this.section14Data.experienceOfInternallyWorking : '',
      "natureofEmployersBusiness": "",
      "operationaActivities": this.section14Data ? this.section14Data.involmentInStrategicPlanning : '',
      "overallResult": "",
      "overallResultForEnglishQualification": this.section5Data.overallResult,
      "pageFillNumber": "matching-universities",
      "passportNumber": this.section2Data.passportNumber,
      "permanentResidenceCountry": this.section2Data.permanentResidenceCountry,
      "persionalDescription": "",
      "personalStatementDescription": this.section8Data.description,
      "pgtJobTitle": this.section11Data.jobTitle,
      "phoneNo": 0,
      "preferredName": this.section2Data.prefferedName,
      "primarilyAchieves": this.section14Data ? this.section14Data.primarilyResultsThroughInfluencing : '',
      "processesOrTechnology": this.section14Data ? this.section14Data.responsibilityForImprovingPerfomance : '',
      "professionalBodyMembership": this.section6Data.proffessionalBody,
      "professionalQualificationSubject": this.section6Data.subject,
      "qualificationTitle": this.section6Data.title,
      "referee1Address": this.section7Data.refree1address,
      "referee1Name": this.section7Data.refree1name,
      "referee1TelephoneNumber": Object.keys(this.section7Data.refree1phoneNumber).length != 0 ? this.section7Data.refree1phoneNumber.internationalNumber : this.section7Data.refree1phoneNumber,
      "referee1Title": this.section7Data.refree1title,
      "referee2Address": this.section7Data.refree2address,
      "referee2Name": this.section7Data.refree2name,
      "referee2TelephoneNumber": Object.keys(this.section7Data.refree2phoneNumber).length != 0 ? this.section7Data.refree2phoneNumber.internationalNumber : this.section7Data.refree2phoneNumber,
      "referee2Title": this.section7Data.refree2title,
      "referee1Email": this.section7Data.refree1email,
      "referee2Email": this.section7Data.refree2email,
      "relevantCriminalConvictions": this.section2Data.criminalConviction == "true" ? true : false,
      "representativeId": JSON.parse(localStorage.getItem('myProfile')).representativeDetailsId,
      "representativeName": JSON.parse(localStorage.getItem('myProfile')).representativeName,
      "representativeEmail": JSON.parse(localStorage.getItem('myProfile')).email,
      "requireSpecificTechnical": this.section13Data ? this.section13Data.evidenceOfCarrerProgession : "",
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
      "telephoneNo": Object.keys(this.section3Data.telephoneNo).length != 0 ? this.section3Data.telephoneNo.internationalNumber : this.section3Data.telephoneNo,
      "telephoneNumber": Object.keys(this.section3Data.contactPhoneNo).length != 0 ? this.section3Data.contactPhoneNo.internationalNumber : this.section3Data.contactPhoneNo,
      "title": this.section2Data.title,
      "totalWorkExperience": this.section11Data.totalExperience,
      "typeOfEnglishQualification": this.section5Data.typeOfEnglishQualification,
      "universityId": 0,
      "urlCv": this.section12Data.cv,
      "urlDegree": this.section12Data.degreeCertificate,
      "urlDocuments": this.section12Data.otherDocument,
      "urlEnglishLanguageCertificate": this.section12Data.englishLanguageCertificate,
      "urlResearchProposal": this.section12Data.researchPersonal,
      "urlStatement": this.section12Data.disclaimer,  // disclaimer
      "urlTranscript": this.section12Data.transcript,
      "urlpersonalStatement": this.section12Data.personalStatement,
      "wishtoApplyForUniversityFunding": this.section9Data.applyForUniversityFunding == 'true' ? true : false,
      "wishtoApplyForUniversityFundingDescription": this.section9Data.universityFundingDescription,
      "wishtoApplyForUniversityscholarship": this.section9Data.wishForUniversityScholarship == 'true' ? true : false,
      "wishtoApplyForUniversityscholarshipDescription": this.section9Data.wishForUniversityScholarshipDescription,
      "zipcode": this.section3Data.zipCode
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
