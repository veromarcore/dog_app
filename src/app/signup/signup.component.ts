import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  signup_error: any;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  //initial object form
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
    })
  }

  signUp(){
    this.http.get<any>("http://localhost:3000/signupUsers") //get all users
    .subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email ===this.signupForm.value.email //check if user already exist
      });
      if(user){
        this.signup_error=true;
      }
      else{
        //in case user doesn't exist then save the new user
        this.signup_error=false;
        this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value). 
        subscribe(
          res =>{
            alert("Signup Succesful");
            
            this.signupForm.reset();
            this.router.navigate(['login']); //change rout to login page to test new user
        }, err=>{
          alert("Signup Error");
        })
      }
    }, err=>{
      alert("Signup Error");
    })
  }

}
