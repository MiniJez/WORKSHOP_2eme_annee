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
    private zone: NgZone
    ){}

  async ngOnInit() {
    console.log(localStorage.getItem("tokenLogin"))
    if (localStorage.getItem("tokenLogin") != null) {
      this.router.navigate(['/map'])
    }
  }

  async getToken(email: any, password: any) {
    var body = { "email": email, "password": password }
    return this.http.post<any>(`https://eclisson.duckdns.org/ConnectedCity/login`, body).toPromise();
  }

  async onSubmit() {
    let myToken = await this.getToken(this.loginForm.value.email, this.loginForm.value.password)
    localStorage.setItem("tokenLogin", myToken.token)
    const navigationDetails: string[] = ['/map'];
    this.router.navigate(navigationDetails)
  }
}
