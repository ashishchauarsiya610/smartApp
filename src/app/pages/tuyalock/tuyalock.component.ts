import { Component, OnInit } from '@angular/core';
declare var CameraCustom;
@Component({
  selector: 'app-tuyalock',
  templateUrl: './tuyalock.component.html',
  styleUrls: ['./tuyalock.component.scss'],
})
export class TuyalockComponent implements OnInit {
 show
  constructor() { }

  ngOnInit() {}
  next(){
    this.show=true;
     }
  navigateNext(ev){
  if(ev.target.checked){
    let body={
      ssid:(<HTMLInputElement>document.getElementById('ssid')).value,
      password:(<HTMLInputElement>document.getElementById('password')).value
    }
    CameraCustom.wifilock(body,
      res=>{
     alert(res);
      },err=>{
    alert(err);
      })
  }
}

}
