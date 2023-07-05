import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() model: any;
  @Output() retry: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  retryButton() {
    this.retry.emit(true);
  }

  ngOnInit() {}
}
