import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { AlertsModule } from 'angular-alert-module';
import { LoginComponent } from './home/login.component';
import { ToastrModule } from 'ng6-toastr-notifications';

import { CustomMaterialModule } from './material.module';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {  HomeComponentt } from './home/home.componentt';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import {SelectModule} from 'ng2-select';
import { DemoAlertTimeoutComponent } from '../app/ngx-bootstrap-demos/dismiss-on-timeout';
import { VisComponent } from '../app/vis/vis.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BsDatepickerModule, BsDropdownModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { PopoverComponent } from '../app/ngx-bootstrap-demos/popover.component';
import { VistimelineComponent } from '../app/vistimeline/vistimeline.component';
import { VistimelineGroupsComponent } from '../app/vistimeline-groups/vistimeline-groups.component';	
import { GraphComponent } from './graph.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeComponentt,
    DemoAlertTimeoutComponent,
    VisComponent,
    PopoverComponent,
    VistimelineComponent,
    VistimelineGroupsComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    CustomMaterialModule,
    HttpClientModule,
    FormsModule,
    AlertsModule.forRoot(),
    ModalDialogModule.forRoot(),
    MatSelectModule,
    NgSelectModule,
    SelectModule,
    ReactiveFormsModule,
    CommonModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),	
    NotifierModule.withConfig(customNotifierOptions),
    ToastrModule.forRoot(),


  ],
   bootstrap: [AppComponent]
})

export class AppModule { }

