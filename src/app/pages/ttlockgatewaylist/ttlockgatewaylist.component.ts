import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import { Route, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ttlockgatewaylist',
  templateUrl: './ttlockgatewaylist.component.html',
  styleUrls: ['./ttlockgatewaylist.component.scss'],
})
export class TtlockgatewaylistComponent implements OnInit {
  gatewayList1;
  gatewayList2;
  constructor(private authService: AuthService,
             private androidPermissions:AndroidPermissions,
             public alertController: AlertController,
             private router: Router,
             private auth: AuthService,
             private user: UserService,
             private navCtrl: NavController,
             public activateRoute: ActivatedRoute,
            public actionsheetCtrl: ActionSheetController,
   ) { }

  ngOnInit() {
    this.gatewayList();
    
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
        // this.navCtrl.navigateRoot('/mainpage'); 
       
       
      },error=>{
        this.user.dismiss();
        this.user.showToast(JSON.stringify(error.error));
        //console.log('error');
      })
      
     
    }
gatwaylockid;
    ttGateWayLockClick(g_id,g_mac,g_name,g_alias){
    // alert(g_id);
    // alert(g_mac);
    // alert(g_name);
    this.gatwaylockid=g_id;
 
    
    }
    lock(){
         // this.login();
    var d= new Date();
    var n = d.getTime();
    var x=n;
  let TTtoken = localStorage.getItem('TTtoken');
  // alert("t"+ TTtoken)
  const params = new HttpParams({
    fromObject: {
      clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
      accessToken: TTtoken,
      lockId:this.gatwaylockid,
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
  this.authService.tTlockGateway_lock(params).subscribe(res=>{
    this.user.dismiss();  
    alert(JSON.stringify(res))
  
   
   
  },error=>{
    this.user.dismiss();
    this.user.showToast(JSON.stringify(error.error));
   
  })

 
    }
    unlock(){
         // this.login();
    var d= new Date();
    var n = d.getTime();
    var x=n;
  let TTtoken = localStorage.getItem('TTtoken');
  // alert("t"+ TTtoken)
  const params = new HttpParams({
    fromObject: {
      clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
      accessToken: TTtoken,
      lockId:this.gatwaylockid,
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
  this.authService.tTlockGateway_Unlock(params).subscribe(res=>{
    this.user.dismiss();  
  alert(JSON.stringify(res))
  
   
   
  },error=>{
    this.user.dismiss();
    this.user.showToast(JSON.stringify(error.error));
   
  })
    }

    gatewaylock_Status(){
    var d= new Date();
    var n = d.getTime();
    var x=n;
  let TTtoken = localStorage.getItem('TTtoken');
  const params = new HttpParams({
    fromObject: {
      clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
      accessToken: TTtoken,
      lockId:this.gatwaylockid,
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
  this.authService.tTlockGateway_State(params).subscribe(res=>{
    this.user.dismiss();  
  alert(JSON.stringify(res))
  
   
   
  },error=>{
    this.user.dismiss();
    this.user.showToast(JSON.stringify(error.error));
   
  })
    }

    gatewayOpenState(){
      var d= new Date();
      var n = d.getTime();
      var x=n;
    let TTtoken = localStorage.getItem('TTtoken');
    const params = new HttpParams({
      fromObject: {
        clientId: '7a614fea8d6f427caa982e9a1aa6afc1',
        accessToken: TTtoken,
        lockId:this.gatwaylockid,
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
    this.authService.tTlockGateway_OpenState(params).subscribe(res=>{
      this.user.dismiss();  
    alert(JSON.stringify(res))
    
     
     
    },error=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
     
    })
    }

    deleteGateway(){
      // tTlockGateway_delete
      var d= new Date();
      var n = d.getTime();
      var x=n;
    let TTtoken = localStorage.getItem('TTtoken');
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
    this.authService.tTlockGateway_delete(params).subscribe(res=>{
      this.user.dismiss();  
    alert(JSON.stringify(res))
    
     
     
    },error=>{
      this.user.dismiss();
      this.user.showToast(JSON.stringify(error.error));
     
    })

    }

    async gatewayListDetails(){
      const actionSheet = await this.actionsheetCtrl.create({  
        header: 'Gateway Operation..',  
        buttons: [  
          {  
            text: 'Gateway List',  
            icon: 'finger-print-outline', 
            handler: () => {  
              this.gatewaylistLock();
              console.log('gateway list clicked');               
            }  
          },
        
          {  
            text: 'Status',  
            icon: 'remove-circle-outline',
            handler: () => {  
              this.gatewaylock_Status();
              console.log('fav click clicked');  
            
              
            }  
          },

          {  
            text: 'Open State',  
            icon: 'remove-circle-outline',
            handler: () => {  
              this.gatewayOpenState();
              console.log('open State click clicked');  
            
              
            }  
          },

          {  
            text: 'Delete Gateway',  
            icon: 'remove-circle-outline',
            handler: () => {  
              this.deleteGateway();
              console.log('delete gateway click clicked');  
            
              
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


