///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Segment } from "./segment";

// import { } from '@types/googlemaps';

export class Route {
    //TODO: add general information fields
    name: string;
    isShared:boolean;
    location:string;
    // distance:number;
    segments: Segment[] = [];
    description:string;
    bounds: google.maps.LatLngBounds;
    _distance: number;
    
    constructor(segments: Segment[], bounds){ 
        this.segments = segments;
        this.bounds = bounds;
    }

    get distance(){
        if (this._distance) return this._distance;
        var result = 0;
        this.segments.forEach((value) => result += value.distance);
        return result;
    }

    set distance(value){
        this._distance = value;
    }

    toJSON(){
        return this.object2Model();
    }

    object2Model(){
        var result = {
            name: this.name,
            distance: this.distance,
            location: this.location,
            bounds: JSON.stringify(this.bounds),
            description: this.description,
            isShared: this.isShared,
            segments: this.segments
        }
        //capitalizeFirstLetter(result);
        return result;
    }

    static deserialize(input){
        let route :Route = Object.assign(new Route(null,null),input);
        let bounds = JSON.parse(input.bounds);
        route.bounds = new google.maps.LatLngBounds(
              new google.maps.LatLng(bounds.south,bounds.west),
              new google.maps.LatLng(bounds.north,bounds.east));
        route.segments = [];
        input.segments.forEach(segment => {
            route.segments.push(Segment.deserialize(segment));
        })
        return route;
    }
    
}

export class RouteDto{
    name:string;
    distance:number;
    location:string;
    bounds;
    date;
    description:string;
    isShared:boolean;
    segments:Segment[];

    static deserialize(input){
        let route = Object.assign(new RouteDto(), input);
        route.bounds = JSON.parse(input.bounds);
        route.segments = Object.assign([],input.segments);
        return route;
    }

    
}