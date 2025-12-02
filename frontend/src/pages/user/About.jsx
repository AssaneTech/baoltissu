import React, { useEffect, useState } from "react";
import API from "../../api/API";

const About = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  // FETCH ALL PRODUCT IMAGES
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get("/api/products");
        const imgs = res.data.flatMap((p) => p.images || []);
        setImages(imgs);
      } catch (err) {
        console.error("Error loading images:", err);
      }
    };

    fetchImages();
  }, []);

  // AUTO SLIDER
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          About BAOLTISSU
        </h1>
        <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-relaxed text-lg">
          A house specialized in premium fabrics, modern ready-to-wear and custom tailoring inspired by African elegance.
        </p>
      </div>

      {/* STORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Born from a passion for African fashion and textile excellence, BAOLTISSU has grown into a reference thanks to its expertise, modern vision and attention to detail. Each creation tells a story—yours.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl bg-[#EAE8E4]">
          {images.length > 0 && (
            <img
              src={images[current]}
              alt="slider"
              className="w-full h-full object-cover transition-opacity duration-700"
            />
          )}
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-[#F7F3EE] p-12 rounded-3xl mb-24 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          To offer authentic fabrics, refined outfits and exceptional tailoring services that celebrate identity, creativity and timeless elegance.
        </p>
      </section>

      {/* VALUES */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">Our Values</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold">Authenticity</h3>
            <p className="text-gray-600 mt-2">
              We select only the finest African and international fabrics.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-semibold">Creativity</h3>
            <p className="text-gray-600 mt-2">
              We blend tradition and modernity to craft unique designs.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold">Excellence</h3>
            <p className="text-gray-600 mt-2">
              Perfect finishing and timeless elegance are our priorities.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">Our Journey</h2>

        <div className="space-y-12 max-w-3xl mx-auto">

          <div className="flex space-x-5">
            <div className="text-4xl">📍</div>
            <div>
              <h3 className="text-xl font-bold">BAOLTISSU Creation</h3>
              <p className="text-gray-600">
                Launch of a small fabric collection and custom designs.
              </p>
            </div>
          </div>

          <div className="flex space-x-5">
            <div className="text-4xl">🧵</div>
            <div>
              <h3 className="text-xl font-bold">Tailoring Department</h3>
              <p className="text-gray-600">
                A dedicated team bringing sophisticated designs to life.
              </p>
            </div>
          </div>

          <div className="flex space-x-5">
            <div className="text-4xl">🛒</div>
            <div>
              <h3 className="text-xl font-bold">Online Store Launch</h3>
              <p className="text-gray-600">
                A modern, simple, chic and accessible shopping experience.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-20">
        <a
          href="/contact"
          className="px-10 py-4 bg-[#39386A] text-white text-lg rounded-full font-semibold hover:bg-[#2F2E59] transition shadow"
        >
          Contact us
        </a>
      </div>
    </div>
  );
};

export default About;
