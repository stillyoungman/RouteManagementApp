///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Segment } from "./segment";
import { Section } from "./section";
import { Deserializable } from "../interfaces/deserializable";
// import { IElement } from "../"

// import { } from '@types/googlemaps';

export class SegmentStorage implements Deserializable {

    segments: Segment[] = [];
    private _map: google.maps.Map;

    constructor(map: google.maps.Map) {
        this._map = map;
        this.addNext();
    }

    pushSection(section: Section) {
        section.setMap(this._map);
        section.owner = this.last;
        if (this.last.last) { section.previous = this.last.last }
        this.last.push(section);
    }

    clear(){
        this.segments.forEach( (segment) => {
            segment.sections.forEach( (section) => {
                section.remove();
            });
        })
    }

    addNext() {
        let sg = new Segment(`Segment #${this.segments.length + 1}`);
        if (this.last) {
            //compute complex values
            this.last.close();

            //set references to parents
            sg.previousSegment = this.last;
            if (this.last.last) {
                sg.previousSection = this.last.last;
            }
        }
        this.segments.push(sg);
    }

    get last(): Segment {
        if (this.segments.length) {
            return this.segments[this.segments.length - 1];
        }
    }

    get penult(): Segment {
        if (this.segments.length - 1) {
            return this.segments[this.segments.length - 2];
        }
        else throw new Error("segment storage: penult()");
    }

    get lastSection(): Section {

        return this.last.last;
    }

    get path(){
        let path = [];
        this.segments.forEach(segment => {
            segment.sections.forEach(section => {
                section.path.forEach(p => {
                    path.push(p);
                })  
            })
        })
        console.trace();
        console.log("PATH", path);
        return path;
    }

    get penultSection(): Section {
        return this.last.penult;
    }


    get distance(): number {
        let result = 0;
        this.segments.forEach(value => {
            if (value.distance) {
                result += value.distance;
            }
        });
        return result;
    }

    toJSON() {
        return { segments: this.segments };
    }

    deserialize(object) {
        console.log("ERROR!!!!")
        return this;
    }
}