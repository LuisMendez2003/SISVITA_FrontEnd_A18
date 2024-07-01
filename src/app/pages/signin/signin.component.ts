import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, TabsComponent, HttpClientModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [AuthService]
})
export class SigninComponent implements OnInit {

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  contrasena: string = '';
  confirmContrasena: string = '';
  telefono: string = '';
  direccion: string = '';
  fecha_registro: string = '';
  rol: string = 'Estudiante'; 
  ubigeo: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.setFechaRegistro();
  }

  setFechaRegistro() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    const mmString = mm < 10 ? '0' + mm : mm.toString();
    const ddString = dd < 10 ? '0' + dd : dd.toString();

    this.fecha_registro = `${yyyy}-${mmString}-${ddString}`;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.nombre || !this.apellido || !this.email || !this.contrasena || !this.confirmContrasena || !this.telefono || !this.direccion || !this.ubigeo) {
      alert('Por favor, complete todos los campos'); 
      return;
    }

    
    if (this.contrasena !== this.confirmContrasena) {
      alert('Las contraseñas no coinciden'); 
      return;
    }

    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      contrasena: this.contrasena,
      telefono: this.telefono,
      direccion: this.direccion,
      fecha_registro: this.fecha_registro,
      rol: this.rol,
      ubigeo: this.ubigeo
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
        alert('Error al registrar el usuario');
      }
    );
  }
}
