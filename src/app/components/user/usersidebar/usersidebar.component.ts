import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'user-sidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent {
  ngOnInit(): void {
  }
constructor(private login:LoginService){

}
  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
