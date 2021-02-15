import { Component, OnInit, ViewChild, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { IonSlides, MenuController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { DevicesComponent } from '../devices/devices.component';
import { AuthService } from 'src/app/services/auth.service';
// import { Network } from '@ionic-native/network/ngx';
import { UserService } from 'src/app/services/user.service';
// import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { NavigationExtras, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  profName;
  @ViewChild('slider', { static: false }) slide: IonSlides;
  sliderOne: any;
  slideOpt = {
    initialSlide: 0,
    // slidesPerView: 2,
  };
  @ViewChild('toggleButton',{ static: false }) toggleButton: ElementRef;
  @ViewChild('menu1',{ static: false }) menu1: ElementRef;
  mySavedDevice = [];
  constructor(private menu: MenuController,
              // private network: Network, 
              private device: DevicesComponent, 
              public auth: AuthService, 
              private navCtrl: NavController,
              public user:UserService,
              private loadingCtrl: LoadingController,       
              public alertController: AlertController,
              public route: Router,
              ) {
                setTimeout(()=>{
                  this.user.username=localStorage.getItem('prof');
              },3000);
  }



  // showRoom = true;
  // showDevice = false;
  ngOnInit() {
    this.addRooms();
    this.menu.enable(true);
  }
  ionViewWillEnter() {
    // this.ngOnInit();
    this.addRooms();
    // this.tTLocklist();
  }
  tvRemote=false;
  myRooms;
  deletedeviceroomid;
  room1 = [];
  room2 = [];
  devices;
  pressKeyModule;
  remoteId;
  irModule;
  moodDevices;
  editMoodDevice;
  moodDevices1= [];
  fullRoom = false;
  type = [];
  deviceInfo = [];
  roomDevice = [];
  getDevice = [];
  deviceStatus;
  device1;
  deviceId = [];
  name = [];
  device2 = [];
  device3;
  dType;
  dimmable = false;
  deviceFromApi = false;
  device4 = [];
  imgPath;
  deviceToAdd;
  rangeVal;
  value = [];
  // val = [];
  val;
  show = false;
  status;
  state;
  appliances = false;
  min;
  max;
  deviceInformation = true;
  range;
  roomNameChange = false;
  public room_name = [];
  deviceedit=false;
  public loading;
  dname;
  dtype;
  sbmtdeviceid;
  roomallId;
  nodevice=false;
  switchToWifi(){
    this.navCtrl.navigateRoot('/tabs/scanner');
  }
  addRooms() {
   
    this.auth.getRoomFromApi().subscribe(res =>{
      this.myRooms = res;
      
      console.log(JSON.stringify(this.myRooms));
      if(this.myRooms==''){
        console.log('room not added ')
        this.nodevice=true;
      }
    //   for(let i=0;i<this.myRooms.length;i++){
    //  this.roomallId=this.myRooms[i].id;
    //  this.auth.putdevicestatus(this.roomallId).subscribe(res=>{
    //    console.log(res);
    //  },err=>{
    //    console.log(err.error);
    //  })
    //   }
      
      // this.getAllDevices(this.room1[0].name);
      // this.getAllRemote(this.room1[0].name);
      // this.showMoodEffect(this.room1[0].name);
    },err =>{
        // alert(err.error);
        // alert('Please Login again');
        localStorage.clear();
        this.navCtrl.navigateRoot('/home');
      })
   
  }
  
   
  
irDevs=[];
normalDevs=[];
moodDevs =[];
lockDevs =[];
devPageTitle
devPageRoomId;
is_onlineStatus=[];
onlinestatus=false;
offlinestatus=false;
disableSelector;
dd_status=[];
// device_inRoom;
   openDevices(roomID,roomNaMe){
     this.user.roomnm=roomNaMe;
     this.user.room_refresh_id=roomID;
    console.log(this.user.roomnm);
    console.log(this.user.room_refresh_id);
    this.show=false;
    // this.normalDevs=[];
    this.moodDevs =[];
    // this.lockDevs =[];
    console.log(this.normalDevs)
    // this.showRoom = false;
    this.user.showRoom = false;
    // this.showDevice = true;
    this.user.showDevice=true;
    console.log("roomid-"+ roomID);
    
//     this.loading=await this.loadingCtrl.create({
//       message:'please wait..',
//       duration: 5000,
//       showBackdrop: true,
//   });
//  this.loading.present().then(()=>{  
//   this.addRooms();
// })


this.user.present('loading devices...')
  this.auth.putdevicestatus(roomID).subscribe(res=>{ 
  console.log("send room id for device sttaus:-"+ JSON.stringify(res));
  this.auth.getDeviceFromApi(roomID).subscribe(res=>{
    this.user.device_inRoom=res;
  console.log('room lock'+ roomNaMe+':'+ JSON.stringify(res));
  for(let i of this.user.device_inRoom){
    if(i.is_online=='False'){
   i.is_online=true;
    }
    else if(i.is_online=='True'){
      i.is_online=false;
    }
   }
   this.user.dismiss();
},err=>{
  this.user.dismiss();
  console.log('getting device in room error')
})
      
      //  this.loading.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
   
  }) 
    for(let r of this.myRooms){
      if(r.id == roomID){
        setTimeout(()=>{
  // let head = document.getElementById('dev_head')
  this.devPageTitle = r.name;
  this.devPageRoomId=r.id;
        $('#dev_head').css( '--background','url('+"/"+this.showRoomType(r.room_type)+')');
        },1000)
        
        // alert(JSON.stringify(r.remotedevice_set))
        // this.irDevs = r.remotedevice_set;
        this.getAllRemote(r.remotedevice_set)
        this.normalDevs = r.roominfo_set;
        console.log(this.normalDevs)
        // for(let i of this.normalDevs){
        //  if(i.is_online=='False'){
        // i.is_online=true;
        //  }
        //  else if(i.is_online=='True'){
        //    i.is_online=false;
        //  }
        // }

        //----------get Offline ONline device status----/// 
        
    //      for(let i=0;i<this.normalDevs.length;i++){
    //        console.log(this.normalDevs)
    //    this.normalDevs[i].is_online;
    //      if(this.normalDevs[i].is_online=='False'){            
    //         console.log('offline');
    //         this.offlinestatus=true;
    //         this.onlinestatus=false;
    //         this.disableSelector = true;            
    //  }
    //  if(this.is_onlineStatus[i]=='True') {  
    //     console.log('online');
    //     this.onlinestatus=true;
    //    this.offlinestatus=false;
    //    this.disableSelector = false;
        
    //  }
    //  }
        
       
         // alert(JSON.stringify(r.moodlightingdevice_set))
        // this.moodDevs = r.moodlightingdevice_set;
        this.showMoodEffect(r.moodlightingdevice_set)
        // alert(JSON.stringify(r.lock_set))
        this.lockDevs = r.lock_set;
        console.log(this.lockDevs);
      }
      
    }
    // this.getAllDevices(roomName);
    // this.getAllRemote(roomName)
    // this.showMoodEffect(roomName);
  }

  lockclick(l_serial_info,l_serial_number){
    this.user.l_serial_info=l_serial_info;
    this.user.l_serial_number=l_serial_number;

    console.log(JSON.stringify(this.user.l_serial_info));
    console.log("lock clicked..serial_no:"+ this.user.l_serial_number);
    this.navCtrl.navigateRoot('/btconnect');   
  }
  backbutton(){
    this.show=false;
  }
  showRemote(productName,remoteId,pi_id,company_name){
   // if(productName=="AC")
    this.remoteId=remoteId;
    this.user.productName=productName;
    this.user.companyName=company_name;
    this.user.remoteIdforKeyPress=remoteId;
    //this.user.remoteId=remoteId;
    // this.tvRemote=true;
    // this.myRooms=false;
    // this.deviceInformation=false;
    if(this.user.productName=='AC'){
      this.user.AC=true;
      this.user.TELEVISION=false;
     
    }
    else if(this.user.productName=='TELEVISION'){
      this.user.AC=false;
      this.user.TELEVISION=true;
     
    }
    this.navCtrl.navigateRoot('/ir-remote');
    this.user.moduleIdForKey=pi_id;
    
    
  }
  clickdeviceforstatus(d_id,d_status,d_name,id_for_del_dev){
    this.show=false;   // for hide edit device roomname and delete device card
   console.log("d_id"+ d_id);
   console.log("id_for_del_dev"+ id_for_del_dev);
   console.log("d_status" + d_status);
   this.user.device_status_id=d_id;
   this.user.device_status_status=d_status;
   let navigationExtras: NavigationExtras = {
    queryParams:{
      special: btoa(this.user.device_status_id),
      special1:btoa(this.user.device_status_status),  
      special2: btoa(d_name),   
      special3: btoa(this.devPageTitle),
      special4: btoa(id_for_del_dev)      
    }
  };
console.log("device click for all edit sattus")
this.route.navigate(['devicestatus'], navigationExtras);
  }


  //----- mood lighting Effect and function started here
  showMoodEffect(res){
        //this.ionViewWillEnter();

    // this.auth.getAddedMoodDevices(h).subscribe(res=>{
       this.moodDevices1=[]; 
      this.moodDevices=res;
      // this.user.moodDevice_id=this.moodDevices[0].id;
      for(let i=0;i<this.moodDevices.length;i++){
        let type1=this.showIcon(this.moodDevices[i].type)
        this.moodDevices1[i]=[{ 
          'id':this.moodDevices[i].id,                
          'pi_id':this.moodDevices[i].pi_id,
          'room': this.moodDevices[i].room,
          'name': this.moodDevices[i].type,
          'type':type1,
          'color_code': this.moodDevices[i].color_code,
        }]
      }
    // })   
  }
  deleteIRDevice(irid){
    console.log("ir_id_fordelete:" + irid);
    this.user.present('deleting Tam...')
    this.auth.del_ir_devicefromrum(irid).subscribe(res=>{
      console.log(res);
      this.auth.refreshPage();
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
    })
  }
  deleteblelockdevicefromroom(blelockid){
    console.log("b_lockid" + blelockid)
    this.user.present('please wait..')
    this.auth.deleteLock(blelockid).subscribe(res=>{
      console.log("deletelockres:" +res);
      this.auth.refreshPage();
      this.user.dismiss();
    },err=>{
      console.log(err.error);
      this.auth.refreshPage();
      this.user.dismiss();
    })

  }
  deletemooddevicefromroom(id){
    console.log("mmod_id:" + id)
    // this.auth.deleteMoodDevicefromRoom(id).subscribe(res=>{
      
    // },err=>{
      
    // })
  }
 async deleteRoomwithDevice(roomid_for_Delete){
    console.log("getroomid:" + roomid_for_Delete);
    
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        message: 'Are you sure you want to delete room?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'confirm',
            handler: () => {
              console.log('Confirm Okay');
              let rooom_id=roomid_for_Delete;
             console.log("ok_roomId:" +rooom_id);  
             this.user.present('deleting room...');
             this.auth.deleteRoom(rooom_id).subscribe(res=>{
               let i=this.room1.indexOf(rooom_id);
               this.room1.splice(i,1);
               this.user.showToast('module deleted successfully...');
               this.auth.refreshPage();
               this.user.dismiss();
             },err=>{
               this.user.dismiss();
               this.user.showToast("something went wrong.please try again later.");
               this.auth.refreshPage();
             })  
            }
          }
        ]
      });
      await alert.present();
    

  }

  togetmoodColor(id){
    this.user.room1=false;
    this.user.editRoom1=false;
    this.user.ashishmood=true;
    this.user.moodDevice_id=id;  
    this.navCtrl.navigateRoot('/mood');
  }

  editmoodDevice(id){
    this.editMoodDevice=true;
  }

  submiteditmooddevice(id){
this.auth.putMoodTypeFromApi(id,this.user.moodtype).subscribe(res=>{
  this.editMoodDevice=false;
  this.ngOnInit();
},err=>{err.error})

  }
  checkCheckedmood(e){
    this.dType = e.currentTarget.value;
    this.user.moodtype=this.dType;
  }
  
