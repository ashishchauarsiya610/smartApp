import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lock-records',
  templateUrl: './lock-records.component.html',
  styleUrls: ['./lock-records.component.scss'],
})
export class LockRecordsComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private auth: AuthService, private user: UserService) { }

  @Input() rec_data;
  @Input() lockId;
  delMenu;
  del_record = false;
  ngOnInit() {}


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  deleteRecord(id){
    this.user.present('deleting...')
    this.auth.deleteRecord(id).subscribe(res=>{
      this.rec_data = this.rec_data.filter(item => item.id !== id)
      this.user.dismiss();
      alert(JSON.stringify(res));
    }, err=>{
      this.user.dismiss();
      alert(JSON.stringify(err));
    })
  }

  deleteAllRecords(){

    Swal.fire({
      title: 'Are you sure?',
      text: "All Records of this lock will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.user.present('DELETING...')
        this.auth.deleteAllRecords(this.lockId).subscribe(res=>{
          this.rec_data = [];
          this.user.dismiss();
          alert(JSON.stringify(res));
        }, err=>{
          this.user.dismiss()
          alert(JSON.stringify(err));
        })
    
      }
    })

  }

}
