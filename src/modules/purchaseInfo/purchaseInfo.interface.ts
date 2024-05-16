export interface IPurchaseInfo {
  name: string;
  toolName: string;
  email: string;
  address: string;
  phone: number;
  details: string;
  quantity: number;
  avlQuan: number;
  totalCost: number;
  prodID?: string;
  paid?: boolean;
  paymentID?: string;
  status?: "Shipped" | "Pending";
  transictionID?: string;
}
