import { Segment } from "./segment";
import { Section } from "./section";
import { Marker } from "./marker";
import { Route } from "./route";

export abstract class Element {
    constructor(public type: string, public item) { }
}

export class PointElement extends Element {
    marker:Marker;
    constructor(section: Section, type = "point")  {
        super (type,section);
        this.marker = section.marker;
    }
    isStartOrEnd():boolean{
        return this.item.markerType == "start" || this.item.markerType == "finish";
    }
}

export class SegmentElement extends Element {
    constructor(segment: Segment) {
        super ("segment",segment);
    }
}

export class RouteElement extends Element {
    constructor(route: Route){
        super("route",route);
    }
}
