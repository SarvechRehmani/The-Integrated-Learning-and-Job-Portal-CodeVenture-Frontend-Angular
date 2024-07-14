import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-company',
  templateUrl: './sidebar-company.component.html',
  styleUrls: ['./sidebar-company.component.css']
})
export class SidebarCompanyComponent {
  ngOnInit(): void {
  }
constructor(private login:LoginService){

}
  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
