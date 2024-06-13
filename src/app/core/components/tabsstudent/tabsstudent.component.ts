import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tabsstudent.component.html',
  styleUrl: './tabsstudent.component.scss'
})
export class TabsComponent {

  constructor(private router: Router){
  }

  goTo(goTo:string){
    //Go to home
    this.router.navigate([goTo])
  }

}
