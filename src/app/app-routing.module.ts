import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SupportComponent } from './pages/support/support.component';

import { ModesComponent } from './pages/modes/modes.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SheduleComponent } from './pages/shedule/shedule.component';
import { BarcodeComponent } from './pages/barcode/barcode.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { SecurityComponent } from './pages/security/security.component';
import { WifiSettingsComponent } from './pages/wifi-settings/wifi-settings.component';
import { AddschedulesComponent } from './pages/addschedules/addschedules.component';

import { DevicesComponent } from './pages/devices/devices.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { ModulenameComponent } from './pages/modulename/modulename.component';
import { AuthguardGuard } from './services/authguard.guard';
import { IrRemoteComponent } from './pages/ir-remote/ir-remote.component';

import { IrProductComponent } from './pages/ir-product/ir-product.component';
import { AllRemoteComponent } from './pages/all-remote/all-remote.component';
import { MoodComponent } from './pages/mood/mood.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BtconnectionComponent } from './pages/btconnection/btconnection.component';
import { LockSetupComponent } from './pages/lock-setup/lock-setup.component';
import { ModulecategoryComponent } from './pages/modulecategory/modulecategory.component';
import { AddlockinroomComponent } from './pages/addlockinroom/addlockinroom.component';
import { DevicestatusComponent } from './pages/devicestatus/devicestatus.component';
import { EditdeviceComponent } from './pages/editdevice/editdevice.component';
import { AllmoduleComponent } from './pages/allmodule/allmodule.component';
import { GuestComponent } from './pages/guest/guest.component';
import { DeviceforroomComponent } from './pages/deviceforroom/deviceforroom.component';

import { IrdataComponent } from './pages/irdata/irdata.component';
import { QrdeviceforroomComponent } from './pages/qrdeviceforroom/qrdeviceforroom.component';
import { UpdatepassComponent } from './pages/updatepass/updatepass.component';
import { IrnumberComponent } from './pages/irnumber/irnumber.component';
import { IrextraComponent } from './pages/irextra/irextra.component';
import { IrselectfordataComponent } from './pages/irselectfordata/irselectfordata.component';
import { IrremotenumberComponent } from './pages/irremotenumber/irremotenumber.component';
import { IrremotemoreComponent } from './pages/irremotemore/irremotemore.component';
import { FavlistComponent } from './pages/favlist/favlist.component';
import { FavstatusComponent } from './pages/favstatus/favstatus.component';
import { AutomationdevicesComponent } from './pages/automationdevices/automationdevices.component';
import { SecuritydevicesComponent } from './pages/securitydevices/securitydevices.component';
import { TamdevicesComponent } from './pages/tamdevices/tamdevices.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
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
import { TtlockekeylistComponent } from './pages/ttlockekeylist/ttlockekeylist.component';
import { TtlockekeysendComponent } from './pages/ttlockekeysend/ttlockekeysend.component';
import { TtlockpasscodelistComponent } from './pages/ttlockpasscodelist/ttlockpasscodelist.component';
import { TtlockpasscodeaddComponent } from './pages/ttlockpasscodeadd/ttlockpasscodeadd.component';
import { TtlockpasscodedetailsComponent } from './pages/ttlockpasscodedetails/ttlockpasscodedetails.component';
import { GuestlistComponent } from './pages/guestlist/guestlist.component';
import { TticCardlistComponent } from './pages/ttic-cardlist/ttic-cardlist.component';
import { TticCardaddComponent } from './pages/ttic-cardadd/ttic-cardadd.component';
import { EnergychartComponent } from './pages/energychart/energychart.component';
import { DyfolockstatusComponent } from './pages/dyfolockstatus/dyfolockstatus.component';
import { TtlockgatewayinitComponent } from './pages/ttlockgatewayinit/ttlockgatewayinit.component';
// import { CameraFunctionsComponent } from './pages/camera-functions/camera-functions.component';





