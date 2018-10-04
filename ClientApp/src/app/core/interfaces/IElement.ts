import { Segment } from "../models/segment";
import { Marker } from "../models/marker";

export interface IElement {
    getMarkerType(): string;
    getMarker(): Marker;
    getSegment(): Segment;
}