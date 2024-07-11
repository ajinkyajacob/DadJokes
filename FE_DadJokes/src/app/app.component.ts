import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Joke, JokeService } from './services/joke.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, switchMap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent implements AfterViewInit {
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
