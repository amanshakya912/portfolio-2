"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { guide } from "@/app/data/portfolio";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "", trip: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-[#F0EDE6] overflow-hidden">
      {/* Background mountain range */}
      <svg className="absolute bottom-0 w-full opacity-[0.06]" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">
        <path d="M0,200 L0,120 L180,60 L360,100 L480,40 L600,80 L720,20 L840,70 L960,110 L1080,50 L1200,90 L1440,60 L1440,200 Z" fill="#D9C9B0"/>
      </svg>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">Contact · 联系我们</span>
            <div className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-mountain-900 mb-4">
            Start Your <span className="gold-shimmer">Journey</span>
          </h2>
          <p className="font-body text-mountain-600 max-w-lg mx-auto">
            Reach out to the travel agency to book Amir for your Nepal adventure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Agency info */}
            <div className="bg-white rounded-2xl p-8 border border-mountain-300/40 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center text-3xl">🏢</div>
                <div>
                  <h3 className="font-display text-xl font-bold text-mountain-900">Travel Agency</h3>
                  <p className="font-body text-gold-400 text-sm">{guide.agency}</p>
                </div>
              </div>
              <p className="font-body text-mountain-700 text-sm leading-relaxed">
                Amir is available for booking through registered Nepal travel agencies. 
                Contact the agency directly to arrange your tour with Amir as your guide.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: "📧", label: "Email", value: guide.email },
                { icon: "📱", label: "Phone (WhatsApp)", value: guide.phone },
                { icon: "📍", label: "Based in", value: "Kathmandu, Nepal" },
                { icon: "🗣️", label: "Languages", value: "Mandarin · Nepali · English" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-mountain-100 border border-mountain-300/40">
                  <span className="text-xl w-8 text-center">{item.icon}</span>
                  <div>
                    <p className="font-body text-mountain-500 text-xs">{item.label}</p>
                    <p className="font-body text-mountain-900 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl p-6 border border-gold-400/20 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-2xl">⭐</div>
                <div>
                  <p className="font-display text-mountain-900 font-bold">5.0 Average Rating</p>
                  <p className="font-body text-mountain-700 text-sm mt-1">
                    From 500+ groups across China — Beijing, Shanghai, Guangzhou, Chengdu, and beyond.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-mountain-300/40 space-y-5 shadow-sm" noValidate>
                <h3 className="font-display text-2xl font-bold text-mountain-900 mb-6">Send an Enquiry</h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-mountain-600 text-xs tracking-wide block mb-2">Your Name · 您的姓名</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-mountain-100 border border-mountain-300/50 rounded-xl px-4 py-3 font-body text-mountain-900 text-sm placeholder-mountain-500 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 transition-all"
                      placeholder="Li Wei"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-mountain-600 text-xs tracking-wide block mb-2">Email · 电子邮件</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-mountain-100 border border-mountain-300/50 rounded-xl px-4 py-3 font-body text-mountain-900 text-sm placeholder-mountain-500 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 transition-all"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-mountain-600 text-xs tracking-wide block mb-2">Interested Trip · 感兴趣的行程</label>
                  <select
                    value={formState.trip}
                    onChange={(e) => setFormState({ ...formState, trip: e.target.value })}
                    className="w-full bg-mountain-100 border border-mountain-300/50 rounded-xl px-4 py-3 font-body text-mountain-900 text-sm focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-mountain-100">Select a destination...</option>
                    <option value="ebc" className="bg-mountain-100">Everest Base Camp</option>
                    <option value="ktm" className="bg-mountain-100">Kathmandu Valley</option>
                    <option value="annapurna" className="bg-mountain-100">Annapurna Circuit</option>
                    <option value="chitwan" className="bg-mountain-100">Chitwan National Park</option>
                    <option value="lumbini" className="bg-mountain-100">Lumbini Pilgrimage</option>
                    <option value="pokhara" className="bg-mountain-100">Pokhara & Phewa Lake</option>
                    <option value="custom" className="bg-mountain-100">Custom Itinerary</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-mountain-600 text-xs tracking-wide block mb-2">Message · 留言</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={4}
                    className="w-full bg-mountain-100 border border-mountain-300/50 rounded-xl px-4 py-3 font-body text-mountain-900 text-sm placeholder-mountain-500 focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/30 transition-all resize-none"
                    placeholder="Tell us about your group size, dates, and what you'd love to experience in Nepal..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-snow-100 font-body font-semibold tracking-wide hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Send Enquiry · 发送咨询
                </button>

                <p className="font-body text-mountain-400 text-xs text-center">
                  This form collects your contact info to respond to your enquiry only.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-12 border border-gold-400/30 text-center shadow-sm"
              >
                <div className="text-6xl mb-6">🙏</div>
                <h3 className="font-display text-3xl font-bold text-mountain-900 mb-3">Namaste! 你好!</h3>
                <p className="font-body text-mountain-700 leading-relaxed">
                  Your enquiry has been received. We will be in touch within 24 hours to start planning your Nepal adventure with Amir.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 rounded-full border border-gold-500/30 text-gold-400 font-body text-sm hover:bg-gold-500/10 transition-all"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
