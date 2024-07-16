import { Component, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { BasketService } from '../../../Services/common/models/basket.service';
import { List_Basket_Item } from '../../../Contracts/basket/list_basket_item';
import { SpinnerService } from '../../../Services/admin/spinner/spinner.service';
import { AlertService } from '../../../Services/admin/alert.service';
import { Update_Basket_Item } from '../../../Contracts/basket/update_basket_item';
import { BehaviorSubject, Observable, Subscription, finalize } from 'rxjs';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OrderService } from '../../../Services/common/models/order.service';
import { List_Product } from '../../../Contracts/List_Product';


@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [DividerModule,ImageModule,InputNumberModule,
    FormsModule,CardModule,DropdownModule,ButtonModule,
  CurrencyPipe,AsyncPipe,OverlayPanelModule,NgTemplateOutlet],
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent implements OnInit, OnDestroy {
  basketItems$: Observable<List_Basket_Item[]>;
  private basketItemsSubject = new BehaviorSubject<List_Basket_Item[]>([]);
  private subscriptions = new Subscription();

  constructor(
    private basketService: BasketService,
    private spinnerService: SpinnerService,
    private alertService: AlertService,
    private renderer2: Renderer2,
    private orderService:OrderService
  ) {
    this.basketItems$ = this.basketItemsSubject.asObservable();
  }

  ngOnInit(): void {
    this.getBasketItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getBasketItems() {
    const sub = this.basketService.get().subscribe({
      next: (res) => this.basketItemsSubject.next(res)
    });
    this.subscriptions.add(sub);
  }

  changeQuantity(basketItemId: string, quantity: string) {
    const parseQuantity : number = parseInt(quantity)
    const basketItemObject: Update_Basket_Item = {
      basketItemId,
      quantity: parseQuantity
    };
    if(parseQuantity == 0 ){
      this.removeBasketItem(basketItemId)
      return;
    }
    const sub = this.basketService.updateQuantity(basketItemObject).subscribe({
      next: () => {
        this.updateLocalBasketItemQuantity(basketItemId, basketItemObject.quantity)
        this.getBasketItems()
      },
      error: (err) => this.alertService.errorMessage(err)
    });
    this.subscriptions.add(sub);
  }

  removeBasketItem(basketItemId: string) {
    this.spinnerService.showSpinner();
    this.animateAndRemoveElement(basketItemId);

    const sub = this.basketService.remove(basketItemId).pipe(
      finalize(() => this.spinnerService.hideSpinner())
    ).subscribe({
      next: () => this.updateLocalBasketItems(basketItemId),
      error: (err) => this.alertService.errorMessage(err)
    });
    this.subscriptions.add(sub);
  }

  getProductImageSrc(image?:List_Basket_Item):string{
      if (image.productImageFile) {
        return `https://localhost:7243/${image.productImageFile.path}`;
      }else{
        return `assets/default-product-image.webp`;
      } 
  }

  private animateAndRemoveElement(basketItemId: string) {
    const element = document.querySelector(`[id="${basketItemId}"]`);
    if (element) {
      this.renderer2.addClass(element, 'slide-out-right');
      const animationEndListener = this.renderer2.listen(element, 'animationend', () => {
        animationEndListener();
        this.removeElementFromDOM(element);
      });
    }
  }

  private removeElementFromDOM(element: Element) {
    if (element.parentNode) {
      this.renderer2.removeChild(element.parentNode, element);
      const nextElement = element.nextElementSibling;
      if (nextElement && nextElement.tagName.toLowerCase() === 'p-divider') {
        this.renderer2.removeChild(nextElement.parentNode, nextElement);
      }
    }
  }

  private updateLocalBasketItems(basketItemId: string) {
    const currentItems = this.basketItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.basketItemId !== basketItemId);
    this.basketItemsSubject.next(updatedItems);
  }

  private updateLocalBasketItemQuantity(basketItemId: string, quantity: number) {
    const currentItems = this.basketItemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.basketItemId === basketItemId ? { ...item, quantity } : item
    );
    this.basketItemsSubject.next(updatedItems);
  }

  complateShopping(){
    this.orderService.create({
      address : "Karagümrük mahllesi viran mescidi sokak",
      description : "Lütfen paketlemeye özen gösteriniz"
    })
  }

  totalPrice(): number {
    return this.basketItemsSubject.value.reduce((total, item) => total + item.price, 0);
  }
}