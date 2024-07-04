import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RespuestaService } from '../../core/services/respuestas.service';
import { TabsspecialistComponent } from '../../core/components/tabsspecialist/tabsspecialist.component';

@Component({
  selector: 'app-specialist-vistatest',
  standalone: true,
  imports: [RouterModule, TabsspecialistComponent, HttpClientModule, CommonModule],
  templateUrl: './specialist-vistatest.component.html',
  styleUrls: ['./specialist-vistatest.component.scss'],
  providers: [RespuestaService]
})
export class SpecialistVistatestComponent implements OnInit {
  respuestas: any[] = [];
  id_realizaciontest: number = 0; // Inicializar con un valor predeterminado

  constructor(private router: Router, private route: ActivatedRoute, private respuestaService: RespuestaService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_realizaciontest = +params['id']; // Obtener el id_realizaciontest de la ruta
      this.loadRespuestas();
    });
  }

  loadRespuestas(): void {
    this.respuestaService.getRespuestasByRealizacionTest(this.id_realizaciontest).subscribe(
      (response) => {
        if (response && response.data) {
          this.respuestas = response.data;
        } else {
          console.error('Respuesta del servicio no tiene el formato esperado:', response);
        }
        
      },
      (error) => {
        console.error('Error al obtener las respuestas:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/specialist-test']); // Cambia '/anterior-pagina' a la ruta correcta
  }

  diagnosticar(id_realizaciontest: number): void {
    this.router.navigate(['/specialist-testdiagnosticar', id_realizaciontest]);
  }
}
