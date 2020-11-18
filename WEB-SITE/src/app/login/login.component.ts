import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  onSubmit() {
    console.warn(this.loginForm.value);
    if((this.loginForm.value.email == "meerky@example.fr")&&(this.loginForm.value.password == "jepue") ) {
      console.warn("exact");
    }
  }

}
