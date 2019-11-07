import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var vis:any;

@Component({
  selector: 'app-vistimeline-groups',
  templateUrl: './vistimeline-groups.component.html',
  styleUrls: ['./vistimeline-groups.component.css']
})
export class VistimelineGroupsComponent implements OnInit {


  @ViewChild("timeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  groups: any;
  options: {};

  constructor() { 
      this.getTimelineData();
      this.getTimelineGroups();
      this.getOptions();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {     
    this.tlContainer = this.timelineContainer.nativeElement;       
    this.timeline = new vis.Timeline(this.tlContainer, null, this.options);      
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);

  }

  getTimelineGroups() {
     // create groups
    this.groups = new vis.DataSet([
      {id: 1, content: 'Truck&nbsp;1'},
      {id: 2, content: 'Truck&nbsp;2'},
      {id: 3, content: 'Truck&nbsp;3'},
      {id: 4, content: 'Truck&nbsp;4'}
    ]);
    }

  getTimelineData() {
      // Create a DataSet (allows two way data-binding)
    // create items
    this.data = new vis.DataSet();
    var count = 100;
    var order = 1;
    var truck = 1;
    var max : any = 0.02;

    // create 4 truck groups, then order inside each group
    for (var j = 0; j < 4; j++) {
      var date = new Date();
      for (var i = 0; i < count/4; i++) {
        
        date.setHours(date.getHours() +  4 * Math.random());
        var start = new Date(date);

        date.setHours(date.getHours() + 2 + Math.floor(Math.random()*4));
        var end = new Date(date);

        this.data.add({
          id: order,
          group: truck,
          start: start,
          end: end,
          content: 'Order ' + order
        });

        order++;
      }
      truck++;
    }          
  }

  getOptions() {
     // specify options
    this.options = {
      stack: false,
      start: new Date(),
      end: new Date(1000*60*60*24 + (new Date()).valueOf()),
      editable: true,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'top'
    };
  }

}