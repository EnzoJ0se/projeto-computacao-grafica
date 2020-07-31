import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RadarGraphModule } from 'src/app/components/radar-graph/radar-graph.module';

const routes: Routes = [
  {
      "path": "",
      "component": HomePageComponent
  }
];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    RouterModule,
    RadarGraphModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class HomePageModule { }
