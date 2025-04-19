import { Component } from '@angular/core';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';
import { DataService } from '../services/inventory.service';

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

  constructor(private dataService: DataService) {
    this.initializeItems();
  }

  initializeItems() {
    this.dataService.getAllItems().subscribe(
      (items: any[]) => {
        console.log('Raw API response:', items);
        this.inventoryItems = items.map(item => ({
          itemId: item.item_id,
          itemName: item.item_name,
          category: item.category as Category,
          quantity: item.quantity,
          price: item.price,
          supplierName: item.supplier_name,
          stockStatus: item.stock_status as StockStatus,
          featuredItem: Boolean(item.featured_item),
          specialNote: item.special_note
        }));
        this.filteredItems = [...this.inventoryItems];
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
  
  filterItems() {
    // Filter items based on search term
    if (this.searchTerm.trim() === '') {
      this.filteredItems = this.inventoryItems;
    } else {
      this.filteredItems = this.inventoryItems.filter(item =>
        item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
