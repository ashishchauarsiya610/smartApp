import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
declare var CameraCustom;
declare var TTlockdata;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
   public token;
  phone;
  email = '';
  password = '';
  show = false;
  public loading;
  phoneLogin = true;
  data;
  ttpass;
  // loginForm: FormGroup;
  
  formData: FormData = new FormData(); 
    prdetail: any;
    stdcode = '+91       India'
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public authService: AuthService,
    public user: UserService,
    public  alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder, 
    private loadingCtrl: LoadingController,
  ) {
   }
  ngOnInit(){}
  registrationForm = this.formBuilder.group({
    password:[],
    username: []
   });
  isActiveToggleTextPassword = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
   
  validateEmail(data) {
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(data.email)) {
      return {
        isValid: true,
        message: ''
      };
    } else {
      return {
        isValid: false,
        showErrorToast: 'Invalid Email',
        message: 'Email address is required'
       };
    }
  }
  async showErrorToast(data: any) {
    let toast =await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
    async  forget(){
        const prompt = await this.alertCtrl.create({  
        header: 'Reset Password..',  
         message: 'Please enter your registered email to reset your password.',
        inputs: [  
          {  
            name: 'email',  
            type: 'email',  
            placeholder: 'Enter your Email...'  
          }  
        ],  
        buttons: [  
          {  
            text: 'Cancel',  
            handler: data => {  
            }  
          },  
          {  
            text: 'submit',  
            handler: data => {     
              console.log(data.email);       
              let validateObj = this.validateEmail(data);
              if (!validateObj.isValid) {
                  this.showErrorToast("Please enter valid mail...");
                  return false;
              } else {
            this.user.present('please wait...')
             this.authService.check_User(data.email).subscribe(res=>{
               console.log(res);
               let body={
                        "destination": data.email,
                        "email": data.email
               }
               this.authService.sendOtp(body).subscribe(res=>{
                 console.log(res);
                 this.user.user_mail=data.email;
                 this.user.otp_div=true;
                 this.user.enter_newpass=false;
                this.router.navigateByUrl('/forgetpass');
                this.user.dismiss();
               },err=>{
                 this.user.dismiss();
                 this.user.showToast(JSON.stringify(err.error.detail))
                 console.log('send otp error');
               })
                
              
             },err=>{
               this.user.dismiss();     // check_user error
               this.user.showToast(err.error);
               console.log(err.user_id);
             })
                  
              }             
            }  
           }  
        ]  
      });  
      await prompt.present();   
    }
  async login(form:NgForm) {
    
    let userName = this.phoneLogin ? this.stdcode.slice(1).split(" ")[0]+this.phone : this.email;
    userName = userName.replace(/\s/g,'')
    // let userName = this.phoneLogin ? this.phone : this.email;
    // alert(userName +userName.length)
    if((userName =="") || (this.password=="")) {  
       
      const alert = await this.alertCtrl.create({
        
        header: 'Alert',       
        message: 'You can not login without filling username or password.',
        buttons: ['OK']
      });   
    }
    else {
      this.loading =await this.loadingCtrl.create({ message: 'loading...' });
      this.loading.present().then(()=>{  
      this.formData.append('password', this.password);
      this.formData.append('username', userName);  
      localStorage.setItem('passwordforprofile', this.password);
      this.authService.loginUser(this.formData).subscribe((res)=>{ 
        this.getData();
        this.navCtrl.navigateRoot('/mainpage');
        
        this.loading.dismiss();
        localStorage.setItem('token',res.token);
        //alert("Congratulations!\n You are lognin successfully.");
          // ----------- for guest user below code
  // let guestQr={
  //   "qr_code": userName
  // }
  // console.log('guestemail'+ JSON.stringify(guestQr));
 
  // this.authService.guestforqrlogin(guestQr).subscribe(res=>{
  //   console.log(res);
  // },err=>{
  //   console.log(err.error);
  // })
   
       
       
       
       },err=>{
        this.loading.dismiss()
         if(err.status_code == 422){
          this.user.showToast('Invalid Email/Password')
         } else {this.user.showToast('Oops! Something went wrong.')}
         
        })
    })

  }

  console.log(form.value.email);
  console.log(form.value.phone);
  console.log(form.value.password);
  let body={password:form.value.password}
  TTlockdata.encrypt(body,
    res=>{
      this.ttpass=res;
      this.user.ttPassword=this.ttpass;
      localStorage.setItem("ttPassword",this.ttpass);
      const params = new HttpParams({
        fromObject: {
          username: 'dyfo_'+form.value.email,
          password: this.ttpass,
          redirect_uri :'https://dyfolabs.com/',
          grant_type:"password",
        client_secret: "5c5f94e120022ac4288c648c1e89eb51" , 
        client_id: '7a614fea8d6f427caa982e9a1aa6afc1',
        
        }
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa('7a614fea8d6f427caa982e9a1aa6afc1' + ':' + '5c5f94e120022ac4288c648c1e89eb51'),
          'Origin': 'Dyfo'
        })
      };
      this.user.present('wait');
      this.authService.loginTTLock(params).subscribe(res=>{
        console.log((res));
        this.user.showToast(res);
        this.data=res;
        console.log(this.data.refresh_token);
        // alert(JSON.stringify(this.data.access_token));
        this.user.dismiss();
        this.navCtrl.navigateRoot('/mainpage'); 
      },error=>{
        this.navCtrl.navigateRoot('/mainpage'); 
        console.log(JSON.stringify(error.error));
      alert(JSON.stringify(error.error));
        console.log('error');
        this.user.dismiss();
      })

    },
    err=>{}
    )
   
  
   
     
   
 }

