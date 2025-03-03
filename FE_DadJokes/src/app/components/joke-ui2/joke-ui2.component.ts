import { Component, computed, ElementRef, input, output, viewChild } from '@angular/core';
import { Joke } from '../../services/joke.service';

@Component({
  selector: 'app-joke-ui2',
  standalone: true,
  imports: [],
  templateUrl: './joke-ui2.component.html',
  styleUrl: './joke-ui2.component.scss'
})
export class JokeUI2Component {
    refreshBtn = viewChild.required<ElementRef<HTMLButtonElement>>('refreshBtn');
    likeBtn = viewChild.required<ElementRef<HTMLButtonElement>>('likeBtn');
    dislikeBtn = viewChild.required<ElementRef<HTMLButtonElement>>('dislikeBtn');

  joke = input<Joke>()

  isJokeAvalable = computed(
    () => this.joke() && !Object.values(this.joke()!).find((x: string) => x === '')
  );


  onLike = output()
  onDislike = output()
  onRefresh = output()

  doesContainQuestion = computed(() => this.joke()?.joke.includes('?'))


  beforeQuetionJoke = computed(() => this.joke()?.joke.split('?')[0] + '?')

  afterQuetionJoke = computed(() => this.joke()?.joke.split('?')[1])

}
