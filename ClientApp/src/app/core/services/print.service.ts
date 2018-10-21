import { Injectable } from '@angular/core';
import { Route } from '../models/route';
import * as jsPDF from 'jspdf'
import { RouteStorageService } from './route-storage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private routeStorge: RouteStorageService,
    private nf: NotificationService) { }

  printRouteInfo(route:Route) {//rename
    let pm = new PrintManager(route);
    pm.addPoint(pm.startInfo);
    pm.addTrack(pm.segmentsInfo);
    pm.addPoint(pm.endInfo);
    pm.print();
  }

  printRouteMap(mapImgRef){
    console.log(mapImgRef);
    if (mapImgRef && mapImgRef.length < 8191) {
      let link = document.createElement('a');
      link.setAttribute('href', mapImgRef);
      link.setAttribute('download', 'route-snapshot.png');
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (mapImgRef.length > 8191) {
      this.nf.notify("Can't print (too long)");
    }
  }

}

class PrintManager {
  START = 20;
  END = 280;
  LINELENGTH = 70;

  route: Route;
  doc: jsPDF;
  om; //offsetManager

  constructor(route: Route) {
    this.route = route;
    this.doc = new jsPDF();
    this.om = {
      y: 10,
      yNextHeader: function () {
        this.y += 12;
        return this.y - 7;
      },
      yNextLine: function () {
        this.y += 5;
        console.log(this.y);
        return this.y - 5;
      },
      xHeader: 30,
      xLine: 20
    }
  }

  print() {
    this.doc.save("route-info.pdf");
  }

  addPoint(pointInfo) {
    //calculating point element height
    let elementHeight = 12;//because header is required
    if (pointInfo.date || pointInfo.rest) {
      elementHeight += 5;
    }
    let commentLines;
    if (pointInfo.comment) {
      commentLines = this.splitIntoLines("Comment: " + pointInfo.comment);
      elementHeight += commentLines.height;
    }

    //pagination
    if (elementHeight + this.om.y > this.END) {
      this.nextPage();
    }

    //printing
    this.addHeader(pointInfo.name);

    if (pointInfo.date && pointInfo.rest) {
      this.addExtra("Rest: " + pointInfo.rest + " minutes" + " | " + "Date: " + pointInfo.date)
    } else if (pointInfo.date) {
      this.addExtra("Date: " + pointInfo.date);
    } else if (pointInfo.rest) {
      this.addExtra("Rest: " + pointInfo.rest + " minutes")
    }

    if (commentLines) {
      this.addComment(commentLines);
    }
  }

  addTrack(segments) {
    segments.forEach(s => {
      this.addSegment(s);
    })
  }

  addSegment(segment: {name:string;date:string;time:string;comment:string;checkpoint:{}}) {
    //calculate heigth;
    let elementHeight = 12;
    if (segment.date || segment.time){
      elementHeight += 5;
    }
    let commentLines;
    if(segment.comment){
      commentLines = this.splitIntoLines(segment.comment);
      elementHeight += commentLines.height;
    }
    
    //pagination
    if(elementHeight + this.om.y > this.END){
      this.nextPage();
    }

    //print segmentInfo
    this.addHeader(segment.name)

    if (segment.time && segment.date) {
      this.addExtra("Travel time: " + segment.time + " minutes" + " | " + "Date: " + segment.date);
    } else if (segment.time) {
      this.addExtra("Travel time: " + segment.time + " minutes");
    } else if (segment.date) {
      this.addExtra("Date: " + segment.date);
    }

    if(commentLines){
      this.addComment(commentLines);
    }

    //print checkpoint
    if (segment.checkpoint) {
      this.addPoint(segment.checkpoint)
    }

  }

  addHeader(header) {
    this.doc.setFontSize(15);
    this.doc.setFontType('bold');
    this.doc.text(header, this.om.xHeader, this.om.yNextHeader());
  }

  addExtra(info) {
    this.doc.setFontSize(10);
    this.doc.setFontType('normal');
    this.doc.text(info, this.om.xLine, this.om.yNextLine())
  }

  addComment(item: { lines: [string]; height: number }) {
    this.doc.setFontSize(10);
    this.doc.setFontType('normal');
    item.lines.forEach(line => {
      console.log(this.om.xLine, this.om.y)
      this.doc.text(line, this.om.xLine, this.om.yNextLine());
    })
  }

  splitIntoLines(text: string): { lines: [string]; height: number } {
    let words = text.split(' ');
    let lines: [string] = [''];
    let index = 0;
    lines[index] = '';

    words.forEach(word => {
      if (lines[index].length + word.length < this.LINELENGTH) {
        lines[index] += word + ' ';
      } else {
        lines[index].trim();
        lines[++index] = word;
      }
    })

    return {
      lines: lines,
      height: lines.length * 5//number, means line's step
    }
  }

  get startInfo() {
    let startInfo = {
      name: this.route.segments[0].first.marker.name + ' [Start]',
      comment: this.route.segments[0].first.marker.comment,
      date: this.route.segments[0].first.marker.date
    }
    // if(this.route.segments[0].first.marker.date){
    //   startInfo['date'] = ;
    // }
    return startInfo;
  }

  get endInfo() {
    let endInfo = {
      name: this.route.segments.slice(-1)[0].last.marker.name + ' [End]',
      comment: this.route.segments.slice(-1)[0].last.marker.comment,
      date: this.route.segments.slice(-1)[0].last.marker.date
    }
    // if (this.route.segments.slice(-1)[0].last.marker.date) {

    // }
    return endInfo;
  }

  get segmentsInfo() {
    let segmentsInfo = [];
    this.route.segments.forEach(segment => {
      let info = {
        name: segment.name + ' [Segment]',
        comment: segment.comment,
        date: segment.date,
        time: segment.travelTime
      }
      if (segment.last.marker.type === 'checkpoint') {
        let c = segment.last.marker;
        info['checkpoint'] = {
          name: c.name + ' [Checkpoint]',
          date: c.date,
          rest: c.rest,
          comment: c.comment
        }
      }
      segmentsInfo.push(info);
    })
    return segmentsInfo;
  }

  nextPage() {
    this.doc.addPage();
    this.om.y = 15;
  }


  //jsPDF не поддерживат кириллицу
  //решение в лоб)
  rus2latin(text: string) {
    let source = text.split('');

    function isRussianLetter(char) {
      return char.charCodeAt(0) >= 1040 && char.charCodeAt(0) <= 1103;
    }

    if (source.some(char => isRussianLetter(char))) {

    }
  }

  dict = {
    'а': 'a',
    'б': 'b'
  }

}
