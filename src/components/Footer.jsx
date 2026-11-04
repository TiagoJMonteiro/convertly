export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-[#121212] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-neutral-500">

        {/* Logo and copyright */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center text-black font-bold text-xs">
            ⚡
          </span>

          <span className="font-semibold text-neutral-300">
            Convertly
          </span>

          <span>© 2026. All rights reserved.</span>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">

          <a href="/privacy-policy" className="hover:text-amber-400 transition-colors">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-amber-400 transition-colors">
            Terms of Service
          </a>

          <a href="/cookie-policy" className="hover:text-amber-400 transition-colors">
            Cookie Policy
          </a>

          <a href="/contact" className="hover:text-amber-400 transition-colors">
            Contact
          </a>

        </div>
      </div>
    </footer>
  );
}