import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneezePollenGraphComponent } from './sneeze-pollen-graph.component';

describe('SneezePollenGraphComponent', () => {
  let component: SneezePollenGraphComponent;
  let fixture: ComponentFixture<SneezePollenGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneezePollenGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneezePollenGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
