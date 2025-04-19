import { InventoryItem } from '../models/inventory-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class DataService {
    url : string = "http://prog2005.it.scu.eud.au/DataServ/";

    constructor(private http: HttpClient) {}

   // Get all inventory items
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }

  // Add a new item
  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.url, item);
  }

  // Delete an item by name
  deleteItem(itemName: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${itemName}`);
  }

  // Update an item by name
  updateItem(itemName: string, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.url}/${itemName}`, item);
  }


}
