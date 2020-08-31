import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-section15',
  templateUrl: './section15.component.html',
  styleUrls: ['./section15.component.css']
})
export class Section15Component implements OnInit {

  section15Form :FormGroup
  submitted:Boolean = false
 

  constructor(private router:Router,private service:ServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeForm()
  }
  

  initializeForm(){
    this.section15Form = new FormGroup({
        "fullTimeManagerialExperience" : new FormControl(null,Validators.required),
        "totalExperience" : new FormControl(null,Validators.required),
        "involmentInStrategicPlanning" : new FormControl(null,Validators.required),      
        "coordinatingInTeam" : new FormControl(null,Validators.required),
        "meetingFinancialTargets": new FormControl(null,Validators.required),
        "requirementForWorkActivities" : new FormControl(null,Validators.required),
        "responsibilityForImprovingPerfomance" : new FormControl(null,Validators.required),
        "primarilyResultsThroughInfluencing" : new FormControl(null,Validators.required),
        "experienceOfInternallyWorking" : new FormControl(null,Validators.required),
    })
    if(localStorage.getItem('section14')){
        let section15Data = JSON.parse(localStorage.getItem('section14'))
        this.section15Form.setValue({
            "fullTimeManagerialExperience" :  section15Data.fullTimeManagerialExperience,
            "totalExperience" :  section15Data.totalExperience,
            "involmentInStrategicPlanning" :  section15Data.involmentInStrategicPlanning,
            "coordinatingInTeam" :  section15Data.coordinatingInTeam,
            "meetingFinancialTargets":  section15Data.meetingFinancialTargets,
            "requirementForWorkActivities" :  section15Data.requirementForWorkActivities,
            "responsibilityForImprovingPerfomance" :  section15Data.responsibilityForImprovingPerfomance,
            "primarilyResultsThroughInfluencing" :  section15Data.primarilyResultsThroughInfluencing,
            "experienceOfInternallyWorking" :  section15Data.experienceOfInternallyWorking,
        })
    }
  }


  preview(){
    this.submitted = true
    if(this.section15Form.invalid){
      return false
    }
    localStorage.setItem('section14',JSON.stringify(this.section15Form.value))
    this.router.navigateByUrl('application-form-preview')
  }

}