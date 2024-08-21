import Car from "@/db/models/Car";

const RentalHistory = ({ requestsHistory }) => {
  console.log("requestsHistory", requestsHistory);
  return (
    <div className="flex flex-col items-center gap-4">
      {!!!requestsHistory.length && (
        <div className="font-medium text-xl">There is no rental history</div>
      )}
      {requestsHistory.map(async (request) => {
        const car = await Car.findOne({
          where: {
            id: request.car_id,
          },
        });
        console.log(car);
        return (
          <div className="w-full min-h-16 bg-gray-100 p-2 max-w-lg rounded shadow-md">
            <div>
              <div>Brand: {car.brand}</div>
              <div>Model: {car.model}</div>
              <div>Year of Production: {car.year_of_production}</div>
              <div>Paid: {request.total_price}$</div>
              <div>
                Start date: {new Date(request.start_date).toLocaleDateString()}
              </div>
              <div>
                End date: {new Date(request.end_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RentalHistory;
