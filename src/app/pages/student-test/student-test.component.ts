import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabsstudent/tabsstudent.component';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [RouterModule, TabsComponent],
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudenttestComponent {
  constructor(private router: Router) {}

  startTest() {
    // Redirige a la página de realización del test
    this.router.navigate(['/realizar-test']);
  }
}
