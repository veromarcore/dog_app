import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.component.html',
  styleUrls: ['./breed-detail.component.css']
})
export class BreedDetailComponent implements OnInit {
  sub_breed_list = [] as  any;
  sub_breed_obj = [] as  any;
  selected_images = [] as  any;
  sub_breed_name: any;
  selected_sub_breed: any;
  selected_sub_breed_id: any;
  url='';
  url_patch='';
  selected_message: any;
  user_data: any;

  //httpclient to get the data from the api and router to change pages with parameter
  constructor(private http : HttpClient, private router: Router) { }
  
  //function to pass the selected subbreed to the modal
  subBreedDetail (item: any, breed: any){
    this.selected_sub_breed=breed;
    this.selected_images=item.images;
  }


  ngOnInit(): void {
    //parameters from the home page
    this.selected_message=false;
    this.sub_breed_name=history.state.name; //name of the main breed
    this.sub_breed_list=history.state.data; //list of the sub breeds
    this.user_data=history.state.user_data; //user login data and favorite dog data

    //some dogs doesn't have sub breed so this if change the url so we still be able to get images
    if(this.sub_breed_list.length>0){
      //cicle to get images for each sub breed
      for(var i = 0; i < this.sub_breed_list.length; i++){
        this.url="https://dog.ceo/api/breed/"+this.sub_breed_name+"/"+this.sub_breed_list[i]+"/images";
        this.http.get<any>(this.url) //get dog image
        .subscribe(res=>{
            //object displayed in the template 
            this.sub_breed_obj.push({'images':res.message ,'thumnail':res.message[0] });
            
        }, err=>{
          alert("Get Data Error");
        })
        
      }
    }
    else{
      //url with only the main dog breed in case there isn't sub breed
      this.url="https://dog.ceo/api/breed/"+this.sub_breed_name+"/images";
      //push the main breed into the array
      this.sub_breed_list.push(this.sub_breed_name);
      this.http.get<any>(this.url) //get dog image
      .subscribe(res=>{
          //object displayed in the template 
          this.sub_breed_obj.push({'images':res.message ,'thumnail':res.message[0] });
          
      }, err=>{
        alert("Get Data Error");
      })
    }
    
  }

  //home page route with user parameters
  goHome(){
    this.router.navigate(['home'],{state: {data: this.user_data}})
  }


      

  //Select favorite dog function
  setFavorite(){
    this.url_patch="http://localhost:3000/signupUsers/"+ this.user_data.id; //json server link + user id
    this.user_data.favorite_image=this.selected_images[0]; //image to get saved
    this.user_data.favorite_name=this.selected_sub_breed; //favorite name to get saved

    //patch function 
    this.http.patch<any>(this.url_patch, {'favorite_name': this.selected_sub_breed , 'favorite_image' : this.selected_images[0]}). 
    subscribe(
      res =>{
        this.selected_message=true;

    }, err=>{
      alert("Signup Error");
    })
  }


}
