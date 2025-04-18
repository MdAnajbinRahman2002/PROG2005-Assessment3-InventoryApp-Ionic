//created model folder with item.ts

export enum Category 
{
    Electronics = 'Electronics',
    Furniture = 'Furniture',
    Clothing = 'Clothing',
    Tools = 'Tools',
    Miscellaneous = 'Miscellaneous' 
}
  
// stock can only be in the following values.
  export enum StockStatus 
  {
    InStock = 'In Stock',
    LowStock = 'Low Stock',
    OutOfStock = 'Out of Stock'
  }
  

// structure of inventory 
  export interface InventoryItem 
  {
    itemId?: number;             // Auto-incremented by server, so optional
    itemName: string;            
    category: Category;          //Category enums
    quantity: number;            
    price: number;              
    supplierName: string;        
    stockStatus: StockStatus;    //from StockStatus enums
    featuredItem?: number;       //optional, 0 or 1
    specialNote?: string;        //optional
  }
  