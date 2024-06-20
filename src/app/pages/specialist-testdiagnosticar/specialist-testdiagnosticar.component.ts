import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RespuestaService } from '../../core/services/respuestas.service'; 
import { TabsspecialistComponent } from '../../core/components/tabsspecialist/tabsspecialist.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialist-testdiagnosticar',
  standalone: true,
  imports: [RouterModule, TabsspecialistComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './specialist-testdiagnosticar.component.html',
  styleUrls: ['./specialist-testdiagnosticar.component.scss'],
  providers: [RespuestaService]
})
export class SpecialistTestdiagnosticarComponent implements OnInit {
  respuestas: any[] = [];
  id_realizaciontest: number = 0; // Inicializar con un valor predeterminado
  tratamiento: string = '';
  solicitarCita: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private respuestaService: RespuestaService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_realizaciontest = +params['id']; // Obtener el id_realizaciontest de la ruta
      this.loadRespuestas();
    });
  }

  loadRespuestas(): void {
    this.respuestaService.getRespuestas().subscribe(
      (response) => {
        if (response && response.data) {
          // Filtrar las respuestas por id_realizaciontest
          this.respuestas = response.data.filter((respuesta: any) => respuesta.id_realizaciontest === this.id_realizaciontest);
        } else {
          console.error('Respuesta del servicio no tiene el formato esperado:', response);
        }
        console.log('Respuestas filtradas:', this.respuestas);
      },
      (error) => {
        console.error('Error al obtener las respuestas:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/specialist-test']); // Navegar a la página anterior
  }

  finalizar(): void {
    if (this.tratamiento && this.solicitarCita) {
      // Lógica para finalizar, como guardar los datos ingresados
      console.log('Tratamiento:', this.tratamiento);
      console.log('Solicitar cita:', this.solicitarCita);
      this.router.navigate(['/specialist-test']); // Navegar a la página de specialist-test
    } else {
      alert('Por favor, complete el tratamiento y seleccione una opción para solicitar cita.');
    }
  }
}
