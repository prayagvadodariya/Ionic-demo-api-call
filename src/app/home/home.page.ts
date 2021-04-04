import { Component } from '@angular/core';
import { Constant } from '../services/constant';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Router } from '@angular/router';  
import { environment } from '../../environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  authForm: FormGroup;
  result: any = [];
 
  
  constructor( public constant: Constant, public service: ApiService,private googlePlus: GooglePlus, public fb: FormBuilder, private router: Router) {
    
    this.FormValtion();
  }

  FormValtion() {
    this.authForm = this.fb.group({
      userName: ['', Validators.compose([ Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

 

 Apicall() {  
  let dic={};
  dic["userName"] = this.authForm.value.userName;
  dic["password"] = this.authForm.value.password;
  dic["deviceType"] = 'Android';
  dic["i_version_id"] = parseFloat(this.constant.APP_VERSION);
  // dic["deviceIp"]=111;
  // dic["deviceToken"] = 1234567891

  this.constant.LoadingPresent();
  console.log("before", dic);
  this.service.GetLoginPageApi(dic).subscribe((data) => {
    this.constant.LoadingHide();
    this.router.navigate(['next']);
    this.result = data;
    this.constant.publishSomeData(dic);
    console.log("Api Data", );
    localStorage.setItem("token", this.result.data.user_data.v_access_token);
    // this.menu.enable(true);
  
  }, error => {
    this.constant.LoadingHide();
    this.constant.Logout(error);
  });
  }
 
  doGoogleLogin(){
    console.log("googlelogin");
    
    this.constant.LoadingPresent();
    this.googlePlus.login({
      'webClientId': '401245627689-4ceut94d75nmslud8un0lafphp6mm6ph.apps.googleusercontent.com',
      // 'webClientId': '124018728460-sv8cqhnnmnf0jeqbnd0apqbnu6egkhug.apps.googleusercontent.com',
      'offline': true
      // 'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      // 'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      // 'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
    .then(user =>{
      this.constant.LoadingHide();
  
      localStorage.setItem('google_user', user)
        console.log("google_user", user);
        
        this.router.navigate(["/next"]);
     
      
      
    }, err =>{
      console.log("ERROR",err)
      this.constant.LoadingHide();
    });
  
  }

}