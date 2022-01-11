import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.css']
})
export class BreedDetailComponent implements OnInit {
  sub_breed_list = [] as  any;
  sub_breed_obj = [] as  any;
  sub_breed_name: any;
  url='';

  constructor(private http : HttpClient) { }
  

  ngOnInit(): void {
    console.log(history.state, history.state.name)
    this.sub_breed_name=history.state.name;
    this.sub_breed_list=history.state.data;
    if(this.sub_breed_list.length>0){
      for(var i = 0; i < this.sub_breed_list.length; i++){
        console.log(this.sub_breed_list[i]);
        this.url="https://dog.ceo/api/breed/"+this.sub_breed_name+"/"+this.sub_breed_list[i]+"/images";
        console.log(this.url);
        this.http.get<any>(this.url) //get dog image
        .subscribe(res=>{
            
            this.sub_breed_obj.push({'images':res.message ,'thumnail':res.message[0] });
            
        }, err=>{
          alert("Login Error");
        })
        
      }
    }
    else{
      this.url="https://dog.ceo/api/breed/"+this.sub_breed_name+"/images";
      console.log(this.url);
      this.sub_breed_list.push(this.sub_breed_name);
      this.http.get<any>(this.url) //get dog image
      .subscribe(res=>{
          
          this.sub_breed_obj.push({'images':res.message ,'thumnail':res.message[0] });
          
      }, err=>{
        alert("Login Error");
      })
    }
    
    console.log(this.sub_breed_obj);
  }


}
