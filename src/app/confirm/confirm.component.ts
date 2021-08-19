import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from "../app.component";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() productName = ""
  @Output() valueChange = new EventEmitter<Event>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.valueChange.emit({type: "no"})
  }

  onYsClick(): void {
    this.valueChange.emit({type: "yes"})
  }
}
