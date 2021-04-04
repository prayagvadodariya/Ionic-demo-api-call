import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Constant } from '../services/constant';

@Component({
  selector: 'app-next',
  templateUrl: './next.page.html',
  styleUrls: ['./next.page.scss'],
})
export class NextPage implements OnInit {
  result: any = [];
  userlist: any ;

  constructor(private router: Router, public constant: Constant, public service: ApiService) { 
    this.getUser();
  }

  ngOnInit() {
  }


  getUser(){
    this.constant.LoadingPresent();
    this.service.GetDataApi().subscribe((data) => {
      this.constant.LoadingHide();
      this.userlist = data;
      this.result = this.userlist.data;
      console.log("Api Data", this.result);
    
    }, error => {
      this.constant.LoadingHide();
      this.constant.Logout(error);
    });
  }

  LogOut(){
    this.router.navigate(['home']);
    localStorage.removeItem("token");
  }
  NextPage(){
    this.router.navigate(['infinite-scroll']);
  }
}
