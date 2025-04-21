import { Component } from '@angular/core';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';  // Importing necessary models for inventory item, category, and stock status
import { DataService } from '../services/inventory.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page {
  inventoryItems: InventoryItem[] = [];  // Array to store the fetched inventory items
  filteredItems: InventoryItem[] = [];  // Array to store the filtered inventory items based on search term
  searchTerm: string = '';  // Holds the current search term for filtering

  constructor(private dataService: DataService) {
    // Initialize items when the component is created
    this.initializeItems();
  }

  // Method to fetch and initialize inventory items from the API
  initializeItems() { 
    this.dataService.getAllItems().subscribe(
      (items: any[]) => {  // Method to fetch and initialize inventory items from the API
        console.log('Raw API response:', items); // Logs the raw API response for debugging purposes
        this.inventoryItems = items.map(item => ({  
          itemId: item.item_id, // Maps item_id from API response to itemId in InventoryItem
          itemName: item.item_name,  // Maps item_name
          category: item.category as Category,  // Maps category and casts to Category enum
          quantity: item.quantity, // Maps quantity
          price: item.price,  // Maps price
          supplierName: item.supplier_name,  // Maps supplier name
          stockStatus: item.stock_status as StockStatus,  // Maps stock status and casts to StockStatus enum
          featuredItem: Boolean(item.featured_item),  // Maps featured_item and converts it to a boolean
          specialNote: item.special_note  // Maps featured_item and converts it to a boolean
        }));
         // Clones the inventoryItems array to the filteredItems to show all items initially
        this.filteredItems = [...this.inventoryItems];
      },
      (error) => { // On error, logs the error to the console
        console.error('Error fetching items:', error); 
      }
    );
  }
  
  // Method to filter the inventory items based on the search term
  filterItems() {
    // Filter items based on search term
    if (this.searchTerm.trim() === '') {  // If search term is empty or only whitespace, display all items
      this.filteredItems = this.inventoryItems;
      this.filteredItems = this.inventoryItems;
    } else {
      // Filters inventoryItems based on the search term (case insensitive)
      this.filteredItems = this.inventoryItems.filter(item =>
        item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
