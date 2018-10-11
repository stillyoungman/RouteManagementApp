///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { capitalizeFirstLetter, createProperties } from "../static";

export class Marker {
    
    rest;
    isRestRequired;
    date;
    isDateRequired;
    comment;
    gInstance: google.maps.Marker;

    constructor(public name, public location: google.maps.LatLng,public type){
    }

    setComment(comment){
        this.comment = comment;
    }    
    rmGoogleInstance(){
        this.gInstance.setMap(null);
    } 
    setGoogleInstance(markerOptions: google.maps.MarkerOptions){
        this.gInstance =  new google.maps.Marker(markerOptions);
    }

    toJSON(){
        return this.object2Model();
    }

    object2Model(){
        var result = {
            name: this.name,
            type: this.type,
            location: JSON.stringify(this.location),
            properties: {}
        }

        if(this.isRestRequired && this.rest){
            result.properties["arrival"];
        }
        if(this.isDateRequired && this.date){
            result.properties["date"];
        }
        createProperties(result);
        return result;
    }
    static deserialize(m){
        let result = Object.assign(new Marker(null,null,null),m);
        result.location = JSON.parse(m.location);
        // result.location = m.location;
        return result;
    }
}