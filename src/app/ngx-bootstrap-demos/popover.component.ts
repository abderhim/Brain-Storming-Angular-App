import { Component, OnInit } from '@angular/core';
//import { PopoverModule, PopoverDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html'  
})
export class PopoverComponent implements OnInit {

  content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

  constructor() { }

  ngOnInit() {
  }

}