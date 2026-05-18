import { Component } from '@angular/core';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public authService:Auth){}

  logout():void{
    this.authService.logout();
  }
}
