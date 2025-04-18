import { Component } from '@angular/core';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page {
  inventoryItems: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchTerm: string = '';

  constructor() {
    this.initializeItems();
  }

  initializeItems() {
    this.inventoryItems = [
      {
        itemId: 1,
        itemName: "Sofa",
        category: Category.Furniture,
        quantity: 2,
        price: 800,
        supplierName: "ComfortLiving",
        stockStatus: StockStatus.InStock,
        featuredItem: false,
        specialNote: "Comfortable"
      },
      {
        itemId: 2,
        itemName: "Laptop",
        category: Category.Electronics,
        quantity: 5,
        price: 1200,
        supplierName: "TechWorld",
        stockStatus: StockStatus.LowStock,
        featuredItem: true,
        specialNote: "Gaming"
      }
    ];
  }
}
