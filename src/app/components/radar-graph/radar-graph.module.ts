import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RadarGraphComponent } from './radar-graph.component';

const routes: Routes = [
  {
    path: '',
    component: RadarGraphComponent
  }
];

@NgModule({
  declarations: [
    RadarGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RadarGraphComponent
  ],
  providers: [],
})
export class RadarGraphModule { }
