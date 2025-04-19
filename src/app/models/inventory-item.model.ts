// Category can only be in the following values.
export enum Category {
    Electronics = 'Electronics',
    Furniture = 'Furniture',
    Clothing = 'Clothing',
    Tools = 'Tools',
    Miscellaneous = 'Miscellaneous'
  }

// stock can only be in the following values.
export enum StockStatus {
    InStock = 'In Stock',
    LowStock = 'Low Stock',
    OutOfStock = 'Out of Stock'
  }
  
export interface InventoryItem {
    itemId: number;
    itemName: string;
    category: Category; //Category enums
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: StockStatus; //StockStatus enums
    featuredItem: boolean;
    specialNote?: string; //optional
  }
  