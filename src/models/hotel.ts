export interface Hotel {
  comment: string;
  contents: string;
  id: string;
  images: string[];
  location: { x: number; y: number };
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
  helpMessage?: string;
}

interface TextFieldForm extends BaseForm {
  type: "TEXT_FIELD";
}

interface SelectFieldForm extends BaseForm {
  type: "SELECT";
  options: Array<{ label: string; value: string }>;
}

export type ReservationForm = TextFieldForm | SelectFieldForm;
