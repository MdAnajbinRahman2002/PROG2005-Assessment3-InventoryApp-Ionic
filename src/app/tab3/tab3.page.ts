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

  constructor(private http: HttpClient, private alertCtrl: AlertController) {
    this.showUsagePopup(); // Show usage popup on load
  }

  async showUsagePopup() {
    const alert = await this.alertCtrl.create({
      header: '🔧 How to Use This Page',
      message: 
  `📌 SEARCH:
  Type the item name and tap "Search" to view details.
  
  ✏️ UPDATE:
  Modify fields like price, quantity, category, supplier, etc., then tap "Update".
  
  🗑️ DELETE:
  Tap "Delete" to remove items.
  Note: You cannot delete the protected item "Laptop".
  
  🆔 NOTE:
  The "Item ID" is auto-generated and cannot be changed.`,
      buttons: ['Got it!'],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  normalizeStockStatus(status: string): string {
    const match = this.stockStatuses.find(
      s => s.toLowerCase() === (status || '').toLowerCase()
    );
    return match || 'In Stock';
  }

  searchItem() {
    if (!this.searchName.trim()) return;

    this.http.get(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`).subscribe(
      async (data: any) => {
        this.item = Array.isArray(data) ? data[0] : data;

        if (!this.item || Object.keys(this.item).length === 0) {
          this.item = null;
          await this.showNotFoundAlert();
          return;
        }

        this.item.featuredItem = this.item.featured_item === 1;
        this.item.stock_status = this.normalizeStockStatus(this.item.stock_status);
      },
      async () => {
        this.item = null;
        await this.showNotFoundAlert();
      }
    );
  }

  async showNotFoundAlert() {
    const alert = await this.alertCtrl.create({
      header: '❌ Item Not Found',
      message: `No item found with the name "${this.searchName}". Please try again.`,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
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
