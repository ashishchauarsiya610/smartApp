import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Key } from 'protractor';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
//import {Response} from '';
//import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL = 'https://cors-anywhere.herokuapp.com/http://13.127.176.213:4000/';
 
  // URL = 'http://52.66.67.111:4000/';
  // URL = 'http://3.6.190.10:4000/';
  //  URL = 'http://13.127.176.213:4000/';
  // URL = 'https://dyfolite.dyfolabs.com:13000/';
  //  URL = 'http://13.127.176.213/';
  URL = 'https://dyfolite.dyfolabs.com/';
  // url='https://cors-anywhere.herokuapp.com/https://api.ttlock.com/';
  url='http://13.127.176.213:82/https://api.ttlock.com/';
  // url='https://api.ttlock.com/'

  isLoggedIn = false;
  token: any;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private _document: Document, public user:UserService) {}
  
 
  isAuthenticated():any{
    let token = localStorage.getItem('token')
      if (token)
        {
          return true;
        } else {
          return false;
        }
  }

  loginUser(b: any): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json ');
    return this.http.post(this.URL + 'api/register/login/', b, { headers: headers }
    ).pipe(
      tap((res) => {
        let token = localStorage.setItem('token', res.token);
        console.log(res.token);
      }),
    );
  }


  sendOtp(b: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json ');
    console.log(b)
    console.log(typeof b);
    return this.http.post(this.URL + 'api/register/verifyotp/', b, { headers: headers }).pipe(tap((res) => {
    }))
  }

  sendDetails(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json ');
    console.log(body)
    console.log(typeof body);
    return this.http.post(this.URL + 'api/register/register/', body, { headers: headers }).pipe(tap(res => {
    }))
  }

  uploadProfileImg(imgData){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body: FormData = new FormData();
    body.append("image", imgData, 'profile.jpg')
    return this.http.post(this.URL + 'api/user_profile/create/', body, { headers: headers }).pipe(tap(res => {
    }))
  }

  getProfileImg() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    this.http.get(this.URL + 'api/user_profile/get/', { headers: headers }).pipe(tap(res => {
    })).subscribe(img=>{ 
      let profImg = img[0].image.replace('https', 'http')
       profImg = img[0].image.replace('http', 'https')
      // alert(profImg);
      localStorage.setItem('pof_img', profImg)
    }, err=> alert(JSON.stringify(err)))
  }
  userProfile() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/register/account/', { headers: headers }).pipe(tap(res => {
    }))
  }
   
