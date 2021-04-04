import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { platform } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sessioncheck: any;

  constructor(private router: Router) {
  this.sessioncheck = localStorage.getItem("token");
    if(this.sessioncheck == null){
      this.router.navigate(['home']);
      console.log("session_expire");
      
    }else{
      this.router.navigate(['next']);
      console.log("sessione_continue");
    }
 }
}
