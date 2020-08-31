import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form-preview',
  templateUrl: './application-form-preview.component.html',
  styleUrls: ['./application-form-preview.component.css']
})
export class ApplicationFormPreviewComponent implements OnInit {
  mbaExist: boolean = false;
  executiveMbaExist: boolean = false;
  section1 :any

  constructor(private router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.section1 = JSON.parse(localStorage.getItem('section1'))
    if(JSON.parse(localStorage.getItem('section1')).searchCourse.toLowerCase().includes('mba')){
      this.mbaExist = true;
      if(JSON.parse(localStorage.getItem('section1')).searchCourse.toLowerCase().includes('executive')){
          this.executiveMbaExist = true;
      }
    }
  }


  back(){
    if(this.mbaExist && !this.executiveMbaExist){
      this.router.navigateByUrl('section13')
    }else if(this.executiveMbaExist){
      this.router.navigateByUrl('section14')
    }else{
      this.router.navigateByUrl('section12')
    }
  }
}