updateAdminProfile(body:any){
  console.log(body)
  let token=localStorage.getItem('token');
  var headers=new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.patch(this.URL + 'api/register/account/', body, { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))

}
  getLogoutFromApi() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/register/logout/', { headers: headers }).pipe(tap(res => {
    }))
  }
  getToEditRoomInfo(roomName) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/room/room/?name=' + roomName, { headers: headers }).pipe(tap(res => {
    }))
  }
  editRoomInfo(id, name) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = {
      "name": name
    }
    return this.http.put(this.URL + 'api/room/room/' + id + '/', body, { headers: headers }).pipe(tap(res => {
    }))
  }
  getModuleFromApi() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/modules/', { headers: headers }).pipe(tap(res => {
    }))
  }
  switchWifiForModule(id) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = {
      "module_id": id
    }
    return this.http.post(this.URL + 'api/device/switch/wifi/', body, { headers: headers }).pipe(tap(res => {
    }))
  }
  qrCode(b: any): Observable<any> {
    this.user.showToast(b);
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token); 
    console.log(token);
    const body = {
      'qr_code': b
    }
    return this.http.post(this.URL + 'api/qr_code/qr/', body, { headers: headers })
  }
  
  showAllAddedDevicesScheduler(id) {
    console.log(id);
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/status/all/?id=' + id, { headers: headers });
  }
  showAllAddedDevices() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/status/all/', { headers: headers });
  }
  showaddedDevices(id) { 
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/status/all/?id=' + id, { headers: headers });
  }
  devicesForModule(pi_id) { 
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/status/all/?device__pi_id__pi_id=' + pi_id, { headers: headers });
  }
  createRoom(name,type) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = ({
      "name": name,
      "room_type":type
    });
    return this.http.post(this.URL + 'api/room/room/', body, { headers: headers });
  }
  setMinMax(id, min, max) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = ({
      "maximum": max,
      "minimum": min
    })
    return this.http.put(this.URL + 'api/device/min_max/' + id + '/', body, { headers: headers });
  }
  setDeviceName(id,deviceType, name) {
    console.log(id);
    console.log(name)
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = JSON.stringify({
      "name": name,
      "device_type": deviceType
    })
    return this.http.put(this.URL + 'api/device/name/' + id + '/', body, { headers: headers });
  }
  savedChangedRoom(id, device) {
    console.log("rooom_id"+ id);
    console.log("device_id"+ device);
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = JSON.stringify({
      "device": parseInt(device),
      "room": id
    })
    return this.http.post(this.URL + 'api/room/room/device/', body, { headers: headers }).pipe(tap(res => {
    }))
  }
  checkForRoom(pi_id){
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/ir_blaster/check/room/?pi_id__id=' + pi_id, { headers: headers });
  }
  getRoomFromApi() {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/room/room/', { headers: headers }).pipe(tap(res => {
    }))
  }
  getDeviceFromApi(roomId) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/room/room/devices/?room__id=' + roomId, { headers: headers }).pipe(tap(res => {
    }))
  }
  getDeviceStatus(id) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/status/all/?id=' + id, { headers: headers }).pipe(tap(res => {
    }))
  }
  changeStatuswithCheck(id, a) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = JSON.stringify({
      "status": a
    })
    console.log(body)
    return this.http.put(this.URL + 'api/device/status/' + id + '/', body, { headers: headers }).pipe(tap(res => {
    }))
  }
  putDimmerValueFromApi(id, setdimmer) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body = JSON.stringify(
      {
        "dimmer": setdimmer
      }
    )
    return this.http.put(this.URL + 'api/device/status/' + id + '/', body, { headers: headers }).pipe(tap(res => {
    }))
  }
  deleteRoom(id){
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.delete(this.URL + 'api/room/room/' + id + '/', { headers: headers }).pipe(tap(res => {
    }))
  }
  getDimmerStatusApi(id) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.get(this.URL + 'api/device/min_max/all/?id=' + id, { headers: headers }).pipe(tap(res => {
    }))
  }

  putdeletedevice(id) {
    let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json ');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    return this.http.delete(this.URL + 'api/room/room/device/' + id + '/', { headers: headers }).pipe(tap(res => {
    }))
  }
// <---------------IR blaster All API started from here------>

getIRproductApi() {
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/remote/product/', { headers: headers }).pipe(tap(res => {
  }))
} 

getIRcompanyApi(id) {
  console.log("auth"+id)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/remote/company/?product_name__id='+id, { headers: headers }).pipe(tap(res => {
  }))
} 

