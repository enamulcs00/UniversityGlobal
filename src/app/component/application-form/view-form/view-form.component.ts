import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute } from '@angular/router';
declare var kendo: any;

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  formData :any;
  qualificationArr: any = [];
  accountDeatails: any;
  mbaExist: boolean = false;
  executiveMbaExist: boolean = false;
  
  constructor(private service:ServicesService,private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activateRoute.params.subscribe((res:any) => {
      if(res.id){
        this.accountDeatails = JSON.parse(localStorage.getItem('myProfile'))
        this.getFormData(res.id)
      }
    })
  }

  getFormData(id){
    this.service.showSpinner()
    this.service.getApi(`course/get-forms-list?page=0&pagesize=10&formId=${id}&repesantativeId=${this.accountDeatails.representativeDetailsId}`,1).subscribe((res:any) => {
      if(res.body.status == 200){
        console.log("res--->>",res.body.data.formdata)
        this.formData = res.body.data.formdata
        if(this.formData.courseName.toLowerCase().includes('mba')){
          this.mbaExist = true;
          if(this.formData.courseName.toLowerCase().includes('executive')){
              this.executiveMbaExist = true;
          }
        }
      }
      this.service.hideSpinner()
    })
  }

  exportPDF(){
    console.log("download")
    kendo.drawing
      .drawDOM("#pdfcontent",
        {
          paperSize: "A5",
          margin: { top: "0.8cm", bottom: "1cm" },
          scale: 0.8,
          height: 500,          
        })
      .then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Exported.pdf")
      });
    
  }

}
