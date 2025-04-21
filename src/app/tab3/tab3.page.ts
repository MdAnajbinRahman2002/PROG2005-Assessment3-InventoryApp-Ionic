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
  searchName = '';  // Holds the search term entered by the user
  item: any = null;  // Holds the item fetched from the API

  // Arrays defining categories and stock statuses available for the items
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(private http: HttpClient, private alertCtrl: AlertController) {
    this.showUsagePopup(); // Shows usage popup on load
  }

  // Function to show a popup that explains how to use the page
  async showUsagePopup() {
    const alert = await this.alertCtrl.create({
      header: 'How to Use This Page',  // Title of the popup
      message: 
  `SEARCH:
  Type the item name and tap "Search" to view details.
  
  UPDATE:
  Modify fields like price, quantity, category, supplier, etc., then tap "Update".
  
  DELETE:
  Tap "Delete" to remove items.
  Note: You cannot delete the protected item "Laptop".
  
  NOTE:
  The "Item ID" is auto-generated and cannot be changed.`,
      buttons: ['Got it!'],  // Button text in the popup
      cssClass: 'custom-alert'  // Custom class for styling the alert
    });

    await alert.present(); // Displays the alert to the user
  } 

   // Method to normalize the stock status to ensure consistency
  normalizeStockStatus(status: string): string {
    const match = this.stockStatuses.find(
      s => s.toLowerCase() === (status || '').toLowerCase()  // Matches stock status, case-insensitive
    );
    return match || 'In Stock';  // goes back to default to 'In Stock' if no match is found
  }


// Method to search for an item by its name
  searchItem() {
    if (!this.searchName.trim()) return;

    // Making an API GET request to fetch item details based on the search name
    this.http.get(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`).subscribe(
      async (data: any) => {
        // If the response is an array, use the first item; otherwise, use the data directly
        this.item = Array.isArray(data) ? data[0] : data;

        //shows a not-found alert and resets the item if nothing is found
        if (!this.item || Object.keys(this.item).length === 0) {
          this.item = null;
          await this.showNotFoundAlert();
          return;
        }

        // Maps the 'featured_item' field from API to a boolean value
        this.item.featuredItem = this.item.featured_item === 1;
        // Normalizes stock status using the method defined above
        this.item.stock_status = this.normalizeStockStatus(this.item.stock_status);
      },
      async () => {
        this.item = null;  // Resets item if an error occurs
        await this.showNotFoundAlert(); // Shows an error alert
      }
    );
  }

  // Function to show an alert when no item is found
  async showNotFoundAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Item Not Found',  // Header for the alert
      message: `No item found with the name "${this.searchName}". Please try again.`,  // displays message
      buttons: ['OK'],  // Button for closing the alert
      cssClass: 'custom-alert'  // Custom class for styling the alert
    });
    await alert.present();
  }

  // Method to update the item's details
  updateItem() {
    if (!this.item) return; //does nothing if no item is found

    // Prepares the updated item object with the necessary fields
    const updatedItem = {
      ...this.item,
      featured_item: this.item.featuredItem ? 1 : 0  // Converts featuredItem boolean to 1 or 0
    };

    // Makes an API PUT request to update the item on the server
    this.http.put(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`, updatedItem).subscribe(
      () => alert('Item updated successfully!'),  // Success alert
      () => alert('Update failed.')  // Error alert
    );
  }

  // Function to confirm item deletion with the user
  async confirmDelete() {
    // Prevents deletion of the protected item "Laptop"
    if (this.searchName.trim().toLowerCase() === 'laptop') {
      alert('You are not allowed to delete "Laptop"');
      return;
    }

    // Creates a confirmation alert for deletion
    const confirm = await this.alertCtrl.create({
      header: 'Confirm Delete',  // Header for the confirmation alert
      message: `Are you sure you want to delete "${this.searchName}"?`, // Message with item name
      buttons: [
        { text: 'Cancel', role: 'cancel' }, //cancels the deletion
        { text: 'Delete', handler: () => this.deleteItem() } //deletes an item
      ]
    });

    await confirm.present();
  }

  deleteItem() {
    // Makes an API DELETE request to remove the item from the server
    this.http.delete(`https://prog2005.it.scu.edu.au/ArtGalley/${this.searchName}`).subscribe(
      () => {
        alert('Item deleted successfully.'); // Success alert
        this.item = null;  // Reset item
        this.searchName = '';  // Clears the search name input field
      },
      () => alert('Delete failed.')  // Error alert
    );
  }
}
