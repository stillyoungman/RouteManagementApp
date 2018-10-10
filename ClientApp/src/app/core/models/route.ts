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
    
    constructor(segments: Segment[], bounds){ 
        this.segments = segments;
        this.bounds = bounds;
    }

    get distance(){
        var result = 0;
        this.segments.forEach((value) => result += value.distance);
        return result;
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
        console.log("02m: bounds",JSON.stringify(this.bounds));
        console.log("ne",JSON.stringify(this.bounds.getNorthEast()));
        console.log("sw",JSON.stringify(this.bounds.getSouthWest()));

        //capitalizeFirstLetter(result);
        return result;
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