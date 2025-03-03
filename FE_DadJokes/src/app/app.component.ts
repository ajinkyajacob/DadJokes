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
import { JokeUI2Component } from "./components/joke-ui2/joke-ui2.component";
import { JokeUI1Component } from "./components/joke-ui1/joke-ui1.component";
import { JokeContainerComponent } from "./components/joke-container/joke-container.component";


@Component({
  selector: 'app-root',
  template: `
  <app-joke-container>
  
      <!-- <app-joke-ui1 [joke]="joke()"
        (onLike)="onLike()"
        (onDislike)="onDisLike()"
        (onRefresh)="onRefresh()"
      /> -->
      <app-joke-ui2 [joke]="this.jokeService.joke()"
        (onLike)="onLike()"
        (onDislike)="onDisLike()"
        (onRefresh)="onRefresh()"
      />
    
  </app-joke-container>
    

  `,
  styleUrls: ['./app.component.scss'],
  imports: [JokeUI2Component, JokeContainerComponent],
  standalone: true,
})
export class AppComponent {

  title = 'FE_DadJokes';
  jokeService = injectJokeService()
 
  onLike(){
    let count = (this.jokeService.joke
      ()['like'] ?? 0) + 1
    this.jokeService.updateLikeDislike(this.jokeService.joke
 ()._id,'like', count).subscribe()
  }

  onDisLike(){
    let count = (this.jokeService.joke
 ()['dislike'] ?? 0) + 1
    this.jokeService.updateLikeDislike(this.jokeService.joke
 ()._id,'dislike', count).subscribe()
  }

  onRefresh(){
    this.jokeService.refreshJoke().subscribe()
  }

}
