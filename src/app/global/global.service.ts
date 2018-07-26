import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  public flightView={};
  constructor(public http : HttpClient) { 
    console.log( flight)
    var flight: BehaviorSubject<Object> = new BehaviorSubject("");
    this.http.get("./assets/flight.json").subscribe( (data)=>{
      flight.next( data['availSeatMap']['SEATS_6E_168_BOM_DEL']['EquipmentInfo']);
      this.SeatListGenerator(flight.getValue())
      this.seatinfobuilder(flight.getValue())
    })
    
   // this.flight.subscribe( this.SeatListGenerator );
  }

public SeatListGenerator( data)
{
if(!data) return;
 var columnsList = data['leftGroup'].reverse();
 var RightcolumnsList = data['rightGroup'].reverse();

 //rightGroup
 var row = data['rows']
  var LeftSeatArrangement=[];
  var RightSeatArrangement=[];
  for(var i = (columnsList.length-1);i >= 0; i--){
    LeftSeatArrangement[i] = {col: columnsList[i], seatList:[]};
    RightSeatArrangement[i] = {col: RightcolumnsList[i], seatList:[]};
    for(var j = 1; j <= row; j++){
        LeftSeatArrangement[i]['seatList'].push( j);
        RightSeatArrangement[i]['seatList'].push( j);
    }
  }
  var rowArray=[]
  for(var j = 1; j <= row; j++){
    rowArray.push( j);
  }

  this.flightView['upperSide'] = RightSeatArrangement;
  this.flightView['lowerSide'] = LeftSeatArrangement;
  this.flightView['rowArray'] = rowArray;
}
public seatinfobuilder(data){
  var seatDef = {};
  for( let i of data['seatlst']){
    seatDef[i.row +i.col] = i;
    i['cls']="blockedSeat";
    if(i['seatavailability'] == "Booked"){
      i['cls']="bookedSeat";
    }
    if(i['seatavailability'] == "Open"){
      i['cls']="availableSeat";
    }
  }
  
  this.flightView['seatlst'] = seatDef;
  console.log(this.flightView);
}

}
