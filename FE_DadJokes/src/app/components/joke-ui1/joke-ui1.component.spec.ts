import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeUI1Component } from './joke-ui1.component';

describe('JokeUI1Component', () => {
  let component: JokeUI1Component;
  let fixture: ComponentFixture<JokeUI1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeUI1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeUI1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
