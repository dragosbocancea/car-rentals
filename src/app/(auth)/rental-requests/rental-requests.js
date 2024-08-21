import Car from "@/db/models/Car";
import HandleRequest from "./handle-request";

const RentalRequests = async ({ requests }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {!!!requests.length && (
        <div className="font-medium text-xl">There are no active requests</div>
      )}
      {requests.map(async (request) => {
        const car = await Car.findOne({
          where: {
            id: request.car_id,
          },
        });
        return (
          <div className="w-full min-h-16 bg-gray-100 p-2 max-w-lg flex flex-row justify-between rounded shadow-md">
            <div>
              <div>Brand: {car.brand}</div>
              <div>Model: {car.model}</div>
              <div>Year of Production: {car.year_of_production}</div>
              <div>Price: {request.total_price}$</div>
              <div>
                Start date: {new Date(request.start_date).toLocaleDateString()}
              </div>
              <div>
                End date: {new Date(request.end_date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <HandleRequest
                data={{
                  car: JSON.parse(JSON.stringify(car)),
                  request: JSON.parse(JSON.stringify(request)),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RentalRequests;
