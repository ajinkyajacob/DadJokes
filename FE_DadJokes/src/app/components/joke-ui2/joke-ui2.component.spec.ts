import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeUI2Component } from './joke-ui2.component';

describe('JokeUI2Component', () => {
  let component: JokeUI2Component;
  let fixture: ComponentFixture<JokeUI2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeUI2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeUI2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
