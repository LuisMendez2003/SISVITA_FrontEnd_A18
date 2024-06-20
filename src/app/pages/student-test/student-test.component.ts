import { Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TabsComponentstudent} from '../../core/components/tabsstudent/tabsstudent.component';
import { TestService } from '../../core/services/test.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../core/services/auth.service';

@Component({
  selector: 'app-student-test',
  standalone: true,
  imports: [RouterModule, TabsComponentstudent, HttpClientModule,CommonModule ],
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss'],
  providers: [TestService]
})

export class StudenttestComponent implements OnInit {
  tests: any[] = [];

  constructor(private router: Router, private testService: TestService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.testService.getTests().subscribe(
      (response) => {
        this.tests = response.data;
        console.log('Fetched tests:', this.tests);
      },
      (error) => {
        console.error('Error fetching tests', error);
      }
    );
  }
  startTest(id_test: number) {
    this.router.navigate(['/take-test',id_test]);
  }
}