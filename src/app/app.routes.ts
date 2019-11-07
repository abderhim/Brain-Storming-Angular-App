import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login.component';
import { HomeComponentt } from './home/home.componentt';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  { path: "login", component: LoginComponent },
  { path: "projects", component: HomeComponentt },
  
  { path: "graph", component: GraphComponent },

];
