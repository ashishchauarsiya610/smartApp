import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-qrdeviceforroom',
  templateUrl: './qrdeviceforroom.component.html',
  styleUrls: ['./qrdeviceforroom.component.scss'],
})
export class QrdeviceforroomComponent implements OnInit {

  player;
  type;
  existroom=false;
  newroom=false;
  myRooms;
  imgPath;
constructor(public auth: AuthService,
            private navCtrl: NavController,
            
            public user:UserService,
            )  { 
      
            
            }

ngOnInit() {}
selectOne(e){
  this.type=e.currentTarget.value;
  console.log(this.type)
  if(this.type=="existroom"){
    this.existroom=true;
    this.newroom=false;
    this.getExistingRoom();
  }
  if(this.type=="newroom"){
   this.existroom=false;
   this.newroom=true;
  //  this.user.show_deviceRoom;
  //  this.user.show_deviceirRoom;
  //  this.user.show_devicemoodRoom;
  }
}

getExistingRoom(){
  this.auth.getRoomFromApi().subscribe(res =>{
    this.myRooms = res;
    console.log(JSON.stringify(res));
   
  },err =>{
      localStorage.clear();
      this.navCtrl.navigateRoot('/home');
    })
}

  //------- Add device with module in Existing Room ----------//
selectexistroom(roomid){
 console.log("roomclick_Room_id:" + roomid);
 var module__pi_id=this.player;
 console.log(("devicepage_pi_id for getting device in that module: "+module__pi_id));
 if(this.user.dd_name=='Ir_Blaster'){
  this.auth.saveRemote(this.user.remote_iid,this.user.module_piId,roomid).subscribe(res=>{
    this.navCtrl.navigateRoot('/mainpage');
    this.user.dismiss();
  },err=>{
    this.user.showToast("something went wrong.please try again later.");
    this.user.dismiss();
    this.navCtrl.navigateRoot('/mainpage');
  })
 }
 else if(this.user.dd_name=='Mood_Lighting'){
  this.auth.postmooddevice(roomid,this.user.moodDevice_id).subscribe(res=>{
    console.log('mood' + res);
    this.navCtrl.navigateRoot('/mainpage');
    this.user.dismiss();
     },err=>{
       this.user.showToast('Device already added in room.');
     this.user.dismiss();
     this.navCtrl.navigateRoot('/mainpage');
     })
 }
 else{

 this.auth.devicesForModule(module__pi_id).subscribe(res => {
  this.mySavedDevice=res;
  console.log("res for get deviceid:"+ this.mySavedDevice);

 for (let i = 0; i < this.mySavedDevice.length; i++) {
  let device = this.mySavedDevice[i].device;
  console.log("id_device used during device adding in room:"+ device)
  this.auth.savedChangedRoom(roomid, device).subscribe((res) => {
    this.getRooms = res;
    console.log("added devices in existing room:" + JSON.stringify(this.getRooms))
    
    this.navCtrl.navigateRoot('/mainpage');    
  }, err => {
    this.user.showToast('Device already added in room.');
    // alert("Device already added in room");
    
    this.navCtrl.navigateRoot('/mainpage'); 
    // alert(err.device)
  })
}
 },err=>{this.user.showToast(err.error);
  
}) 
 }

}
 
