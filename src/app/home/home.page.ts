import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl:NavController,) {}

  ngOnInit(){
  
    let token=localStorage.getItem('token');
    if(token!=null){
      this.navCtrl.navigateRoot('/mainpage');
    }
    if(token==null){
      this.navCtrl.navigateRoot('/home');
    }
  }

}
