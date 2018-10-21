//<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
import { } from '@types/googlemaps';
import { Marker } from "./marker";
import { createProperties } from "../static";
import { Segment } from "./segment";

// import { } from '@types/googlemaps';

export class Section {
    path: google.maps.LatLng[] = [];
    polyline;
    map: google.maps.Map;
    distance:number;

    previous: Section;
    owner: Segment;

    constructor(public marker: Marker, public polylineOptions?: google.maps.PolylineOptions) {
    }
    
    setMap(map: google.maps.Map){
        this.map = map;
    }

    setPath(path) {
        this.path = path;
        return this;
    }

    setDistance(distance:number){
        this.distance = distance;
        return this;
    }

    get markerType():string {
        return this.marker.type;
    }

    show() {
        this.polylineOptions.path = this.path;
        this.polylineOptions.map = this.map;
        this.polyline = new google.maps.Polyline(this.polylineOptions);
    };
    remove() {
        if (this.polyline){
            this.polyline.setMap(null);
            this.marker.rmGoogleInstance();
        }
        else {
            this.marker.rmGoogleInstance();
        }
    };
    
    toJSON(){
        return this.object2Model();
    }

    object2Model(){
        let object = {
            marker: this.marker,
            distance: this.distance,
        }
        object["path"] = JSON.stringify(this.path);//one attribute in db
        return object;
    }

    static deserialize(input,m):Section{
        let result:Section =  Object.assign(new Section(null,null), input);
        result.marker = Marker.deserialize(input.marker)
        result.path = JSON.parse(input.path);
        return result;
    }
}