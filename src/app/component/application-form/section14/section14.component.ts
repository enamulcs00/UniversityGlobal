import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-section14',
  templateUrl: './section14.component.html',
  styleUrls: ['./section14.component.css']
})
export class Section14Component implements OnInit {

  section14Form:FormGroup;
  submitted:boolean = false

  section1Data :any
  section2Data :any
  section3Data :any
  section4Data :any
  section5Data :any
  section6Data :any
  section7Data :any
  section8Data: any;
  section9Data: any;
  section10Data: any;
  section11Data: any;
  section12Data: any;
  academicQualificationFormDto :any = []

  constructor(private router:Router,private service:ServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeForm()
  }

  initializeForm(){
    this.section14Form = new FormGroup({
      "graduateWorkExperience" : new FormControl(null,Validators.required),
      "totalExperience" : new FormControl(null,Validators.required),
      "autonomyAndResponsibility" : new FormControl(null,Validators.required),
      "technicalExpertKnowledge" : new FormControl(null,Validators.required),
      "contributions" : new FormControl(null,Validators.required),
      "keyDecision" : new FormControl(null,Validators.required),
      "managingProjects" : new FormControl(null,Validators.required),
      "managingBudget" : new FormControl(null,Validators.required),
      "evidenceOfCarrerProgession" : new FormControl(null,Validators.required),
    })
    if(localStorage.getItem('section13')){
      let section14Data = JSON.parse(localStorage.getItem('section13'))
      this.section14Form.setValue({
        "graduateWorkExperience" :  section14Data.graduateWorkExperience,
        "totalExperience" :  section14Data.totalExperience,
        "autonomyAndResponsibility" :  section14Data.autonomyAndResponsibility,
        "technicalExpertKnowledge" :  section14Data.technicalExpertKnowledge,
        "contributions" :  section14Data.contributions,
        "keyDecision" :  section14Data.keyDecision,
        "managingProjects" :  section14Data.managingProjects,
        "managingBudget" :  section14Data.managingBudget,
        "evidenceOfCarrerProgession" :  section14Data.evidenceOfCarrerProgession,
      })
    }
  }

  continue(){
    this.submitted = true
    if(this.section14Form.invalid){
      return false
    }
    this.router.navigateByUrl('application-form-preview')
    localStorage.setItem('section13',JSON.stringify(this.section14Form.value))
  }

}