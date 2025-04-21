
//TAB 2 - Ionic Application
// Group Work - Assessment#3 Group work
//Adding items into data Set
//typescript

//all essentials imports
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//importing enum
//directory to tab2.items.model.ts to import ENUM
import { InventoryItem, Category, StockStatus } from '../models/tab2.item.model';

//defining the classes
@Component
({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule] //these imports are required for ionic ui and form
})

export class Tab2Page 
{
  //this will show the success meesage
  showSuccessMessage = false; //show message

 //for dropdowns for enums
 //dropdown can only be those whihc we declared
  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

//this array will hold the items 
  allItems: InventoryItem[] = [];       //all items
  featuredItems: InventoryItem[] = [];  //feature items

  //adding new items
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

  //http client to call the APIs and Alert Controller
  constructor
  (
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  //repopulate and get all the items
  ngOnInit() 
  {
    this.loadItems();
  }

  //this will add items to the server
  //NOTE: the format whihc is used by SCU is not similiar with the coding we use
  // we need to prepare data in the right formate
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
      //optional
      special_note: this.newItem.specialNote || ''
    };

  //post request
    //pushing new item into the data server
    //this system takes the input and pushes it into the server
    this.http.post('https://prog2005.it.scu.edu.au/ArtGalley', postData)
      .subscribe({
        next: () => 
        {
          this.showSuccessAlert('Item has been added successfully, Thanks');
          this.resetForm(); //reset feilds
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
          //make sure we use the same case as used in dataset
          //this will map and change the data into our invrntory structure
          this.allItems = items.map(item => ({ 
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
//this will show a success popup
  async showSuccessAlert(message: string) 
  {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  //error pop up if anything goes wrong
  async showErrorAlert(message: string) 
  {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  //help button at the end to the page
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help TAB 2 - Add Items',
      message: `
        To add a new item:
        1. Fill in all the required fields (* marked).
        2. Use dropdowns for Category and Stock Status.
        3. Mark Featured if item is special.
        4. Click 'Add Item' to submit. 
      `,
      buttons: ['Right-ho'],
      cssClass: 'custom-alert'
    });
  
    await alert.present();
  }
}  