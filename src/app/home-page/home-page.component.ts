import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreedDetailComponent } from '../breed-detail/breed-detail.component';
import { Router } from '@angular/router';

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
  breeds_list: any;

  //get breeds function
  constructor(private http : HttpClient, private router: Router) {
    this.http.get(this.url).toPromise().then(data=>{
      this.breeds=data;
      console.log(data)
    })
   }

  ngOnInit(): void {
  }

  subBreed(subbreed: any){
    console.log(this.breeds.message[subbreed]);
    this.breeds_list=this.breeds.message[subbreed];
    this.router.navigate(['detail'], {state: {data: this.breeds_list, name: subbreed}})
   
  }

}
