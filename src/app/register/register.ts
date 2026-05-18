import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

    username:string = '';
  password:string = '';
  error:string = '';

 constructor(private authService:Auth,private router:Router){}

 onSubmit():void{
    this.authService.register(this.username,this.password).subscribe(
      () => {
        Swal.fire({
          title: "Usuario registrado",
          text: "Usuario " + this.username + " registrado con éxito",
          icon: "success"
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = 'Error en el registro. Por favor, inténtelo de nuevo.'
      }
    )
  }

}
