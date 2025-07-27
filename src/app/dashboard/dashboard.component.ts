import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(h => this.heroes = h.slice(1, 5));
  }
}
