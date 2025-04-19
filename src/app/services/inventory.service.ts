import { InventoryItem } from '../models/inventory-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class DataService {
    url : string = "https://prog2005.it.scu.edu.au/ArtGalley";
    constructor(private http: HttpClient) {}

   // Get all inventory items
  public getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url+name);
  }

  // Add a new item
  public addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.url, item);
  }

  // Delete an item by name
  public deleteItem(itemName: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${itemName}`);
  }

  // Update an item by name
  public updateItem(itemName: string, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.url}/${itemName}`, item);
  }
}