getIRCompanyRemoteApi(productid,companyid) {
  console.log("auth_companyid"+companyid)
  console.log("auth_productid"+productid)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/remote/key/?product_name__id='+productid+'&company_name__id='+companyid, { headers: headers }).pipe(tap(res => {
  }))
}  
remoteForAc(productid,companyid){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/remote/ac/?product_name__id='+productid+'&company_name__id='+companyid, { headers: headers }).pipe(tap(res => {
  }))
}
saveRemote(remoteId,pi_id,roomId){
  let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    if(this.user.checkForAcRemote!=2){
    let body = ({
      "remote": remoteId,
  "room": roomId,
  "pi_id": pi_id,
    });
    console.log(body)
    return this.http.post(this.URL + 'api/ir_blaster/device/', body, { headers: headers });
  }
  if(this.user.checkForAcRemote==2){
    let body = ({
      "ac_remote": remoteId,
  "room": roomId,
  "pi_id": pi_id,
    });
    console.log(body)
    return this.http.post(this.URL + 'api/ir_blaster/device/', body, { headers: headers });
  }
    //console.log(body)
    //return this.http.post(this.URL + 'api/ir_blaster/device/', body, { headers: headers });
}
pressKey(key_id,name,module_id){
  console.log(key_id);
  console.log(name);
  console.log(module_id);
  let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    if(this.user.productName!="AC"){
      console.log(this.user.productName)
    let body ={
        "key_id" : key_id,
        "button_name" :name,
        "module_id" :module_id
        }
    return this.http.post(this.URL + 'api/ir_blaster/press/', body, { headers: headers });
      }
      if(this.user.productName=="AC"){ 
        console.log(this.user.productName) 
   let body={
    "ac_key_id": key_id,
    "button_name": name,
    "module_id": module_id
   
//  "module_id": module_id,
//     "button_name": name,
//     "ac_key_id": key_id
   }
   return this.http.post(this.URL + 'api/ir_blaster/press/', body, { headers: headers });
  }
}

showAddedIRModule(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/ir_blaster/module/', { headers: headers }).pipe(tap(res => {
  }))
}
getAllSavedRemoteForRoom(roomName){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/ir_blaster/device/?room__name=' + roomName, { headers: headers }).pipe(tap(res => {
  })) 
}

del_ir_devicefromrum(irid){
  console.log(irid)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/ir_blaster/device/'+irid+'/', { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}

// -----------Mood Lighting API

getshowAddedMoodDevice(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/mood_lighting/module/', { headers: headers }).pipe(tap(res => {
  }))
}

postmooddevice(room,pi_id){
  console.log("moodroom_id"+room);
  console.log("moodpi_id"+pi_id);
  let token = localStorage.getItem('token');
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer' + ' ' + token);
    let body =(
      {
        "room" : room,
        "pi_id" : pi_id,     
        });
    return this.http.post(this.URL + 'api/mood_lighting/device/', body, { headers: headers });
}

getAddedMoodDevices(roomName){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/mood_lighting/device/?room__name=' + roomName,{ headers: headers }).pipe(tap(res => {
    //console.log(res)
  }))
}
putColorCodeFromApi(id,colorcode) {
  console.log(id)
  console.log(colorcode)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  let body = JSON.stringify( 
    {
      "color_code": colorcode
    }
  )
  return this.http.put(this.URL + 'api/mood_lighting/update/color/' + id + '/', body, { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}

putMoodTypeFromApi(id,moodtype) {
  console.log(id)
  console.log(moodtype)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  let body = JSON.stringify(
    {
      "type": moodtype
    }
  )
  return this.http.put(this.URL + 'api/mood_lighting/update/type/' + id + '/', body, { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}

deleteMoodDevicefromRoom(id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/mood_lighting/delete/' + id + '/', { headers: headers }).pipe(tap(res => {
  }))
}

getAllMode(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/mode/mode/', { headers: headers }).pipe(tap(res => {
  }))
}
getAllDevForModes(){
  let token=localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers =headers.append('Content-Type','application/json');
  headers=  headers.append('Authorization', 'Bearer'+' '+ token);
  return this.http.get(this.URL+' api/mode/all/devices/',{headers:headers}); 
}

getDevForMode(mode_id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/mode/mode/device/?mode__id='+mode_id, { headers: headers }).pipe(tap(res => {
  }))
}

createMode(name){
  let token = localStorage.getItem('token');
  let body = { "name":name }
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.URL + 'api/mode/create/mode/', body, { headers: headers }).pipe(tap(res => {
  }))
}

