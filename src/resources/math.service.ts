import {Injectable} from '@angular/core';
import {Plane, Rotate, Stagger, Translate,} from '../app/pages/home-page/helper';
import {RadarGraphComponent} from '../app/components/radar-graph/radar-graph.component';

@Injectable({
    providedIn: 'root'
})
export class MathService {
    constructor() {}

    public convertPolarToCartesian(angle: number, radius: number) {
        const sin = Math.sin((angle * (Math.PI / 180)));
        const cos = Math.cos((angle * (Math.PI / 180)));

        return {
            x: radius * cos,
            y: radius * sin
        };
    }

    public convertCartesianToPolar(xPosition: number, yPosition: number) {
        const radius = Math.sqrt((Math.pow(xPosition, 2) + Math.pow(yPosition, 2)));
        const angle = ((Math.atan2(yPosition, xPosition) * 180 ) / Math.PI);

        return {
            radius,
            angle: (angle < 0) ? angle + 360 : angle
        };
    }

    public rotatePlane(plane: Plane, rotateData: Rotate) {
        const sin = (Math.sin(((rotateData.angle * Math.PI) / 180)));
        const cos = (Math.cos(((rotateData.angle * Math.PI) / 180)));

        let temp_x = plane.x - rotateData.x;
        let temp_y = plane.y - rotateData.y;

        plane.x = ( temp_x * cos) - (temp_y * sin);
        plane.y = (temp_x * sin) + (temp_y * cos);

        plane.x = Number(plane.x) + rotateData.x;
        plane.y = Number(plane.y) + rotateData.y;

        const polar = this.convertCartesianToPolar(plane.x, plane.y);
        plane.radius = polar.radius;
        plane.angle = polar.angle;

        return plane;
    }

    public translatePlane(plane: Plane, translateData: Translate) {
        plane.x = plane.x + translateData.x;
        plane.y = plane.y + translateData.y;

        const polar = this.convertCartesianToPolar(plane.x, plane.y);
        plane.radius = polar.radius;
        plane.angle = polar.angle;

        return plane;
    }

    public staggerPlane(plane: Plane, staggerData: Stagger) {
        plane.x *= (staggerData.x / 100);
        plane.y *= (staggerData.y / 100);

        const polar = this.convertCartesianToPolar(plane.x, plane.y);
        plane.radius = polar.radius;
        plane.angle = polar.angle;

        return plane;
    }
}
