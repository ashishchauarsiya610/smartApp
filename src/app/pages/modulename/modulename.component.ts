import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modulename',
  templateUrl: './modulename.component.html',
  styleUrls: ['./modulename.component.scss'],
})
export class ModulenameComponent implements OnInit {
  public modulenm;
       modulname=[];
  constructor(public auth:AuthService,private menu: MenuController) { }

  ngOnInit() {
    this.getModules();
   
  }
  openMenu(){
    this.menu.enable(true);
  }
  getModules(){
    this.auth.getModuleFromApi().subscribe(res=>{
      console.log(res)
      this.modulenm=res;
       for(let i=0;i<this.modulenm.length;i++){
         this.modulname[i]=this.modulenm[i]
       console.log(this.modulname[i]) 
       }
      console.log("module res.."+this.modulname)
    },err=>{
      console.log("module err" + err)
    }
    )
  }

}
