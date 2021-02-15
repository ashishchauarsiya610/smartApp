import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addlockinroom',
  templateUrl: './addlockinroom.component.html',
  styleUrls: ['./addlockinroom.component.scss'],
})
export class AddlockinroomComponent implements OnInit {
 @Input() lock_id;
 @Input() lock_serial;
 type;
 existroom=false;
 newroom=false;
 myRooms;
 imgPath;
constructor(public auth: AuthService,
           private navCtrl: NavController,
           private menu: MenuController,
           public user:UserService,
           public viewCtrl: ModalController)  { 
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
  
 }
}

getExistingRoom(){
 this.auth.getRoomFromApi().subscribe(res =>{
   this.myRooms = res;
   console.log(JSON.stringify(res));
   console.log(("addlockinroompage: "+this.lock_id));
 },err =>{
     localStorage.clear();
     this.navCtrl.navigateRoot('/home');
   })
}
lockresAddingroom;
 //------- Add device with module in Existing Room ----------//
selectexistroom(roomid){
console.log("roomclick_Room_id:" + roomid);
var lockid=this.lock_id;
console.log(("addlockpagepage_lock_id for adding lock in room: "+ lockid));
console.log("lock_serail:"+ this.lock_serial);

this.auth.addLockInRoom(lockid,roomid).subscribe((res)=>{
this.lockresAddingroom=res;
    this.dismiss();
    this.navCtrl.navigateRoot('/mainpage');
    console.log("lockresafter_addingInRoom:" + JSON.stringify(this.lockresAddingroom))
},err=>{
     this.user.showToast('Device already added in room.Please contact support@omilock.com.');  
     this.dismiss();
    this.navCtrl.navigateRoot('/mainpage');
})
}

 //------- Add device with module in New Room ----------//
selectnewroom(newroomname){
 console.log("newrooomclick:" + newroomname)
 let lockid=this.lock_id;
 let name=newroomname;
 let type=newroomname;
 console.log("creating room name:" + newroomname);
 console.log("creating room type:" + newroomname);
 console.log(("addlockinRoom_lock_id for adding lock in room: "+ lockid));
console.log("lock_serail:"+ this.lock_serial);
this.auth.createRoom(name,type).subscribe((res)=>{
  this.roomID = res; 
  console.log("new created Room_id:" + (this.roomID.id))
  this.auth.addLockInRoom(lockid,this.roomID.id).subscribe((res)=>{
    this.lockresAddingroom=res;
    this.dismiss();
    this.navCtrl.navigateRoot('/mainpage');
    console.log("lockResafter_addingIn_New_Room:" + JSON.stringify(this.lockresAddingroom))
  },err=>{
    this.user.showToast('Device already added in room.Please contact support@omilock.com.');  
    this.dismiss();
   this.navCtrl.navigateRoot('/mainpage');
  })
},err=>{
     this.dismiss();
     this.navCtrl.navigateRoot('/mainpage');
     console.log("room creation error")
})
 
}

showRoomType(name){
 if (name == "Living_Room") {
     // return this.imgPath = 'assets/icon/living3.png'
     return this.imgPath = 'assets/icon/living_Room.jpeg'
 }
 if(name=="Bed_Room") {
  // return this.imgPath = 'assets/icon/bedroom1.jpg'
      // return this.imgPath = 'assets/icon/cozy_room.jpg'
      return this.imgPath = 'assets/icon/bedRoom.jpeg'
 }
 if (name == "Kitchen") {
      // return this.imgPath = 'assets/icon/kitchen2.png'
      return this.imgPath = 'assets/icon/kitchenRoom.jpeg'
 }
 if(name=="Kids_Room") {
   return this.imgPath = 'assets/icon/kids.png'
 }
 if(name=="Drawing_Room") {
   return this.imgPath = 'assets/icon/drawing2.jpg'
 }
 if (name == "Balcony") {
   return this.imgPath = 'assets/icon/balcony1.jpeg'
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
  return this.imgPath = 'assets/icon/MidRoom.jpg'
 }
 if (name == "Guest_Room") {
   return this.imgPath = 'assets/icon/guest2.png'
 }
 if(name=="Theater_Room") {
   return this.imgPath = 'assets/icon/theatre1.jpg'
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
   return this.imgPath = 'assets/icon/dining2.jpg'
 }
 if(name=="Stairs") {
   return this.imgPath = 'assets/icon/stairs1.png'
 }
 if(name=="Garage_Room") {
  return this.imgPath = 'assets/icon/garage.jpg'
}
if(name=="Outdoor_Lawn") {
  return this.imgPath = 'assets/icon/outdoor_lawn.jpg'
}
}




name;

roomID;

public selectedRooms;

public mySavedDevice ;

public getRooms;

public rooms = [{
  name: 'Living_Room', imgPath: 'assets/icon/living_room.jpg', id: 1
}, {
  name: 'Bed_Room', imgPath: 'assets/icon/bedroom.jpeg', id: 2
}, {
  name: 'Kitchen', imgPath: 'assets/icon/kitchen.jpg', id: 3
}, {
  name: 'Kids_Room', imgPath: 'assets/icon/kidsroom.jpg', id: 4
}, {
  name: 'Drawing_Room', imgPath: 'assets/icon/drawing-room.jpg', id: 5
}, {
  name: 'Balcony', imgPath: 'assets/icon/balcony.jpg', id: 6
},{
  name: 'Bathroom', imgPath: 'assets/icon/bathroom.jpg', id: 7
}, {
  name: 'Toilet', imgPath: 'assets/icon/toilet.jpg', id: 8
}, {
  name: 'Corridoor', imgPath: 'assets/icon/corridor.jpg', id: 9
},{
  name: 'Hall', imgPath: 'assets/icon/hall.jpg', id: 10
}, {
  name: 'Guest_Room', imgPath: 'assets/icon/guest_room.jpg', id: 11
}, {
  name: 'Theater_Room', imgPath: 'assets/icon/theater_room.jpeg', id: 12
},{
  name: 'Store_Room', imgPath: 'assets/icon/store1.jpg', id: 13
}, {
  name: 'Office', imgPath: 'assets/icon/office_room.jpg', id: 14
}, {
  name: 'Conference', imgPath: 'assets/icon/conference.jpg', id: 15
},{
  name: 'Dining_Room', imgPath: 'assets/icon/dining room.jpeg', id: 14
}, {
  name: 'Stairs', imgPath: 'assets/icon/stairs.jpg', id: 15
},
];

// openMenu() {
//  this.menu.enable(true);
// }



dismiss() {
this.viewCtrl.dismiss();
}
}