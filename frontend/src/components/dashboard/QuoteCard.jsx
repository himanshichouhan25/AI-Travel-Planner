import { Quote } from "lucide-react";

export default function QuoteCard() {
  return (
    <section className="mt-8">
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 text-white shadow-lg">
        <Quote size={40} className="text-purple-300 mb-4" />

        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">
          "The world is a book, and those who do not travel read only one page."
        </h2>

        <p className="mt-5 text-purple-200 text-lg">
          — Saint Augustine
        </p>
      </div>
    </section>
  );
}