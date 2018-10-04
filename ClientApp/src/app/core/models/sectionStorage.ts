///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Section } from "./section";

export class SectionStorage {//for in capsulating certain methods

    sections: Section[] = [];
    map : google.maps.Map;
    constructor(){ }

    setMap(map: google.maps.Map){
        this.map = map;
    }

    push(section: Section){
        section.setMap(this.map);
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

    get distance(): number{
        let result = 0;
        this.sections.forEach(function(section){
            result += section.distance;
        });
        return result;
    }

    get first(): Section{
        return this.sections[0]; 
    }

    get penult(): Section{
        return this.sections[this.sections.length - 2];
    }
    get last(): Section{
        return this.sections[this.sections.length - 1];
    }

    
    get startPoint(){
        throw new Error("NOT IMPLEMENTED!!!");//TODO: implement this!
    }

    get ednPoint(){
        throw new Error("NOT IMPLEMENTED!!!");//TODO: implement this!
    }
}