export class Plane {
    public id = null;
    public x = null;
    public y = null;
    public radius = null;
    public angle = null;
    public speed = null;
    public direction = 0;
    public isSelected = false;

    public hasCartesian() {
        return !!(this.x != null && this.y != null);
    }

    public hasPolar() {
        return !!(this.angle != null && this.radius != null);
    }
}

export class Translate {
    public x = null;
    public y = null;
}

export class Stagger {
    public x = null;
    public y = null;
}

export class Rotate {
    public angle = null;
    public x = null;
    public y = null;
}
