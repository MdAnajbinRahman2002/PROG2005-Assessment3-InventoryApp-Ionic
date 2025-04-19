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
      (items) => {
        this.inventoryItems = items;
        this.filteredItems = this.inventoryItems;
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
