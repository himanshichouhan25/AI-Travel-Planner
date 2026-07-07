import { PlusCircle, Map } from "lucide-react";

const EmptyTrips = ({ onCreate }) => {
  return (
    <div className="text-center py-20">
      <Map className="mx-auto text-blue-500" size={70} />

      <h2 className="text-2xl font-bold mt-6">
        No Trips Found
      </h2>

      <p className="text-gray-500 mt-2">
        Start planning your first adventure.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 flex items-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        <PlusCircle size={20} />
        New Trip
      </button>
    </div>
  );
};

export default EmptyTrips;