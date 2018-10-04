///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Section } from "./section";
import { IElement } from "../interfaces/IElement";
import { createProperties } from "../static";
// import { } from '@types/googlemaps';


export class Segment implements IElement {
    
    comment: string;
    travelTime;
    isTimeRequired;
    date;
    isDateRequired;

    sections: Section[];
    previousSegment: Segment;
    previousSection: Section;
    private _distance:number

    constructor(public name: string){
        this.sections = [];
    }
    close(){
        this._distance = this.computeDistance();
    }

    push(section: Section){
        this.sections.push(section);
    }
    removeLast(){
        this.sections.pop().remove();
    }
    removeAll(){
        this.sections.forEach((section) => {
            section.remove();
        })
    }

    get first(): Section{
        return this.sections[0]; 
    }
    get last(): Section{
        if(this.sections[this.sections.length - 1]) return this.sections[this.sections.length - 1];
        else if (this.previousSection) return this.previousSection;
        
        // if (!this.sections[this.sections.length - 1]) return this.previousSection
        // return this.sections[this.sections.length - 1];
    }
    get penult(): Section{
        if(this.sections[this.sections.length - 2]) return this.sections[this.sections.length - 2];
        return this.previousSection.previous;
        // return this.sections[this.sections.length - 2];
    }
    get length(): number{
        return this.sections.length;
    }
    get distance():number{
        if (this._distance){
            return this._distance;
        }
        else return this.computeDistance();
    }
    computeDistance(): number{
        let result = 0;
        this.sections.forEach(value => {
            if(value.distance){
                result += value.distance
            }
        });
        return result;
    }
    //IElement implementation
    getMarkerType(): string{
        console.log(this);

        if (this.sections[0] && this.sections[0].markerType == 'start') return 'start';
        return this.last.markerType;
    }
    getMarker(){
        return this.last.marker;
    }
    getSegment(){
        return this;
    }


    toJSON(){
        return this.object2Model();
    }

    object2Model(){
        var result = {
            name: this.name,
            comment: this.comment,
            properties: {},
            distance: this.distance,
            sections: this.sections
        };

        if(this.isTimeRequired && this.travelTime){
            result.properties["time"];
        }
        if(this.isDateRequired && this.date){
            result.properties["date"];
        }

        createProperties(result);
        
        return result;
    }


}