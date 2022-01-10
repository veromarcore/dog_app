import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  //formvalue !: FormGroup;
  url='https://dog.ceo/api/breeds/list/all'; //api list url
  breeds = [] as  any;
  Object = Object; //empty object to iterate over keys

  //get breeds function
  constructor(private http : HttpClient) {
    this.http.get(this.url).toPromise().then(data=>{
      this.breeds=data;
      console.log(data)
    })
   }

  ngOnInit(): void {
  }

}
