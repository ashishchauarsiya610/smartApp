import { Component, OnInit, ViewChild, OnChanges, ViewChildren, QueryList, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { IonSlides, ModalController, MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { ModedevicesComponent } from '../modedevices/modedevices.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.scss'],
})

export class ModesComponent implements OnInit, AfterViewInit {
  @ViewChildren('anchor') anchorList: QueryList<ElementRef>;
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

  // sliderOne: any;
 // Item object for Nature
 sliderOne = {
  isBeginningSlide: true,
  isEndSlide: false,
  slidesItems: [
    {
      id: 'a',
      name: 'Night',
      image: '../../assets/images/night.jpeg'
    },
    {
      id: 'b',
      name: 'Party',
      image: '../../assets/images/party.jpg'
    },
    {
      id: 'c',
      name: 'Relax',
      image: '../../assets/images/relax.png'
    },
    {
      id: 'd',
      name: 'Romance',
      image: '../../assets/images/romance.jpg'
    },
    {
      id: 'e',
      name: 'Summer',
      image: '../../assets/images/summer.jpg'
    },
    {
      id: 'f',
     name: 'Festival',
     image: '../../assets/images/festival.jpg'
    },
    {
      id: 'g',
     name: 'Energy',
     image: '../../assets/images/energy2.png'
    }
  ]
};
// display mode
  // checked = false;
  showApplDiv = false;
  dev_det_box= false;
  modeTitle;
  // Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true
  };
// configuration for editmode slider
  editMod = false;
  editslideOpts = {
    initialSlide: 0,
    slidesPerView: 1
  };

  modes=false;
  allDevices;
  dev_ToSelect=[];
  selectedDevs = [];
  source = [];
  allMods = [];
  devOfMods;
  index ;
  constructor(
    private menu: MenuController,
    private elRef: ElementRef,
    private auth: AuthService,
    private user: UserService,
    public modalCtrl: ModalController,
    ) {
  }

  ngOnInit() {
    // this.editClick();
    this.getModes();
    this.allDevToSelect();
  }

  openMenu() {
    this.menu.enable(true);
    this.menu.open('first'); 
}
backbutton(){
  this.user.showDevice=false;
  this.user.showRoom=true;
}
  getModes(){
    // this.allMods.length = 0;
    this.user.present('Please wait...'); //.............loader.....
    this.auth.getAllMode().subscribe(res => {
      console.log(res);
      this.user.dismiss();
      this.allMods.push(res);
    for( let mod of this.allMods[0]){
      // console.log(mod)
      // this.getModDevs(mod.id);
        for(let img of this.sliderOne.slidesItems){
          if(img.id == mod.name.charAt(0)){
           var img_matched = img.image;
           break;
          }
           else{
            img_matched = 'assets/irblaster_img/defaultMode.png'
          }
        }
      this.source.push({
          id: mod.id,
          img: img_matched,
          mname: mod.name.slice(1)} );
    }
      
    })
  }
  dev_ToDisp=[]
  getModDevs(mode_id){
    this.user.present('Please wait...');
    this.dev_ToDisp=[];
    this.auth.getDevForMode(mode_id).subscribe(res=>{
      console.log(res);
      this.user.dismiss();
      this.devOfMods=res;
      for(let d of this.devOfMods){
        for(let a of this.allDevices){
          if(d.device == a.device){
            var D_name = a.name;
            var D_img = this.showDevImg(a.device_type)
          }
        }
        if(d.status.toLowerCase() == 'true' || d.status == '1'){
          var state = true;
        }
        if(d.status.toLowerCase() == 'false' || d.status == '0'){
          var state = false;
        }
        this.dev_ToDisp.push({
          id: d.id,
          name: D_name,
          status: state,
          dimmer: d.dimmer,
          img: D_img
        })
      }
      this.dev_ToSelect =[];
      
      if(this.devOfMods.length !== 0){
        // alert('dev exist')
        this.devToSelect(this.devOfMods);
      } else{
        this.dev_ToSelect = [...this.allDevices];
        console.log(this.allDevices)
        console.log(this.dev_ToSelect)
      }
      
    })
  }

  devToSelect(devOfMods){
    this.dev_ToSelect =[];
    let dev_Select =[];
    dev_Select=[...this.allDevices];
    console.log(devOfMods)
    console.log(dev_Select)
    for(var i=0; i < devOfMods.length; i++){
      for(var j=0; j< dev_Select.length; j++){
        if(devOfMods[i].device == dev_Select[j].device){
          console.log(dev_Select[j])
          dev_Select.splice(j, 1)
        }
      }
    }  
    console.log(dev_Select)
    console.log(this.allDevices)
    this.dev_ToSelect = dev_Select;
  }

  ngAfterViewInit() {
  }
   // Move to Next slide
   slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
// Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  getcurrentimg(object, slideView) {
    slideView.getActiveIndex().then((i) => {
      this.index = i;
      // console.log(i);
    });
  //   this.slideWithNav.getActiveIndex().then(index => {
  //     console.log(index);
  //  });
  }

allDevToSelect(){
  this.auth.showAllAddedDevices().subscribe(res => {
    // this.modes = true;
    this.allDevices = res;
    console.log(this.allDevices);

  },
  err => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    // footer: '<a href>Why do I have this issue?</a>'
  }))
}


setmode(form) {
  // console.log(this.selectedDevs)
  this.user.present('Please wait...');
  const item = this.sliderOne.slidesItems[this.index];
  let mod_name;
  if (form.value.modename == '') {
    // this.source.push({
    //   img: item.image,
    //   mname: item.name} );
      mod_name =item.id+item.name
  } else {
    // this.source.push({
    //   img: item.image,
    //   mname: form.value.modename} );
      mod_name =item.id+form.value.modename;
    }

    this.auth.createMode(mod_name).subscribe(res => {
      console.log(res)
      this.user.dismiss();
      let timerInterval
      Swal.fire({
        title: 'Creating Mode...',
        // html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            // if (content) {
            //   const b = content.querySelector('b')
            //   if (b) {
            //     b.textContent = Swal.getTimerLeft()
            //   }
            // }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })



      this.auth.refreshPage();
    })
  this.modes = false;
  // this.editClick();
}
addModeDevices(devDetail){
  console.log(devDetail)
  let dev_Detail={
    dimmer: devDetail.dimmer,
    device: devDetail.id,
    mode: this.mode_id,
    status: devDetail.status
  };
  this.auth.addModeDevices(dev_Detail).subscribe(res=>{
    console.log(res);
  })
}

ischecked( e) {
  if (e.currentTarget.checked) {
    $(e.target).parent('div').parent('div').removeClass('inactive');
    $(e.target).parent('div').parent('div').addClass('active');
    // console.log( e.target);
  } else {
    $(e.target).parent('div').parent('div').removeClass('active');
    $(e.target).parent('div').parent('div').addClass('inactive');
  }
}
mode_id;
  editClick(i) {
    this.mode_id= i.id;
    this.getModDevs(i.id)
    // console.log(this.devOfMods)
   let currentsrc: string = i.img;
   let arr = [...this.sliderOne.slidesItems];
  //  console.log(arr);
   for (let j = 0; j < arr.length; j++) {
      let el = arr[j];
      if (el.image == currentsrc ) { this.editslideOpts.initialSlide = j; }
    }
  //  console.log('called' + i.img + this.editslideOpts.initialSlide);
  this.selectedDevs=[]
   this.editMod = true;
  }

  saveeditMode(form) {
    if(this.selectedDevs){
      // console.log(this.selectedDevs)
      for(let detail of this.selectedDevs){
        this.addModeDevices(detail);
      }
    }
   this.editMod = false;
  }
  async showAppl(i) {
    this.showApplDiv = true;
    this.modeTitle = i.mname;
    this.getModDevs(i.id);
    const modal = await this.modalCtrl.create({
      component: ModedevicesComponent,
      componentProps: {dev_data: this.dev_ToDisp, modeTitle:i.mname, modId: i.id}
    });
    return await modal.present();
  }

  deleteMode(id){
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
        this.auth.del_Mod(id).subscribe(res=>{
          console.log(res);
          for(var i=0; i<this.source.length; i++){
            if(this.source[i].id==id){
              this.source.splice(i,1);
            }
          }

          Swal.fire(
            'Deleted!',
            'Deleted Successfully',
            'success'
          )

        })
        

      }
    })
  }

  imgPath;
  showDevImg(name) {
    if (name == "Tube_Light") {
      return this.imgPath = 'assets/icon/tubelight.png'
    }
    if (name == "Fan") {
      return this.imgPath = 'assets/icon/fan.png'
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
  }
  // setDevDetail(){
  //   console.log(this.selectedDevs)
  //   this.dev_det_box=false;
  // }
  power(status){
    console.log(status)
  }
  dimmer(status){
    console.log(status)
  }
}
