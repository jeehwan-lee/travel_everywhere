export interface HotelRegister {
  comment: string;
  contents: string;
  id?: string;
  images: string[];
  location: { x: number; y: number };
  mainImageUrl?: string;
  name: string;
  price: number;
  startRating: number;
  events?: {
    name: string;
    promoEndTime?: string;
    tagThemeStyle: {
      backgroundColor: string;
      fontColor: string;
    };
  };
  recommendHotels?: string[];
}

export interface RoomRegister {
  avaliableCount: number;
  basicInfo: {
    bed: string;
    maxOccupancy: number;
    smoke: string;
    squareMeters: string;
  };
  imageUrl: string;
  price: number;
  roomName: string;
}
