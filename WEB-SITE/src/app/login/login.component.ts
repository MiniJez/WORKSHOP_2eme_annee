import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService,
    private zone: NgZone,
    ){}

  async getToken(email : any, password : any) {
    var body = { "email": email, "password": password }
    return this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/login`, body).toPromise();
  }

  async onSubmit() {
    console.warn(this.loginForm.value);
    //let myToken = await this.getToken(this.loginForm.value.email, this.loginForm.value.password)
    //if(myToken.token != null){
    if((this.loginForm.value.email == "meerky@example.fr")&&(this.loginForm.value.password == "test") ) {
      //console.warn(myToken);
      const navigationDetails: string[] = ['/map'];
      this.router.navigate(navigationDetails)
    }
  }

}
