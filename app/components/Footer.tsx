"use client";
import { guide } from "@/app/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative bg-[#030705] border-t border-white/5 py-16 overflow-hidden">
      {/* Himalaya silhouette */}
      <svg className="absolute bottom-0 w-full opacity-5" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice">
        <path d="M0,120 L0,70 L120,30 L240,55 L360,15 L480,45 L600,5 L720,35 L840,65 L960,25 L1080,60 L1200,40 L1320,70 L1440,50 L1440,120 Z" fill="#5f925f"/>
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-mountain-900 font-display font-bold">PS</div>
              <div>
                <div className="font-display text-snow-100 font-bold">{guide.name}</div>
                <div className="font-body text-gold-400 text-xs tracking-widest uppercase">Nepal Guide</div>
              </div>
            </div>
            <p className="font-body text-snow-200/50 text-sm leading-relaxed max-w-xs">
              Certified Nepal Tourism Board guide specializing in cultural and trekking tours for Chinese-speaking travelers.
            </p>
            <p className="font-accent text-snow-200/30 text-sm italic mt-2">
              专为中国游客提供尼泊尔专业导游服务
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">Navigation</h4>
            <div className="space-y-2">
              {["About", "Destinations", "Experience", "Gallery", "Testimonials", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-snow-200/50 text-sm hover:text-snow-100 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">Contact</h4>
            <div className="space-y-3">
              <p className="font-body text-snow-200/50 text-sm">{guide.agency}</p>
              <p className="font-body text-snow-200/50 text-sm">{guide.email}</p>
              <p className="font-body text-snow-200/50 text-sm">{guide.phone}</p>
              <p className="font-body text-snow-200/50 text-sm">Kathmandu, Nepal</p>
            </div>

            <div className="mt-6">
              <h4 className="font-body text-xs tracking-[0.2em] uppercase text-gold-400 mb-3">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {["中文", "नेपाली", "English", "བོད་སྐད"].map((lang) => (
                  <span key={lang} className="px-2.5 py-1 rounded-full border border-mountain-600/30 font-body text-snow-200/40 text-xs">{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-snow-200/30 text-xs">
            © {new Date().getFullYear()} {guide.name}. Nepal Tourism Board Certified.
          </p>
          <p className="font-accent text-snow-200/20 text-xs italic">
            "The mountains are calling and I must go." — John Muir
          </p>
          <p className="font-body text-snow-200/30 text-xs">
            Made with ❤️ for Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
