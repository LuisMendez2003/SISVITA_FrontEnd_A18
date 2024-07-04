import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RealizacionTestService } from '../../core/services/realizaciontest.service'; 
import { AuthService, AuthStateService } from '../../core/services/auth.service';
import { TabsComponentstudent } from '../../core/components/tabsstudent/tabsstudent.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-testver',
  standalone: true,
  imports: [RouterModule, TabsComponentstudent, HttpClientModule, CommonModule],
  templateUrl: './student-testver.component.html',
  styleUrls: ['./student-testver.component.scss'],
  providers: [RealizacionTestService, AuthService]
})
export class StudentTestverComponent implements OnInit {
  realizacionesTest: any[] = [];
  id_estudiante: string = '';

  constructor(
    private router: Router,
    private realizacionTestService: RealizacionTestService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    console.log('User ID stored:', this.authStateService.getUserId());
    const userId = this.authStateService.getUserId();

    this.authStateService.getStudentIdByUserId(userId).subscribe(
      idEstudiante => {
        this.id_estudiante = idEstudiante;
        console.log('ID Estudiante:', this.id_estudiante);

        // Convertir id_estudiante a número si es necesario
        const idEstudianteNum = parseInt(this.id_estudiante, 10);

        // Obtener las realizaciones de test del estudiante
        this.realizacionTestService.getRealizacionesTestByStudent(idEstudianteNum).subscribe(
          (response) => {
            this.realizacionesTest = response.data;
            console.log('Fetched realizacionesTest:', this.realizacionesTest);
          },
          (error) => {
            console.error('Error fetching realizacionesTest', error);
          }
        );
      },
      error => {
        console.error('Error al obtener ID de estudiante:', error);
      }
    );
  }

  viewRealizacionTest(id_realizaciontest: number) {
    this.router.navigate(['/specialist-vistatest', id_realizaciontest]);
  }
}
