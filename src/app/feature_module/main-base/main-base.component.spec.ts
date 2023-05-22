import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBaseComponent } from './main-base.component';

describe('MainBaseComponent', () => {
  let component: MainBaseComponent;
  let fixture: ComponentFixture<MainBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
