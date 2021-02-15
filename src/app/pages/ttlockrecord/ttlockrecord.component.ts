import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
declare var TTlockdata;

@Component({
  selector: 'app-ttlockrecord',
  templateUrl: './ttlockrecord.component.html',
  styleUrls: ['./ttlockrecord.component.scss'],
})
export class TtlockrecordComponent implements OnInit {

  constructor(private user:UserService,
             private auth:AuthService) { }

  ngOnInit() {}
  ionViewWillEnter(){
    this.sdkresponse();
  }

sdkresponse(){
  let body={
    'lockdata':this.user.lockData,
    'macAddress':this.user.ttlockMac

 }
  TTlockdata.getOperationLog(body,
    res=>{
     alert(res);
    //  this.tTLockRecord();
    },
    err=>{
    alert(err);
    })
}

  tTLockRecord(){
   
    console.log('ttlock record..');
    var d= new Date();
    var n = d.getTime();
    var x=n;
    console.log(n);
      let TTtoken = localStorage.getItem('TTtoken');
      this.user.showToast(TTtoken);
      const params = new HttpParams({
        fromObject: {
          clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
          accessToken: TTtoken,
          // lockId:"2173852",     
          lockId: this.user.ttLockId,          
          pageNo: "1",
          pageSize: "20",
          date:  JSON.stringify(x)
        }
      });
      const httpOptions = {
        headers: new HttpHeaders({     
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
     
      
      console.log(params);
      
      this.auth.tTlock_record(params).subscribe(res=>{
        this.user.showToast(JSON.stringify(res));
        console.log("record"+res);
      },err=>{
        this.user.showToast(JSON.stringify(err.error));
      })
    }

}
