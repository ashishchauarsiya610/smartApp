import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-addschedules',
  templateUrl: './addschedules.component.html',
  styleUrls: ['./addschedules.component.scss'],
})

export class AddschedulesComponent implements OnInit {
 
  button1=true;
  button2=false;
  imgPath;
  maincardscheduler = true;
  showdevicescheduler = false;   // for device only show
  scheduledDevices: any = "";
  sdevices: any = "";
  maindevices:any=[];
  sdevices1: any = [];
  editSchedulerDevice = false;
  getid;
  getname;
  startdate;
  enddate;
  device_id;
  tstatus: boolean = false;
  editScheduledDevice=false;

   // Readable Address
   address: string;
   flower:boolean=true;
   special:boolean=false;
 
   // Location coordinates
   latitude: number;
   longitude: number;
   accuracy: number;

     //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };


  constructor(public user: UserService,
              public auth: AuthService,
              private navCtrl: NavController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public platform: Platform
              ) 
              { 
                // this.getGeolocation();
                this.platform.ready().then(()=>{
                  this.getDistanceFromLatLonInKm();
                  this.getGeolocation();
                })
              }

  ngOnInit() {
    this.getAllScheduledDevides();
  }
    //------------ get Scheduled device on mainscreen -----//
  getAllScheduledDevides() {
    console.log("scheduler clickcmain page....");
    this.auth.getDeviceforSchedularfromApi().subscribe(res => {
      this.scheduledDevices = res;
      for (var i = 0; i < this.scheduledDevices.length; i++) {
        this.sdevices1[i] = [{
          'id': this.scheduledDevices[i].id,
          'name': this.scheduledDevices[i].name,
          'device': this.scheduledDevices[i].device,
          'on_time': this.scheduledDevices[i].on_time.substr(11, 15),
          'is_on': this.scheduledDevices[i].is_on,
          'off_time': this.scheduledDevices[i].off_time.substr(11, 15),
          'is_off': this.scheduledDevices[i].is_off,
          'is_daily': this.scheduledDevices[i].is_daily,
          'is_enabled': this.scheduledDevices[i].is_enabled
        }]
      }
      console.log(JSON.stringify(this.sdevices1))
    })
  }

  setReSchedulertime(sdid, sdname,device_id) {
    console.log("click main card for popup to Rescheduled device.")
    this.editScheduledDevice = true;
    this.getid = sdid;
    this.getname = sdname;
    this.device_id=device_id;
    console.log("SchedulerCLick_id"+this.getid);
    console.log(this.getname);
    console.log("Scheduler_maindCLick_id"+this.device_id)

  }

  submitReScheduled(id){
    this.editScheduledDevice = false;
             var d_id=this.getid;
             var dmain_id=this.device_id;
    console.log("delete_id"+d_id);
    console.log("maindevice_id"+dmain_id)
    let dev_Detail = {
      "name": this.getname,
      "is_daily": this.tstatus,
      "is_enabled": true,
      "on_time": this.startdate.substr(0, 19).replace("T", " "),
      "off_time": this.enddate.substr(0, 19).replace("T", " "),
      "device": dmain_id
    };
    this.user.present('Please wait...');
   this.auth.del_ScheduledDevice(d_id).subscribe(res=>{
      console.log("it deleted for updated , automatic after deleted generate new scheduler:"+ res)
   this.auth.postDeviceSchedularFromApi(dev_Detail).subscribe(res=>{
    console.log("updated ReScheduler res:"+ res);
    // this.editScheduledDevice = false;
    // this.getAllScheduledDevides(); 
    this.user.dismiss();
  },err=>{
    this.user.dismiss();
    this.user.showToast('err.error');
  })
  },err=>{
    this.user.dismiss();
    this.user.showToast("Some error has occurred. Please contact with our support team or retry after sometimes.")
  })
  }
      //-------- deleted click on popup , pop come after clicking maincard ----//
  deleteScheduledDevice() {
    var d_id=this.getid;
    console.log("delete click:" + d_id);
    this.user.present('Please wait...');
    this.auth.del_ScheduledDevice(d_id).subscribe(res=>{
      console.log(res);
      this.getAllScheduledDevides();
      this.editScheduledDevice  = false;
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      this.user.showToast("Some error has occurred. Please contact support@dyfolabs.com or retry after sometimes.")
    })
  }

  dd=this.user.device_id_forScheduler;
  
    //---------------------- Get all devices fab click----//
  getAlldeviceforschedule() {
    console.log("scheduler click in popup ..get device after fab click.");
    this.showdevicescheduler = true;
    this.maincardscheduler = false;
    this.editSchedulerDevice = false;
    this.button1=false;
    this.button2=true;

    this.auth.showAllAddedDevicesScheduler(this.dd).subscribe(res => {
      this.sdevices = res;
     this.maindevices=[];
     for(var i=0;i<this.sdevices.length;i++){
      let type=this.showIcon(this.sdevices[i].device_type)
       this.maindevices[i]=[{
         'id':this.sdevices[i].id,
         'device':this.sdevices[i].device,
         'name':this.sdevices[i].name,
         'device_type':this.sdevices[i].device_type,
         'type':type,
       }]
     }
     console.log(JSON.stringify(this.sdevices))
    })
  }

