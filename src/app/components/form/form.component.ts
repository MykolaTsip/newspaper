import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formLogin: FormGroup;
  viewForm: boolean;
  tokens: object;

  constructor(private userService: UserService) {
    this.formLogin = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }, this.validateFormPass.bind(this));

  }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.viewForm = false;
    } else {
      this.viewForm = true;
    }
  }

  validateFormPass(form: FormGroup): null | object {
    const {value: password} = form.controls.password;

    return password.length > 4 && password.length < 6 ? null : {lengthErr: true};
  }


  login(formLogin: FormGroup): void {

    const {value: login} = formLogin.controls.login;
    const {value: password} = formLogin.controls.password;
    const user = {login, password};

    this.userService.login(user)
      .subscribe(value => {
        if (typeof value === 'object') {
          this.tokens = value;
          localStorage.setItem('token', JSON.stringify(this.tokens));
          this.viewForm = false;
        }
      });
  }

  exit(): void {
    this.userService.exit()
      .subscribe(value => {
        if (typeof value === 'number') {
          this.viewForm = true;
          localStorage.removeItem('token');
        }
      });
  }
}
