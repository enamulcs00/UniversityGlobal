import { Component } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';
import { ServicesService } from './services.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'univ';
  tokenAvailable : any;
  profileImage:any;
  notificationCount:any = 0;

  constructor(private router:Router,private service:ServicesService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('eventt-->',event.url)
        this.tokenAvailable = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        this.profileImage = JSON.parse(localStorage.getItem('myProfile'))  ? JSON.parse(localStorage.getItem('myProfile')).imageUrl : null
        if(this.tokenAvailable != ''){
          this.getNotification()
        }
      }
    })
  }
  ngOnInit() {    
    /** spinner starts on init */   
  }

  getNotification(){
    this.service.getApi(`course/get-notification-list?page=0&pageSize=100&representativeId=${JSON.parse(localStorage.getItem('myProfile')).representativeDetailsId}`,1).subscribe((res:any) => {
      console.log("res--->>",res)
      if(res.body.status == 200){
        this.notificationCount = res.body.data.countByFormId
      }
    })
  }

  openSocialLink(social) {
    if (social == `youtube`)
      window.open(`https://youtube.com`)
    else if (social == `facebook`)
      window.open(`https://www.facebook.com/universitiesglobal`)
    else if (social == `twitter`)
      window.open(`https://twitter.com/UniversitiesG`)
    else if (social == `linkedin`)
      window.open(`https://in.linkedin.com/`)
    else if (social == `instagram`)
      window.open(`https://www.instagram.com/universitiesglobal/`)
  }
  
  logout(){
    $('#logoutModal').modal('show')
  }

  confirmLogout(){
    $('#logoutModal').modal('hide')
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
