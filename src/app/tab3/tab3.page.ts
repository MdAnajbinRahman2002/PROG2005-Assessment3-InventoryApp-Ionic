import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  searchName = '';
  item: any = null;

  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  searchItem() {
    if (!this.searchName.trim()) return;

    this.http.get(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`).subscribe(
      (data: any) => {
        console.log('Fetched item:', data);
        this.item = Array.isArray(data) ? data[0] : data;

        // Normalize toggle and dropdown values
        if (this.item) {
          this.item.featuredItem = this.item.featured_item === 1;
          this.item.stock_status = this.normalizeStockStatus(this.item.stock_status);
        }
      },
      () => {
        this.item = null;
        alert('Item not found!');
      }
    );
  }

  // Optional: Helps match the select dropdown for stock_status
  normalizeStockStatus(status: string): string {
    const match = this.stockStatuses.find(
      s => s.toLowerCase() === (status || '').toLowerCase()
    );
    return match || 'In Stock'; // Default fallback
  }

  updateItem() {
    if (!this.item) return;

    const updatedItem = {
      ...this.item,
      featured_item: this.item.featuredItem ? 1 : 0
    };

    this.http.put(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`, updatedItem).subscribe(
      () => alert('Item updated successfully!'),
      () => alert('Update failed.')
    );
  }

  async confirmDelete() {
    if (this.searchName.trim().toLowerCase() === 'laptop') {
      alert('You are not allowed to delete "Laptop"');
      return;
    }

    const confirm = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${this.searchName}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', handler: () => this.deleteItem() }
      ]
    });

    await confirm.present();
  }

  deleteItem() {
    this.http.delete(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`).subscribe(
      () => {
        alert('Item deleted successfully.');
        this.item = null;
        this.searchName = '';
      },
      () => alert('Delete failed.')
    );
  }
}
