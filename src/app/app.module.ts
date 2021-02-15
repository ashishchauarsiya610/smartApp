import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HTTP} from '@ionic-native/http/ngx'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './pages/support/support.component';
import { IrProductComponent } from './pages/ir-product/ir-product.component';
import { IrRemoteComponent } from './pages/ir-remote/ir-remote.component';
import { AllRemoteComponent } from './pages/all-remote/all-remote.component';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { ModesComponent } from './pages/modes/modes.component';
import * as $ from 'jquery';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SheduleComponent } from './pages/shedule/shedule.component';
import { BarcodeComponent } from './pages/barcode/barcode.component';
//  import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

// import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SecurityComponent } from './pages/security/security.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { WifiSettingsComponent } from './pages/wifi-settings/wifi-settings.component';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SideMenuComponent } from './pages/side-menu/side-menu.component';
// import { Network } from '@ionic-native/network/ngx';
import { AddschedulesComponent } from './pages/addschedules/addschedules.component';
import { ModulenameComponent } from './pages/modulename/modulename.component';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModedevicesComponent } from './pages/modedevices/modedevices.component';

import { FaqComponent } from './pages/faq/faq.component';
import {MoodComponent} from './pages/mood/mood.component'
import { BtconnectionComponent } from './pages/btconnection/btconnection.component';
// import { BLE } from '@ionic-native/ble/ngx';
import { UserService } from './services/user.service';
import { Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin } from '@ionic-native/core';
// import { IonicStorageModule } from '@ionic/storage';
import { LockSetupComponent } from './pages/lock-setup/lock-setup.component';
import { LockRecordsComponent } from './pages/lock-records/lock-records.component';
import { NgOtpInputModule } from 'ng-otp-input';
// import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ModulecategoryComponent } from './pages/modulecategory/modulecategory.component';
import { AddlockinroomComponent } from './pages/addlockinroom/addlockinroom.component';
import { DevicestatusComponent } from './pages/devicestatus/devicestatus.component';
import { EditdeviceComponent } from './pages/editdevice/editdevice.component';
import { IrCompanyComponent } from './pages/ir-company/ir-company.component';
// import { Hotspot} from '@ionic-native/hotspot/ngx';
import { AllmoduleComponent } from './pages/allmodule/allmodule.component';
import { GuestComponent } from './pages/guest/guest.component';
import { DeviceforroomComponent } from './pages/deviceforroom/deviceforroom.component';
import { IrdataComponent } from './pages/irdata/irdata.component';
import { QrdeviceforroomComponent } from './pages/qrdeviceforroom/qrdeviceforroom.component';
import { UpdatepassComponent } from './pages/updatepass/updatepass.component';
import { IrnumberComponent } from './pages/irnumber/irnumber.component';
import { IrextraComponent } from './pages/irextra/irextra.component';
import { IrselectfordataComponent } from './pages/irselectfordata/irselectfordata.component';
// import { CameraFunctionsComponent } from './pages/camera-functions/camera-functions.component';
import { IrremotenumberComponent } from './pages/irremotenumber/irremotenumber.component';
import { IrremotemoreComponent } from './pages/irremotemore/irremotemore.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { FavlistComponent } from './pages/favlist/favlist.component';
import { FavstatusComponent } from './pages/favstatus/favstatus.component';

