import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IrnumberComponent } from '../irnumber/irnumber.component';
import { IrremotemoreComponent } from '../irremotemore/irremotemore.component';
import { IrremotenumberComponent } from '../irremotenumber/irremotenumber.component';

@Component({
  selector: 'app-ir-remote',
  templateUrl: './ir-remote.component.html',
  styleUrls: ['./ir-remote.component.scss'],
})
export class IrRemoteComponent implements OnInit {

  constructor(public auth: AuthService, 
              public user:UserService,
              public actionsheetCtrl: ActionSheetController,
              private router:Router,
              private modalController: ModalController) { }
   remote:string;
   text;
  bar = 0;
  temp=16;
  tempValue;
  fanstate = 'A';
  toggleStatus = 'OFF';
  keyid;
  device_id;
  button_value;
  token;
  allAcHex;

   tempArray=[
    {id:16, val:'sixteen'},
    {id:17, val:'seventeen'},
    {id:18, val:'eighteen'},
    {id:19, val:'nineteen'},
    {id:20, val:'twenty'},
    {id:21, val:'twentyone'},
    {id:22, val:'twentytwo'},
    {id:23, val:'twentythree'},
    {id:24, val:'twentyfour'},
    {id:25, val:'twentyfive'},
    {id:26, val:'twentysix'},
    {id:27, val:'twentyseven'},
    {id:28, val:'twentyeight'},
    {id:29, val:'twentynine'},
    {id:30, val:'thirty'}
    ];
remotetv=false;
remoteac=false;
  ngOnInit() {
    console.log(this.user.productName);
    console.log(this.user.companyName);
    this.remote=this.user.productName;
    if(this.remote=='TELEVISION'){
      this.remotetv=true;
      this.remoteac=false;
      console.log(" tvclick"+this.remote)

    }
   else if(this.remote=='AC'){
    console.log("acclick"+this.remote)
      this.remotetv=false;
      this.remoteac=true;
    }
   else if(this.remote=='SETTOP BOX'){
    this.remotetv=true;
    this.remoteac=false;
      console.log(" tvclick"+this.remote)
    }
    else if(this.remote=='TATA sky'){
      this.remotetv=true;
      this.remoteac=false;
        console.log(" tvclick"+this.remote)
      }
      else if(this.remote=='DTH'){
        this.remotetv=true;
        this.remoteac=false;
          console.log(" tvclick"+this.remote)
        }
      else if(this.remote=='DVD PLAYER'){
          this.remotetv=true;
          this.remoteac=false;
            console.log(" tvclick"+this.remote)
          }
         
      else if(this.remote=='HOME THEATRE'){
            this.remotetv=true;
            this.remoteac=false;
              console.log(" tvclick"+this.remote)
            }
        else if(this.remote=='MUSIC SYSTEM'){
              this.remotetv=true;
              this.remoteac=false;
                console.log(" tvclick"+this.remote)
              }
    
  }
  ionViewWillEnter(){
    console.log(this.user.productName);
    this.remote=this.user.productName;
  }
  
  keyPress(btnValue){
    console.log(this.user.moduleIdForKey);
   this.auth.pressKey(this.user.remoteIdforKeyPress,btnValue,this.user.moduleIdForKey).subscribe(res=>{
   })
  }
  // power(btnValue){
  //   console.log(btnValue)
  //   this.auth.pressKey(this.user.remoteIdforKeyPress,"on",this.user.moduleIdForKey).subscribe(res=>{
  //   })
  // }
  pow = false;
  power(event){
   let opacity= event.target.getAttribute('opacity')
    this.pow = !this.pow;
    if(this.pow){
      event.currentTarget.setAttribute('fill','#595959');
      event.currentTarget.setAttribute('style','filter:floodColor:#FFF');
     this.keyPress('on');
    } else {
      //event.target.setAttribute('opacity',opacity + 0.2)
      event.currentTarget.setAttribute('fill','#a3c2c2');
      event.currentTarget.removeAttribute('style','filter:floodColors');
   this.keyPress('off')
    }
   
  }
  pressEffect(event){
    let x = event.target.getAttribute('x')
    let y = event.target.getAttribute('y')
    let height = event.target.getAttribute('height')
    let width = event.target.getAttribute('width')
    let opacity= event.target.getAttribute('opacity')
    //  event.target.removeAttribute('x y height width')
    if(x==null){
      event.target.setAttribute('opacity',opacity - 0.7)
      setTimeout(()=>{
         event.target.setAttribute('opacity',opacity)
     }, 1000);
    }
     event.target.setAttribute('x',x+2)
     event.target.setAttribute('y',y+2)
     event.target.setAttribute('height',height-2)
     event.target.setAttribute('width',width-2)
    setTimeout(()=>{
    //  event.target.removeAttribute('x y height width')
     event.target.setAttribute('x',x)
     event.target.setAttribute('y',y)
     event.target.setAttribute('height',height)
     event.target.setAttribute('width',width)
 }, 1000);
   }

  async irunmber(){
    const modal = await this.modalController.create({
      component: IrremotenumberComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { remoteid:  29,
                  
                      }
    });
    return await modal.present();
   }

