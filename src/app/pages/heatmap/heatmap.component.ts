import { Component,OnInit } from '@angular/core';
import {GoogleMap, MapHeatmapLayer} from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { TabsspecialistComponent } from '../../core/components/tabsspecialist/tabsspecialist.component';


@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [GoogleMap, MapHeatmapLayer,TabsspecialistComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss'
})
export class HeatmapComponent implements OnInit {
  center = {lat: -12.0464, lng: -77.0428};
  zoom = 12;
  heatmapOptions = {radius: 20};
  heatmapData: { lat: number, lng: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://dsw-exposicionparcial-crud.onrender.com/heatmap-data').subscribe(
      (response) => {
        if (response && response.data) {
          this.heatmapData = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener datos del heatmap:', error);
      }
    );
  }
}
