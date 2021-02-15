import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modedevices',
  templateUrl: './modedevices.component.html',
  styleUrls: ['./modedevices.component.scss'],
})
export class ModedevicesComponent implements OnInit {

  constructor(public modalCtrl:ModalController, private auth: AuthService) { }

  @Input() dev_data;
  @Input() modeTitle;
  @Input() modId;
  nodelete = true;
  delete = false;
  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  activate(modId){
    this.auth.activateMode(modId).subscribe(res=>{
      console.log(res);

      let timerInterval
      Swal.fire({
        title: 'Activating Mode...',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })


    })
  }

  del_Mod_device(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.auth.del_Mod_device(id).subscribe(res=>{
          console.log(res);
          for(let i=0; i<this.dev_data.length; i++){
            if(this.dev_data[i].id == id){
              this.dev_data.splice(i, 1);
            }
            
          }
          
        })    
        

      }
    })
  }
}
