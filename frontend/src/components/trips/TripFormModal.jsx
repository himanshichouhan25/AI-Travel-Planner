import { useEffect, useState } from "react";

const TripFormModal = ({
  open,
  onClose,
  onSave,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        destination: initialData.destination || "",
        budget: initialData.budget || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
      });
    } else {
      setFormData({
        destination: "",
        budget: "",
        start_date: "",
        end_date: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Trip" : "Create Trip"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              {initialData ? "Update Trip" : "Create Trip"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default TripFormModal;