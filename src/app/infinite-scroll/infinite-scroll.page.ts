import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Constant } from '../services/constant';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {
  result: any = [];
  userlist: any ;
  infiniteScrollEnable: any;
  responseData: any;
  infinitydata: any = [];
  param: any = {};

  constructor(private router: Router, public constant: Constant, public service: ApiService) { 
    this.constant.getObservable().subscribe((data) => {
      console.log('Data received', data);
    });
    this.param.page = 1;
    this.getUser();
  }

  ngOnInit() {
  }

//   ionViewWillEnter(){
//     this.param.userId = this.userData.userId;
//     this.param.hotelId = this.hotelid;
//     this.param.page = 0;
//     this.param.transferedDate = this.invoicedata.transferedDate;
 
//    this.getCategotytList();
//  }

  getUser(){
    // let dic={};
    // dic["page"] = 1;
    // dic["deviceType"] = 'Android';
    // dic["i_version_id"] = parseFloat(this.constant.APP_VERSION);
    this.constant.LoadingPresent();
    this.service.ScrollPageApi(this.param).subscribe((data) => {
      this.constant.LoadingHide();
      this.userlist = data;
      this.result = this.userlist.data;
      console.log("Api Data", this.result);
      if (this.result.length < 20) {
        this.infiniteScrollEnable = false;
      }
      else {
        this.infiniteScrollEnable = true;
      }
    
    }, error => {
      this.constant.LoadingHide();
      this.constant.Logout(error);
    });
  }

  doInfinite(event) {
   
    if (this.result.length > 0) {
      this.param.page++;
    }
    
    // this.constant.LoadingPresent();
    this.service.ScrollPageApi(this.param).subscribe(data => {
        // this.constant.LoadingHide();
        event.target.complete();
        this.infinitydata = data;
          this.responseData = this.infinitydata.data;
          for (var i = 0; i < this.responseData.length; i++) {
            this.result.push(this.responseData[i]);
          }
          if (this.responseData.length < 10) {
            this.infiniteScrollEnable = false;
          }
          else {
            this.infiniteScrollEnable = true;
          }
        }, error => {
          this.constant.LoadingHide();
          this.constant.Logout(error);
        });
  
    // this.getEmployees(true, event);
  }

  BackPage(){
    this.router.navigate(['next']);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.param.page = 1;
      this.getUser();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

}
