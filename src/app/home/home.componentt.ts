import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { UUID } from 'angular2-uuid';
import * as socketIo from 'socket.io-client';
import { GridOptions } from 'ag-grid-community';
import { AlertsService } from 'angular-alert-module';
import { NavigationExtras, Router, ActivatedRoute } from "@angular/router";
import {MatDialog, matDialogAnimations} from '@angular/material';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import {MatSelectModule} from '@angular/material/select';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.componentt.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponentt implements OnInit, AfterViewInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'sass-no-theme-project';
  myfoxx = '';
  textareausername: string;
  edge: string;
  node: string;
  keyf: string;
  keyt: string;
  keyedge: string;
  emptykey: string;
  emptyname: " ";
  emptypro: " ";
  collectionname: string;
  keyofnode: string;
  name1: string;
  public isViewable: boolean;
  public deletebutton;
  gridOptions: GridOptions;
  namedev:String;
  proffdev:String;
  obs: any;
  public show: boolean = false;
  public buttonName: any = 'Show';
  private defaultColDef;
  private getRowNodeId;

  private gridApi;
  private gridColumnApi;
  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;

  columnDefs = [
   
    {
      headerName: 'Name', field: 'name', sortable: true, filter: true, resizable: true, editable: true, width: 250, cellClass: "cell-number", cellRenderer: 'agAnimateShowChangeCellRenderer',

    }
  ];





  failed = { "username": null };




  rowData: any;
  rowDataa: any;








  constructor(private http: HttpClient,public toastr: ToastrManager, private alerts: AlertsService, private elementRef: ElementRef, private router: Router, private route: ActivatedRoute,private dialog :MatDialog, private modalService: ModalDialogService, private viewRef: ViewContainerRef) {

    this.route.queryParams.subscribe(params => {


      this.textareausername = params["username"];


    });

    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please add a true collection name</span>';
    this.alerts.setDefaults('timeout', 5);
    this.gridOptions = <GridOptions>{

      columnDefs: this.columnDefs,
      deltaRowDataMode: true,
      getRowNodeId: function (data) {
        // the code is unique, so perfect for the id
        console.log(data._key);
        return data._key;
      },



    };

  }







  ngAfterViewInit(): void {

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E5F7F8';

  }



  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8529/_db/_system/projects/getdocumentsbycollectionname/projects');
    console.log(this.textareausername);
    if (this.textareausername == undefined) {
      this.router.navigate(["login"]);
    } 
  }




  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }










  OnTapp() {

    this.rowData = this.http.get('http://localhost:8529/_db/_system/dgr/createedgebyname/' + this.edge + '/' + this.node + '%2F' + this.keyf + '/' + this.node + '%2F' + this.keyt + '/' + this.keyedge);
    // return this.rowDataa;
    // this.http.put('http://localhost:8529/_db/my_test_db/fvd/createedgebyname/'+this.edge+this.keyf+this.keyt+this.keyedge, {headers:''});

  }




  OnTapp3() {

    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      console.log("heyy");
      console.log(selectedRows);
      var selectedRowsString = "";
      var selectedRowsString2 = "";
      var selectedRowsString3 = "";
      var selectedRowsString4 = " ";
      selectedRows.forEach(function (selectedRow, index) {
        if (index !== 0) {
          selectedRowsString += ", ";
          selectedRowsString2 += ", ";
          selectedRowsString3 += ", ";
          selectedRowsString4 += ", ";
        }
        selectedRowsString3 += selectedRow._key;
        selectedRowsString += selectedRow.name;
        selectedRowsString2 += selectedRow.profession;
        selectedRowsString4 += selectedRow._key;
        console.log(selectedRowsString3);
        console.log(selectedRowsString);
        console.log(selectedRowsString2);
        //  console.log(selectedRowsString4);

      });


      this.rowData = this.http.get('http://localhost:8529/_db/_system/projects/updatebyKeyy/projects/' + selectedRowsString3 + '/' + selectedRowsString );
      // this.rowData = this.http.get('http://localhost:8529/_db/my_test_db/fvd/getdocumentsbycollectionname/myFoxxCollectionts');
    }

    else
      console.log("failed");
  }










  OnTapp4() {
var uuid = UUID.UUID();
var na = "-";
var pr = "-";

    this.rowData = this.http.get('http://localhost:8529/_db/_system/projects/insertbyKey/projects/' + uuid + '/' + "-" );
    // this.http.put('http://localhost:8529/_db/my_test_db/fvd/createedgebyname/'+this.edge+this.keyf+this.keyt+this.keyedge, {headers:''});
    // this.myfoxx=this.collectionname;
    // this.rowData = this.http.get('http://localhost:8529/_db/my_test_db/fvd/getdocumentsbycollectionname/'+this.myfoxx);
    // this.ngOnInit();

    //this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionts').subscribe(
   //   data => {
       
      
        //TODO : no same key on creation , no empty fields
       

    //  for (var i = 0; i < Object.values(data).length; i++) {
    //    var person = data[i];
    ///    console.log(person._key);
    //  if(person._key === this.namedev){
    //    this.alerts.setMessage('there is another Employee with this name ', 'warn');
     //   this.scrambleAndRefreshAll();
     //   this.router.navigate(["home"]);
      //  this.rowData =    this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionts');
    //  }}
 //if (this.namedev===undefined ){
 // this.scrambleAndRefreshAll();
  

  //this.alerts.setMessage('please give a name and a profession ', 'error');


}

    //  else {
    //    this.rowData =  this.http.get('http://localhost:8529/_db/_system/dgr/insertbyKey/myFoxxCollectionts/' + this.namedev + '/' + this.namedev + '/' + this.proffdev);
          
