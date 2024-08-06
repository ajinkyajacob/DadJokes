import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Signal,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Joke, JokeService } from './services/joke.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, fromEvent, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `
    @if(isJokeAvalable()){
    <div
      class="text-center font-extrabold text-4xl w-2/5 sm:w-4/5 self-center text-pastelYellow"
    >
      {{ joke().joke }}
    </div>
    }

    <button
    #refreshBtn
      class="bg-skyBlue self-center font-bold text-2xl h-1/6 w-1/3 rounded-md p-4 text-white hover:text-pastelYellow hover:bg-green-400 border-orange"
    >
      New Joke
    </button>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  @HostBinding() class =
    'h-[100vh] w-full flex flex-col justify-center align-baseline gap-40 bg-stone-800';

  refreshBtn = viewChild<ElementRef<HTMLButtonElement>>('refreshBtn');

  title = 'FE_DadJokes';
  jokeService = inject(JokeService);
  joke = signal<Joke>({ id: '', joke: '' });
  isJokeAvalable = computed(
    () => !Object.values(this.joke()).find((x: string) => x === '')
  );
  a = signal(0);
  b = signal(0);
  constructor() {
    effect(() => {
      const el = this.refreshBtn()?.nativeElement;
      if (el) {
        fromEvent(el, 'mousedown')
          .pipe(
            switchMap(() =>
              this.jokeService.getJoke().pipe(catchError((e) => {console.log(e);return EMPTY}))
            ),
          )
          .subscribe((v) => this.joke.set(v));
        el.dispatchEvent(new Event('mousedown'));
      }
    },{allowSignalWrites:true });
  }

}
