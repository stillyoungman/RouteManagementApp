///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Segment } from "./segment";

// import { } from '@types/googlemaps';

export class Route {
    //TODO: add general information fields
    name: string;
    segments: Segment[] = [];
    description;
    
    constructor(segments: Segment[]){ 
        this.segments = segments;
    }

    toJSON(){
        return this.object2Model();
    }

    object2Model(){
        var result = {
            name: this.name,
            segments: this.segments
        }
        //capitalizeFirstLetter(result);
        return result;
    }
}