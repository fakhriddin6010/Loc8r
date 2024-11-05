import { Component, OnInit } from '@angular/core';

export class Location {
  _id?: string;
  name?: string;
  distance: number = 0;
  address?: string;
  rating: number = 0;
  facilities: string[] = [];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})

export class HomeListComponent implements OnInit {

  constructor() { }

  locations: Location[]=[{
    _id: '5f2a3b39e7304b02484222d3',
    name: 'Burger Queen',
    distance: 5100.0,
    address: '서울특별시 관악구 봉천동 남부순환로 1934',
    rating: 3,
    facilities: ['Hot drinks','Premium wifi']
  }, {
    _id: '5f2a3b39e7304b02484222d3',
    name: 'Starcups',
    distance: 120.542,
    address: 'High Street, Reading',
    rating: 5,
    facilities: ['wifi', 'food', 'hot drinks']
  }];

  ngOnInit() {
  }

}

