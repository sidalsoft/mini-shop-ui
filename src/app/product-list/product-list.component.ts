import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../product";
import { Event } from "../app.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];

  @Output() valueChange = new EventEmitter<Event>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onEditClick(id: number): void {
    this.valueChange.emit({type: 'edit', data: id})
  }

  onDeleteClick(id: number): void {
    this.valueChange.emit({type: 'delete', data: id})

  }
}
