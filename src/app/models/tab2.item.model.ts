
//tab 2
export enum Category
 {
    Electronics = 'Electronics',    
    Furniture = 'Furniture',        
    Clothing = 'Clothing',          
    Tools = 'Tools',                
    Miscellaneous = 'Miscellaneous' 
  }
  

export enum StockStatus 
{
    InStock = 'In Stock',          
    LowStock = 'Low Stock',        
    OutOfStock = 'Out of Stock'    
  }
  

export interface InventoryItem 
{
    itemId?: number;             //optional beacuse it will be autoincrement
    itemName: string;             
    category: Category;         //category enums
    quantity: number;             
    price: number;                
    supplierName: string;         
    stockStatus: StockStatus;           //stockStatus enums
    featuredItem: number;              //1 , 0 
    specialNote: string;             //optional note 
  }
  