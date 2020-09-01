import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';
var $:any
@Component({
  selector: 'app-find-university',
  templateUrl: './find-university.component.html',
  styleUrls: ['./find-university.component.css']
})
export class FindUniversityComponent implements OnInit {


  favoriteList:any = []
  allCoursefavoriteList:any = []
  removeId: any;
  accountDetails:any
  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit() {
    this.accountDetails = JSON.parse(localStorage.getItem('myProfile'))
    this.getFavouriteList()
  }

  getFavouriteList(){
    this.favoriteList = []
    this.service.showSpinner()
    this.service.getApi(`course/v1.1/web/get-all-favourate-course-for-particular-user?page=0&pagesize=10&representativeId=${this.accountDetails.representativeDetailsId}`,1).subscribe((res:any) => {
      console.log('res-->',res)      
      if(res.body.status == 200){
        res.body.data.FavourateCourses.content.forEach(ele => {
          this.getCourseDetails(ele)
        });
      }
      this.service.hideSpinner()
    })
  }

  getCourseDetails(id){
    this.service.showSpinner()
    this.service.getApi(`course/v1.1/web/view-specific-course?id=${id.courseId}`,1).subscribe((res : any) => {
      if(res.body.status == 200){
        this.favoriteList.push(Object.assign(id, res.body.data.course))
        this.allCoursefavoriteList.push(Object.assign(id, res.body.data.course))
        console.log("course list -->>",this.favoriteList)
      }
      this.service.hideSpinner()
    })
  }

  removeCourse(id){
    this.removeId = id
    $('#deleteModal').modal('show')
    console.log('id-->',id)
    // http://182.72.203.244:2001/course/v1.1/web/remove-from-course-favourates-list?courseId=1&universityId=1   
  }

  confirmDelete(){
    this.service.showSpinner()
    $('#deleteModal').modal('hide');
    this.service.postApi(`course/v1.1/web/remove-from-course-favourates-list?courseId=${this.removeId.courseId}&representativeId=${this.accountDetails.representativeDetailsId}`,{},1).subscribe((res:any) => {
      console.log("res-->",res)
      this.getFavouriteList()
    })
  }

  searchCourse(event){
    // console.log('event-->',this.favoriteList.filter(x =>  x.courseName == event.target.value))
    // this.favoriteList = this.allCoursefavoriteList.filter(x =>  x.courseName == event.target.value)
  }

  applyNow(id){
    let section1_Object = {
      "searchCourse": id.courseName,
      "countryName": "",
      "startYear": "",
      "startMonth": "",
      "courseDuration":id.courseDuration,
      "yearIntake":"",
      "courseId": id.courseId,
      "courseStartDate": "",
    }
    console.log("section1 -->",section1_Object)
    localStorage.setItem('section1',JSON.stringify(section1_Object))
    this.router.navigateByUrl('section1')
  }
}
