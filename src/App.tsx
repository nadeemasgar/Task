import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
  const { register, control, handleSubmit, watch, formState, reset } =
    useForm<FormValue>({
      defaultValues: {
        destination: ["Bali", "Switzerland"],
        vehicle: [],
      },
      mode: "onChange",
    });

  const { errors, isDirty, isValid } = formState;

  useEffect(() => {
    if (errors.phone) {
      document.getElementById("phone-error")?.focus();
    }

    if (errors.confirmPhone) {
      document.getElementById("confirm-error")?.focus();
    }
  }, [errors]);

  const phone = watch("phone");
  const userChoice1 = watch("confirmChoice1");
  const userChoice2 = watch("confirmChoice2");

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
      <h1 tabIndex={0}>Phone Number Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="(###)-###-####"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone", {
              required: "Phone number is required",
              validate: validateStartDigit,
              pattern: {
                value: /^\(\d{3}\)-\d{3}-\d{4}$/,
                message:
                  "Invalid format. Please follow the format (###)-###-####",
              },
            })}
          />
          {errors.phone && (
            <p
              role="alert"
              tabIndex={-1}
              className="error-message"
              id="phone-error"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPhone">Confirm Phone Number</label>
          <input
            type="tel"
            id="confirmPhone"
            placeholder="(###)-###-####"
            aria-invalid={errors.confirmPhone ? "true" : "false"}
            aria-describedby={errors.confirmPhone ? "confirm-error" : undefined}
            {...register("confirmPhone", {
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
          />
          {errors.confirmPhone && (
            <p
              tabIndex={-1}
              role="alert"
              className="error-message"
              id="confirm-error"
            >
              {errors.confirmPhone.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <div>---- Scenario-1 ----</div>
          <fieldset
            aria-describedby={
              errors.confirmChoice1 ? "confirm-choice1" : undefined
            }
          >
            <legend>Select the Vehicle:</legend>

            <div>
              <input
                type="radio"
                id="Yes1"
                aria-invalid={errors.confirmChoice1 ? "true" : "false"}
                value="Yes1"
                {...register("confirmChoice1", {
                  required: "Please select a choice",
                })}
              />
              <label htmlFor="Yes1">Yes</label> <br />
              <input
                type="radio"
                id="No1"
                aria-invalid={errors.confirmChoice1 ? "true" : "false"}
                value="No1"
                {...register("confirmChoice1", {
                  required: "Please select a choice",
                })}
              />
              <label htmlFor="No1">No</label>
            </div>

            {errors.confirmChoice1 && (
              <p
                role="alert"
                tabIndex={-1}
                className="error-message"
                id="confirm-choice1"
              >
                Please select any one option
              </p>
            )}
            <br />
            {userChoice1 === "Yes1" && (
              <fieldset
                aria-describedby={errors.vehicle ? "vehicle-error" : undefined}
              >
                <legend>Select at least one vehicle</legend>
                <input
                  type="checkbox"
                  id="vehicle1"
                  aria-invalid={errors.vehicle ? "true" : "false"}
                  value="Bike"
                  {...register("vehicle", {
                    validate: (value) =>
                      value?.length > 0 || "Please select at least on vehicle",
                  })}
                />
                <label htmlFor="vehicle1">I have a bike</label> <br />
                <input
                  type="checkbox"
                  id="vehicle2"
                  aria-invalid={errors.vehicle ? "true" : "false"}
                  value="Car"
                  {...register("vehicle", {
                    validate: (value) =>
                      value?.length > 0 || "Please select at least on vehicle",
                  })}
                />
                <label htmlFor="vehicle2">I have a car</label> <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  aria-invalid={errors.vehicle ? "true" : "false"}
                  value="Plane"
                  {...register("vehicle", {
                    validate: (value) =>
                      value?.length > 0 || "Please select at least on vehicle",
                  })}
                />
                <label htmlFor="vehicle3">I have a plane</label> <br />
                <input
                  type="checkbox"
                  id="vehicle4"
                  aria-invalid={errors.vehicle ? "true" : "false"}
                  value="Boat"
                  {...register("vehicle", {
                    validate: (value) =>
                      value?.length > 0 || "Please select at least on vehicle",
                  })}
                />
                <label htmlFor="vehicle4">I have a boat</label>
                {errors.vehicle && (
                  <p
                    role="alert"
                    tabIndex={-1}
                    className="error-message"
                    id="vehicle-error"
                  >
                    Please select any one checkbox
                  </p>
                )}
              </fieldset>
            )}
          </fieldset>
        </div>

        <div className="form-group">
          <div>---- Scenario-2 ----</div>
          <fieldset>
            <legend
              aria-describedby={
                errors.confirmChoice2 ? "confirm-choice2" : undefined
              }
            >
              Select the Destination:
            </legend>

            <div>
              <input
                type="radio"
                id="Yes2"
                aria-invalid={errors.confirmChoice2 ? "true" : "false"}
                value="Yes2"
                {...register("confirmChoice2", {
                  required: "Please select a choice",
                })}
              />
              <label htmlFor="Yes2">Yes</label> <br />
              <input
                type="radio"
                id="No2"
                aria-invalid={errors.confirmChoice2 ? "true" : "false"}
                value="No2"
                {...register("confirmChoice2", {
                  required: "Please select a choice",
                })}
              />
              <label htmlFor="No2">No</label>
            </div>
            {errors.confirmChoice2 && (
              <p
                role="alert"
                tabIndex={-1}
                className="error-message"
                id="confirm-choice2"
              >
                Please select any one option
              </p>
            )}

            <br />
            {userChoice2 === "Yes2" && (
              <fieldset>
                <input
                  type="checkbox"
                  id="Bali"
                  value="Bali"
                  {...register("destination")}
                />
                <label htmlFor="Bali">Bali</label> <br />
                <input
                  type="checkbox"
                  id="Switzerland"
                  value="Switzerland"
                  {...register("destination")}
                />
                <label htmlFor="Switzerland">Switzerland</label> <br />
                <input
                  type="checkbox"
                  id="Italy"
                  value="Italy"
                  {...register("destination")}
                />
                <label htmlFor="Italy">Italy</label> <br />
                <input
                  type="checkbox"
                  id="Paris"
                  value="Paris"
                  {...register("destination")}
                />
                <label htmlFor="Paris">Paris</label>
              </fieldset>
            )}
          </fieldset>
        </div>

        <button
          // disabled={!isDirty || !isValid}
          type="submit"
          className="submit-button"
        >
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
