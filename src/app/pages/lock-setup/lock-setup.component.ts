import { Component, OnInit } from '@angular/core';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { userInfo } from 'os';
import { UserService } from 'src/app/services/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';  


@Component({
  selector: 'app-lock-setup',
  templateUrl: './lock-setup.component.html',
  styleUrls: ['./lock-setup.component.scss'],
})
export class LockSetupComponent implements OnInit {

  lockTypeShow = true;
  lockqrscan = false;
  scannedData: any;

  constructor( 
              // private qrScanner: QRScanner, 
              private user : UserService,
               private splashScreen: SplashScreen,
               private auth: AuthService, 
               private platform: Platform, 
               private navCtrl: NavController,
               private iab: InAppBrowser) {
    this.platform.backButton.subscribeWithPriority(0,()=>{
      // document.getElementsByTagName("body")[0].style.opacity="1";
          this.scannedData.unsubscribe();
    })
   }

  ngOnInit() {}

  scanLockQr(){
    this.lockTypeShow = false;
    this.lockqrscan = true;
  //   this.qrScanner.prepare().then((status: QRScannerStatus) => {
  //     if (status.authorized) {
  //       this.qrScanner.show();
  
  //       this.scannedData=this.qrScanner.scan().subscribe((text: string) => {

  //         this.qrScanner.destroy();
  //         this.lockqrscan= false; 
  //         this.lockTypeShow= true;
          
          
  //         this.auth.lockQR(text).subscribe(res=>{
  //           this.user.showToast(JSON.stringify(res)); 
            
  //           this.iab.create('http://192.168.4.1/','_system', 'location=yes');
  //           this.navCtrl.navigateRoot('/deviceforroom');


  //         }, err=>{
  //           this.user.showToast('Invalid QR or Something went wrong');
           
            
  //           this.lockqrscan= false; 
  //           this.lockTypeShow= true;
           
  //         })

  //       })
  //     }
  //  })
  }

  stopScan(){
    // this.qrScanner.destroy();
    this.lockqrscan= false; 
    this.lockTypeShow= true;
  }

  lock2(lock){
    // alert(lock)
  }
  backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }
}
