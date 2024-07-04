import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StudenttestComponent} from './pages/student-test/student-test.component';
import { TakeTestComponent } from './pages/take-test/take-test.component';
import { SpecialistTestComponent } from './pages/specialist-test/specialist-test.component';
import { SpecialistVistatestComponent } from './pages/specialist-vistatest/specialist-vistatest.component';
import { SpecialistTestdiagnosticarComponent } from './pages/specialist-testdiagnosticar/specialist-testdiagnosticar.component';
import { StudentTestverComponent } from './pages/student-testver/student-testver.component';
import { HeatmapComponent } from './pages/heatmap/heatmap.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "signin", component: SigninComponent},
    { path: 'student-test', component: StudenttestComponent },
    { path: "take-test/:id", component: TakeTestComponent},
    { path: "specialist-test", component: SpecialistTestComponent},
    { path: 'specialist-vistatest/:id', component: SpecialistVistatestComponent },
    { path: 'specialist-testdiagnosticar/:id',component: SpecialistTestdiagnosticarComponent},
    { path: "student-testver", component: StudentTestverComponent},
    { path: "heatmap", component: HeatmapComponent}
];
