import {
  Component,
} from '@angular/core';
import { JokeContainerComponent } from "./components/joke-container/joke-container.component";


@Component({
  selector: 'app-root',
  template: `<app-joke-container></app-joke-container>`,
  styleUrls: ['./app.component.scss'],
  imports: [ JokeContainerComponent],
  standalone: true,
})
export class AppComponent {

  title = 'FE_DadJokes';
 

}
