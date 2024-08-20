"use client";

import Button from "@/components/Button";
// import Car from "@/db/models/Car";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCarFormSchema } from "@/types/AddCarFormSchema";
import FormInput from "@/components/FormInputField";
import { useRouter } from "next/navigation";

const VehicleForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddCarFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/add-car/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const r = await res.json();
      router.push(`/car/${r.id}`);
      console.log("res", r);
    } catch (error) {
      console.error("Could not create entry:", error);
    }
  };

  console.log("errors", errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-4"
    >
      <FormInput
        type="text"
        placeholder="Brand"
        name="brand"
        register={register}
        error={errors.brand}
      />
      <FormInput
        type="text"
        placeholder="Model"
        name="model"
        register={register}
        error={errors.model}
      />
      <FormInput
        type="url"
        placeholder="ImageURL"
        name="imageURL"
        register={register}
        error={errors.imageURL}
      />
      <FormInput
        type="number"
        placeholder="Year of Production"
        name="year_of_production"
        register={register}
        error={errors.year_of_production}
        valueAsNumber
      />
      <FormInput
        type="number"
        placeholder="Cost per Hour"
        name="cost_per_hour"
        register={register}
        error={errors.cost_per_hour}
        valueAsNumber
      />
      <FormInput
        type="text"
        placeholder="Description"
        name="description"
        register={register}
        error={errors.description}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

const AddCar = () => {
  return (
    <>
      <VehicleForm />
    </>
  );
};

export default AddCar;
