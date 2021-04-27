import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { DyfolockstatusComponent } from '../dyfolockstatus/dyfolockstatus.component';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var CameraCustom;
@Component({
  selector: 'app-securitylock',
  templateUrl: './securitylock.component.html',
  styleUrls: ['./securitylock.component.scss'],
})
export class SecuritylockComponent implements OnInit {
  lo_res:any;
  lock_response=[];
  imgPath: string;
  mo_res:any;
  gatewayList1;
  gatewayList2;
  constructor(private authService: AuthService,
    private androidPermissions:AndroidPermissions,
    public alertController: AlertController,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    public activateRoute: ActivatedRoute,
   public actionsheetCtrl: ActionSheetController,
              private navCtrl:NavController,
              public modalController: ModalController,   ) { 
                let TTtoken = localStorage.getItem('TTtoken');
                // this.user.showToast("LockToken: "+ TTtoken)
              }

  ngOnInit() {
    this.tTLocklist();
     this.getlockmodule(); 
  }




  //*************** * TTLOck Started here ***************/
tTlockData;
ttLockdataAll;
tTLocklist(){
  var d= new Date();
  var n = d.getTime();
  var x=n;
  console.log(n);
    let TTtoken = localStorage.getItem('TTtoken');
    // this.user.showToast(TTtoken);
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        type:"2-Lift",               
        pageNo: "1",
        pageSize: "20",
        date:  JSON.stringify(x)
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({     
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'Dyfo'
      })
    };
   
    
    console.log(params);
    
    // alert("data---"+ params);
    this.user.present('');
    this.auth.TTlock_list(params).subscribe(res=>{
      this.tTlockData=res;
      this.user.dismiss();
      this.ttLockdataAll=this.tTlockData.list;
      this.user.ttLockId=this.ttLockdataAll.lockId;
      console.log(this.ttLockdataAll);
      // this.user.showToast(JSON.stringify(res));
      // this.getlockDetails();
    },err=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(err.error));
    })
  }


 lockID;
  
  
  ttLockClick(lockId,lockData,lockMac){
    this.user.ttLockId=lockId;
    this.user.lockData=lockData;
    this.user.ttlockMac=lockMac;
    // localStorage.setItem('lockId',lockId);
    this.navCtrl.navigateRoot('/ttoperatiion'); 
  }

  //************* */  Dyfo Lock code  started  ***********//

dyfo_lock_response=[];
// imgPath: string;

 getlockmodule(){
   this.user.present('Please wait...');
     this.auth.getDoorLockModuleApi().subscribe(res=>{    
      this.mo_res=res;
      this.user.dismiss();
      console.log(this.mo_res)
    for(let i=0;i<this.mo_res.length;i++){
      this.auth.getDoorStatus((this.mo_res[i].pi_id)).subscribe(res=>{
        this.user.dismiss();
      this.lo_res=res;
     
      console.log(this.lo_res)
      if(this.lo_res[i].status==true){
     this.imgPath = 'assets/icon/unlock.jpeg'
      }
      if(this.lo_res[i].status==false){
         this.imgPath = 'assets/icon/lock.png'
      }
        this.lock_response[i]={
          'id': this.lo_res[i].id,  
          'device': this.lo_res[i].device,
          'pi_id': this.lo_res[i].pi_id,
          'name': this.lo_res[i].name,
          'device_type': "Door_Lock",
          'status': this.lo_res[i].status,
          'img':this.imgPath
        }
     },err=>{
      this.user.dismiss();
      alert(err.errror);
     })
    }
    },err=>{
      this.user.dismiss();
      alert(err.errror);
    })
   }
   changeDyfoLockStatus(e:any) {
   var img=document.getElementById(e)
   this.user.present('Please Wait...');
   if ((<HTMLInputElement>event.currentTarget).checked == true) {
     this.auth.changeStatuswithCheck(e, 1).subscribe(res => {
       this.user.dismiss();
       this.imgPath = 'assets/icon/unlock.jpeg' 
        img.setAttribute('src',this.imgPath)     
     })
   }
   if ((<HTMLInputElement>event.currentTarget).checked == false) {
     this.auth.changeStatuswithCheck(e, 0).subscribe(res => {
       this.user.dismiss();
        this.imgPath = 'assets/icon/lock.png'  
        img.setAttribute('src',this.imgPath)  
    })
  }
 }

