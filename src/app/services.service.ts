import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  
constructor(private http:HttpClient,private toastr:ToastrService,private spinner: NgxSpinnerService) { }
  
      baseUrl:string = "http://182.72.203.244:2001/"
      representativeBaseUrl:string = 'http://localhost:4201/';
      url: string = 'http://localhost:3000/send';          //Contact Form URL
  //================ POST API =========================//

  sendMessage(messageContent: any) {
    return this.http.post(this.url,         //For Contact Us Page Becaue It is missing in website
    JSON.stringify(messageContent),
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }
  

      postApi(url, data, Header) {
            let httpOptions;
            if (Header == 1) {
              httpOptions = {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                  "Authorization":"Bearer "+localStorage.getItem('token')
                }),
                observe: 'response'              
              }     
            }
            else {
              httpOptions = {
                headers: new HttpHeaders({
                  "Content-Type": "application/json",
                }),
                observe: 'response'              
              }            
            }
          return this.http.post((this.baseUrl+ url), data, httpOptions)
      }
    
  //================ GET API =========================//    
      getApi(url, isHeader) {
        // console.log("token -->",localStorage.getItem('token'))
          let httpOptions;
          if (isHeader == 1) {
            httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
              }),
              observe: 'response'              
            }     
          }
          else {
            httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
              }),
              observe: 'response'              
            }            
          }
          // console.log("header-->",httpOptions)
          return this.http.get((this.baseUrl + url), httpOptions)
      }
  
  //================ PUT API =========================//
      putApi(url,data:any){
          var headers;
          headers = new HttpHeaders({
              "token": localStorage.getItem('token')
          })
          return this.http.put(this.baseUrl + url,data,headers)
      }
  
  //================ DELETE API =========================//
      deleteApi(url) {
          let headers;
          headers = new HttpHeaders({
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem('token')
          })     
          return this.http.delete(this.baseUrl + url, headers);
      }
  
      //================ SHOW SPINNER =========================//
    showSpinner() {
      this.spinner.show();
    }
      
    //================ HIDE SPINNER =========================//
      hideSpinner() {    
          this.spinner.hide();
      }

      showSuccess(msg) {
          this.toastr.success(msg);
      }
  
      toastErr(msg) {   
          this.toastr.error(msg)
      }

 
  
  //================ HIDE Succes TOASTR =========================//
      getCountryStates(): Observable<any> {
          return this.http.get("./assets/json/countrystateList.json");
        }


    postMethodMultipart(url, data): Observable<any> {
        let headers;
        headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.post(this.baseUrl + url, data, { headers });
      }
}


/*********************************** INTERCEPTOR *****************************************/

@Injectable()
export class HttpModifierInterceptor implements HttpInterceptor {
    constructor(private router: Router, private service: ServicesService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(res => {
            if (res instanceof HttpResponse) {
                if (res.status !== 200) {
                  this.service.hideSpinner()
                    setTimeout(x => {
                    }, 5000);
                }
            }
        }, err => {
            if (err instanceof HttpErrorResponse) {
                if (err.error.status === 401) {
                    localStorage.clear()
                    this.service.hideSpinner()
                    this.router.navigateByUrl('')
                    setTimeout(x => {
                    }, 5000);
                    this.router.navigateByUrl('login');
                } else {
                    localStorage.clear()
                    this.service.hideSpinner()
                    this.router.navigateByUrl('login');
                    setTimeout(x => {
                    }, 500);
                }
            }
        }));

    }
}
