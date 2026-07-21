import CustomButton from "../ui/CustomButton";

const CTA = () => {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#6D5DF6] to-[#8B5CF6] p-16 text-center text-white shadow-xl shadow-indigo-500/10">

          <h2 className="text-5xl font-bold">
            Ready for Your Next Adventure?
          </h2>

          <p className="mt-6 text-lg text-purple-100">
            Let AI create your perfect itinerary in seconds.
          </p>

          <div className="mt-10">
            <CustomButton className="bg-white text-[#6D5DF6] hover:bg-gray-100">
              Start Planning
            </CustomButton>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;