addModeDevices(deviceDetail){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  if(deviceDetail.dimmer !== null){
    let dimBody = {
      "dimmer": deviceDetail.dimmer,
      "device": deviceDetail.device,
      "mode": deviceDetail.mode,
      "status": deviceDetail.status
    }
    return this.http.post(this.URL + 'api/mode/device/both/', dimBody, { headers: headers }).pipe(tap(res => {
    }))
  } else {
    // alert('nooooooo'+deviceDetail.dimmer)
    let devBody = {
      "device": deviceDetail.device,
      "mode": deviceDetail.mode,
      "status": +deviceDetail.status
    }
    return this.http.post(this.URL + 'api/mode/device/status/', devBody, { headers: headers }).pipe(tap(res => {
    }))
  }
}

del_Mod(id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/mode/delete/'+id+'/', { headers: headers }).pipe(tap(res => {
    
  }))
}
del_Mod_device(id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/mode/device/delete/'+id+'/', { headers: headers }).pipe(tap(res => {
    
  }))
}
activateMode(id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  console.log(JSON.stringify(headers)+id)
  let body={}
  return this.http.put(this.URL + 'api/mode/activate/'+id+'/', body, { headers: headers } ).pipe(tap(res => {
  }))
}

refreshPage() {
  this._document.defaultView.location.reload();
}

lockQR(snInfo){
  let body= {
    "qr_code": snInfo
  }
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  
  return this.http.post(this.URL + 'api/qr_code/lock/qr/', body, { headers: headers }).pipe(tap(res => {
  }))
}

addLockInRoom(lockId, roomId) {
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  let body = {
    "room": roomId
  }
  return this.http.put(this.URL + 'api/device/lock/update/' + lockId + '/', body, { headers: headers }).pipe(tap(res => {
  }))
}

getLocks(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/device/lock/', { headers: headers }).pipe(tap(res => {
  }))
}

recordLockActivity(id, lockStatus){
  let body= {
    "lock": id,
    "status": lockStatus
  }
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  
  return this.http.post(this.URL + 'api/device/lock/history/create/', body, { headers: headers }).pipe(tap(res => {
  }))
}

getLockRecord(lockId){
  
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/device/lock/history/?lock__id='+lockId, { headers: headers }).pipe(tap(res => {
  }))
}

deleteRecord(id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/device/lock/history/'+id+'/', { headers: headers }).pipe(tap(res => {
    
  }))
}
deleteAllRecords(lock_id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/device/lock/history/all/'+lock_id+'/', { headers: headers }).pipe(tap(res => {
    
  }))
}

deleteLock(lock_id){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/device/lock/'+lock_id+'/', { headers: headers }).pipe(tap(res => {
    
  }))
}





 //---------------- Door Lock API ------------//

 getDoorLockModuleApi(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/device/door_lock/modules/', { headers: headers }).pipe(tap(res => {
  }))
  
}

getDoorStatus(device_pi_id_pi_id){
  // console.log("idauth"+ id);
  // console.log("authpi"+ device_pi_id_pi_id)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/device/door_lock/status/all/?device_pi_id_pi_id=' +device_pi_id_pi_id , { headers: headers }).pipe(tap(res => {
   
  }))
}

//-----------------Device Scheduler start from here ------//
getDeviceforSchedularfromApi(){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/scheduler/get/', { headers: headers }).pipe(tap(res => {
  }))
  
}

