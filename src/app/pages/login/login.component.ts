import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService, AuthStateService } from '../../core/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, TabsComponent, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent { 

  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private authStateService: AuthStateService, private router: Router, private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    console.log('Email:', this.email);
    console.log('Contraseña:', this.contrasena);

    this.authService.login(this.email, this.contrasena).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
  
        this.http.get<{ data: User[] }>(`https://dsw-exposicionparcial-crud.onrender.com/usuarios?email=${this.email}`)
          .subscribe(
            (userResponse) => {
              console.log('Respuesta del servidor:', userResponse);
              
              // Filtrar el usuario correcto
              const user = userResponse.data.find(u => u.email === this.email);
              
              if (user) {
                console.log('Usuario completo:', user);
                
                this.authStateService.setUserId(user.id_usuario.toString());
  
                console.log('User ID stored:', this.authStateService.getUserId());
                console.log('Rol del usuario:', user.rol);
  
                if (user.rol === 'Estudiante') {
                  this.router.navigate(['/student-test']);
                } else if (user.rol === 'Especialista') {
                  this.router.navigate(['/specialist-test']);
                } else {
                  console.error('Rol de usuario no reconocido:', user.rol);
                }

              } else {
                console.error('Usuario no encontrado con el correo electrónico proporcionado');
              }
            },
            (error) => {
              console.error('Error al obtener información del usuario:', error);
            }
          );
      },
      (error) => {
        console.error('Error de inicio de sesión:', error);
      }
    );
  }
}
