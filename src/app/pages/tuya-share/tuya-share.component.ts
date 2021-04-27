import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare var CameraCustom;

@Component({
  selector: 'app-tuya-share',
  templateUrl: './tuya-share.component.html',
  styleUrls: ['./tuya-share.component.scss'],
})
export class TuyaShareComponent implements OnInit {

  constructor(private user:UserService) { }

  ngOnInit() {
    let reqBody={"homeId":this.user.homeId}
    CameraCustom.memberlist(reqBody,
   res=>{
    this.user.memberId=res;
    },
    err=>{

    })
  }
  modify=false;
  nickName="name...."
  value;
  memShare=false;
  shareDevice(ev){
    let selectedVal=ev.currentTarget.value;
    var body={"condition":selectedVal,
             'homeId':this.user.homeId,
            'memberId':this.user.memberId.id,
             'devicelist':this.user.tuyaDevices[0].id,
             'userAcc':"9717363398"
           }
           CameraCustom.shareDevice(body,
            res=>{
              this.user.showToast("Shared device successfully")
           },
            err=>{
             alert(JSON.stringify(err))
             alert("4 error")
            })   
  }

    getDevice(ev){
      let selectedVal=ev.currentTarget.value;
        var body={"condition":selectedVal,
                 'homeId':this.user.homeId,
                'memberId':this.user.memberId.id,
                 'devicelist':this.user.tuyaDevices[0].id
               }
               CameraCustom.getShare(body,
                res=>{
                   //this.bitmap=res;
                   //this.createdCode=res;
                   if(res.length==0){
                    this.user.showToast("No Shared");
                   }else{
                   this.user.showToast(JSON.stringify(res));
                   }
               },
                err=>{
                 alert(JSON.stringify(err))
                 alert("4 error")
                })
    }

    shareDelete(ev){
      let selectedVal=ev.currentTarget.value;
        var body={"condition":selectedVal,
                'memberId':this.user.memberId.id,
                 'devicelist':this.user.tuyaDevices[0].id
               }
               CameraCustom.delShare(body,
                res=>{
                   //this.bitmap=res;
                   //this.createdCode=res;
                   this.user.showToast(res);
                 
               },
                err=>{
                 alert(JSON.stringify(err))
                 alert("4 error")
                }) 
      
    }

    modifyShare(ev){
      this.value=ev.currentTarget.value;
      this.modify=true;
    }
   
    submit(){
      this.modify=false;
    var body={"condition":this.value,
    'memberId':this.user.memberId.id,
    'name':this.nickName
   }
   CameraCustom.modifyShare(body,
    res=>{
      
       //this.bitmap=res;
       //this.createdCode=res;
       this.user.showToast(res);
      // alert(res) 
   },
    err=>{
     alert(JSON.stringify(err))
     alert("4 error")
    }) 
  }



}