  setSchedulertime(sid, sname,sdtype) {
    this.getid = sid;
    this.getname = sname;   
    console.log("mainClick_id"+ this.getid)
    console.log("mainclick_name"+sid);
    console.log("mainclick_type"+ sdtype);  
    this.editSchedulerDevice = true;
  }
  submitScheduledDevice() {
    this.maincardscheduler = true;
    this.showdevicescheduler = false;
    this.getid;
    this.getname;
    // this.startdate=new Date().toISOString();
    console.log(this.getname)
    console.log(this.tstatus);
    console.log(this.startdate.substr(0, 19).replace("T", " "));
    console.log(this.enddate.substr(0, 19).replace("T", " "));
    console.log(this.getid);
    console.log("submitscheduleclick:" + this.getid)
    
    let dev_Detail = {
      "name": this.getname,
      "is_daily": this.tstatus,
      "is_enabled": true,
      "on_time": this.startdate.substr(0, 19).replace("T", " "),
      "off_time": this.enddate.substr(0, 19).replace("T", " "),
      "device": this.getid
    };
    this.user.present('Please wait...');
    this.auth.postDeviceSchedularFromApi(dev_Detail).subscribe(res => {
     
      this.getAllScheduledDevides();  //load device automatic after schedule device
      console.log("updateschedulaer"+ res);
     this.user.dismiss();
     this.editScheduledDevice = false;
    },err=>{
      this.user.dismiss();
      this.user.showToast("Some error has occurred. Please contact support@dyfolabs.com or retry after sometimes.")
    })
  }

  showIcon(name) {
    if (name == "Musical_Mood") {
      return this.imgPath = 'assets/icon/tubelight.png'
    }
    if (name == "Disco_Mood") {
      return this.imgPath = 'assets/icon/fan.png'
    }
    if (name == "Tube_Light") {
      return this.imgPath = 'assets/icon/tubelight.png'
    }
    if (name == "Fan") {
      return this.imgPath = 'assets/icon/fan.png'
    }
    if (name == "TELEVISION") {
      return this.imgPath = 'assets/icon/tv.png'
    }
    if (name == "Bulb") {
      return this.imgPath = 'assets/icon/light.png'
    }
    if (name == "Lamp") {
      return this.imgPath = 'assets/icon/wall-lamp.png'
    }
    if (name == "Geyser") {
      return this.imgPath = 'assets/icon/geyser.png'
    }
    if (name == "AC") {
      return this.imgPath = 'assets/icon/ac.jpg'
    }
    if(name=="Table_Lamp") {
      return this.imgPath = 'assets/icon/table_lamp.png'
    }
    if (name == "Chandelier") {
      return this.imgPath = 'assets/icon/chandelier.png'
    }
    if(name=="Table_Fan") {
      return this.imgPath = 'assets/icon/table_fan.png'
    }
    if(name=="Curtain") {
      return this.imgPath = 'assets/icon/curtain.png'
    }
    if(name=="") {
      return this.imgPath = 'assets/icon/curtain.png'
    }
  }



  //Get current coordinates of device
  getGeolocation() {
    console.log('latitude call..');
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;
     console.log("lati:"+ this.latitude);
     console.log("long"+ this.longitude)

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
      console.log('erroen')
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
        alert("current Address:"+ this.address);
        this.getDistanceFromLatLonInKm();
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
        this.getDistanceFromLatLonInKm();
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  deg2rad;
  getDistanceFromLatLonInKm() {
    alert('distance call..');
    this.calculateDistance();
    var gps1= new google.maps.LatLng(28.495556906988707, 76.987022);
    var gps2= new google.maps.LatLng(28.480029271636003,77.10198369236969);
    var distanceinMetre= google.maps.geometry.spherical.computeDistancebetween(gps1,gps2);
    alert("dd"+ distanceinMetre);
    alert(this.latitude);
    alert(this.longitude)
    // var lat1=this.latitude;
    // var lon1=this.longitude;
    // var lat2:any= this.latitude;
    // var lon2:any= this.longitude;
    // var R = 6371; // Radius of the earth in km 
    // var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    // var dLon = this.deg2rad(lon2-lon1); 
    // var a = 
    //   Math.sin(dLat/2) * Math.sin(dLat/2) +
    //   Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    //   Math.sin(dLon/2) * Math.sin(dLon/2)
    //   ; 
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    // var d = R * c; // Distance in km
    
    // return d.toFixed(2);
    
  }
  backbutton(){
    this.user.showDevice=false;
    this.user.showRoom=true;
  }

lat1:any=28.495556906988707;
lat2:any=28.480029271636003;
long1:any=76.987022;
long2:any=77.10198369236969;
  calculateDistance(){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((this.lat1-this.lat2) * p) / 2 + c(this.lat2 * p) *c((this.lat1) * p) * (1 - c(((this.long1- this.long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }
}
