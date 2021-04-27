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

    colorcode1:any;

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

  
  colorcode;
  ac;
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
    var self=this;
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
            var abc= $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
            console.log(dColor);
            
           
        }
        var colorcode = (<HTMLInputElement>document.querySelector('#hexVal')).value;
        console.log(colorcode);
        if(colorcode=="#0154a4" || colorcode=="#3276b5" || colorcode=="#85acd3" || colorcode=="#cedeed" || colorcode=="#eaf1f7"){
          console.log("blue");
          self.user.present('');
          let btnValue="up_button";
          self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
            self.user.dismiss();
          },err=>{
            self.user.dismiss()
          }) 
              }
          else if(colorcode=="#ed1b24" || colorcode=="#ef444a" || colorcode=="#f69195" || colorcode=="#fbd3d4" || colorcode=="#fdedee" || colorcode=="#f04950"){
                console.log("red");
                // self.bluecall();
                self.user.present('');
                let btnValue="down_button";
                self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                  self.user.dismiss();
                },err=>{
                  self.user.dismiss()
                }) 
                    }
          else if(colorcode=="#6b439b" || colorcode=="#8869ad" || colorcode=="#b7a5cd" || colorcode=="#e3daeb" || colorcode=="#f3f0f7"){
                      console.log("purple");
                      self.user.present('');
                      let btnValue="left_button";
                      self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                        self.user.dismiss();
                      },err=>{
                        self.user.dismiss()
                      }) 
                          }
          else if(colorcode=="#a64499" || colorcode=="#b868ad" || colorcode=="#d3a4ce" || colorcode=="#eddbeb" || colorcode=="f770f7"){
                            console.log("violet purple");
                            self.user.present('');
                            let btnValue="right_button";
                            self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                              self.user.dismiss();
                            },err=>{
                              self.user.dismiss()
                            }) 
                                }
          else if(colorcode=="#e44097" || colorcode=="#e966ac" || colorcode=="#f1a3cd" || colorcode=="#fad9ea" || colorcode=="#fcaff6"){
                                  console.log("vivid pink");
                                  self.user.present('');
                                  let btnValue="select_button";
                                  self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                    self.user.dismiss();
                                  },err=>{
                                    self.user.dismiss()
                                  }) 
                                  
                                      }
          else if(colorcode=="#f37020" || colorcode=="#f58d4e" || colorcode=="#f9bb94" || colorcode=="#fde3d4" || colorcode=="#fef3ed"){
                                        console.log("bright orange");
                                        self.user.present('');
                                        let btnValue="exit_button";
                                        self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                          self.user.dismiss();
                                        },err=>{
                                          self.user.dismiss()
                                        }) 
                                       
                                            }
          else if(colorcode=="#f78f1e" || colorcode=="#f9a544b" || colorcode=="#fbc994" || colorcode=="#fde8d3" || colorcode=="#f3f5ee"){
                                              console.log("orange");
                                              self.user.present('');
                                              let btnValue="play_button";
                                              self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                self.user.dismiss();
                                              },err=>{
                                                self.user.dismiss()
                                              }) 
                                           
                                                  }
          else if(colorcode=="#f78f1e" || colorcode=="#f9a54b" || colorcode=="#fbc994" || colorcode=="#fde8d3" || colorcode=="#fef5ee"){
                                                    console.log("amber");
                                                    self.user.present('');
                                              let btnValue="pause_button";
                                              self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                self.user.dismiss();
                                              },err=>{
                                                self.user.dismiss()
                                              }) 
                                                        }

          else if(colorcode=="#fef200" || colorcode=="#fff533" || colorcode=="#fef984" || colorcode=="#fffded" || colorcode=="#ffeea9"){
                                                          console.log("yellow");
                                                          self.user.present('');
                                                          let btnValue="record_button";
                                                          self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                            self.user.dismiss();
                                                          },err=>{
                                                            self.user.dismiss()
                                                          }) 
                                                       
                                                              }
          else if(colorcode=="#8dfc07" || colorcode=="#a3fd39" || colorcode=="#c8fd87" || colorcode=="#e9ffd0" || colorcode=="#f6ffec"){
                                                                console.log("electric indigo");
                                                                self.user.present('');
                                                                let btnValue="previous_button";
                                                                self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                                  self.user.dismiss();
                                                                },err=>{
                                                                  self.user.dismiss()
                                                                }) 
                                                             
                                                                    }
          else if(colorcode=="#00a88f" || colorcode=="#33b8a5" || colorcode=="#84d4c9" || colorcode=="#ceeeed" || colorcode=="#ecf8f6"){
                                                                      console.log("persian green");
                                                                      self.user.present('');
                                                                      let btnValue="next_button";
                                                                      self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                                        self.user.dismiss();
                                                                      },err=>{
                                                                        self.user.dismiss()
                                                                      }) 
                                                                   
                                                                          }
          else if(colorcode=="#0092ce" || colorcode=="#33a7d8" || colorcode=="#85acd3" || colorcode=="#cedeed" || colorcode=="#e9f0f6"){
                                                                            console.log("pacfic blue");
                                                                            self.user.present('');
                                                                            let btnValue="fast_forward_button";
                                                                            self.auth.pressKey(self.user.remoteIdforKeyPress,btnValue,self.user.moduleIdForKey).subscribe(res=>{
                                                                              self.user.dismiss();
                                                                            },err=>{
                                                                              self.user.dismiss()
                                                                            }) 
                                                                         
                                                                                }

        // this.colorcode1=colorcode;
    });
   
    this
    $('#picker').click(function(e) { // click event handler
        bCanPreview = !bCanPreview;
        
    });
    $('.preview').click(function(e) { // preview click
        $('.colorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;
    });
    
   
}
// bluecall(){
//        this.user.present('');
//           let btnValue="up_button";
//           this.auth.pressKey(this.user.remoteIdforKeyPress,btnValue,this.user.moduleIdForKey).subscribe(res=>{
//             this.user.dismiss();
//           },err=>{
//             this.user.dismiss()
//           }) 
// }

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

  keyPress(btnValue){
    console.log(this.user.moduleIdForKey);
    this.user.present('');
   this.auth.pressKey(this.user.remoteIdforKeyPress,btnValue,this.user.moduleIdForKey).subscribe(res=>{
     this.user.dismiss();
   },err=>{
     this.user.dismiss();
   })
  }
  btnValue;
  sendmoodType(btnValue){
    // this.btnValue=this.user.moodtype;
    console.log(btnValue);
    // console.log(this.user.moodtype)
    // console.log(this.user.moodDevice_id)
    //  this.auth.putMoodTypeFromApi(this.user.moodDevice_id,this.user.moodtype).subscribe(res=>{
    //     console.log(res)
    //     this.navCtrl.navigateRoot('/mainpage');
    // },err=>{console.log(err.error)})
    console.log(this.user.moduleIdForKey);
    this.user.present('');
    this.auth.pressKey(this.user.remoteIdforKeyPress,btnValue,this.user.moduleIdForKey).subscribe(res=>{
      this.user.dismiss();
    },err=>{
      this.user.dismiss()
    })
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
