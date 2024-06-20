import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsComponentstudent } from '../../core/components/tabsstudent/tabsstudent.component';
import { PreguntasService } from '../../core/services/preguntas.service';
import { TestService } from '../../core/services/test.service';
import { Pregunta } from '../../core/models/pregunta';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Alternativa } from '../../core/models/alternativa';
import { SavetestService } from '../../core/services/savetest.service';
import { RealizacionTest } from '../../core/models/realizacionTest';
import { Respuesta } from '../../core/models/respuesta';
import { AuthStateService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterModule, TabsComponentstudent,CommonModule, FormsModule, HttpClientModule],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss',
  providers: [ PreguntasService, TestService,SavetestService]
})

export class TakeTestComponent implements OnInit {

  preguntas: Pregunta[] = [];
  alternativas: { [key: number]: Alternativa[] } = {};
  nombreTest: string = '';
  id_estudiante: string = '';

  respuestasSeleccionadas: { [key: number]: number } = {};

  constructor(
    private savetestService: SavetestService,
    private route: ActivatedRoute,
    private router: Router,
    private preguntasService: PreguntasService,
    private testService: TestService,
    private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    this.id_estudiante = this.authStateService.getUserId();
    
    this.route.params.subscribe(params => {
      const id_test = +params['id'];
      
      this.loadTestName(id_test);

      // servicio para obtener las preguntas filtradas por id_test
      this.preguntasService.getByTest(id_test).subscribe(
        (data) => {

          this.preguntas = data;
          console.log('Preguntas obtenidas:', data);
          this.loadAlternativas();
        },
        (error) => {
          console.error('Error al obtener las preguntas:', error);
        }
      );
    });
  }

  loadAlternativas(): void{
    this.preguntas.forEach(pregunta => {
      this.preguntasService.getByQuestion(pregunta.id_pregunta).subscribe(
        (data) => {
          this.alternativas[pregunta.id_pregunta] = data;
          console.log(`Alternativas para pregunta ${pregunta.id_pregunta}:`, data);
        },
        (error) => {
          console.error(`Error al obtener las alternativas para la pregunta ${pregunta.id_pregunta}:`, error);
        }
      );
    })
  }

  loadTestName(id_test: number): void {
    this.testService.getTestById(id_test).subscribe(
      (response) => {
        this.nombreTest = response.nombre; // Acceder nombre
        console.log('Nombre del test:', this.nombreTest);
      },
      (error) => {
        console.error('Error al obtener el nombre del test:', error);
      }
    );
  }

  onSubmit() {

    const realizacionTest: RealizacionTest = {
      id_test: this.route.snapshot.params['id'], // Obtener el ID del test de la ruta
      id_estudiante: this.authStateService.getUserId(),
      fecha: new Date() // Fecha actual
    };

    // Enviar el objeto RealizacionTest
    this.savetestService.realizacionTest(realizacionTest.id_test, realizacionTest.id_estudiante, realizacionTest.fecha).subscribe(
      (response) => {
        console.log('RealizacionTest guardado correctamente:', response);
        // Guardar las respuestas de las preguntas
        this.guardarRespuestas(response.id_realizaciontest);
      },
      (error) => {
        console.error('Error al guardar RealizacionTest:', error);
      }
    );
  }

  guardarRespuestas(id_realizacionTest: number): void {
    Object.keys(this.respuestasSeleccionadas).forEach(preguntaId => {
      const idAlternativa = this.respuestasSeleccionadas[parseInt(preguntaId)];

      if (idAlternativa !== undefined) {
        const respuesta: Respuesta = {
          id_realizacionTest: id_realizacionTest,
          alternativa: idAlternativa
        };

        this.savetestService.respuesta(respuesta.id_realizacionTest, respuesta.alternativa).subscribe(
          (response) => {
            console.log('Respuesta guardada correctamente:', response);
          },
          (error) => {
            console.error('Error al guardar Respuesta:', error);
          }
        );
      }
    });
  }
} 