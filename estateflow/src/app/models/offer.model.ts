export interface Offer {
  id: number;
  title: string;
  amount: number;
  description: string;
  price: number;
  address: string;
  city: string;
  province: string;
  country: string;
  status?: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  createdAt?: Date;
  imageUrl?: string;
  agentId?: number;
  agentName?: string;
  agentImageUrl?: string;
  buyerId?: number;
  name?: string;
  email?: string;
  buyerImageUrl?: string;
  latitude?: number;   // add this
  longitude?: number;  // add this
}