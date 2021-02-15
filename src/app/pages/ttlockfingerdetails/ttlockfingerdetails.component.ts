import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NavController } from '@ionic/angular';
declare var TTlockdata;

@Component({
  selector: 'app-ttlockfingerdetails',
  templateUrl: './ttlockfingerdetails.component.html',
  styleUrls: ['./ttlockfingerdetails.component.scss'],
})
export class TtlockfingerdetailsComponent implements OnInit {
name;
number;
id;
  constructor(private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController) { 
    this.name=this.user.fingusername;
    this.number=this.user.fingusernumber;
    this.id=this.user.finguserId;
  }

  ngOnInit() {}

  deleteFing(){
    let body={
      "fingerPrintNum":this.user.fingusernumber,
      "lockdata":this.user.lockData,
      "macAddress":this.user.ttlockMac
    }
    TTlockdata.deleteFingerPrint(body,
      res=>{
       
        // alert((res));
     this.deletefing();
      },
      err=>{

      })
    console.log("deleted fing..");
    console.log("name"+ this.name);
    console.log("num"+ this.number);
    console.log("id:"+ this.id);

  }

  deletefing(){
    this.user.ttLockId;
    this.user.ttlockMac;
    this.user.lockData;
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    console.log("lockData:"+ this.user.lockData);

    var d= new Date();
      var n = d.getTime();
      var x=n;
      console.log("currentTime:"+n);
    let TTtoken = localStorage.getItem('TTtoken');
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId: this.user.ttLockId,
        fingerprintId: this.id,
        date:JSON.stringify(x),
      }
    });
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + '5c5f94e120022ac4288c648c1e89eb51'),

      })
    };
      this.user.present('wait..');
    this.auth.tTlockFingerDelete(params).subscribe(res=>{
      this.navCtrl.navigateRoot('/ttlockfingerlist'); 
      this.user.dismiss();
      // alert("fingerDeleted:"+ JSON.stringify(res));
     
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }


}
