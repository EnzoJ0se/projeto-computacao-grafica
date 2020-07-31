import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Plane} from '../../pages/home-page/helper';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'radar-graph',
    templateUrl: './radar-graph.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RadarGraphComponent implements AfterViewInit {
    @ViewChild('graph', {static: false}) private canvasGraph: ElementRef<HTMLCanvasElement>;

    @Input() planes: Array<Plane> = [];

    public static middlePoint = 300;
    private xCenter = 300;
    private yCenter = 300;
    private graphContext: any;
    private planeImage = new Image();
    private scaleUnit = 30;

    constructor() {
    }

    public ngAfterViewInit() {
        this.graphContext = this.canvasGraph.nativeElement.getContext('2d');
        this.buildGraph();
        this.planeImage.src = './././assets/images/plane.png';
        this.planeImage.style['z-index'] = '1000';

        setTimeout(() => {
            this.renderPlanes();
        }, 100);
    }

    public refreshGraph() {
        this.clearGraph();
        this.buildGraph();

        setTimeout(() => {
            this.renderPlanes();
        }, 100);
    }

    private renderPlanes() {
        for (const plane of this.planes) {
            const realX = ((plane.x * this.scaleUnit) + this.xCenter);
            const realY = ((-(plane.y * this.scaleUnit)) + this.yCenter);

            this.graphContext.translate(realX, realY);
            this.graphContext.rotate((45 * Math.PI / 180.0));

            if (plane.direction) {
                this.graphContext.rotate((-plane.direction * Math.PI / 180.0));
            }

            this.graphContext.translate(-realX, -realY);

            this.graphContext.drawImage(this.planeImage, realX, realY, 15, 15);
            this.graphContext.font = '15px Arial';
            this.graphContext.fillText(plane.id, realX, realY);

            this.graphContext.translate(realX, realY);
            this.graphContext.rotate(-(45 * Math.PI / 180.0));

            if (plane.direction) {
                this.graphContext.rotate(-(-plane.direction * Math.PI / 180.0));
            }

            this.graphContext.translate(-realX, -realY);
        }
    }

    private clearGraph() {
        this.graphContext.clearRect(0, 0, 600, 600);
    }

    private buildGraph() {

        this.graphContext.moveTo(300, 0);
        this.graphContext.lineTo(300, 600);
        this.graphContext.stroke();

        this.graphContext.moveTo(0, 300);
        this.graphContext.lineTo(600, 300);
        this.graphContext.stroke();

        for (let x = 0; x <= 20; x++) {
            this.graphContext.moveTo(x * 30, 300);
            this.graphContext.lineTo(x * 30, 290);
            this.graphContext.stroke();

            this.graphContext.font = '15px Arial';
            this.graphContext.fillText(((-10) + x), (x * 30), 290);

            this.graphContext.moveTo(x * 30, 300);
            this.graphContext.lineTo(x * 30, 310);
            this.graphContext.stroke();
        }

        for (let y = 0; y <= 20; y++) {
            this.graphContext.moveTo(300, y * 30);
            this.graphContext.lineTo(310, y * 30);
            this.graphContext.stroke();

            if (((-y) + 10) != 0) {
                this.graphContext.font = '15px Arial';
                this.graphContext.fillText(((-y) + 10), 310, (y * 30));
            }

            this.graphContext.moveTo(300, y * 30);
            this.graphContext.lineTo(290, y * 30);
            this.graphContext.stroke();
        }

    }
}
