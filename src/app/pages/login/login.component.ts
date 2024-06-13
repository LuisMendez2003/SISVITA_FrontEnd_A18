import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
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

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(event: Event){
    event.preventDefault();

    this.authService.login(this.email, this.contrasena).subscribe(
      (response) =>{
        console.log('Inicio de sesión exitoso',response);
        this.router.navigate(['/student-test']);
      },
      (error) =>{
        console.log('Error',error);
      }
    );
  }
}
