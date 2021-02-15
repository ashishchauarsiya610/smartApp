import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dyfolockstatus',
  templateUrl: './dyfolockstatus.component.html',
  styleUrls: ['./dyfolockstatus.component.scss'],
})
export class DyfolockstatusComponent implements OnInit {
  imgPath;
  @Input() dyfolockid:any;
  constructor(private user: UserService,
              private auth: AuthService,
              public viewCtrl: ModalController) { }

  ngOnInit() {}

  changeDyfoLockStatus(e:any) {
    var img=document.getElementById(e)
    this.user.present('Please Wait...');
    if ((<HTMLInputElement>event.currentTarget).checked == true) {
      this.auth.changeStatuswithCheck(e, 1).subscribe(res => {
        this.user.dismiss();
        this.imgPath = 'assets/icon/unlock.jpeg' 
         img.setAttribute('src',this.imgPath)     
      })
    }
    if ((<HTMLInputElement>event.currentTarget).checked == false) {
      this.auth.changeStatuswithCheck(e, 0).subscribe(res => {
        this.user.dismiss();
         this.imgPath = 'assets/icon/lock.png'  
         img.setAttribute('src',this.imgPath)  
     })
   }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