  async irmore(){
    console.log('ir remote more click...');
    const modal = await this.modalController.create({
      component: IrremotemoreComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { remote_id:  29,
                      }
    });
    return await modal.present();
   }

//   pressEffect(event){
//     // let x = event.target.getAttribute('x')
//     // let y = event.target.getAttribute('y')
//     // let height = event.target.getAttribute('height')
//     // let width = event.target.getAttribute('width')
//      let opacity= event.target.getAttribute('opacity')
//     // //  event.target.removeAttribute('x y height width')
//     // if(x==null){
//     //   event.target.setAttribute('opacity',opacity - 0.2)
//     //   setTimeout(()=>{
//     //      event.target.setAttribute('opacity',opacity)
//     //  }, 1000);
//    // }
//     //  event.target.setAttribute('x',x+2)
//     //  event.target.setAttribute('y',y+2)
//     //  event.target.setAttribute('height',height-2)
//     //  event.target.setAttribute('width',width-2)
//      event.target.setAttribute('opacity',opacity - 0.2)
//      event.currentTarget.setAttribute('style','filter:floodColor:#FFF')
// //     setTimeout(()=>{
// //     //  event.target.removeAttribute('x y height width')
// //      event.target.setAttribute('x',x)
// //      event.target.setAttribute('y',y)
// //      event.target.setAttribute('height',height)
// //      event.target.setAttribute('width',width)
// //  }, 1000);
//    }
   getTemp(Cur_temp){
    for(let tem of this.tempArray){
      if(tem.id==Cur_temp) {
        this.tempValue = tem.val
      }
    }
  }

   minus(event){
     console.log(event)
    if(this.temp > 16){
      this.temp=this.temp-1;
      this.getTemp(this.temp);
      let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
      this.keyPress(hexkey);
    }
    //this.pressEffect(event)
   }

   plus(event){
    console.log(event)
    if(this.temp < 30){
      this.temp=this.temp+1;
      this.getTemp(this.temp);
      let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
      this.keyPress(hexkey);
    }
   // this.pressEffect(event)
   }
   fanUp(event){
    if(this.bar < 2){
     this.bar=this.bar+1;
    }
   let b=document.getElementsByClassName('bar1');
   let b1=document.getElementsByClassName('bar2');
    if(this.bar==2){
     this.fanstate='FH'
     for(let i=0;i<b1.length;i++){
       // b1[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
       b1[i].setAttribute('style','stroke:rgba(31,30,30,0.37)')
     }
     console.log(this.bar)
     this.getTemp(this.temp);
   let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
   this.keyPress(hexkey);
    }
    if(this.bar==1){
     this.fanstate='FM'
     for(let i=0;i<b.length;i++){
       // b[i].setAttribute('style','fill:rgba(32, 12, 46, 0.36)')
       b[i].setAttribute('style','stroke:rgba(31,30,30,0.37)')
     }
     console.log(this.bar)
     this.getTemp(this.temp);
   let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
   this.keyPress(hexkey);
    }
    this.pressEffect(event)
  }
  fanToggle = false;
  fan(event){
   this.fanToggle = !this.fanToggle;
   if(this.fanToggle){
     this.fanstate = 'FL'
   } else {
     this.fanstate = 'A'
   }
   this.getTemp(this.temp);
   let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
   this.keyPress(hexkey);
   this.pressEffect(event)
  }
  fanDown(event){
    if(this.bar > 0){
      this.bar=this.bar-1;
     }
     let b=document.getElementsByClassName('bar1');
    let b1=document.getElementsByClassName('bar2');
    if(this.bar==1){
      this.fanstate='FM'
      for(let i=0;i<b1.length;i++){
        b1[i].removeAttribute('style')
        b1[i].setAttribute('style','stroke:white; fill:white')
        console.log(this.bar)
      }
    this.getTemp(this.temp);
    let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
    this.keyPress(hexkey);
    }
    if(this.bar==0){
      this.fanstate='FL'
      for(let i=0;i<b.length;i++){
        b[i].removeAttribute('style')
        b[i].setAttribute('style','stroke:white; fill:white')
        console.log(b+'fgh'+this.bar)
        }
        this.getTemp(this.temp);
    let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
    this.keyPress(hexkey);
      }
      
      this.pressEffect(event)
 }
 timer(event){
  this.pressEffect(event)
 }
 swingToggle = false;
 swing(event){
  this.pressEffect(event)
   this.swingToggle = !this.swingToggle;
   if(this.swingToggle){
    this.toggleStatus = 'ON';
   } else {
    this.toggleStatus = 'OFF';
   }
   this.getTemp(this.temp);
  let hexkey = this.tempValue+this.fanstate+this.toggleStatus;
  this.keyPress(hexkey);
 }
 backbutton(){
  this.user.showDevice=false;
  this.user.showRoom=true;
 }

 async actionsheet(){
  const actionSheet = await this.actionsheetCtrl.create({  
    header: 'select ir remote',  
    buttons: [  
      {  
        text: 'Tam data Learning',  
        icon: 'tv-outline',
        handler: () => {  
          console.log('Tam remore');  
          this.user.productName;
          this.user.companyName;
          this.user.ir_device_id;
          console.log("id_device_id:"+this.user.ir_device_id);
          this.router.navigateByUrl('/irdatacolletion'); 
        }  
      },
      
       {  
        text: 'Cancel', 
        icon: 'close', 
        role: 'cancel',  
        handler: () => {  
          console.log('Cancel clicked');  
        }  
      }  
    ]  
  });  
  await actionSheet.present();  
}  
}