const routes: Routes = [
  { path: '', 
  redirectTo: '/mainpage', 
  pathMatch: 'full' 
},
  { 
    path: 'home',
   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) 
  },
  { path: 'login', component: LoginComponent },
   { path: 'mainpage', component: MainpageComponent, canActivate: [AuthguardGuard]},
  { path: 'security', component: SecurityComponent, canActivate: [AuthguardGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthguardGuard]},
  { path: 'profile', component: ProfileComponent },
  { path: 'support', component: SupportComponent },
  
 { path: 'main', component: ModesComponent, canActivate: [AuthguardGuard]},
 { path: 'wifi', component: WifiSettingsComponent, canActivate: [AuthguardGuard]},
 
   { path: 'shedule', component: SheduleComponent, canActivate: [AuthguardGuard]},
   { path: 'newschedule', component: AddschedulesComponent, canActivate: [AuthguardGuard]},
   { path: 'modulename', component:  ModulenameComponent, canActivate: [AuthguardGuard]},

   { path: 'main', component: ModesComponent },
   { path: 'wifi', component: WifiSettingsComponent },
   { path: 'shedule', component: SheduleComponent },
  
   { path: 'modulename', component: ModulenameComponent },
   { path: 'submoduleshow', component: SheduleComponent },
   
   { path: 'modulename', component:  ModulenameComponent },

   { path: 'ir-remote', component:  IrRemoteComponent },
   { path: 'ir-product', component:  IrProductComponent },
   { path: 'all-remote', component:  AllRemoteComponent },
   { path: 'mood', component:   MoodComponent },
   { path: 'addnewmodule', component:   FaqComponent },
   { path: 'main', component: ModesComponent},
   { path: 'irremote', component: IrRemoteComponent },
   { path: 'mode', component: ModesComponent},
   { path: 'mood', component: MoodComponent },
   { path: 'btconnect', component: BtconnectionComponent },
   { path: 'locksetup', component: LockSetupComponent },
   { path: 'mcategory', component: ModulecategoryComponent },
   { path: 'addlockinroom', component: AddlockinroomComponent },
   { path: 'devicestatus', component: DevicestatusComponent },
  //  { path: 'camerafun', component:  CameraFunctionsComponent },
   { path: 'editdevice', component: EditdeviceComponent ,canActivate: [AuthguardGuard]},
   { path: 'allmodule', component: AllmoduleComponent ,canActivate: [AuthguardGuard]},
   { path: 'guest', component: GuestComponent ,canActivate: [AuthguardGuard]},
   { path: 'deviceforroom', component: DeviceforroomComponent ,canActivate: [AuthguardGuard]},
   { path: 'deviceforroom', component: DeviceforroomComponent ,canActivate: [AuthguardGuard]},
   { path: 'qrdeviceforroom', component: QrdeviceforroomComponent ,canActivate: [AuthguardGuard]},
   { path: 'irdata', component: IrdataComponent, canActivate: [AuthguardGuard]},
   { path: 'irnumber', component: IrnumberComponent, canActivate: [AuthguardGuard]},
   { path: 'irextra', component: IrextraComponent, canActivate: [AuthguardGuard]},
   { path: 'irdatacolletion', component: IrselectfordataComponent, canActivate: [AuthguardGuard]},
   { path: 'irremotenumber', component: IrremotenumberComponent, canActivate: [AuthguardGuard]},
   { path: 'irremotemore', component: IrremotemoreComponent, canActivate: [AuthguardGuard]},
   { path: 'favlist', component: FavlistComponent, canActivate: [AuthguardGuard]},
   { path: 'favstatus', component: FavstatusComponent, canActivate: [AuthguardGuard]},
   { path: 'automationmodule', component: AutomationdevicesComponent, canActivate: [AuthguardGuard]},
   { path: 'securitymodule', component: SecuritydevicesComponent, canActivate: [AuthguardGuard]},
   { path: 'tammodule', component: TamdevicesComponent, canActivate: [AuthguardGuard]},
   { path: 'forgetpass', component: ForgetpassComponent,},
   { path: 'upatepass', component: UpdatepassComponent, canActivate: [AuthguardGuard],
   children: [
    //  { path: 'mainpage', 
    //  component: MainpageComponent, canActivate: [AuthguardGuard] 
    //  },
  
      // {  path: 'scanner',  component: BarcodeComponent,  },
      // {  path: 'devicestatus',  component: DevicestatusComponent, canActivate: [AuthguardGuard] },
      // {  path: 'modes',  component: ModesComponent,  },
     ]
  },
  { path: 'devicestatus/mainpage', component: MainpageComponent },
  {  path: 'devicestatus/guest',  component: GuestComponent,  },
  {  path: 'devicestatus/newschedule',  component: AddschedulesComponent,  },
  {  path: 'btconnect/newschedule',  component: AddschedulesComponent,  },
  {  path: 'btconnect/guest',  component: GuestComponent,  },
 
  {  path: 'ir-remote/guest',  component: GuestComponent,  },
  {  path: 'ir-remote/newschedule',  component: GuestComponent,  },
  {  path: 'ir-remote/mainpage',  component: GuestComponent,  },
  {
    path:'newtab',
    component: NewTabComponent
  },
  {
    path:'ttlock',
    component: TtlockoperationComponent
  },
  {
    path:'ttlockrecord',
    component: TtlockrecordComponent
  },
  {
    path:'ttlock/ttlockrecord',
    component: TtlockrecordComponent
  },
  {
    path:'ttlockdetails',
    component: TtlockdetailsComponent
  },
  {
    path:'ttlocksettings',
    component: TtlocksettingspageComponent
  },
  {
    path:'ttoperatiion/ttlocksettings',
    component: TtlocksettingspageComponent
  },
  {
    path:'ttlockautotime',
    component: TtlockautolocktimeComponent
  },
  {
    path:'ttlockname',
    component: TtlocknameComponent
  },
  {
    path:'ttlockbattery',
    component: TtlockbatteryComponent
  },
  {
    path:'ttlockadd',
    component: TtlockaddComponent
  },
{
path: 'ttoperatiion',
component: TtlockoperationComponent 
},
{
  path: 'ttoperatiion/ttlockrecord',
  component: TtlockrecordComponent
},
{
path: 'securityLock',
component: SecuritylockComponent
},
{
  path: 'ttlockaddfinger',
  component: TtlockfingeraddComponent
  },
  {
    path: 'ttlockfingerlist',
    component: TtlockfingerlistComponent
    },
    {
      path: 'ttlockfingerdetails',
      component: TtlockfingerlistComponent
      },
      {
        path: 'ttlockfingeruserdetails',
        component: TtlockfingerdetailsComponent
      },
      {
        path: 'ttlockekeylist',
        component: TtlockekeylistComponent
      },
      {
        path: 'ttlockekeysend',
        component: TtlockekeysendComponent
      },
      {
        path: 'ttlockpasscodelist',
        component: TtlockpasscodelistComponent
      },
      {
        path: 'ttlockpasscodeadd',
        component: TtlockpasscodeaddComponent
      },
      {
        path: 'ttlockpasscodedetails',
        component: TtlockpasscodedetailsComponent
      },
      {
        path: 'guestlist',canActivate: [AuthguardGuard],
        component: GuestlistComponent
      },
      {
        path: 'ttlockiclist',
        component: TticCardlistComponent
      },
      {
        path: 'ttlockicadd',
        component: TticCardaddComponent
      },
      {
        path: 'ttlockgatewayinit',
        component: TtlockgatewayinitComponent
      },
      {
        path:'energychart',
        component: EnergychartComponent,canActivate: [AuthguardGuard]
      },
      {
        path:'dyfolockstatus',
        component: DyfolockstatusComponent ,canActivate: [AuthguardGuard]
      },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
