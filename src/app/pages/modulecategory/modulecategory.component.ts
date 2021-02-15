import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-modulecategory',
  templateUrl: './modulecategory.component.html',
  styleUrls: ['./modulecategory.component.scss'],
})
export class ModulecategoryComponent implements OnInit {
  
  constructor(private navCtrl: NavController,
              private user: UserService,) { }

  ngOnInit() {}
  

  automationmodule(){
    this.navCtrl.navigateRoot('/automationmodule');
  }
  tammodule(){
    this.navCtrl.navigateRoot('/tammodule');
  }
  securitymodule(){
    this.navCtrl.navigateRoot('/securitymodule'); 
  }
 



  modulesensorclick(){
    this.navCtrl.navigateRoot('/submoduleshow');
    this.user.modulemoter=false;
    this.user.moduledevice=false;
    this.user.moduleplug=false;
    this.user.modulesensor=true;
    this.user.plug_more=false;
  }

  
 

  // addlockclick(){
  //   console.log("lock click..")
  //   this.user.lock_qrbutton=true;
  //   this.user.module_qrbutton=false;
  //   this.navCtrl.navigateRoot('/addnewmodule'); 
  // }

  async clicklockModule(){
    this.navCtrl.navigateRoot('/locksetup'); 
   }
   locksetup(){
     console.log("click to scan lock module");
     this.navCtrl.navigateRoot('/locksetup');
   }

}
