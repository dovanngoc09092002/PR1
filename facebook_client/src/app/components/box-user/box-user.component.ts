import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-user',
  templateUrl: './box-user.component.html',
  styleUrls: ['./box-user.component.scss'],
})
export class BoxUserComponent {
  @Input() item: any = {};
  @Output() even = new EventEmitter();

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate([`/profile/${this.item.id}`]);
    this.even.emit(1);
  }
}
