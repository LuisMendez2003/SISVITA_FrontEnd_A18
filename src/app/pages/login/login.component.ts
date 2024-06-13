import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService, AuthStateService } from '../../core/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, TabsComponent, HttpClientModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent { 

  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService,private authStateService: AuthStateService, private router: Router, private http: HttpClient){}

  onSubmit(event: Event) {
    event.preventDefault();
  
    this.authService.login(this.email, this.contrasena)
      .subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);
  
          this.http.get<any>(`https://dsw-exposicionparcial-crud.onrender.com/estudiantes?email=${this.email}`)
            .subscribe(
              (studentResponse ) => {
                if (studentResponse.data.length > 0) {
                  const student = studentResponse.data[0];
                  this.authStateService.setUserId(student.id_estudiante);
  
                  console.log('User ID stored:', this.authStateService.getUserId());
  
                  this.router.navigate(['/student-test']);
                } else {
                  console.error('Estudiante no encontrado con el correo electrónico proporcionado');
                }
              },
              (error) => {
                console.error('Error al obtener información del estudiante:', error);
              }
            );
        },
        (error) => {
          console.error('Error de inicio de sesión:', error);
        }
      );
  }
}
