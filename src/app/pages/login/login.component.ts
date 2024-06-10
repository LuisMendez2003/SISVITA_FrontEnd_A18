import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsComponent } from '../../core/components/tabs/tabs.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, TabsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
