import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpdComponent } from './spd.component';

describe('SpdComponent', () => {
  let component: SpdComponent;
  let fixture: ComponentFixture<SpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
