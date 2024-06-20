import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from './core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, //IMPORTANTE COLOCAR QUE ES STANDALON
  imports: [RouterOutlet, CommonModule, TabsComponent, HeaderComponent,FormsModule], //IMPORTAR EL COMMONMODULE Y EL ROUTER OUTLET y los standalones
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthStateService]
})
export class AppComponent {
  title = 'DSW_Sisvita_FrontEnd';
}
