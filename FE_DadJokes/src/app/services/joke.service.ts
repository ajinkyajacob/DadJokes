import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from 'src/main';

@Injectable({providedIn: 'root'})
export class JokeService {
    private httpClient= inject(HttpClient)
    private url = inject(BACKEND_URL)
    getJoke(){
        return this.httpClient.get<Joke>(`${this.url}/dadjoke`,{responseType:'json'})
    }
    
}

export interface Joke{
    "id": string,
    "joke": string,
  }