//      }
//  });
//  this.scrambleAndRefreshAll();

 // }

 OnTapp10(){
  let navigationExtras: NavigationExtras = {
    queryParams: {

      "username":  this.textareausername

    }
  };
  this.router.navigate(["home"],navigationExtras);

 }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    const socket = socketIo('http://localhost:4000/');
    socket.on('connect', response => {
      //return this.observer.next(response.data);
      console.log('connected');
    });
    socket.on('insert/update', response => {
      this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects').subscribe(
        data => {


          if (Object.keys(data).length != this.gridOptions.api.getDisplayedRowCount()) {

            this.scrambleAndRefreshAll();

          }
        }



      );

      console.log('update/insert');

      if (response) {
        console.log('new update');
        console.log(response);
        const rownode = this.gridOptions.api.getRowNode(response._key);
        console.log(response.name);
        console.log(response.profession);

        if (response.name === undefined) {

          this.rowData = this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects');
         // this.alerts.setMessage('new row inserted with key : ' + response._key, 'warn');
         this.toastr.successToastr('new row inserted with key : ' + response._key, '');

        }
        //  const data = {_key:response._key , name:response.name ,profession: response.profession};

        rownode.setDataValue("name", response.name);
        rownode.setDataValue("profession", response.profession);
        //    this.rowData = this.http.get('http://localhost:8529/_db/my_test_db/typescript/getdocumentsbycollectionname/myFoxxCollectionts');
       // this.alerts.setMessage(' row updated with key : ' + response._key, 'success');
        // this.notifier.notify( 'success', 'You are awesome! I mean it!', 'THAT_NOTIFICATION_ID' );
        this.toastr.successToastr('row updated with key : ' + response._key, 'success');


        console.log(rownode);

        //  changes.push(response);
        //   observer.next(response);
        //console.log(changes);
        //   return Observable.of(response);


      }
      //  this.socket.on('message', (data: Message) => observer.next(data));

    });

    socket.on('delete', response => {
      console.log('delete');

      if (response) {
        console.log('row deleted');
        console.log(response);
        const rownode = this.gridOptions.api.getRowNode(response._key);
        //  const data = {_key:response._key , name:response.name ,profession: response.profession};
        // rownode.setDataValue( "name",response.name );
        //rownode.setDataValue( "profession",response.profession );
        // this.gridOptions.api.refreshRows(rownode);
        this.rowData = this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects');
        //    this.rowData = this.http.get('http://localhost:8529/_db/my_test_db/typescript/getdocumentsbycollectionname/myFoxxCollectionts');
      //  this.alerts.setMessage(' row deleted with key : ' + response._key, 'error');
      this.toastr.warningToastr('row deleted with key : ' + response._key, '');

        console.log('deleted');

        // console.log(rownode);
        //  changes.push(response);
        //   observer.next(response);
        //console.log(changes);
        //   return Observable.of(response);

      }
      //  this.socket.on('message', (data: Message) => observer.next(data));

    });
    // this.gridApi.setRowData();
  }


  scrambleAndRefreshAll() {
    this.rowData = this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects');
  }

  logout() {
    this.http.get('http://localhost:8529/_db/_system/auth/logout').subscribe(
      data => {
        console.log(data);

        this.router.navigate(["login"]);
      }



    );

  }



  deletejson() {

    if (encodeURIComponent(JSON.stringify(this.gridOptions.api.getSelectedRows())) == "%5B%5D") {

     // this.alerts.setMessage(' please select rows to delete ', 'warn');
     this.toastr.warningToastr('please select rows to delete !', 'Oops!');

    }

    else {
      console.log(encodeURIComponent(JSON.stringify(this.gridOptions.api.getSelectedRows())));
      this.rowData = this.http.get('http://localhost:8529/_db/_system/projects/remove/' + encodeURIComponent(JSON.stringify(this.gridOptions.api.getSelectedRows())));

    }

  }

  graph() {
 
    let navigationExtras: NavigationExtras = {
      queryParams: {
  
        "username":  this.textareausername
  
      }
    };
    this.router.navigate(["graph"],navigationExtras);
  }



}







