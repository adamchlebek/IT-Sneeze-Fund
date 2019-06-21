import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KerchooComponent } from './kerchoo.component';

describe('KerchooComponent', () => {
  let component: KerchooComponent;
  let fixture: ComponentFixture<KerchooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KerchooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KerchooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
