import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss'],
})
export class MoodComponent implements OnInit {
    dType;
    type1;
    room1=true;
    editRoom1=false;
    SelectMood=false;
    ashishmood=false;
    roomImg;
    roomId;
    selectedRooms;
    moodroomroomID;
    moodroomname;


  constructor(public user: UserService,
              public auth: AuthService,
              private navCtrl: NavController) {
                  
               }

  ngOnInit() {
      
    this.colorpick1()
       
      
    
   
  }

  selectOne(e){
    this.type1=e.currentTarget.value;
    console.log(this.type1)
    if(this.type1=="color"){
      // console.log("device previce color selected:"+this.user.moodDevice_color)
      this.SelectMood=false;
      this.user.ashishmood=true;

    }
    if(this.type1=="moodType"){
     this.SelectMood=true;
     this.user.ashishmood=false;
    }
  }



  colorpick1(){

    
   
    var bCanPreview = true; // can preview
    // create canvas and context objects
    var canvas = <HTMLCanvasElement>document.getElementById('picker');
    var ctx = canvas.getContext('2d');
    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }
    // select desired colorwheel
    var imageSrc = '../../../assets/images/colorwheel5.png';
    switch ($(canvas).attr('var')) {
        case '2':
            imageSrc = 'assets/images/colorwheel2.png';
            break;
        case '3':
            imageSrc = 'assets/images/colorwheel3.png';
            break;
        case '4':
            imageSrc = 'assets/images/colorwheel4.png';
            break;
        case '5':
            imageSrc = '../../../assets/images/colorwheel5.png';
            break;
    }
    image.src = imageSrc;
    $('#picker').mousemove(function(e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);
            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;
            // update preview color
            var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
            $('.preview').css('backgroundColor', pixelColor);
            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
    });
    $('#picker').click(function(e) { // click event handler
        bCanPreview = !bCanPreview;
    });
    $('.preview').click(function(e) { // preview click
        $('.colorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;
    });
}

checkChecked(e) {
    this.dType = e.currentTarget.value;
    console.log(this.dType);
    this.user.moodtype=this.dType;
    console.log(this.user.moodDevice_id)
    //  this.auth.putMoodTypeFromApi(this.user.moodDevice_id,this.user.moodtype).subscribe(res=>{
    //     console.log(res)
    //     this.navCtrl.navigateRoot('/mainpage');
    // },err=>{console.log(err.error)})
  }

  sendmoodType(){
    this.user.moodtype;
    console.log(this.user.moodtype)
    console.log(this.user.moodDevice_id)
     this.auth.putMoodTypeFromApi(this.user.moodDevice_id,this.user.moodtype).subscribe(res=>{
        console.log(res)
        this.navCtrl.navigateRoot('/mainpage');
    },err=>{console.log(err.error)})
  }

  sendmoodcolor(){
    console.log(" click")
    console.log(this.user.moodDevice_id)
    var colorcode = (<HTMLInputElement>document.querySelector('#hexVal')).value;
    console.log(colorcode)
    
    this.auth.putColorCodeFromApi(this.user.moodDevice_id,colorcode).subscribe(res=>{
        console.log(res)
        this.navCtrl.navigateRoot('/mainpage');
    },err=>{err.console.error();
    })
  }
   
  addedRooms(r){
    this.selectedRooms = r.name;
    this.roomImg = r.imgPath;
    this.user.room1 = false;
    this.user.editRoom1 = true;
  }

  // saveRoomWithApi() {
  //   var name = (<HTMLInputElement>document.getElementById('input')).value;
  //   var type=this.selectedRooms;
  //   console.log(type);
  //   this.auth.createRoom(name,type).subscribe((res) => {
  //     this.moodroomname = res;
  //     this.moodroomroomID = this.moodroomname.id;
  //     console.log( "Mood_moduleId-"+this.user.mood_pi);
  //     console.log("AddedInRoomName-"+ this.moodroomname.name);
  //     console.log("AddedInRoomId-"+ this.moodroomroomID);
  //     this.auth.postmooddevice(this.moodroomroomID,this.user.mood_pi).subscribe(res=>{

  //       let i=this.user.moodModuleAll.indexOf(this.user.moodModuleAll[0].id);
  //       this.user.moodModuleAll.splice(i,1)
  //       console.log(i)
  //       console.log(this.user.moodModuleAll[0])
        
  //              this.navCtrl.navigateRoot('/mainpage');
  //     },err=>{
  //       alert(err.error)
  //     }
  //     )
      
  //   });
  // }

  




  
}
