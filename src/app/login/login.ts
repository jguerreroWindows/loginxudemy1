import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username:string='';
  password:string = '';
  error:string = '';

  constructor(private authService:Auth, private router:Router){

  }

    onSubmit():void{
    this.authService.login(this.username,this.password).subscribe({
      next: ()=> {
        Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Bienvenido ' + this.username,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});
        this.router.navigate(['/home']);
        console.log("Token de acceso : " + this.authService.getToken());
      },
      error : () => {
        Swal.fire({
          title: "Credenciales inválidas",
          text: "Verifique sus credenciales",
          icon: "error"
        });
        this.error = 'Credenciales inválidas';
      }
    })
  }

  }


