import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UbigeoService } from '../../core/services/ubigeo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, TabsComponent, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [AuthService, UbigeoService]
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

  selectedDepartamento: number = 0;
  selectedProvincia: number = 0;
  selectedDistrito: any = {};

  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  

  constructor(private authService: AuthService, private router: Router, private ubigeoService: UbigeoService) {}

  ngOnInit() {
    this.setFechaRegistro();
    this.loadDepartamentos();
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

  loadDepartamentos() {
    this.ubigeoService.getDepartamentos().subscribe(
      (data) => {
        this.departamentos = data;
      },
      (error) => {
        console.error('Error al cargar departamentos', error);
      }
    );
  }

  onDepartamentoChange() {
    if (this.selectedDepartamento !== 0) {
      this.ubigeoService.getProvinciasByDepartamento(this.selectedDepartamento).subscribe(
        (data) => {
          this.provincias = data;
        },
        (error) => {
          console.error('Error al cargar provincias', error);
        }
      );
    } else {
      this.provincias = [];
      this.distritos = [];
    }
  }

  onProvinciaChange() {
    if (this.selectedProvincia !== 0) {
      this.ubigeoService.getDistritosByProvincia(this.selectedProvincia).subscribe(
        (data) => {
          this.distritos = data;
        },
        (error) => {
          console.error('Error al cargar distritos', error);
        }
      );
    } else {
      this.distritos = [];
    }
  }
 

  onSubmit(event: Event) {
    console.log(this.selectedDistrito.ubigeo);
    
    event.preventDefault();

    if (!this.nombre || !this.apellido || !this.email || !this.contrasena || !this.confirmContrasena || !this.telefono || !this.direccion) {
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
      ubigeo: this.selectedDistrito.ubigeo
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
