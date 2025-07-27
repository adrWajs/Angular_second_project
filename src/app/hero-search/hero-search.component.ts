import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    AsyncPipe
  ],
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Wywoływane przy każdym wpisaniu znaku
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),               // Czekaj 300ms od ostatniego znaku
      distinctUntilChanged(),          // Ignoruj takie same wpisy jak wcześniej
      switchMap((term: string) =>
        this.heroService.searchHeroes(term)), // Szukaj tylko jeśli coś się zmieniło
    );
  }
}
