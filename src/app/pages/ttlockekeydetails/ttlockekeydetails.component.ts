import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ttlockekeydetails',
  templateUrl: './ttlockekeydetails.component.html',
  styleUrls: ['./ttlockekeydetails.component.scss'],
})
export class TtlockekeydetailsComponent implements OnInit {

  keyid;
keyname;
keypass;
  constructor(private user: UserService,
    private auth: AuthService,
    private navCtrl: NavController) { 
    this.keyid=this.user.ttkeyId;
    this.keyname=this.user.ttlockkeyname;
    this.keypass=this.user.ttkeypass;
  }

  ngOnInit() {}

  deleteFing(){


  }

  deletekey(){
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
        keyId: this.keyid,
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
    this.auth.tTlockekey_delete(params).subscribe(res=>{
      this.navCtrl.navigateRoot('/ttlockekeylist'); 
      this.user.dismiss();
      // alert("fingerDeleted:"+ JSON.stringify(res));
     
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  }
}
