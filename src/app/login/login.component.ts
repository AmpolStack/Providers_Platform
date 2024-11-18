import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;
  public buttonInvalid : boolean = true;
  public areNoValid? : boolean; 
  public textError : string = '';

  constructor(private http : UserApiService,private fb : FormBuilder, private router : Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });

    this.loginForm.statusChanges.subscribe(x =>{
      if(x == 'VALID'){
        this.buttonInvalid = false;
      }
      else{
        this.buttonInvalid = true
      }
    })
  
  }

  onClick() : void{
    this.sendSoli();
  }
  
  hasErrors(tagName : string, validation : string){
    return this.loginForm.get(tagName)?.hasError(validation) && this.loginForm.get(tagName)?.touched;
  }


  clearValues(){
    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');
  }


  sendSoli(){
    this.http.logInWithCredentials({email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value}).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.textError = err['error']
    });

  }
}
