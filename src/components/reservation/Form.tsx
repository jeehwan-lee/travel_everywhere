import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Hotel, ReservationForm } from "../../models/hotel";
import Select from "../shared/Select";
import Text from "../shared/Text";
import { TextField } from "../shared/TextField";

function Form({
  forms,
  onSubmit,
}: {
  forms: Hotel["forms"];
  onSubmit: () => void;
}) {
  const { register } = useForm({ mode: "onBlur" });

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === "TEXT_FIELD") {
        return (
          <TextField
            label={form.label}
            helpMessage={form.helpMessage}
            {...register(form.id, {
              required: form.required,
            })}
          />
        );
      } else if (form.type === "SELECT") {
        return (
          <Select
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
            })}
          />
        );
      } else {
        return null;
      }
    },
    [register]
  );

  return (
    <div>
      <Text bold={true}>예약정보</Text>
      <form>
        {forms.map((form) => {
          return <>{component(form)}</>;
        })}
      </form>
    </div>
  );
}

export default Form;
