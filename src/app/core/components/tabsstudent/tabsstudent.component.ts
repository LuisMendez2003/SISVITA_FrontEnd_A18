import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs-student',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tabsstudent.component.html',
  styleUrls: ['./tabsstudent.component.scss']
})

export class TabsComponentstudent {
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
