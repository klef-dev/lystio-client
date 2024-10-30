interface OwnerType {
  country: string;
  name: string;
  email: string;
  phone: string;
  description: string | null;
  vat: string | null;
  billingAddress: string | null;
}

interface UserType {
  id: number;
}

interface MediaType {
  type: string;
  name: string;
  cdnUrl: string;
  sort: number;
  title: string;
  bluredDataURL: string;
  id: number;
}

interface PropertyType {
  owner: OwnerType;
  user: UserType;
  title: string;
  abstract: string;
  address: string;
  addressDoor: string;
  zip: string;
  city: string;
  country: string;
  rooms: number;
  roomsBed: number;
  roomsBath: number;
  size: number;
  rent: number;
  rentRange: number[];
  rentUtilities: number;
  rentFull: number | null;
  rentDeposit: number | null;
  amenities: number[];
  amenitiesTexts: Record<number, string>;
  location: [number, number];
  locationReal: [number, number] | null;
  createdAt: string;
  updatedAt: string;
  type: number;
  subType: number;
  condition: number;
  accessibility: number;
  unitType: string;
  rentType: string;
  floorType: number;
  heatingType: number;
  leaseDuration: number;
  availableFrom: string | null;
  highlight: string | null;
  active: boolean;
  verified: boolean;
  deleted: boolean;
  autoRenewUntil: string | null;
  lastRenewAt: string | null;
  constructionYear: number | null;
  modernisationYear: number | null;
  floor: number | null;
  id: number;
  media: MediaType[];
  tenements: unknown[];
}