  //------- Add device with module in New Room ----------//
  room_iid;
selectnewroom1(newroomname){
  console.log("newrooomclick:" + newroomname)
  var module__pi_id=this.player;
  let name=newroomname;
  let type=newroomname;
  if(this.user.dd_name=='Ir_Blaster'){
    this.user.present('please wait..')
    this.auth.createRoom(name,type).subscribe((res) => {
      this.room_iid = res; 
      console.log("id_Room used during ir adding in room:"+ this.room_iid.id);
      this.auth.saveRemote(this.user.remote_iid,this.user.module_piId,this.room_iid.id).subscribe(res=>{
        this.navCtrl.navigateRoot('/mainpage');
        this.user.dismiss();
      },err=>{
        this.user.showToast("something went wrong.please try again later.");
        this.user.dismiss();
        this.navCtrl.navigateRoot('/mainpage');
      })
    },err=>{
      this.user.showToast("something went wrong.please try again later.");
        this.user.dismiss();
        this.navCtrl.navigateRoot('/mainpage');
    })
  }
   else if(this.user.dd_name=='Mood_Lighting'){
     this.user.present('please wait...');
    this.auth.createRoom(name,type).subscribe(res=>{
      this.room_iid = res; 
      console.log("id_Room used during ir adding in room:"+ this.room_iid.id);
      this.auth.postmooddevice(this.room_iid,this.user.moodDevice_id).subscribe(res=>{
     console.log('mood' + res);
     this.navCtrl.navigateRoot('/mainpage');
     this.user.dismiss();
      },err=>{
        this.user.showToast('Device already added in room.');
      this.user.dismiss();
      this.navCtrl.navigateRoot('/mainpage');
      })
    },err=>{
      this.user.showToast("something went wrong.please try again later.");
      this.user.dismiss();
      this.navCtrl.navigateRoot('/mainpage');
    })
  }
  else{
  console.log("creating room name:" + newroomname);
  console.log("creating room type:" + newroomname);
  console.log(("devicepage_pi_id for getting device in that module: "+module__pi_id));
  this.auth.devicesForModule(module__pi_id).subscribe(res => {
   this.mySavedDevice=res;
   console.log("res1 for get deviceid:"+ this.mySavedDevice);
   this.auth.createRoom(name,type).subscribe((res) => {
    this.roomID = res; 
    console.log("new created room_id:"+ this.roomID.id);
    console.log("res2 inside roomcereate api for get deviceid:"+ this.mySavedDevice);
    for (let i = 0; i < this.mySavedDevice.length; i++) {
      let device = this.mySavedDevice[i].device;
      console.log("id_Room used during device adding in room:"+ this.roomID.id);
      console.log("id_Device used during device adding in room:"+ device)
      this.auth.savedChangedRoom(this.roomID.id, device).subscribe((res) => {
        this.getRooms = res;
        console.log("added devices in new created room:" + JSON.stringify(this.getRooms));
       
        this.navCtrl.navigateRoot('/mainpage');
      }, err => {
        // alert("Device already added in room.");
        this.user.showToast('Device already added in room.');
        
        this.navCtrl.navigateRoot('/mainpage');
        // alert(JSON.stringify(err.device))
      })
    }
  },err=>{
    
    this.navCtrl.navigateRoot('/mainpage');
    console.log("room creation error")
  });
  },err=>{this.user.showToast("something went wrong.please try again later.");
   
   this.navCtrl.navigateRoot('/mainpage');
  }) 
}

}
selectnewroom2(r){
console.log(r);
}

selectnewroom(rr){
console.log(rr);
}

showRoomType(name){
  if (name == "Living_Room") {
    return this.imgPath = 'assets/icon/living3.png'
  }
  if(name=="Bed_Room") {
    return this.imgPath = 'assets/icon/bedroom1.jpg'
  }
  if (name == "Kitchen") {
    return this.imgPath = 'assets/icon/kitchen2.png'
  }
  if(name=="Kids_Room") {
    return this.imgPath = 'assets/icon/kids1.png'
  }
  if(name=="Drawing_Room") {
    return this.imgPath = 'assets/icon/drawing2.jpg'
  }
  if (name == "Balcony") {
    return this.imgPath = 'assets/icon/balcony1.jpg'
  }
  if(name=="Bathroom") {
    return this.imgPath = 'assets/icon/bathroom2.jpg'
  }
  if (name == "Toilet") {
    return this.imgPath = 'assets/icon/toilet1.png'
  }
  if(name=="Corridoor") {
    return this.imgPath = 'assets/icon/corridor1.jpg'
  }
  if(name=="Hall") {
    return this.imgPath = 'assets/icon/hall2.jpg'
  }
  if (name == "Guest_Room") {
    return this.imgPath = 'assets/icon/guest2.jpg'
  }
  if(name=="Theater_Room") {
    return this.imgPath = 'assets/icon/theatre1.jpeg'
  }
  if (name == "Store_Room") {
    return this.imgPath = 'assets/icon/store1.jpg'
  }
  if(name=="Office") {
    return this.imgPath = 'assets/icon/office3.jpg'
  }
  if(name=="Conference") {
    return this.imgPath = 'assets/icon/conference3.jpg'
  }
  if(name=="Dining_Room") {
    return this.imgPath = 'assets/icon/dining2.jpeg'
  }
  if(name=="Stairs") {
    return this.imgPath = 'assets/icon/stairs1.png'
  }
  if(name=="Garage_Room") {
    return this.imgPath = 'assets/icon/garage.jpg'
  }
  if(name=="Outdoor_Lawb") {
    return this.imgPath = 'assets/icon/outdoor_lawn.jpg'
  }
}





name;
roomID;
public selectedRooms;
public mySavedDevice ;
public getRooms;
public rooms = [{
  name: 'Living_Room', imgPath: 'assets/icon/living3.png', id: 1
}, {
  name: 'Bed_Room', imgPath: 'assets/icon/bedroom1.jpg', id: 2
}, {
  name: 'Kitchen', imgPath: 'assets/icon/kitchen2.png', id: 3
}, {
  name: 'Kids_Room', imgPath: 'assets/icon/kids1.png', id: 4
}, {
  name: 'Drawing_Room', imgPath: 'assets/icon/drawing2.jpg', id: 5
}, {
  name: 'Balcony', imgPath: 'assets/icon/balcony1.jpeg', id: 6
},{
  name: 'Bathroom', imgPath: 'assets/icon/bathroom2.jpg', id: 7
}, {
  name: 'Toilet', imgPath: 'assets/icon/toilet1.png', id: 8
}, {
  name: 'Corridoor', imgPath: 'assets/icon/corridor1.jpg', id: 9
},{
  name: 'Hall', imgPath: 'assets/icon/hall2.jpg', id: 10
}, {
  name: 'Guest_Room', imgPath: 'assets/icon/guest2.png', id: 11
}, {
  name: 'Theater_Room', imgPath: 'assets/icon/theatre1.jpg', id: 12
},{
  name: 'Store_Room', imgPath: 'assets/icon/store1.jpg', id: 13
}, {
  name: 'Office', imgPath: 'assets/icon/office3.jpg', id: 14
}, {
  name: 'Conference', imgPath: 'assets/icon/conference3.jpg', id: 15
},{
  name: 'Dining_Room', imgPath: 'assets/icon/dining2.jpg', id: 16
}, {
  name: 'Stairs', imgPath: 'assets/icon/stairs1.png', id: 17
},
{
  name: 'Garage_Room', imgPath: 'assets/icon/garage.jpg', id: 18
},
{
  name: 'Outdoor_Lawn', imgPath: 'assets/icon/outdoor_lawn.jpg', id: 19
},
];

// openMenu() {
//   this.menu.enable(true);
// }


}