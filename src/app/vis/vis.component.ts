import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { PopoverModule, PopoverConfig, PopoverDirective } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { AlertsService } from 'angular-alert-module';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NotifierService } from 'angular-notifier';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var vis:any;

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  @ViewChild("pop") popOver: any;
  public network: any;
  textareausername: string;
	

   treeData = {
    
 
  };
  constructor(private http: HttpClient,public toastr: ToastrManager,notifierService: NotifierService, private elementRef: ElementRef, private router: Router, private route: ActivatedRoute,private dialog :MatDialog, private modalService: ModalDialogService, private viewRef: ViewContainerRef) {

   


    this.route.queryParams.subscribe(params => {


      this.textareausername = params["username"];


    });
    

   }


  ngOnInit() {
   
    if (this.textareausername == undefined) {
      this.router.navigate(["login"]);
    } 
    this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionts').subscribe(
      data => {
       
     
    
        
        // create an array with edges
  
      //  console.log(Object.values(data));
      for (var i = 0; i < Object.values(data).length; i++) {
     var opt1 = document.createElement("option");
     var s1 = <HTMLSelectElement>document.getElementById('s1');
      var person = data[i];
      console.log(person._id);
      opt1.value = person._id;
      opt1.text = person.name;
      s1.add(opt1,null);
     // nodes.push({id:person._id,label:person.name,title:'An Employee'});

      }});
      this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects').subscribe(
        data => {
         
         
          
          
          // create an array with edges
    
        //  console.log(Object.values(data));
        for (var i = 0; i < Object.values(data).length; i++) {
          var opt2 = document.createElement("option");
          var s2 = <HTMLSelectElement>document.getElementById('s2');
          var person = data[i];
          console.log(person._id);
          opt2.value = person._id;
          opt2.text = person.name;
          s2.add(opt2,null);
       
        } });

  this.getTreeData();

   
  }

  loadVisTree(treedata) {
    var options = {
      interaction: {
        hover: true,
      },
      manipulation: {
				enabled: true
      },
      edges:{
        arrows: {
          to:     {enabled: true, scaleFactor:1, type:'arrow'},
          middle: {enabled: false, scaleFactor:1, type:'arrow'},
          from:   {enabled: true, scaleFactor:1, type:'arrow'}
        }}
    };
    var container = this.networkContainer.nativeElement;
    this.network = new vis.Network(container, treedata, options);
    var that = this;
    this.network.on("hoverNode", function (params) {      
      //popOver.nativeElement.show();
     // that.popOver.show();
      console.log('hoverNode Event:', params);
    });
    this.network.on("blurNode", function(params){
      console.log('blurNode event:', params);
     // that.popOver.hide();
    });
    this.network.on("hoverEdge", function (params) {      
      //popOver.nativeElement.show();
     // that.popOver.show();
      //console.log('hoverEdge Event:', params);
      console.log('nodes:',params);
     
      

    });
    this.network.on("blurEdge", function(params){
      console.log('blurEdge event:', params);
      that.popOver.hide();
    });

  }

  getTreeData() {
// create an array with nodes

this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionts').subscribe(
      data => {
       
        var nodes =[
         
        ];
         

          
        
        // create an array with edges
  
      //  console.log(Object.values(data));
      for (var i = 0; i < Object.values(data).length; i++) {
     var opt1 = document.createElement("option");
     var s1 = <HTMLSelectElement>document.getElementById('s1');
      var person = data[i];
      console.log(person._id);
      opt1.value = person._id;
      opt1.text = person.name;
    //  s1.add(opt1,null);
      nodes.push({id:person._id,label:person.name,title:'An Employee'});

      }

      this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/projects').subscribe(
      data => {
       
       
        
        
        // create an array with edges
  
      //  console.log(Object.values(data));
      for (var i = 0; i < Object.values(data).length; i++) {
        var opt2 = document.createElement("option");
        var s2 = <HTMLSelectElement>document.getElementById('s2');
        var person = data[i];
        console.log(person._id);
        opt2.value = person._id;
        opt2.text = person.name;
       // s2.add(opt2,null);
      nodes.push({id:person._id,label:person.name,title:'A project', color: "yellow"});
      } });
     
       

      
      this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionedgests').subscribe(
        data2 => {
         
          var edges = [
             
          ];
          // create an array with edges
        
        //  console.log(Object.values(data));
        for (var i = 0; i < Object.values(data2).length; i++) {
          var person = data2[i];
          console.log(person._id);
        edges.push({from:person._from,to:person._to});
        }
  console.log(edges);
  console.log(nodes);

  this.treeData={
    nodes:nodes,
   edges:edges
  }

  this.loadVisTree(this.treeData);
      });
      
      
      
    });

  }


  addEdgetest(){ 
    
    var s1 = (<HTMLSelectElement>document.getElementById('s1')).value;
  
    var s2 = (<HTMLSelectElement>document.getElementById('s2')).value;
    
    this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionedgests'
    ).subscribe(
      data => {
        var test = 0;
        for (var i = 0; i < Object.values(data).length; i++) {

          var person = data[i];
          if((s1==person._from && s2==person._to) ||( s2==person._from && s1==person._to) ){
          test =  1;

          }
          

        }
        if(test == 1){
          console.log("edge existed");
      //    this.alertService.danger('edge exist already ');
      //this.notifier.notify( 'success', 'edge exist already !' );
    //  this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    this.toastr.errorToastr('edge exist already !', 'Oops!',{
      position: "bottom-left"
  });


        }else{
          this.http.get('http://localhost:8529/_db/_system/dgr/createedgebyname/myFoxxCollectionedgests/'+encodeURIComponent(s1)+'/'+encodeURIComponent(s2)).subscribe(
            data2 => {});
            this.toastr.successToastr(' edge added', 'success',{
              position: "bottom-left"
          });

            this.getTreeData();
        }



        


      });
    
  


  }

  deleteEdgetest(){ 
    
    var s1 = (<HTMLSelectElement>document.getElementById('s1')).value;
  
    var s2 = (<HTMLSelectElement>document.getElementById('s2')).value;

    this.http.get('http://localhost:8529/_db/_system/dgr/getdocumentsbycollectionname/myFoxxCollectionedgests'
    ).subscribe(
      data => {
        var test = 0;
        for (var i = 0; i < Object.values(data).length; i++) {

          var person = data[i];
          if((s1==person._from && s2==person._to) ||( s2==person._from && s1==person._to) ){
          test =  1;

          }
          

        }

        if(test == 1){
          this.http.get('http://localhost:8529/_db/_system/dgr/removeedge/myFoxxCollectionedgests/'+encodeURIComponent(s1)+'/'+encodeURIComponent(s2)).subscribe(
            data2 => {});
            this.toastr.successToastr(' edge deleted', 'success',{
              position: "bottom-left"
          });

            this.getTreeData();

        }else{
       //   this.alertService.danger('edge does not exist ');
       this.toastr.errorToastr('edge does not exist!', 'Oops!',{
        position: "bottom-left"
    });


          console.log("edge does not exist");
        }
      });
    


  }

  logout() {
    this.http.get('http://localhost:8529/_db/_system/auth/logout').subscribe(
      data => {
        console.log(data);

        this.router.navigate(["login"]);
      }



    );

  }

  home(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
  
        "username":  this.textareausername
  
      }
    };
    this.router.navigate(["home"],navigationExtras);


  }
}