//  Ended here Mood Linghting Color Code

  showRoomType(name){
    if (name == "Living_Room") {
      // return this.imgPath = 'assets/icon/living3.png'
      return this.imgPath = 'assets/icon/living_Room.jpeg'
    }
    if(name=="Bed_Room") {
      return this.imgPath = 'assets/icon/bedroom1.jpg'
      // return this.imgPath = 'assets/icon/cozy_room.jpg'
      // return this.imgPath = 'assets/icon/bedRoom.jpeg'
    }
    if (name == "Kitchen") {
      return this.imgPath = 'assets/icon/kitchen2.png'
      // return this.imgPath = 'assets/icon/kitchenRoom.jpeg'
    }
    if(name=="Kids_Room") {
      return this.imgPath = 'assets/icon/kids1.png'
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
      // return this.imgPath = 'assets/icon/hall2.jpg'
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
  
  roomedit_Delete(s,room_id,room_name) {
    this.show = !this.show;
    console.log("edit_delete_room_id:"+ room_id)
    console.log(room_name);
    if (s == false) {
      this.show = true;
    }
    if (s == true) {
      this.show = false;
    }
  }
refresh_room(){
  console.log('refresh room click');
  this.normalDevs=[];
    this.moodDevs =[];
    this.lockDevs =[];
  // this.openDevices(this.user.roomnm,this.user.room_refresh_id);
  this.user.present('loading devices...')
  this.auth.putdevicestatus(this.user.room_refresh_id).subscribe(res=>{ 
  console.log("send room id for device sttaus:-"+ JSON.stringify(res));
  this.auth.getDeviceFromApi(this.user.room_refresh_id).subscribe(res=>{
    this.user.device_inRoom=res;
  console.log('room lock'+ this.user.roomnm+':'+ JSON.stringify(res));
  for(let i of this.user.device_inRoom){
    if(i.is_online=='False'){
   i.is_online=true;
    }
    else if(i.is_online=='True'){
      i.is_online=false;
    }
   }
   this.user.dismiss();
},err=>{
  this.user.dismiss();
  console.log('getting device in room error')
})
      
      //  this.loading.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
   
  }) 
 
}
  
  

  submit() {
    let deviceId = this.deviceToAdd.id;
    let name = (<HTMLInputElement>document.getElementById('deviceName')).value;
    let deviceType = this.dType;
    this.auth.setDeviceName(deviceId, name, deviceType).subscribe((res) => {
      let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
      this.auth.getToEditRoomInfo(h).subscribe(res => {
        let roomId = res[0].id;
          if (this.range != undefined) {
            let min = (<HTMLInputElement>document.getElementById('min')).value;
            let max = (<HTMLInputElement>document.getElementById('max')).value;
            this.auth.setMinMax(deviceId, min, max).subscribe(res => {
            })
          }
          this.auth.savedChangedRoom(roomId, this.deviceToAdd.device).subscribe((res) => {
            this.appliances = false;
            this.deviceFromApi = false;
            this.deviceInformation = true;
            this.getAllDevices(h);
            this.getAllRemote(h);
          })
      })
    })
  }
  // slideChanged() {
  //   let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
  //   this.getAllDevices(h);
  //   this.getAllRemote(h)
  //   this.showMoodEffect(h);
  // }

  getAllDevices(h) {
    this.auth.getDeviceFromApi(h).subscribe(res => {
      this.devices = res;
      this.normalDevs=this.devices;
      this.name = [];
      this.value = [];
      for (let i = 0; i < this.devices.length; i++) { 
        this.getDevice[i] = this.devices[i];
        this.auth.showaddedDevices(this.getDevice[i].device).subscribe(res => {
          this.device1 = res[0];
          this.type[i] = this.showIcon(this.device1.device_type);
              this.name[i] = [{
                'id':this.devices[i].id,
                'room':this.devices[i].id,
                'show': this.device1.is_dimmer,
                'max': this.device1.maximum,
                'min': this.device1.minimum,
                'value': this.device1.dimmer,
                'name': this.device1.name,
                'type': this.type[i],
                'device': this.device1.device,
                'pi_id': this.device1.pi_id,
                'status': this.device1.status,
                'is_online': this.device1.is_online,
                 'device_name': this.device1.device_name,
                 'device_type': this.device1.device_type              
          }]
        })
      }
    })
  }
  getAllRemote(res){
  //  this.auth.getAllSavedRemoteForRoom(h).subscribe(res=>{
     this.val=res;
     this.value=[];
     for(let i=0;i<this.val.length;i++){
          if(this.val[i].remote==null){
          let type=this.showIcon(this.val[i].ac_product_name)
          console.log("type ac"+ type);
          this.value[i]=[{
            'company_name':this.val[i].ac_company_name,
            'product_name':this.val[i].ac_product_name,
            'id':this.val[i].id,
            'pi_id':this.val[i].pi_id,
            'remote':this.val[i].ac_remote,
            'type':type,
            'status': false
          }]
        }
        if(this.val[i].remote!=null){
          let type=this.showIcon(this.val[i].product_name)
          console.log("type ac"+ type);
          this.value[i]=[{
            'company_name':this.val[i].company_name,
            'product_name':this.val[i].product_name,
            'id':this.val[i].id,
            'pi_id':this.val[i].pi_id,
            'remote':this.val[i].remote,
            'type':type,
            'status': false
          }]
        }
     }
  //  })
  }
room_editid;
editRoom(room_id) {
  this.room_editid=room_id;
  console.log('edit_room-id:' + this.room_editid);
    this.show = false;
    this.roomNameChange = true;
  }
 
sendRoomName(data) {
   let name=data.roomname;
    console.log(this.room_editid);
    console.log(name);
    this.user.present('please wait..');
      this.auth.editRoomInfo(this.room_editid, name).subscribe(res => {
        this.roomNameChange = false;
        this.auth.refreshPage();
        this.user.dismiss();
       console.log(res);
        this.deviceInformation = true;
        this.afterEdit(name);
        this.roomNameChange = false;
      },err=>{
        this.roomNameChange = false;
      this.user.dismiss();
       this.user.showToast('something went wrong.please try again later.');
      })
    
  }

  afterEdit(h) {
    this.auth.getRoomFromApi().subscribe(res => {
      this.myRooms = res;
      for (let i = 0; i < this.myRooms.length; i++) {

        let type= this.showRoomType(this.myRooms[i].room_type);
        this.room1[i]={
         'name':this.myRooms[i].name,
         'type':type 
        }
        this.getAllDevices(h);
        this.getAllRemote(h);
      }
    },
      err => {
        this.user.showToast(err.error);
        // alert(err.error);
      },
    )
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
    if (name == "TV") {
      return this.imgPath = 'assets/icon/tv.png'
    }
    if (name == "TELEVISION") {
      return this.imgPath = 'assets/icon/tv.png'
    }
    if (name == "Tv") {
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
    if (name == "Ac") {
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
    if(name=="Door_Lock") {
      return this.imgPath = 'assets/icon/Door_Lock.png'
    }
    if (name == "SETTOP BOX") {
      return this.imgPath = 'assets/icon/setupbox.png'
    }
    if (name == "MUSIC SYSTEM") {
      return this.imgPath = 'assets/icon/musicsystem.png'
    }
    if (name == "HOME THEATRE") {
      return this.imgPath = 'assets/icon/hometheatre.png'
    }
    if (name == "DVD PLAYER") {
      return this.imgPath = 'assets/icon/dvd.png'
    }
    if (name == "TATA sky") {
      return this.imgPath = 'assets/icon/tatasky.png'
    }
    if (name == "DTH") {
      return this.imgPath = 'assets/icon/dth.png'
    }
    else{
      // return this.imgPath = 'assets/HomePage/dyfo.png'
      return this.imgPath = 'assets/icon/tandt.png'
      // return this.imgPath = 'assets/icon/smartx.png'
    }
  }

 setDimmer(e) {
    let setdimmer = (<HTMLInputElement>document.getElementById('dimmervalue')).value;
    this.auth.putDimmerValueFromApi(e, setdimmer).subscribe(res => {
     }, err => {alert("dim err" + err) })
  }
 
 editDevice(id,roomId){
  this.deletedeviceroomid=roomId
    this.sbmtdeviceid=id;
  this.deviceedit=true; 
  this.auth.showaddedDevices(id).subscribe(res=>{
     this.dname=res[0].name;
    this.dtype=res[0].device_type;
  })
  this.auth.getDimmerStatusApi(id).subscribe(res=>{
    this.range = res[0];
  })
  }

 async submiteditdevice(id){
  let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
    this.loading =await this.loadingCtrl.create({ message: 'loading...' });
    this.loading.present().then(()=>{  
     this.auth.setDeviceName(id,this.dname,this.dtype).subscribe ((res)=>{
      //this.ngOnInit();
      this.getAllDevices(h);
      this.getAllRemote(h);
     })
     if(this.range != undefined){    
    this.auth.setMinMax(id,this.range.minimum,this.range.maximum).subscribe(res=>{
      //this.ngOnInit();
      this.getAllDevices(h);  
      this.getAllRemote(h);   
    })
    }
    this.loading.dismiss();
    this.deviceedit=false;     
  })
  }

deletedevicefromrum(){
    this.deviceedit=false;
    let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
    let id=this.deletedeviceroomid;
    this.auth.putdeletedevice(id).subscribe(res=>{
      //this.ngOnInit();
      this.getAllDevices(h);
      this.getAllRemote(h);
    },err=>{console.log(err)})
  }

 openMenu() {
    this.menu.enable(true);
    this.menu.open('first'); 
}


  changeStatus(e, id, dev_st) {
    console.log(dev_st);
    console.log(e);
  
    if (dev_st == 'False') {
      this.auth.changeStatuswithCheck(id, 1).subscribe(res => {
       for(let d of this.user.device_inRoom){
         if(d.device == id){d.status = 'True'}
       }
      })

      return;
    } 
    if (dev_st == 'True') {
      this.auth.changeStatuswithCheck(id, 0).subscribe(res => {
        for(let d of this.user.device_inRoom){
          if(d.device == id){d.status = 'False'}
        }
      })
      return;
    }
  }

  addDevice() {
    this.auth.showAllAddedDevices().subscribe(res => {
      this.device3 = (res);
      this.show = false;
      this.deviceInformation = false;
      this.deviceFromApi = true;
      for (let i = 0; i < this.device3.length; i++) {
        this.device4[i] = this.device3[i]
      }
    },
      err => { alert(JSON.stringify(err) + "device error") }
    )
  }
  saveDevice(device) {
    this.deviceToAdd=device;
  }
  checkChecked(e) {
    this.dType = e.currentTarget.value;
  }
  // deleteRoom(){
  //   let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
  //   this.auth.getToEditRoomInfo(h).subscribe(res => {
  //     let roomId = res[0].id;
  //     this.auth.deleteRoom(roomId).subscribe(res => {
  //       let i= this.room1.indexOf(roomId);
  //       this.room1.splice(i,1);
  //      this.ionViewWillEnter();
  //      //this.ngOnInit();
  //       if(this.room1.length==0){
  //         this.name=[];
  //         this.ionViewWillEnter();
  //         //this.ngOnInit();
  //       }
  //       this.show=false;
  //        })
  //   })
  // }
  
  cancel(){
    this.myRooms=true;
    this.deviceInformation=true;
    this.deviceFromApi=false;
    this.roomNameChange=false;
    this.appliances=false;
  }
  save() {
    let d=this.deviceToAdd;
    this.deviceFromApi = false;
    this.appliances = true;
    this.auth.getDimmerStatusApi(d.id).subscribe(res => {
      this.range = res[0];
    })
  }
  prev() {
    this.slide.slidePrev();
  }
  next() {
    this.slide.slideNext();
  }


  async editirDevice(irid){
    console.log(irid)     
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: 'Are you sure you want to delete this IR device !',
        cssClass: 'danger',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'delete',
            handler: () => {
              console.log('Confirm Okay');
              console.log(irid)

              let h = (<HTMLInputElement>document.querySelectorAll('.swiper-slide-active>ion-grid>ion-row > #p')[0]).innerHTML;
              this.auth.del_ir_devicefromrum(irid).subscribe(res=>{
              this.getAllDevices(h);
              this.getAllRemote(h);
              this.showMoodEffect(h);
              console.log(res)
      
    },err=>{
      console.log(err.error)
    })
            }
          }
        ]
      });
  
      await alert.present();
    }

    showcard:true;

    @HostListener('document:click', ['$event'])
  
      clickout() {
       this.show = false;
      }
    
      clickit(){
        this.show = !this.show;
        }
        gotomodulepage(){
          this.user.present('please wait...');
          this.navCtrl.navigateRoot('/allmodule');
          this.user.dismiss();
        }  
        room_id_for_guest;
        shareRoom(r_id){
          console.log("roomId:"+ r_id)
          this.room_id_for_guest=r_id;
          this.guestEmail=true;
        }
        guestEmail=false;
        onSubmit(data){
          // console.log(data.enddate);
         
          console.log(this.room_id_for_guest);
          if(this.room_id_for_guest==undefined){
            this.user.showToast('Please select room first to share room crediantial with guest user...');
          }
          else{
          
         let  guestbody={
          "email": data.email,
          "room": this.room_id_for_guest,
          "valid_until": data.enddate.substr(0, 16).replace("T", " ")
       }
       this.user.present('please wait..');
       this.auth.forguestUser(guestbody).subscribe(res=>{
         this.guestEmail=false;
         this.user.dismiss();
         console.log(res);
       },err=>{
        this.guestEmail=false;
        alert(JSON.stringify(err.error.email));
         this.user.showToast(JSON.stringify(err.error));
         this.user.dismiss();
      
       })
          }
        
         }
}