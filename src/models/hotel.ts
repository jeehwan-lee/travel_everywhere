export interface Hotel {
  comment: string;
  contents: string;
  id: string;
  images: string[];
  location: { directions: string; pointGeolocation: { x: number; y: number } };
  mainImageUrl: string;
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
  recommendHotels: string[];
  forms: ReservationForm[];
}

interface BaseForm {
  id: string;
  label: string;
  required: string;
  help?: string;
}

interface TextFieldForm extends BaseForm {
  type: "TEXT_FILED";
}

interface SelectFieldForm extends BaseForm {
  type: "SELECT";
  options: Array<{ label: string; value: string }>;
}

type ReservationForm = TextFieldForm | SelectFieldForm;
