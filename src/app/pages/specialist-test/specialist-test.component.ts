// specialist-test.component.ts
import { Component, OnInit } from '@angular/core';
import { TabsspecialistComponent } from '../../core/components/tabsspecialist/tabsspecialist.component';
import { Router, RouterModule } from '@angular/router';
import { RealizacionTestService } from '../../core/services/realizaciontest.service'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialist-test',
  standalone: true,
  imports: [RouterModule, TabsspecialistComponent, HttpClientModule, CommonModule],
  templateUrl: './specialist-test.component.html',
  styleUrls: ['./specialist-test.component.scss'],
  providers: [RealizacionTestService]
})
export class SpecialistTestComponent implements OnInit {
  realizacionesTest: any[] = [];

  constructor(private router: Router, private realizacionTestService: RealizacionTestService) {}

  ngOnInit(): void {
    this.realizacionTestService.getRealizacionesTest().subscribe(
      (response) => {
        this.realizacionesTest = response.data;
        console.log('Fetched realizacionesTest:', this.realizacionesTest);
      },
      (error) => {
        console.error('Error fetching realizacionesTest', error);
      }
    );
  }

  viewRealizacionTest(id_realizaciontest: number) {
    this.router.navigate(['/specialist-vistatest', id_realizaciontest]);
  }
}
