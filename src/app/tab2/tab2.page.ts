
//all essentials imports
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//importing enum
import { InventoryItem, Category, StockStatus } from '../models/tab2.item.model';

@Component
({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})

export class Tab2Page 
{
  showSuccessMessage = false; //show message


 //for dropdowns
  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  allItems: InventoryItem[] = [];
  featuredItems: InventoryItem[] = [];

  newItem: InventoryItem = 
  {
    itemName: '',
    category: Category.Electronics,//default
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: StockStatus.InStock, //default
    featuredItem: 0,
    specialNote: ''
  };

  constructor
  (
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() 
  {
    this.loadItems();
  }

  addItem()
   {
    const postData = 
    {
      item_name: this.newItem.itemName,
      category: this.newItem.category,
      quantity: this.newItem.quantity,
      price: this.newItem.price,
      supplier_name: this.newItem.supplierName,
      stock_status: this.newItem.stockStatus,
      featured_item: this.newItem.featuredItem,
      special_note: this.newItem.specialNote || ''
    };
  
    //pushing new item into the data server
    this.http.post('https://prog2005.it.scu.edu.au/ArtGalley', postData)
      .subscribe({
        next: () => 
        {
          this.showSuccessAlert('Item has been added successfully, Thanks');
          this.resetForm();

          this.loadItems(); //repopulate
        },
        error: (err) =>
        {
          console.error('POST error:', err);
          this.showErrorAlert(err.error?.message || 'Failed to add item. check all the feilds');
        }
      });
  }
  
  
//fecthing the updated dataset
  loadItems()
   {
    this.http.get<any[]>('https://prog2005.it.scu.edu.au/ArtGalley')
      .subscribe(
        {
        next: (items) => {
          this.allItems = items.map(item => ({            //make sure we use the same case as used in dataset
            itemId: item.item_id,
            itemName: item.item_name,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            supplierName: item.supplier_name,
            stockStatus: item.stock_status,
            featuredItem: item.featured_item,
            specialNote: item.special_note
          }));
  
          this.featuredItems = this.allItems.filter(item => item.featuredItem === 1);
        },
        error: () => 
        {
          this.showErrorAlert('~ Failed to load ~');
        }
      });
  }
  
  resetForm() 
  {
    this.newItem = 
    {
      itemName: '',
      category: Category.Electronics,
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: StockStatus.InStock,
      featuredItem: 0,
      specialNote: ''
    };
  }

  async showSuccessAlert(message: string) 
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showErrorAlert(message: string) 
  {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help TAB 2 - Add Items',
      message: `
        ~ fill all the values to add an item into the 
      `,
      buttons: ['Understood'],
      cssClass: 'custom-alert'
    });
  
    await alert.present();
  }
}  