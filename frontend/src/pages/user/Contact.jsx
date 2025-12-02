import React, { useState } from "react";
import API from "../../api/API";
import { Link, useNavigate } from "react-router-dom";


const Contact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;
    setSending(true);

    try {
      await API.post("/api/contact", form);
      // success, we activate success mode
      setSuccess(true);
      // Reset form
      setForm({ name: "", email: "", subject: "", message: "" });
      navigate("/contact-success");

    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const t = {
    title: "Contact us",
    subtitle:
      "Need information, advice, or a custom design? Our team will gladly assist you.",
    contactInfo: "Information",
    phone: "Phone",
    email: "Email",
    address: "Address",
    formTitle: "Send us a message",
    name: "Full name",
    emailForm: "Your email",
    subject: "Subject",
    message: "Message",
    send: "Send",
    mapTitle: "Find us",
    success: "Message sent successfully!",
    continue: "Continue",
  };

  return (
    <>
      {/* Success Banner */}
      {success && (
        <div className="bg-green-100 text-green-800 p-4 text-center font-semibold">
          {t.success} –{" "}
          <Link
            to="/contact-success"
            className="underline text-green-900 font-bold"
          >
            {t.continue}
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* CONTACT INFO */}
          <div className="space-y-14">
            <h2 className="text-3xl font-bold mb-8">{t.contactInfo}</h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="text-4xl text-[#39386A] mr-4">📞</div>
                <div>
                  <p className="font-semibold">{t.phone}</p>
                  <p>+221 77 130 5307</p>
                  <p>+221 77 348 6930</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-4xl text-[#39386A] mr-4">✉️</div>
                <div>
                  <p className="font-semibold">{t.email}</p>
                  <p>baolmax0063@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-4xl text-[#39386A] mr-4">📍</div>
                <div>
                  <p className="font-semibold">{t.address}</p>
                  <p>Mbour – Ngaparou, Senegal</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-[#F7F3EE] border rounded-3xl p-10">
            <h2 className="text-3xl font-bold mb-10">{t.formTitle}</h2>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* NAME */}
              <div>
                <label className="font-semibold">{t.name}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg bg-white shadow-inner"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="font-semibold">{t.emailForm}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg bg-white shadow-inner"
                  required
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="font-semibold">{t.subject}</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg bg-white shadow-inner"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="font-semibold">{t.message}</label>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg bg-white shadow-inner"
                  required
                ></textarea>
              </div>

              {/* BUTTON → SAME STYLE BUT USING Link WHEN SUCCESS */}
              {success ? (
                <Link
                  to="/contact-success"
                  className="block text-center w-full py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
                >
                  Continue
                </Link>
              ) : (
                <button
                  className="w-full py-4 bg-[#39386A] text-white rounded-full font-semibold hover:bg-[#2F2E59] transition"
                  disabled={sending}
                >
                  
                  {sending ? "Sending..." : t.send}
                </button>
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
