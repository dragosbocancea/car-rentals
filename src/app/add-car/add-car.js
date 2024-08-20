"use client";

import Button from "@/components/Button";
// import Car from "@/db/models/Car";
import { useForm } from "react-hook-form";

const VehicleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch("/add-car/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("res", await res.json());
    } catch (error) {
      console.error("Could not create entry:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-4"
    >
      <div>
        <label className="block text-sm font-medium">Brand</label>
        <input
          {...register("brand", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter brand"
        />
        {errors.brand && (
          <span className="text-red-500 text-sm">Brand is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Model</label>
        <input
          {...register("model", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter model"
        />
        {errors.model && (
          <span className="text-red-500 text-sm">Model is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          {...register("image", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter image URL"
        />
        {errors.image && (
          <span className="text-red-500 text-sm">Image URL is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Year of Production</label>
        <input
          type="number"
          {...register("year_of_production", {
            required: true,
            min: 0,
            max: new Date().getFullYear(),
          })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter year of production"
        />
        {errors.year_of_production && (
          <span className="text-red-500 text-sm">Valid year is required</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Cost per Hour</label>
        <input
          type="number"
          {...register("cost_per_hour", { required: true, min: 0 })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter cost per hour"
        />
        {errors.cost_per_hour && (
          <span className="text-red-500 text-sm">
            Cost per hour is required
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: false })}
          className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
          placeholder="Enter description"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

const AddCar = () => {
  return (
    <>
      <div>Add car form</div>
      <VehicleForm />
    </>
  );
};

export default AddCar;
