const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800/80 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Delete Trip?
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm">
          This action cannot be undone. All associated itinerary data will be permanently deleted.
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition duration-200 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;