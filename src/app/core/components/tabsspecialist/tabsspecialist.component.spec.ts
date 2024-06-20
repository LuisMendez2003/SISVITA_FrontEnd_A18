import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsspecialistComponent } from './tabsspecialist.component';

describe('TabsspecialistComponent', () => {
  let component: TabsspecialistComponent;
  let fixture: ComponentFixture<TabsspecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsspecialistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsspecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
