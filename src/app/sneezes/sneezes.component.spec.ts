import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneezesComponent } from './sneezes.component';

describe('SneezesComponent', () => {
  let component: SneezesComponent;
  let fixture: ComponentFixture<SneezesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneezesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneezesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
