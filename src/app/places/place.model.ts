export interface Place {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  availableFrom: Date;
  availableTo: Date;
  userId: string;
}
