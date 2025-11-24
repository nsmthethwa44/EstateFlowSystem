export interface Property {
  id: number;
  title: string;
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
  latitude?: number;   // add this
  longitude?: number;  // add this
}