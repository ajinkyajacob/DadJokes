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
import { injectJokeService, Joke, JokeService } from './services/joke.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, fromEvent, switchMap, tap } from 'rxjs';
import {MatButtonModule, MatFabButton} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'


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
    <section class="flex justify-around ">
      <span>
        <button #likeBtn mat-fab extended >
              <mat-icon>thumb_up</mat-icon>
              Like {{jokeService.like()}}
            </button>

      </span>
      <span>
        <!-- <button
        #refreshBtn
          class="bg-skyBlue self-center font-bold text-2xl h-1/6 w-1/3 rounded-md p-4 text-white hover:text-pastelYellow hover:bg-green-400 border-orange"
        >
          New Joke
        </button> -->

        <button #refreshBtn mat-fab extended >
              New Joke
            </button>

      </span>
      <span>
      <button #dislikeBtn mat-fab extended >
              <mat-icon>thumb_down</mat-icon>
              Dislike {{jokeService.dislike()}}
            </button>
      </span>

    </section>

  `,
  styleUrls: ['./app.component.scss'],
  imports:[MatButtonModule, MatIconModule],
  standalone: true,
  host: {class:'h-[100vh] w-full flex flex-col justify-center align-baseline gap-40 bg-stone-800'}
})
export class AppComponent {

  refreshBtn = viewChild.required('refreshBtn',{read:ElementRef<HTMLButtonElement>});
  likeBtn = viewChild.required('likeBtn',{read:ElementRef<HTMLButtonElement>});
  dislikeBtn = viewChild.required('dislikeBtn',{read:ElementRef<HTMLButtonElement>});

  title = 'FE_DadJokes';
  jokeService = injectJokeService()
  joke = this.jokeService.joke
  isJokeAvalable = computed(
    () => !Object.values(this.joke()).find((x: string) => x === '')
  );
  constructor() {
    // this.jokeService.getJoke().pipe(catchError((e) => {console.log(e);return EMPTY})).subscribe(v => this.joke.set(v))
    effect(() => {
      const refreshBtn = this.refreshBtn()?.nativeElement;
      const likeBtn = this.likeBtn()?.nativeElement;
      const dislikeBtn = this.dislikeBtn()?.nativeElement;
      if (refreshBtn && likeBtn && dislikeBtn) {
        fromEvent<MouseEvent>([refreshBtn,likeBtn,dislikeBtn], 'mousedown')
          .pipe(
            switchMap((e:any) =>{
              const isLike = e.target.parentElement === likeBtn
              const isdisLike = e.target.parentElement === dislikeBtn
              const type = isdisLike ? 'dislike':'like'
              let count = (this.joke()[type] ?? 0) + 1
              console.log(e.target.parentElement === dislikeBtn)
              if( isdisLike || isLike ){
                return this.jokeService.updateLikeDislike(this.joke()._id,type, count)
              }
              
              console.log({e})
              return this.jokeService.refreshJoke()
            }
            ),
          )
          .subscribe();
      }
    });
  }

}