// ****************** dyfo lock  ended here ****** and TTLock stared here*******//

   async dyfolockclick(id){
      const modal = await this.modalController.create({
        component: DyfolockstatusComponent,
        componentProps: { dyfolockid:  id}
      });
      return await modal.present();
    }
    initDevice(id,ev){
      // alert(id)
       let body = {id: id}
       if(ev.currentTarget.checked){
       CameraCustom.initDevice(body,
       res=>{
          //this.bitmap=res;
          //this.createdCode=res;
         //alert(JSON.stringify(res)) 
      },
       err=>{
       // alert(JSON.stringify(err))
       // alert("4 error")
       })
     }
     }
     goToTuyaSettings(name,icon){
      // alert(name)
       this.user.tuyaDeviceName=name;
       this.user.tuyaDeviceIcon=icon;
       this.navCtrl.navigateRoot('/camFunc')
     }


     gatewayList(){
   
      // this.login();
      var d= new Date();
        var n = d.getTime();
        var x=n;
        //console.log(n);
      let TTtoken = localStorage.getItem('TTtoken');
      // alert("t"+ TTtoken)
      const params = new HttpParams({
        fromObject: {
          clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
          accessToken: TTtoken,
          pageNo:"1",
          pageSize:"20",
          date:JSON.stringify(x),
        }
      });
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + '5c5f94e120022ac4288c648c1e89eb51'),
          'Access-Control-Allow-Origin': '*'
        })
      };
        this.user.present('loading...');
      this.authService.tTlockGateway_list(params).subscribe(res=>{
        
        this.user.dismiss();
      // alert("list"+ JSON.stringify(res))
      this.gatewayList2=res;
      this.gatewayList1=JSON.stringify(this.gatewayList2.list[0].gatewayId);
      // alert("upload:"+ JSON.stringify(this.gatewayList2.list[0].gatewayId));
      // alert("upload1:"+ JSON.stringify(this.gatewayList1.gatewayId));
        // this.navCtrl.navigateRoot('/mainpage'); 
        this.gatewaylistLock();      
      },error=>{
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
        //console.log('error');
      })     
    }

    gatewaylist12;
gatewaylist13;
    gatewaylistLock(){  
    alert(this.gatewayList1);
      // this.login();
      var d= new Date();
        var n = d.getTime();
        var x=n;
        //console.log(n);
      let TTtoken = localStorage.getItem('TTtoken');
      // alert("t"+ TTtoken)
      const params = new HttpParams({
        fromObject: {
          clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
          accessToken: TTtoken,
          gatewayId:this.gatewayList1,
          date:JSON.stringify(x),
        }
      });
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + '5c5f94e120022ac4288c648c1e89eb51'),
          'Access-Control-Allow-Origin': '*'
        })
      };
        this.user.present('loading...');
      this.authService.tTlockGateway_gatewayList(params).subscribe(res=>{
        this.user.dismiss();
      
      this.gatewaylist12=res;
      this.gatewaylist13=this.gatewaylist12.list;
      // alert("list:"+ JSON.stringify(this.gatewaylist13));
        this.navCtrl.navigateRoot('/ttgatewayoperation'); 
       
       
      },error=>{
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
        //console.log('error');
      })   
    }

    // gatwaylockid;
    ttGateWayLockClick(g_id,g_mac,g_name,g_alias){
    // alert(g_id);
    // alert(g_mac);
    // alert(g_name);
    this.user.gatewaylockid=g_id;
    this.user.gatewaylockMac=g_mac;
    this.user.gatewaylockName=g_name;
    this.navCtrl.navigateRoot('/ttgatewayoperation');   
    }
}
