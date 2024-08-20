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
  console.log("imageURL", imageURL);
  return (
    <div
      className="p-2 rounded border border-black hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {imageURL && (
        <Image
          src={imageURL}
          objectFit="cover"
          alt="Car Image"
          width={250}
          height={250}
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
