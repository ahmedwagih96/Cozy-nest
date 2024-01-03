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
  