import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
declare var TTlockdata;

@Component({
  selector: 'app-ttlockoperation',
  templateUrl: './ttlockoperation.component.html',
  styleUrls: ['./ttlockoperation.component.scss'],
})
export class TtlockoperationComponent implements OnInit {
  lockID;
  imgPath;
  constructor(private auth: AuthService,
              private user: UserService,
              private navCtrl: NavController,
              public activateRoute: ActivatedRoute,
              public actionsheetCtrl: ActionSheetController,
              private router: Router,) { 

   console.log(this.user.ttLockId);
    // this.getlockDetails();
    console.log("lockData:"+ this.user.lockData);
    console.log("lockId:"+ this.user.ttLockId);
    console.log("lockMac:"+ this.user.ttlockMac);
    this.imgPath = '../../../assets/images/lockgif.gif';
  }

  ngOnInit() {
    // this.lockID=localStorage.getItem('lockId');
    // console.log(this.lockID);
  }
lockMac;
lockDetails
  getlockDetails(){
    console.log("lockData:"+ this.user.lockData);
    console.log("lockId:"+ this.user.ttLockId)
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
    this.auth.tTlock_details(params).subscribe(res=>{
      
      console.log((res));
      this.lockDetails=res;
      this.lockMac=this.lockDetails.lockMac;
      this.user.ttlockMac=this.lockMac;
      this.user.dismiss();
      // this.user.showToast(JSON.stringify(res));
    },error=>{
      console.log(JSON.stringify(error.error));
      this.user.dismiss();
      console.log('error');
    })
  //  console.log(params);
  }

  status=false;
  lockunlock(){
    console.log("lockData:"+ this.user.lockData);
    console.log("lockMac:"+ this.user.ttlockMac);
    this.status=!this.status
    let body={'lockdata':this.user.lockData,
                'macAddress': this.user.ttlockMac,
        'status':(this.status)      
}
TTlockdata.lockUnlock(body,
  res=>{
console.log("lockUnlockRes:"+ res);
},err=>{
console.log("lockUnlock Error:"+ err);
this.user.showToast(JSON.stringify(err.error));
})

  }

  fingerAdd(){
    this.user.ttlockMac; 
    this.user.lockData;
    this.user.ttLockId;
    this.navCtrl.navigateRoot('/ttlockfingerlist'); 
  }
  ekey(){
    this.navCtrl.navigateRoot('/ttlockekeysend'); 
  }

  async more(){
      console.log("lockId:"+ this.user.ttLockId);
      console.log("lockMac:"+ this.user.ttlockMac);
      console.log("lockData:"+ this.user.lockData);
      const actionSheet = await this.actionsheetCtrl.create({  
        header: 'Modify your  device',  
        buttons: [  
          {  
            text: 'Add Finger',  
            icon: 'finger-print-outline', 
            handler: () => {  
              console.log('add finger clicked');  
              this.router.navigateByUrl('/ttlockfingerlist');
                       
            }  
          },
        
          {  
            text: 'Add Passcode',  
            icon: 'code-outline',
            handler: () => {  
              console.log('fav click clicked');  
              this.router.navigateByUrl('/ttlockpasscodelist'); 
            }  
          },
          {  
            text: 'Add eKeys',  
            icon: 'key-outline',
            handler: () => {  
              console.log('fav click clicked');  
              this.router.navigateByUrl('/ttlockekeylist'); 
            }  
          },
          {  
            text: 'Add IC Card',  
            icon: 'key-outline',
            handler: () => {  
              console.log('IC click clicked');  
              this.router.navigateByUrl('/ttlockiclist'); 
            }  
          },
        
           {  
            text: 'Cancel', 
            icon: 'close', 
            role: 'cancel',  
            handler: () => {  
              console.log('Cancel clicked');  
            }  
          }  
        ]  
      });  
      await actionSheet.present();  
    }  
   
  
}