username;
 getData(){
this.authService.userProfile().subscribe(res=>{
this.prdetail=res;
this.username=this.prdetail.name;
console.log(this.username)
localStorage.setItem('prof', this.username);
//localStorage.setItem('prof', JSON.stringify(this.prdetail));
let countrycode = this.prdetail.mobile.slice(0,this.prdetail.mobile.length-10)
        this.prdetail.mobile = this.prdetail.mobile.substr(this.prdetail.mobile.length-10)
        this.tuyalogin(countrycode,this.prdetail.mobile,localStorage.getItem('passwordforprofile'),this.prdetail.email);
},err=>{
}
)}

tuyalogin(code,mobile,password,emailId){
//alert(mobile);
//let countrycode = mobile.slice(0,mobile.length-10)
//mobile = mobile.substr(mobile.length-10)
//alert(mobile+"....."+countrycode)
let body:any ={'code': code, 'number':null,"password":password,'mailId':emailId}
//let body:any ={'code': "91", 'number':"9560688398","password":"12345678"}
CameraCustom.login(body,
res=>{//alert(JSON.stringify(res));
// this.show=true;  
let homeName=this.authService.home_name;
// let homeName="Pushpendra Home"
this.loading.dismiss();
if(homeName != ""){
  //alert(this.authService.home_name)
  this.createHome(homeName);
  this.authService.home_name="";
}
},    
err=>{
//alert(JSON.stringify(err))
})
}
createHome(homename){
let body = { homeName : homename, roomList: "room1" }
CameraCustom.createhome(body,
res =>{
 // alert("res"+JSON.stringify(res))
},
err =>{
  //alert("err"+JSON.stringify(err))
})
}

  }



  
  //profile
  // getData(){
  
  //       this.authService.userProfile().subscribe(res=>{ 
  //          this.prdetail=res;
  //          localStorage.setItem('prof', JSON.stringify(this.prdetail));
  //       console.log("profile res"+ this.prdetail.username);
  //       this.authService.getProfileImg()
  //     },
  //     err=>{
  //       console.log("profile err"+err)
  //     });
  //   }
  

// }
