import {
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeUI1Component } from '../joke-ui1/joke-ui1.component';
import { JokeUI2Component } from '../joke-ui2/joke-ui2.component';
import { injectJokeService } from '../../services/joke.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-joke-container',
  standalone: true,
  imports: [JokeUI1Component, JokeUI2Component],
  template:`
  @if (isOldUI()) {
      <app-joke-ui1 [joke]="this.jokeService.joke()"
        (onLike)="onLike()"
        (onDislike)="onDisLike()"
        (onRefresh)="onRefresh()"
      />
  
    }@else {
      <app-joke-ui2 [joke]="this.jokeService.joke()"
        (onLike)="onLike()"
        (onDislike)="onDisLike()"
        (onRefresh)="onRefresh()"
      />
  
    }
  `,
  styleUrl: './joke-container.component.scss'
})
export class JokeContainerComponent {

  jokeUI1 = viewChild(JokeUI1Component)
  jokeUI2 = viewChild(JokeUI2Component)

  activeUI = computed(() => this.isOldUI() ? this.jokeUI1() : this.jokeUI2())

  jokeService = injectJokeService()

  isOldUI = toSignal(inject(ActivatedRoute).queryParamMap.pipe(map((param) =>( console.log(param),param.get('oldUI') === 'true'))))

  router = inject(Router)
 
  onLike(){
    let count = (this.jokeService.joke()['like'] ?? 0) + 1
    this.jokeService.updateLikeDislike(this.jokeService.joke()._id,'like', count).subscribe()
  }

  onDisLike(){
    let count = (this.jokeService.joke()['dislike'] ?? 0) + 1
    this.jokeService.updateLikeDislike(this.jokeService.joke()._id,'dislike', count).subscribe()
  }

  onRefresh(){
    this.jokeService.refreshJoke().subscribe()
  }

  // constructor() {
  //   // this.jokeService.getJoke().pipe(catchError((e) => {console.log(e);return EMPTY})).subscribe(v => this.joke.set(v))
  //   effect(() => {
  //     const refreshBtn = this.refreshBtn()?.nativeElement;
  //     const likeBtn = this.likeBtn()?.nativeElement;
  //     const dislikeBtn = this.dislikeBtn()?.nativeElement;
  //     if (refreshBtn && likeBtn && dislikeBtn) {
  //       fromEvent<MouseEvent>([refreshBtn,likeBtn,dislikeBtn], 'mousedown')
  //         .pipe(
  //           switchMap((e:any) =>{
  //             const isLike = e.target.parentElement === likeBtn
  //             const isdisLike = e.target.parentElement === dislikeBtn
  //             const type = isdisLike ? 'dislike':'like'
  //             let count = (this.jokeService.joke()[type] ?? 0) + 1
  //             console.log(e.target.parentElement === dislikeBtn)
  //             if( isdisLike || isLike ){
  //               return this.jokeService.updateLikeDislike(this.jokeService.joke()._id,type, count)
  //             }
              
  //             console.log({e})
  //             return this.jokeService.refreshJoke()
  //           }
  //           ),
  //         )
  //         .subscribe();
  //     }
  //   });
  // }

}
