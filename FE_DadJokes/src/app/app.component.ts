import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Joke, JokeService } from './services/joke.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, switchMap } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `
  <div class="text-center font-extrabold text-4xl w-2/3 self-center text-gray-light">
  {{joke().joke}}
  </div>

<button class="bg-blue self-center w-1/3 rounded-md p-4 hover:bg-green border-orange" #refreshBtn >New Joke</button>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent implements AfterViewInit {
  @HostBinding() class = 'h-[100vh] w-full flex flex-col justify-center align-baseline gap-4 bg-gray-dark'
  // refreshBtn = viewChild('refreshBtn')
  @ViewChild('refreshBtn', { static: true })
  refreshBtn?: ElementRef<HTMLButtonElement>;

  title = 'FE_DadJokes';
  jokeService = inject(JokeService);
  joke = signal<Joke>({ id: '', joke: '' });
  ngAfterViewInit() {
    if (this.refreshBtn) {
      fromEvent(this.refreshBtn.nativeElement, 'mousedown')
        .pipe(switchMap(() => this.jokeService.getJoke()))
        .subscribe((v) => this.joke.set(v));
        this.refreshBtn.nativeElement.dispatchEvent(new Event('mousedown'))
    }
  }
}
