import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { registerUser } from '../models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public generalForm! : FormGroup;
  public areProvider : boolean = false;
  public buttonInvalid : boolean = true;
  public errorMessage : string = '';
  constructor(private form : FormBuilder, private http : UserApiService){}
  ngOnInit(): void {
      this.generalForm = this.form.group({
        UserType : ['client',Validators.required],
        Name : ['', Validators.required],
        Email : ['', [Validators.required, Validators.email]],
        description : [''],
        Address : ['', Validators.required],
        Nit : ['', Validators.required],
        CIIU : ['', Validators.required],
        EntityName : ['', Validators.required],
        Prefix : ['', Validators.required],
        Password : ['', Validators.required],
        RepPassword : ['', Validators.required]
      }
      )
      this.disableSpecifics();
      this.generalForm.get('UserType')?.valueChanges.subscribe(x =>{
        if(x == 'client'){
          this.disableSpecifics();
          this.areProvider = false;
        console.log(x)

        }
        else{
          this.enableSpecifics();
          this.areProvider = true
        }
      });
      this.generalForm.statusChanges.subscribe(x =>{
        if(x == 'INVALID'){
          this.buttonInvalid = true;
        }
        else{
          this.buttonInvalid = false;
        }
      })
  }

  public disableSpecifics(){
    this.generalForm.get('Nit')?.disable();
    this.generalForm.get('CIIU')?.disable();
    this.generalForm.get('EntityName')?.disable();
    this.generalForm.get('Prefix')?.disable();
  }
  public enableSpecifics(){
    this.generalForm.get('Nit')?.enable();
    this.generalForm.get('CIIU')?.enable();
    this.generalForm.get('EntityName')?.enable();
    this.generalForm.get('Prefix')?.enable();
  }

  hasErrors(tagName : string, validation : string){
    return this.generalForm.get(tagName)?.hasError(validation) && this.generalForm.get(tagName)?.touched;
  }

  onClick(){
    if(this.generalForm.get('Password')!.value != this.generalForm.get('RepPassword')!.value){
      this.errorMessage = 'The repeated password is not the same';
    }
    else{
      this.sendRequest(this.convertToRegisterUser());
    }
  }

  public convertToRegisterUser(){
    let registerUser : registerUser = {
      Name : this.generalForm.get('Name')?.value,
      Address : this.generalForm.get('Address')?.value,
      Password : this.generalForm.get('Password')?.value,
      UserType : this.generalForm.get('UserType')?.value,
      Description : this.generalForm.get('description')?.value,
      Email : this.generalForm.get('Email')?.value,
    };

    return registerUser;
  }

  public sendRequest(user : registerUser){
    this.http.CreateUser(user).subscribe({
      next : (res) => console.log(res),
      error : (err) => this.errorMessage = err['error']
    });
  }
  // sendSoli(){
  //   this.http.logInWithCredentials({email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value}).subscribe({
  //     next: (res) => console.log(res),
  //     error: (err) => this.textError = err['error']
  //   });


}
