import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true, //IMPORTANTE COLOCAR QUE ES STANDALON
  imports: [RouterOutlet, CommonModule, TabsComponent, HeaderComponent], //IMPORTAR EL COMMONMODULE Y EL ROUTER OUTLET y los standalones
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DSW_Sisvita_FrontEnd';
}
