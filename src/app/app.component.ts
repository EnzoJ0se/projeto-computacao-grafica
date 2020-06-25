import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('radarArea', { static: false }) radar: ElementRef;

  title = 'projeto-computacao-grafica';

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.radar.nativeElement.style);

    }, 800);
  }
}
