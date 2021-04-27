import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
declare var CameraCustom;

@Component({
  selector: 'app-camera-func',
  templateUrl: './camera-func.component.html',
  styleUrls: ['./camera-func.component.scss'],
})
export class CameraFuncComponent implements OnInit {
  members: any;
  icon: any;

  constructor(private user: UserService,
    private navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    private router: Router,
    public alertController: AlertController,
    public androidPermissions: AndroidPermissions,
    //private socialShare: SocialSharing
  ) { }
  id;
  ngOnInit() {
   this.icon= this.user.tuyaDeviceIcon;
   }
  initDevice(ev) {

    let body = { id: this.user.tuyaDevices[0].id }

    if (ev.currentTarget.checked) {
      CameraCustom.initDevice(body,
        res => {
          //this.bitmap=res;
          //this.createdCode=res;
          alert(JSON.stringify(res))
        },
        err => {
          // alert(JSON.stringify(err))
          alert("4" + err)
        })
    }
  }
  deleteDevice() {
    let body = { 'devicelist': this.user.tuyaDevices[0].id }
    CameraCustom.deleteDevice(body,
      res => {
        //  this.bitmap=res;
        //  this.createdCode=res;
        alert("Deleted Successfully");
        this.navCtrl.navigateRoot('/mainpage');
      },
      err => {
        alert("Deleted Successfully");
        this.navCtrl.navigateRoot('/mainpage');
        //alert(err)
        // alert("4 error")
      })
  }
  addMember() {
    CameraCustom.addmember('newMember',
      res => {
        this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      err => {
        alert(JSON.stringify(err))
      })

  }
  tuyaMessages() {
    let body = { 'id': this.user.tuyaDevices[0].id }
    CameraCustom.messagePanel(body,
      res => {
        this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      err => {
        alert(JSON.stringify(err))
      })

  }
  cloudSer(){
    let body = { 'id': this.user.tuyaDevices[0].id }
    CameraCustom.cloudSer(body,
      res => {
        this.user.showToast(JSON.stringify(res));
        //alert(JSON.stringify(res)) 
        this.shareMsg(res);
      },
      err => {
        alert(JSON.stringify(err))
      }
      )
  }
  shareMsg(msg) {
    const options = {
      message: msg,
      url: null
    }
    // this.socialShare.shareWithOptions(options);
  }
  inviteCode
  joinByCode() {
    let body = { invitecode: this.inviteCode }
    CameraCustom.invitecode(body,
      res => {
        alert(JSON.stringify(res))
        this.shareMsg(res);
      },
      err => {
        alert(JSON.stringify(err))
      })

  }

  getMembers() {
    let body = { "homeId": this.user.homeId }
    CameraCustom.memberlist(body,
      res => {
        this.members = res;
        this.user.memberList = this.members.account;
        this.navCtrl.navigateRoot('/tMem');
      },
      err => {
        alert(JSON.stringify(err))
      })

  }

  getMessage() {
    this.navCtrl.navigateRoot('/tMsg');
  }
  shareDevice() {
    this.navCtrl.navigateRoot('/shareTuya');
  }
  getFeatures() {
   this.smartScene();
  }
  smartScene() {
    this.navCtrl.navigateRoot('/smartSce');
  }
  // playback() {
  //   let body = { id: this.user.tuyaDevices[0].id }
  //   CameraCustom.playback(body,
  //     res => {

  //     }, err => {

  //     })
  // }
  async playback() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Playback Panel',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Start Playback',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id }
            console.log('edit device clicked');
            CameraCustom.playback(body,
                  res => {
            
                  }, err => {
            
                   })
             }
        },{
          text: "Record Video",
          icon: 'trash',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"4" }
            console.log('delect click clicked');
             CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })
          }
        },
        {
          text: 'Record Switch',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"6" }
            console.log('Cancel clicked');
            CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })
          }
        },
        {
          text: 'SD Card Status',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"1" }
            console.log('wifi click clicked');
            CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })

          }
        },
        {
          text: 'SD Card Format',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"2" }
            console.log('fav click clicked');
            CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })

          }
        },
        {
          text: 'SD Card Format Status',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"3" }
            console.log('fav click clicked');
            CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })
          }
        },
        {
          text: 'SD Card Capacity',
          icon: 'trash',
          cssClass: 'alert-message',
          handler: () => {
            let body = { id: this.user.tuyaDevices[0].id,num:"5" }
            console.log('delect click clicked');
            CameraCustom.playbackStatus(body,
              res => {
        
              }, err => {
        
               })
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        
      ]
    });
    await actionSheet.present();
  }
 

  async actionsheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Modify your  device',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Get Members',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            console.log('edit device clicked');
            this.getMembers();

          }
        },
        {
          text: 'Add Members',
          icon: 'person-add',
          cssClass: 'alert-message',
          handler: () => {
            console.log('wifi click clicked');
            this.addMember();

          }
        },
        {
          text: 'Smart Scene',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            this.smartScene();

          }
        },
        {
          text: 'Cloud Service',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            this.cloudSer();

          }
        },
        {
          text: 'Rename Device',
          icon: 'analytics',
          cssClass: 'alert-message',
          handler: () => {
            console.log('fav click clicked');
            let titleName = prompt("Device Name:", "");
            if (titleName == null || titleName == "") {
              alert("Please Enter Device Name")
            } else {
              let body = {
                'devicelist': this.user.tuyaDevices[0].id,
                "titleName": titleName
              }
              alert(body)
              CameraCustom.renameDevice(body,
                res => {
                  //alert("successfully Changed");
                }, err => {
                  // alert(err);
                })
            }
          }
        },
        {
          text: 'Delete Device',
          icon: 'trash',
          cssClass: 'alert-message',
          handler: () => {
            console.log('delect click clicked');
            this.presentAlertConfirm();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'alert-message',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class1',
      header: 'Alert!',
      message: 'Are you sure you want to delete device? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteDevice();
          }
        }
      ]
    });
    await alert.present();
  }


}

