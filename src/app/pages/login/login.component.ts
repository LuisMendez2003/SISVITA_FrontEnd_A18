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

    this.authService.login(this.email, this.contrasena).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
  
        this.http.get<{ data: User[] }>(`https://dsw-exposicionparcial-crud.onrender.com/usuarios?email=${this.email}`)
          .subscribe(
            (userResponse) => {
                            
              // Filtrar el usuario correcto
              const user = userResponse.data.find(u => u.email === this.email);
              
              if (user) {
                               
                this.authStateService.setUserId(user.id_usuario.toString());
    
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
