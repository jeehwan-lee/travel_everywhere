interface formValuesProps {
  name: string;
  phone: string;
  email: string;
  isSmoke: string;
  special_request?: string;
}

export interface Reservation {
  userId: string;
  hotelId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  price: number;
  formValues: formValuesProps;
}
