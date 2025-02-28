import { Component, computed, input, output } from '@angular/core';
import { Joke } from '../../services/joke.service';

@Component({
  selector: 'app-joke-ui2',
  standalone: true,
  imports: [],
  templateUrl: './joke-ui2.component.html',
  styleUrl: './joke-ui2.component.scss'
})
export class JokeUI2Component {

  joke = input<Joke>()

  onLike = output()
  onDislike = output()
  onRefresh = output()

  doesContainQuestion = computed(() => this.joke()?.joke.includes('?'))


  beforeQuetionJoke = computed(() => this.joke()?.joke.split('?')[0] + '?')

  afterQuetionJoke = computed(() => this.joke()?.joke.split('?')[1])

}
