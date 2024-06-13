import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StudenttestComponent} from './pages/student-test/student-test.component';

export const routes: Routes = [
    { path: "", component: HomeComponent }, // Empty path for home
    { path: "login", component: LoginComponent },
    {path: "signin", component: SigninComponent},
    { path: 'student-test', component: StudenttestComponent }
];
