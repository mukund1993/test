import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GlobalService } from './global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  constructor(public GLF: GlobalService){
  }
  public cockpit = { height:0};
  @ViewChild('passCabin') PassCabin ;
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.cockpit.height =  this.PassCabin.nativeElement.clientHeight;
      console.log( this.PassCabin.nativeElement.clientHeight)
    },0)
   
  }
}
