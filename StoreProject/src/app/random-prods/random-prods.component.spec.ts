import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomProdsComponent } from './random-prods.component';

describe('RandomProdsComponent', () => {
  let component: RandomProdsComponent;
  let fixture: ComponentFixture<RandomProdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomProdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
