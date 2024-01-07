export interface MongoType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserType extends MongoType {
  email: string;
  firstName: string;
  lastName: string;
}

export interface HotelType extends MongoType {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: Image[];
  adultCount: number;
  childCount: number;
}

interface Image {
  url: string;
  publicId: string;
}
