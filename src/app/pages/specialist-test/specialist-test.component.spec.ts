import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistTestComponent } from './specialist-test.component';

describe('SpecialistTestComponent', () => {
  let component: SpecialistTestComponent;
  let fixture: ComponentFixture<SpecialistTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
