import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waterlabel',
  templateUrl: './waterlabel.component.html',
  styleUrls: ['./waterlabel.component.scss'],
})
export class WaterlabelComponent implements OnInit {
  waterlabel=false;
  settingslabel=true;
  constructor() { }
  wLabel;
  ngOnInit() {}

  waterCheck(e){
  console.log(e);
  console.log(this.wLabel);
  }
  wateLabelSelect(){
  this.settingslabel=false;
  this.waterlabel=true;
  }
  settingsSelect(){
    this.settingslabel=true;
    this.waterlabel=false;
  }
}
