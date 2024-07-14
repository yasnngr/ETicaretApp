import { Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(componentType:ComponentType,viewContainerRef:ViewContainerRef){
    let _component : any = null
    
    switch(componentType){
      case ComponentType.DropdownBasketsComponent:
        _component = (await import("../../UI/component/baskets/dropdownbaskets/dropdownbaskets.component")).DropdownbasketsComponent
        break
    }
    
    viewContainerRef.clear()
    return viewContainerRef.createComponent(_component)
  }
}
export enum ComponentType{
  DropdownBasketsComponent
}