// TypeScript interfaces for GraphQL schema types
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  loyaltyPoints: number;
  billInformation: BillInformation;
  accountUpdates: AccountUpdate[];
  recommendations: Recommendation[];
}

export interface AccountUpdate {
  id: string;
  type: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface BillInformation {
  amount: number;
  dueDate: string;
  isPaid: boolean;
  unlimitedData: boolean;
  historyDetails: BillHistoryDetail[];
}

export interface BillHistoryDetail {
  date: string;
  amount: number;
  status: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  iconType: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
  details?: PromotionDetails;
}

export interface PromotionDetails {
  termsAndConditions: string;
  validUntil: string;
  eligibility: string;
  benefits: string[];
}

export interface Category {
  id: string;
  name: string;
  iconUrl: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  details?: ProductDetails;
}

export interface ProductDetails {
  specifications: Specification[];
  reviews: Review[];
  relatedProducts: Product[];
}

export interface Specification {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment?: string;
  date: string;
}

export interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  actionUrl: string;
  type: string;
  additionalInfo?: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  imageUrl?: string;
  technicalDetails?: DeviceDetails;
}

export interface DeviceDetails {
  serialNumber: string;
  model: string;
  purchaseDate: string;
  warrantyEnd: string;
  supportOptions: string[];
}

export interface SearchResults {
  devices: Device[];
  plans: Product[];
  accessories: Product[];
  helpArticles: HelpArticle[];
}

export interface HelpArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  fullContent?: string;
} 