import { SecuritydevicesComponent } from './pages/securitydevices/securitydevices.component';
import { TamdevicesComponent } from './pages/tamdevices/tamdevices.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { AutomationdevicesComponent } from './pages/automationdevices/automationdevices.component';
import { NewTabComponent } from './pages/new-tab/new-tab.component';
import { TtlockoperationComponent } from './pages/ttlockoperation/ttlockoperation.component';
import { TtlockrecordComponent } from './pages/ttlockrecord/ttlockrecord.component';
import { TtlockdetailsComponent } from './pages/ttlockdetails/ttlockdetails.component';
import { TtlocksettingspageComponent } from './pages/ttlocksettingspage/ttlocksettingspage.component';
import { TtlockautolocktimeComponent } from './pages/ttlockautolocktime/ttlockautolocktime.component';
import { TtlocknameComponent } from './pages/ttlockname/ttlockname.component';
import { TtlockbatteryComponent } from './pages/ttlockbattery/ttlockbattery.component';
import { TtlockaddComponent } from './pages/ttlockadd/ttlockadd.component';
import { SecuritylockComponent } from './pages/securitylock/securitylock.component';
import { TtlockfingeraddComponent } from './pages/ttlockfingeradd/ttlockfingeradd.component';
import { TtlockfingerlistComponent } from './pages/ttlockfingerlist/ttlockfingerlist.component';
import { TtlockfingerdetailsComponent } from './pages/ttlockfingerdetails/ttlockfingerdetails.component';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { TtlockekeysendComponent } from './pages/ttlockekeysend/ttlockekeysend.component';
import { TtlockekeylistComponent } from './pages/ttlockekeylist/ttlockekeylist.component';
import { GuestlistComponent } from './pages/guestlist/guestlist.component';
import { TtlockpasscodedetailsComponent } from './pages/ttlockpasscodedetails/ttlockpasscodedetails.component';
import { TtlockpasscodelistComponent } from './pages/ttlockpasscodelist/ttlockpasscodelist.component';
import { TtlockpasscodeaddComponent } from './pages/ttlockpasscodeadd/ttlockpasscodeadd.component';
import { TticCardaddComponent } from './pages/ttic-cardadd/ttic-cardadd.component';
import { TticCardlistComponent } from './pages/ttic-cardlist/ttic-cardlist.component';
import { EnergychartComponent } from './pages/energychart/energychart.component';
import { DyfolockstatusComponent } from './pages/dyfolockstatus/dyfolockstatus.component';
import { TtlockgatewayinitComponent } from './pages/ttlockgatewayinit/ttlockgatewayinit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModesComponent,
    TabsComponent,
    SheduleComponent,
    BarcodeComponent,
    AppComponent,
    SideMenuComponent,
    ModulenameComponent,
    MoodComponent,
                ProfileComponent,
                SupportComponent,
                WifiSettingsComponent,
                MainpageComponent,
                SecurityComponent,
                DevicesComponent,
                AddschedulesComponent,
                IrRemoteComponent,
                ModedevicesComponent,
                IrProductComponent,
                AllRemoteComponent,
                FaqComponent,
                BtconnectionComponent,
                LockSetupComponent,
                LockRecordsComponent,
                ModulecategoryComponent,
                AddlockinroomComponent,
                DevicestatusComponent,
                EditdeviceComponent,
                IrCompanyComponent,
                AllmoduleComponent,
                GuestComponent,
                DeviceforroomComponent,
                IrdataComponent,
                QrdeviceforroomComponent,
                UpdatepassComponent,
                IrnumberComponent,
                IrextraComponent,
                IrselectfordataComponent,       
                // CameraFunctionsComponent,
                IrremotenumberComponent,
                IrremotemoreComponent,
                FavlistComponent,
                FavstatusComponent,
                AutomationdevicesComponent,
                SecuritydevicesComponent,
                TamdevicesComponent,
                ForgetpassComponent,
                NewTabComponent,
                TtlockoperationComponent,
                TtlockrecordComponent,
                TtlockdetailsComponent,
                TtlocksettingspageComponent,
                TtlockautolocktimeComponent,
                TtlocknameComponent,
                TtlockbatteryComponent, 
                TtlockaddComponent,
                SecuritylockComponent,
                TtlockfingeraddComponent,
                TtlockfingerlistComponent,
                TtlockfingerdetailsComponent,
                TtlockekeysendComponent,
                TtlockekeylistComponent,
                TtlockpasscodeaddComponent,
                TtlockpasscodelistComponent,
                TtlockpasscodedetailsComponent,
                GuestlistComponent,
                TticCardaddComponent,
                TticCardlistComponent,
                EnergychartComponent,
                DyfolockstatusComponent,
                TtlockgatewayinitComponent
                
                


               
  ],
  entryComponents: [ModedevicesComponent, LockRecordsComponent,DevicesComponent,AddlockinroomComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    // IonicStorageModule.forRoot(),
    AppRoutingModule,
    // NgxQRCodeModule,
    NgOtpInputModule,
    
    //IonicStorageModule.forRoot()
   // InAppBrowser,
  
   
  ],
  providers: [
    StatusBar, UserService,
    // CameraPreview,
    LoginComponent, LockRecordsComponent,
    SplashScreen,
    MoodComponent,
    AndroidPermissions,
    
   // SpinnerDialog,
    { provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy 
      },
    // EmailComposer,
    OpenNativeSettings,
    
    // Network,
    //  QRScanner,
    AllRemoteComponent,
    HTTP,
    NgForm,
    
     LoginComponent,
    DevicesComponent,  
    ModedevicesComponent,
    AllRemoteComponent,
    // BLE,
    Hotspot,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
