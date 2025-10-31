import { motion } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Emily Carter",
    role: "Book Enthusiast",
    review:
      "“The Bookstore experience is just magical! The clean layout, easy search, and hand-picked recommendations make it my go-to reading hub.”",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Ryan Matthews",
    role: "Author & Reader",
    review:
      "“Finally, a platform that understands readers. The smooth UI, vibrant design, and instant previews make discovering books so fun.”",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Sophia Nguyen",
    role: "Student",
    review:
      "“Every visit feels refreshing! The bookstore’s interface feels alive and modern — I love exploring new releases here.”",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prevTestimonial = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-wide">
          What Readers Say
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Discover how our readers feel about their journey with our bookstore.
          Real words, real experiences.
        </p>

        <div className="relative">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonials[active].image}
                alt={testimonials[active].name}
                className="w-20 h-20 rounded-full border-4 border-white mb-4"
              />
              <h3 className="text-xl font-semibold">{testimonials[active].name}</h3>
              <p className="text-sm text-gray-300 mb-3">{testimonials[active].role}</p>
              <div className="flex justify-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-100 text-lg italic leading-relaxed">
                {testimonials[active].review}
              </p>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  active === index ? "bg-white w-6" : "bg-gray-400 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Next / Previous buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
