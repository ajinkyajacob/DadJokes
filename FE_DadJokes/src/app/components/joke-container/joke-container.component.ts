import { Component } from '@angular/core';

@Component({
  selector: 'app-joke-container',
  standalone: true,
  imports: [],
  template:`<ng-content></ng-content>`,
  styleUrl: './joke-container.component.scss'
})
export class JokeContainerComponent {

}
