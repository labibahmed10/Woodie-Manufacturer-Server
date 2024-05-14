export interface IPurchaseInfo {
  name: string;
  toolname: string;
  email: string;
  address: string;
  phone: number;
  details: string;
  quantity: number;
  avlQuan: number;
  totalCost: number;
  paid?: boolean;
  paymentID?: string;
  status?: "Shipped" | "Pending";
  transictionID?: string;
}
