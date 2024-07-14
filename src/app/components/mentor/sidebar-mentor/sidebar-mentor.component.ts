import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-mentor',
  templateUrl: './sidebar-mentor.component.html',
  styleUrls: ['./sidebar-mentor.component.css']
})
export class SidebarMentorComponent {
  ngOnInit(): void {
  }
constructor(private login:LoginService){

}
  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
