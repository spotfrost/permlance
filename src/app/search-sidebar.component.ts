import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
  selector: 'app-search-sidebar',
  template: `

  `,
  styles: [`
    
    `]
})
export class SearchSidebarComponent implements OnInit {

  constructor(private sb:SidebarComponent) {
    console.log('in this');
    console.log(sb);
  }
  private remoteClicked:boolean=false;
  ngOnInit() {
  }

  clickRemote(event){
    if(event.target.checked){
      this.remoteClicked=true;
    }else{
        this.remoteClicked=false;
    }

    //this.sb.clickRemote(this.remoteClicked);
  }

}
