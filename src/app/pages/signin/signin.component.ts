import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, TabsComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

}
