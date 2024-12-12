import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', score: 10 },
      { id: 12, name: 'Narco', score: 25 },
      { id: 13, name: 'Bombasto', score: 180 },
      { id: 14, name: 'Celeritas', score: 66 },
      { id: 15, name: 'Magneta', score: 250 },
      { id: 16, name: 'RubberMan', score: 110 },
      { id: 17, name: 'Dynama', score: 45 },
      { id: 18, name: 'Dr IQ', score: 112 },
      { id: 19, name: 'Magma', score: 74 },
      { id: 20, name: Math.random() > 0.5 ? 'Tornado' : 'Hurricane', score: 500 }
    ];
    
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/