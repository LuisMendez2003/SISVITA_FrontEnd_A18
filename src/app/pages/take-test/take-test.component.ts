import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabsstudent/tabsstudent.component';
import { PreguntasService } from '../../core/services/preguntas.service';
import { Pregunta } from '../../core/interfaces/pregunta';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Alternativa } from '../../core/interfaces/alternativa';

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [RouterModule, TabsComponent,CommonModule,HttpClientModule],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.scss',
  providers: [ PreguntasService]
})

export class TakeTestComponent implements OnInit {

  preguntas: Pregunta[] = [];
  alternativas: { [key: number]: Alternativa[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preguntasService: PreguntasService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_test = +params['id']; // Convertir el parámetro a número

      // Llamar al servicio para obtener las preguntas filtradas por id_test
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
          console.log('Alternativas para pregunta ${pregunta.id_pregunta}:', data);
        },
        (error) => {
          console.error('Error al obtener las alternativas para la pregunta ${pregunta.id_pregunta}:', error);
        }
      );
    })
  }

}