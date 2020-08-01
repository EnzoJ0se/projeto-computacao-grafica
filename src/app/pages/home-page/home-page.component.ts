import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Plane, Rotate, Stagger, Translate} from './helper';
import {MathService} from '../../../resources/math.service';
import {RadarGraphComponent} from '../../components/radar-graph/radar-graph.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent {
    @ViewChild(RadarGraphComponent, {static: true}) private graph: RadarGraphComponent;

    public planes: Array<Plane> = [];
    public planeToCreate: Plane = new Plane();
    public translate = new Translate();
    public stagger = new Stagger();
    public rotate = new Rotate();

    private selectedItems: Array<any> = [];

    constructor(private mathService: MathService, private changeDetector: ChangeDetectorRef) {
    }

    public selectItem(itemId, event) {
        if (event) {
            this.selectedItems.push(itemId);
        } else {
            this.selectedItems = this.selectedItems.filter(item => item !== itemId);
        }
    }

    public removePlane(index) {
        this.selectItem(this.planes[index].id, false);
        this.planes.splice(index, 1);
        this.graph.refreshGraph();
    }

    public rotateSelectedPlanes() {
        if (this.rotate.angle) {
            for (const planeId of this.selectedItems) {
                let plane = this.planes.find(item => item.id === planeId);
                plane = this.mathService.rotatePlane(plane, this.rotate);
                this.changeDetector.detectChanges();
            }
        } else {
            alert('Informações Incompletas');
        }

        this.graph.refreshGraph();
    }

    public translateSelectedPlanes() {
        if (this.translate.x && this.translate.x) {
            for (const planeId of this.selectedItems) {
                let plane = this.planes.find(item => item.id === planeId);
                plane = this.mathService.translatePlane(plane, this.translate);
                this.changeDetector.detectChanges();
            }
        } else {
            alert('Informações Incompletas');
        }

        this.graph.refreshGraph();
    }

    public staggerSelectedPlanes() {
        if (this.stagger.x && this.stagger.x) {
            for (const planeId of this.selectedItems) {
                let plane = this.planes.find(item => item.id === planeId);

                if (plane) {
                    plane = this.mathService.staggerPlane(plane, this.stagger);
                }

                this.changeDetector.detectChanges();
            }
        } else {
            alert('Informações Incompletas');
        }

        this.graph.refreshGraph();
    }

    public insertPlane() {
        this.planeToCreate.id = this.planes.length + 1;

        if (this.planeToCreate.hasCartesian()) {
            const polar = this.mathService.convertCartesianToPolar(this.planeToCreate.x, this.planeToCreate.y);

            this.planeToCreate.radius = polar.radius;
            this.planeToCreate.angle = polar.angle;
            this.planes.push(this.planeToCreate);

        } else if (this.planeToCreate.hasPolar()) {
            const cartersian = this.mathService.convertPolarToCartesian(this.planeToCreate.angle, this.planeToCreate.radius);

            this.planeToCreate.x = cartersian.x;
            this.planeToCreate.y = cartersian.y;
            this.planes.push(this.planeToCreate);

        } else {
            alert('Informações Incompletas');
        }
        this.planeToCreate = new Plane();
        this.graph.refreshGraph();
    }
}
