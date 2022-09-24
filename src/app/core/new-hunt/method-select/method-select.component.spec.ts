import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodSelectComponent } from './method-select.component';

describe('MethodSelectComponent', () => {
  let component: MethodSelectComponent;
  let fixture: ComponentFixture<MethodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
