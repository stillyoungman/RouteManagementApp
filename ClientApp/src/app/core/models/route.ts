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
    
    constructor(segments: Segment[]){ 
        this.segments = segments;
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
            description: this.description,
            isShared: this.isShared,
            segments: this.segments

        }
        //capitalizeFirstLetter(result);
        return result;
    }

    
}

export class RouteDto{
    name:string;
    distance:number;
    location:string;
    description:string;
    isShared:boolean;
    segments:Segment[];

    static deserialize(input){
        var route = Object.assign(new RouteDto(), input);
        console.log(input.segments);
        route.segments = Object.assign([],input.segments);
        return route;
    }
}