//<reference path="C:/_repos/routemanagementapp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
import { } from '@types/googlemaps';
import { Segment } from "./segment";

// import { } from '@types/googlemaps';

export class Route {
    //TODO: add general information fields
    name: string;
    isShared: boolean;
    location: string;
    // distance:number;
    segments: Segment[] = [];
    description: string;
    bounds: google.maps.LatLngBounds;
    _distance: number;

    constructor(segments: Segment[], bounds) {
        this.segments = segments;
        this.bounds = bounds;
    }

    get distance() {
        if (this._distance) return this._distance;
        var result = 0;
        this.segments.forEach((value) => result += value.distance);
        return result;
    }

    set distance(value) {
        this._distance = value;
    }

    toJSON() {
        return this.object2Model();
    }

    object2Model() {
        var result = {
            name: this.name,
            distance: this.distance,
            location: this.location,
            bounds: JSON.stringify(this.bounds),
            description: this.description,
            isShared: this.isShared,
            segments: this.segments
        }

        if (this['userId']) {
            result['userId'] = this['userId']
        }
        if (this['routeId']) {
            result['routeId'] = this['routeId']
        }
        //capitalizeFirstLetter(result);
        return result;
    }

    static deserialize(input): Route {
        let route: Route = Object.assign(new Route(null, null), input);
        let bounds = JSON.parse(input.bounds);
        route.bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(bounds.south, bounds.west),
            new google.maps.LatLng(bounds.north, bounds.east));
        route.segments = [];
        input.segments.forEach(segment => {
            route.segments.push(Segment.deserialize(segment));
        })
        return route;
    }

    get checkpointsLocations() {
        let arr = [];
        this.segments.forEach(segment => {
            if (segment.last.markerType === 'checkpoint') {
                let location;
                if (segment.last.marker.location instanceof google.maps.LatLng){
                    location = segment.last.marker.location.toString().split(' ').join('')
                    
                } else {
                    location = segment.last.marker.location;
                    location = new google.maps.LatLng(location['lat'], location['lng']).toString().split(' ').join('')
                }
                location = location.slice(1, location.length - 1);
                arr.push(location);
            }
        })
        return arr;
    }

    get path() {
        let path = [];
        this.segments.forEach(segment => {
            segment.sections.forEach(section => {
                section.path.forEach(p => {
                    if (p instanceof google.maps.LatLng) {
                        path.push(p);
                    } else {
                        path.push(new google.maps.LatLng(p['lat'], p['lng']))
                    }
                })
            })
        })
        return path;
    }

    get points() {
        let result = {};

        if (this.segments[0].sections[0].marker.location instanceof google.maps.LatLng && this.segments.slice(-1)[0].sections.slice(-1)[0].marker.location instanceof google.maps.LatLng) { //print from create-route then they are latLng instances
            result['start'] = this.segments[0].sections[0].marker.location.toString().split(' ').join('')
            result['end'] = this.segments.slice(-1)[0].sections.slice(-1)[0].marker.location.toString().split(' ').join('')      
        } else { //from route, then just object
            let point =  this.segments[0].sections[0].marker.location;
            let lat,lng;
            lat = point['lat'];
            lng = point['lng'];
            result['start'] = new google.maps.LatLng(lat, lng).toString().split(' ').join('')
            
            point = this.segments.slice(-1)[0].sections.slice(-1)[0].marker.location;
            lat = point['lat'];
            lng = point['lng'];
            result['end'] = new google.maps.LatLng(lat, lng).toString().split(' ').join('')
        }
        result['start'] = result['start'].slice(1, result['start'].length - 1);
        result['end'] = result['end'].slice(1, result['end'].length - 1);//cut '{ }' around
        return result;
    }

}

export class RouteDto {
    name: string;
    distance: number;
    location: string;
    bounds;
    date;
    description: string;
    isShared: boolean;
    segments: Segment[];

    static deserialize(input) {
        let route = Object.assign(new RouteDto(), input);
        route.bounds = JSON.parse(input.bounds);
        route.segments = Object.assign([], input.segments);
        return route;
    }


}