import Image from "next/image";

const CarCard = ({
  brand,
  model,
  year_of_production,
  cost_per_hour,
  description,
  imageURL,
  onClick = () => {},
}) => {
  return (
    <div
      className="p-2 rounded border border-black hover:shadow-lg cursor-pointer max-w-64"
      onClick={onClick}
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="Car Image"
          width={256}
          height={256}
          className="rounded"
        />
      )}
      <div>Brand: {brand}</div>
      <div>Model: {model}</div>
      <div>Year of Production: {year_of_production}</div>
      <div>Cost per Hour: {cost_per_hour}</div>
      {description && <div>{description}</div>}
    </div>
  );
};

export default CarCard;
