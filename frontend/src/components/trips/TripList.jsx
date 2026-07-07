import TripCard from "./TripCard";

const TripList = ({ trips, onEdit, onDelete }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TripList;