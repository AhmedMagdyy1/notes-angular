import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject(true);

  toggleSidenav() {
    this.isExpanded.next(!this.isExpanded.getValue());
    console.log(this.isExpanded.getValue());
  }

  // expandSidenav() {
  //   this.isExpanded = true;
  // }

  // collapseSidenav() {
  //   this.isExpanded = false;
  // }
}