postDeviceSchedularFromApi(sdevice){
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  let body = { 
    "name": sdevice.name,
    "is_daily": sdevice.is_daily,
    "is_enabled": true,
    "on_time": sdevice.on_time,
    "off_time": sdevice.off_time,
    "device": sdevice.device
  }
  return this.http.post(this.URL + 'api/scheduler/create/', body, { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}

del_ScheduledDevice(id){
  console.log("authdeleteschedule_device_id"+id)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/scheduler/delete/'+id+'/', { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}
//--------- ended scheduler api-----// 
  //************* Guest API  */ 

forguestUser(body){
  console.log(body);
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  
  return this.http.post(this.URL + 'api/guest/create', body, { headers: headers }).pipe(tap(res => {
  }))
}

guestforqrlogin(body) {
  console.log(body);
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.post(this.URL + 'api/qr_code/qr/', body, { headers: headers }).pipe(tap(res => {
  }))
}

forguestlist() {
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.get(this.URL + 'api/guest/get',{ headers: headers }).pipe(tap(res => {
  }))
}

forguestdelete(id) {
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.delete(this.URL + 'api/guest/' + id + '/',{ headers: headers }).pipe(tap(res => {
  }))
}

updateguest(id: any,body) {
  console.log(id)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.patch(this.URL + 'api/guest/'+id+ '/',body, { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}

forguestbyRoom(id) {
  console.log(id)
  let token = localStorage.getItem('token');
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Authorization', 'Bearer' + ' ' + token);
  return this.http.patch(this.URL + 'api/guest/get/?room='+id+ '/', { headers: headers }).pipe(tap(res => {
    console.log(res)
  }))
}


    //----- get module pi id for device status--------//
    putdevicestatus(roomid) {
      console.log('roomid_for_offline_online_sttaus:'+ roomid)
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      let body = {
        "room_id": roomid
      }
      return this.http.put(this.URL + 'api/room/pi/status/', body, { headers: headers }).pipe(tap(res => {
      }))
    }

    getdeviceinroombyRoomid(room_id) {
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      return this.http.get(this.URL + 'api/room/room/?id=' + room_id , { headers: headers }).pipe(tap(res => {
      }))
    }
    getdevicemoduletoaddinroom(pi_id) {
      console.log(pi_id);
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      return this.http.get(this.URL + 'api/device/modules/?pi_id__pi_id=' + pi_id , { headers: headers }).pipe(tap(res => {
        console.log(res);
      }))
    }
    

    postIrcompanyproduct(body){
      console.log(body);
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      
      return this.http.post(this.URL + 'api/remote/add/', body, { headers: headers }).pipe(tap(res => {
      }))
    }

    postIrbuttondata(body){
      console.log(body);
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      
      return this.http.post(this.URL + 'api/remote/add/data/', body, { headers: headers }).pipe(tap(res => {
      }))
    }

   adddeviceinfav(body){
      console.log(body);
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      
      return this.http.post(this.URL + 'api/favourite/add/', body, { headers: headers }).pipe(tap(res => {
      }))
    }

    getfavlist(){
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      return this.http.get(this.URL + 'api/favourite/favourite/' , { headers: headers }).pipe(tap(res => {
      }))
    }

    deleteFavDevice(id){
      let token = localStorage.getItem('token');
      var headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json ');
      headers = headers.append('Authorization', 'Bearer' + ' ' + token);
      return this.http.delete(this.URL + 'api/favourite/delete/' + id + '/', { headers: headers }).pipe(tap(res => {
      }))
    }
// -----------------forget password....-------------------//
/*   
1. i have to use https://dyfolite.dyfolabs.com/api/register/email/ashish@dyfolabs.com/ this api to get user_id serial number then
2. i have to use https://dyfolite.dyfolabs.com/api/register/verifyotp/ to get OTP 
3.  I have to use same api to verify otp which use will be submit https://dyfolite.dyfolabs.com/api/register/verifyotp/ in this api i have to send email and verify_otp . this api will use to verify otp only 
 4.  In last i have to use https://dyfolite.dyfolabs.com/api/register/forget/ api to update password , I have to send email and new password
*/

check_User(mail_id) {
  
  
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
 
  return this.http.get(this.URL + 'api/register/email/' + mail_id + '/', { headers: headers }).pipe(tap(res => {
    console.log(res);
  }))
}

submit_New_Pass(body) {
  
  
  var headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json ');
 
  return this.http.put(this.URL + 'api/register/forget/', body, { headers: headers }).pipe(tap(res => {
  }))
}

/********** *  TTLock****************/

TTtoken;
data;
data_ls=[];
loginTTLock(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};

  return this.http.post(this.url + 'oauth2/token/',body, options

 ).pipe(
    tap((res)=>{
      this.data=res;
      console.log(this.data.access_token);
      localStorage.setItem('TTtoken', this.data.access_token);
      let token_get=localStorage.getItem('TTtoken');
      console.log(token_get);
  })
  )
} 

TTlock_list(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'),    
};
  return this.http.post(this.url + 'v3/lock/list',body, options                   
  ).pipe(
    tap((res)=>{
      
      console.log(res);
  })
  )
} 



 tTlock_record(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};

  return this.http.post(this.url + 'v3/lockRecord/list',body,options).pipe(
    tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_details(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/detail',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_setautoTime(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/setAutoLockTime',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_uploadBattery(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/updateElectricQuantity',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_ReName(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/rename',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_Unlock(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + '/v3/lock/unlock',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlock_Lock(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + '/v3/lock/lock',body,options).pipe(tap((res)=>{
      console.log(res);
      // alert("lock record list"+ JSON.stringify(res));
    
  })
  )
 }

 tTlockDelete(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};

  return this.http.post(this.url + 'v3/lock/delete',body, options

  ).pipe(
    tap((res)=>{
     console.log(res)

      
  })
  )
} 

tTlockInitialize(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/initialize',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 
//************ TTLock finger proccess *********/ 
tTlockFingerAdd(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/fingerprint/add',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 
tTlockFingerList(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/fingerprint/list',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 
tTlockFingerDelete(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/fingerprint/delete',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 

tTlockFingerClear(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/fingerprint/clear',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 

tTlockFingerChangePeriod(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'),  
};
  return this.http.post(this.url + 'v3/fingerprint/changePeriod',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 


// ***************** Ekey Started ******//
tTlockekey_Send(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/key/send',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 

tTlockekeylist(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/key/list',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 

tTlockekey_delete(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/key/delete',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 
//*********** Ekey ended  here */  


//**************Passcode started here  */  
tTlockpasscode_get(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/keyboardPwd/get',body, options
  ).pipe(
    tap((res)=>{
  })
  )
} 
tTlockpasscode_delete(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'), 
    headers1: new HttpHeaders().set('Origin', 'Dyfo'),  
};
  return this.http.post(this.url + 'v3/keyboardPwd/delete',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockpasscode_add(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/keyboardPwd/add',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockpasscode_change(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/keyboardPwd/change',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}
//************Passcode ended here  */ 

//***************** IC card started here  ************ */ 
tTlockIc_list(body){
  console.log(body);
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/identityCard/list',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockIc_add(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/identityCard/add',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockIc_delete(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/identityCard/add',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}
//************* IC card Eneded here ******/ 


//****************GateWay Started here  */ 

tTlockGateway_init(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/isInitSuccess',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_userId(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/user/getUid',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_lockTime(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/queryDate',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_AdjustTime(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/updateDate',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_Unlock(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/unlock',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_lock(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/lock',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_OpenState(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/queryOpenState',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_freeze(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/freeze',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_State(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/lock/queryStatus',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}


tTlockGateway_list(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/list',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_lockDetails(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/listByLock',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_delete(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/delete',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_transfer(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/transfer',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_gatewayList(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/listLock',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_uploadDetails(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/uploadDetail',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_upgradeCheck(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/upgradeCheck',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}

tTlockGateway_setUpgradeMode(body){
  console.log(body); 
  let options = {
    headers: new HttpHeaders().set('contentType','application/x-www-form-urlencoded'),  
    headers1: new HttpHeaders().set('Origin', 'Dyfo'), 
};
  return this.http.post(this.url + 'v3/gateway/setUpgradeMode',body, options
  ).pipe(
    tap((res)=>{
  })
  )
}
//**********Gateway ended here  */ 

}

