import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private navCtrl:NavController,
              public platfrom: Platform) {
      // alert("home call");
      this.platfrom.ready().then(()=>{
        // alert("home call1");
        // this.calculateDistanceWithGoogleApi();
        // alert("home call2");
      })
    }

  ngOnInit(){
    // this.calculateDistanceWithGoogleApi();
    let token=localStorage.getItem('token');
    if(token!=null){
      this.navCtrl.navigateRoot('/mainpage');
    }
    if(token==null){
      this.navCtrl.navigateRoot('/home');
    }
  }

// calculateDistanceWithGoogleApi(){
//   alert("home call 3..")
//   var gps1=new google.maps.LatLng(28.49555906988707,76.98702201976585);
//   alert("gps1:"+gps1);
//   var gps2=new google.maps.LatLng(28.4800292716136003,77.10198369236969);
//   var distanceinMetre=google.maps.geometry.spherical.computeDistanceBetween(gps1,gps2);
//   alert("dist call.."+ distanceinMetre);
// }

}
