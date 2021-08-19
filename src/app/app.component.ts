import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { AppService } from "./services/app.service";
import { Product } from "./product";
import { SpinnerService } from "./services/spinner.service";

export interface Event {
  type: string;
  data?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterContentInit {

  title = 'mini-shop-ui';

  showAddProductDialog = false
  showToast = false
  showConfirm = false
  messageToast = ""
  products: Product[] = []
  selectedProduct: Product | undefined

  private dataSub: Subscription | undefined;
  private initSub: Subscription | undefined;

  constructor(private appService: AppService,
              private spinnerService: SpinnerService) {
  }

  @ViewChild('spinner') set busyIndicator(elmRef: ElementRef) {
    if (elmRef.nativeElement) {
      this.spinnerService.elem = elmRef.nativeElement;
    }
  }

  ngAfterContentInit(): void {
    this.initSub = this.appService.getProducts()
      .subscribe(res => {
        res.forEach(p => this.products.push(p))
      })
  }

  ngOnDestroy() {
    if (this.dataSub && !this.dataSub.closed) {
      this.dataSub.unsubscribe()
    }
    if (this.initSub && !this.initSub.closed) {
      this.initSub.unsubscribe()
    }
  }

  onProductListChange(evt: Event): void {
    if (evt.type == 'delete') {
      this.selectedProduct = this.products.find(p => p.id == evt.data)
      this.showConfirm = true
    } else if (evt.type == 'edit') {
      this.selectedProduct = this.products.find(p => p.id == evt.data)
      this.showAddProductDialog = true
    }
  }

  onFormChange(evt: Event): void {
    if (evt.type == 'close') {
      this.showAddProductDialog = false
    } else if (evt.type == 'save') {
      if (this.selectedProduct) {
        this.updateProduct(evt.data)
      } else {
        this.addProduct(evt.data)
      }
    }
  }

  onConfirmChange(evt: Event) {
    if (evt.type == "yes" && this.selectedProduct) {
      this.deleteProduct(this.selectedProduct.id)
    }
    this.showConfirm = false
    this.selectedProduct = undefined
  }

  private deleteProduct(id: number): void {
    this.appService.deleteProduct(id)
      .subscribe(res => {
        const index = this.products.findIndex(p => p.id == id)
        if (index > -1) {
          this.products.splice(index, 1);
        }
      })
  }

  private addProduct(data: Product) {
    this.dataSub = this.appService.addProduct(data)
      .subscribe(productId => {
        data.id = productId
        this.products.push(data)
        this.showAddProductDialog = false
      }, error => {
        this.messageToast = error.message
        this.showToast = true
      })
  }

  private updateProduct(data: Product) {
    data.id = this.selectedProduct?.id || -1
    this.dataSub = this.appService.updateProduct(data).subscribe(productId => {
      if (this.selectedProduct) {
        this.selectedProduct.name = data.name
        this.selectedProduct.desc = data.desc
        this.selectedProduct.price = data.price
        this.selectedProduct.quantity = data.quantity
      }
      this.selectedProduct = undefined
      this.showAddProductDialog = false
    }, error => {
      this.messageToast = error.message
      this.showToast = true
    })
  }
}
