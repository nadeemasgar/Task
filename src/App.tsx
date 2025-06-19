import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormInput from "./components/FormInput";
import RadioGroup from "./components/RadioGroup";
import CheckBoxGroup from "./components/CheckBox";
import "./App.css";

type FormValue = {
  phone: string;
  confirmPhone: string;
  confirmChoice1: string;
  vehicle: string[];
  confirmChoice2: string;
  destination: string[];
};

const App = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { register, control, setValue, handleSubmit, watch, formState, reset } =
    useForm<FormValue>({
      defaultValues: {
        destination: ["Bali", "Switzerland"],
        vehicle: [],
      },
      mode: "onChange",
    });

  const { errors } = formState;

  const phone = watch("phone");
  const userChoice1 = watch("confirmChoice1");
  const userChoice2 = watch("confirmChoice2");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts: string[] = [];
    if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
    if (digits.length >= 3) parts.push(")-" + digits.slice(3, 6));
    if (digits.length >= 6) parts.push("-" + digits.slice(6, 10));
    return parts.join("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    console.log(formatted, typeof formatted);
    setValue("phone", formatted, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("confirmPhone", formatted, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const validateStartDigit = (value: string) => {
    // Remove all non-digit characters from the string value
    const digits = value.replace(/\D/g, "");
    return /^[2-9]/.test(digits) || "Phone number must not start with 0 or 1";
  };

  const onSubmit = (data: FormValue) => {
    console.log(data);
    alert(
      `The data entered is: ${
        data.phone
      }, [${data.vehicle?.join()}], [${data.destination?.join()}]`
    );
    setSuccessMessage("Form is filled successfully!");
    reset();
  };

  return (
    <main tabIndex={0} className="form-container">
      <h1 tabIndex={0}>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormInput
            label="Phone Number"
            id="phone"
            type="text"
            placeholder="(###)-###-####"
            error={errors.phone}
            registration={register("phone", {
              required: "Phone number is required",
              validate: validateStartDigit,
              pattern: {
                value: /^\(\d{3}\)-\d{3}-\d{4}$/,
                message:
                  "Invalid format. Please follow the format (###)-###-####",
              },
            })}
            onChangeFn={handlePhoneChange}
          />
        </div>

        <div className="form-group">
          <FormInput
            label="Confirm Phone Number"
            id="confirmPhone"
            type="text"
            placeholder="(###)-###-####"
            error={errors.confirmPhone}
            registration={register("confirmPhone", {
              required: "Please confirm your phone number",
              validate: (value) => {
                const digits = value.replace(/\D/g, "");
                const originalDigits = phone?.replace(/\D/g, "");
                if (!/^[2-9]/.test(digits)) {
                  return "Phone number must not start with 0 or 1";
                }
                if (digits !== originalDigits) {
                  return "Phone numbers do not match";
                }
                return true;
              },
              pattern: {
                value: /^\(\d{3}\)-\d{3}-\d{4}$/,
                message:
                  "Invalid format. Please follow the format (###)-###-####",
              },
            })}
            onChangeFn={handleConfirmChange}
          />
        </div>

        <div className="form-group">
          <div>---- Scenario-1 ----</div>
          <fieldset
            aria-describedby={
              errors.confirmChoice1 ? "confirmChoice1-error" : undefined
            }
          >
            <legend>Select the Vehicle:</legend>

            <RadioGroup
              radioName="confirmChoice1"
              radioOptions={[
                { id: "Yes1", label: "Yes", value: "Yes1" },
                { id: "No1", label: "No", value: "No1" },
              ]}
              error={errors.confirmChoice1}
              registeration={register("confirmChoice1", {
                required: "Please select a choice",
              })}
            />

            <br />
            {userChoice1 === "Yes1" && (
              <fieldset
                aria-describedby={errors.vehicle ? "vehicle-error" : undefined}
              >
                <legend>Select at least one vehicle</legend>
                <CheckBoxGroup
                  checkboxName="vehicle"
                  checkBoxOptions={[
                    { id: "vehicle1", label: "I have a bike", value: "Bike" },
                    { id: "vehicle2", label: "I have a car", value: "Car" },
                    { id: "vehicle3", label: "I have a plane", value: "Plane" },
                    { id: "vehicle4", label: "I have a boat", value: "Boat" },
                  ]}
                  error={errors.vehicle}
                  registeration={register("vehicle", {
                    validate: (value) =>
                      value?.length > 0 || "Please select at least on vehicle",
                  })}
                />
              </fieldset>
            )}
          </fieldset>
        </div>

        <div className="form-group">
          <div>---- Scenario-2 ----</div>
          <fieldset
            aria-describedby={
              errors.confirmChoice2 ? "confirmChoice2-error" : undefined
            }
          >
            <legend>Select the Destination:</legend>

            <RadioGroup
              radioName="confirmChoice1"
              radioOptions={[
                { id: "Yes2", label: "Yes", value: "Yes2" },
                { id: "No2", label: "No", value: "No2" },
              ]}
              error={errors.confirmChoice2}
              registeration={register("confirmChoice2", {
                required: "Please select a choice",
              })}
            />

            <br />
            {userChoice2 === "Yes2" && (
              <fieldset>
                <CheckBoxGroup
                  checkboxName="destination"
                  checkBoxOptions={[
                    { id: "Bali", label: "Bali", value: "Bali" },
                    {
                      id: "Switzerland",
                      label: "Switzerland",
                      value: "Switzerland",
                    },
                    { id: "Italy", label: "Italy", value: "Italy" },
                    { id: "Paris", label: "Paris", value: "Paris" },
                  ]}
                  error={errors.destination}
                  registeration={register("destination")}
                />
              </fieldset>
            )}
          </fieldset>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        {successMessage && (
          <p role="status" className="success-message">
            {successMessage}
          </p>
        )}
      </form>

      <DevTool control={control} />
    </main>
  );
};

export default App;
