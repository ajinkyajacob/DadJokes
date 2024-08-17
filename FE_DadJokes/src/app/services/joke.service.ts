import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app.config';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JokeService {
  constructor(){
    effect(() => {
      console.log('debugging joke res',this.joke())
    })
  }
  private httpClient = inject(HttpClient);
  private url = inject(BACKEND_URL);
  joke = signal<Joke>({ _id: '', joke: '' });
  like = computed(() => this.joke().like)
  dislike = computed(() => this.joke().dislike)
  getJoke() {
    return this.httpClient.get<Joke>(`${this.url}/dadjoke`, {
      responseType: 'json',
    });
  }
  refreshJoke(){
    return this.getJoke().pipe(tap((v) => this.joke.set(v)),catchError((e) => {console.log(e);return EMPTY}))
  }

  updateLikeDislike(_id:string, type:'like'|'dislike', count:number){
    return this.httpClient.post<Joke>(`${this.url}/dadjoke`,{
      type,
      _id,
      count,
    }).pipe(tap((v) => this.joke.update((v) => ({...v,[type]:count}))), catchError((e) => {console.log(e);return EMPTY}))
  }
}

export interface Joke {
  _id: string;
  joke: string;
  like?:number,
  dislike?: number
}

export function injectJokeService() {
  const jokeService = inject(JokeService)

  jokeService.getJoke().pipe(catchError((e) => {console.log(e);return EMPTY})).subscribe(v => jokeService.joke.set(v))
  return jokeService
  
}
