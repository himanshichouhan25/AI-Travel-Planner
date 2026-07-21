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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800/80 transform transition-all duration-300">

        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          {initialData ? "Edit Trip" : "Create Trip"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Destination
            </label>
            <input
              name="destination"
              placeholder="e.g. Paris, France"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6] dark:focus:ring-indigo-500/50 transition duration-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              placeholder="e.g. 1500"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6] dark:focus:ring-indigo-500/50 transition duration-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6] dark:focus:ring-indigo-500/50 transition duration-200"
                style={{ colorScheme: "dark light" }}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6] dark:focus:ring-indigo-500/50 transition duration-200"
                style={{ colorScheme: "dark light" }}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#6D5DF6] hover:bg-[#4F46E5] text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition duration-200"
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