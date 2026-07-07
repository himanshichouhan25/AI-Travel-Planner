import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../../services/tripService";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import TripList from "../../components/trips/TripList";
import EmptyTrips from "../../components/trips/EmptyTrips";
import DeleteDialog from "../../components/trips/DeleteDialog";
import TripFormModal from "../../components/trips/TripFormModal";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await getTrips();
      setTrips(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load trips.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTrip(null);
    setFormOpen(true);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormOpen(true);
  };

  const handleSave = async (tripData) => {
    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, tripData);
        toast.success("Trip updated successfully!");
      } else {
        await createTrip(tripData);
        toast.success("Trip created successfully!");
      }

      setEditingTrip(null);
      setFormOpen(false);

      loadTrips();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save trip.");
    }
  };

  const handleDelete = (trip) => {
    setSelectedTrip(trip);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTrip(selectedTrip.id);

      setTrips((prev) =>
        prev.filter((trip) => trip.id !== selectedTrip.id)
      );

      toast.success("Trip deleted successfully!");

      setDeleteOpen(false);
      setSelectedTrip(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete trip.");
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading Trips..." />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          My Trips
        </h1>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={20} />
          New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <EmptyTrips onCreate={handleCreate} />
      ) : (
        <TripList
          trips={trips}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DeleteDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedTrip(null);
        }}
        onConfirm={confirmDelete}
      />

      <TripFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingTrip(null);
        }}
        onSave={handleSave}
        initialData={editingTrip}
      />
    </div>
  );
};

export default Trips;