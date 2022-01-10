import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) { }

  //default init object form
  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  //login subbit function
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers") //json server location
    .subscribe(res=>{
      const user= res.find((a:any)=>{ //check user
        return a.email ===this.loginForm.value.email && a.password ===this.loginForm.value.password 
      });
      if(user){
        alert("Welcome");
        this.loginForm.reset();
        this.router.navigate(['home'])
      }
      else{
        alert("user/password not found");
      }
    }, err=>{
      alert("Login Error");
    })
  }

}
