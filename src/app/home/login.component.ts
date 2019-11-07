import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { UUID } from 'angular2-uuid';
import * as socketIo from 'socket.io-client';
import { GridOptions } from 'ag-grid-community';
import { AlertsService } from 'angular-alert-module';
import { NavigationExtras, Router } from "@angular/router";
import { MatDialog } from '@angular/material'
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  items: any;
  usernametextarea: string;
  passwordtextarea: string;
  success = { "sucess": true };

  constructor(private http: HttpClient,public toastr: ToastrManager, private alerts: AlertsService, private router: Router, private elementRef: ElementRef) {

    this.alerts.setDefaults('timeout', 7);


  }





  ngAfterViewInit(): void {
  }



  ngOnInit() {


  }



  connect() {


    console.log("usernm:  "+this.usernametextarea);
    console.log("pass:   "+this.passwordtextarea);

   

    // console.log(userStr);
    this.http.get('http://localhost:8529/_db/_system/auth/login/' + this.usernametextarea + '/' + this.passwordtextarea).subscribe(
      data => {
        console.log(data);

        if (JSON.stringify(data) === JSON.stringify(this.success)) {
          console.log("succes login")
          this.alerts.setMessage('Configurations saved successfully!', 'success');
          let navigationExtras: NavigationExtras = {
            queryParams: {

              "username": this.usernametextarea

            }
          };
          this.router.navigate(["home"], navigationExtras);
        }



      },

      error => {
        if (this.usernametextarea==undefined || this.passwordtextarea==undefined) {

        //  this.alerts.setMessage('Please enter your Admin username and password', 'error');
          this.toastr.warningToastr('Please enter your Admin username and password !', 'Oops!');

    
        }
else {

  console.log("failed login");
  //this.alerts.setMessage('Please check your Username or Password', 'error');
  this.toastr.errorToastr('Please check your Username or Password !', 'Oops!');


}    
       
      },

    );

  }









}








