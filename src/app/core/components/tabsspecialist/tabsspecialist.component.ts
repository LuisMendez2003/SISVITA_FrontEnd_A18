import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabsspecialist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tabsspecialist.component.html',
  styleUrl: './tabsspecialist.component.scss'
})

export class TabsspecialistComponent {

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

}
