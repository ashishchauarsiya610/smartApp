import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-guestlist',
  templateUrl: './guestlist.component.html',
  styleUrls: ['./guestlist.component.scss'],
})
export class GuestlistComponent implements OnInit {
guest_id;
  constructor(private user: UserService,
              private auth: AuthService,
              private navCtrl: NavController,
              public actionsheetCtrl: ActionSheetController,) { 
                this. getguestList();
              }

  ngOnInit() {}
 guestlist;
  getguestList(){
    this.user.present('wait...');
    this.auth.forguestlist().subscribe(res=>{
      console.log(res);
      this.guestlist=res;
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
    })
  }

  deleteguest(){
    this.user.present('wait...');
    this.auth.forguestdelete(this.guest_id).subscribe(res=>{
      console.log(res);
      this.user.showToast(res);
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
    })
  }

  updateStatus(){
   let body={
    "email": this.guest_email,
    "room": this.guest_room,
    "valid_until": this.guest_valid,
    "is_active": "false"
    }
    this.user.present('wait...');
    this.auth.updateguest(this.guest_id,body).subscribe(res=>{
      console.log(res);
      this.user.dismiss();
    },err=>{
      this.user.dismiss();
      console.log(err.error);
    })
  }

guest_email;
guest_room;
guest_valid;
guest_active;
  async guestClick(id,email,room,valid,active){
    this.guest_id=id;
    this.guest_email=email;
    this.guest_room=room;
    this.guest_valid=valid;
    this.guest_active=active;
    console.log("id:"+ id);
    const actionSheet = await this.actionsheetCtrl.create({  
      header: 'Modify Guest Details',  
      buttons: [  
        {  
          text: 'Delete Guest',  
          icon: 'trash-outline', 
          handler: () => {  
            console.log('add finger clicked');  
          this.deleteguest();           
          }  
        },
      
        {  
          text: 'Update Guest',  
          icon: 'construct-outline',
          handler: () => {  
            console.log('update click clicked'+ id);  
            this.updateStatus();
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
