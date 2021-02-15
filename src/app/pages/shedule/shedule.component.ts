import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss'],
})
export class SheduleComponent implements OnInit {
  
  constructor(public user: UserService,
              private navCtrl: NavController) { }

  ngOnInit() {}

  scannewModuleQr(){
    console.log("submodule click..")
    this.user.lock_qrbutton=false;
    this.user.module_qrbutton=true;
    this.navCtrl.navigateRoot('/addnewmodule'); 
  }

}
