import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  observaciones: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private respuestaService: RespuestaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_realizaciontest = +params['id']; // Obtener el id_realizaciontest de la ruta
      this.loadRespuestas();
      this.loadObservaciones();
    });
  }

  loadObservaciones(): void{
    this.http.get<any>(`https://dsw-exposicionparcial-crud.onrender.com/realizaciontest/${this.id_realizaciontest}`).subscribe(
      (response) => {
        this.observaciones = response.data.observaciones;
      },
      (error) => {
        console.error('Error al cargar observaciones:', error);
      }
    );
  }

  actualizarObservaciones(): void {
    this.http.patch(`https://dsw-exposicionparcial-crud.onrender.com/realizaciontest/${this.id_realizaciontest}/observaciones`, { observaciones: this.observaciones })
      .subscribe(
        (response) => {
          console.log('Observaciones actualizadas correctamente.');
          // Actualizar localmente si es necesario
        },
        (error) => {
          console.error('Error al actualizar observaciones:', error);
        }
      );
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
    if (this.tratamiento) {
      // Lógica para finalizar, como guardar los datos ingresados
      
      if(this.solicitarCita === 'si'){
        this.enviarEmail();
      }
      console.log('Solicitar cita:', this.solicitarCita);
      this.router.navigate(['/specialist-test']); // Navegar a la página de specialist-test
    } else {
      alert('Por favor, complete el tratamiento.');
    }
  }

  enviarEmail(): void {
    console.log('Se ha solicitado una cita.');

    const destino = this.respuestas[0]?.realizacionTest?.estudiante?.usuario?.email;
    const asunto = 'Invitacion a Agendar Cita';
    const contenido = `Estimado ${this.respuestas[0]?.realizacionTest?.estudiante?.usuario?.nombre}, se le solicita agendar una cita.`;

    const emailData = {destino: destino, asunto: asunto, contenido: contenido};
    console.log('Datos del Correo: ', emailData);
  
  }
}
