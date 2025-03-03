import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Joke } from '../../services/joke.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-joke-ui1',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,],
  templateUrl: './joke-ui1.component.html',
  styleUrl: './joke-ui1.component.scss'
})
export class JokeUI1Component {
  refreshBtn = viewChild.required<ElementRef<HTMLButtonElement>>('refreshBtn');
  likeBtn = viewChild.required<ElementRef<HTMLButtonElement>>('likeBtn');
  dislikeBtn = viewChild.required<ElementRef<HTMLButtonElement>>('dislikeBtn');
  joke = input.required<Joke>()
  onLike = output()
  onDislike = output()
  onRefresh = output()

}
