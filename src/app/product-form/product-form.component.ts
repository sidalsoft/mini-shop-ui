import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Event } from "../app.component";
import { Product } from "../product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product | undefined

  @Output() valueChange = new EventEmitter<Event>();

  productForm: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {

    this.productForm = new FormGroup({
      "name": new FormControl(this.product?.name, [Validators.required, Validators.minLength(3)]),
      "desc": new FormControl(this.product?.desc, [Validators.required, Validators.minLength(25)]),
      "price": new FormControl(this.product?.price, Validators.pattern(/\-?\d+(\.\d*)?/gm)),
      "quantity": new FormControl(this.product?.quantity, Validators.pattern(/\-?\d+(\.\d*)?/gm))
    });
  }

  onSaveClick(): void {
    this.valueChange.emit({type: "save", data: this.productForm?.value})
  }

  onCloseClick(): void {
    this.valueChange.emit({type: "close"})
  }

}
