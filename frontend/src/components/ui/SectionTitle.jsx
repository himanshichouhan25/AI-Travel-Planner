const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;