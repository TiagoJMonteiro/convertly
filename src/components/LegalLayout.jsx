import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function LegalLayout({
  title,
  description,
  lastUpdated,
  children,
}) {
  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Convertly
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/10 flex items-center justify-center">
              <ShieldCheck className="text-amber-400" size={23} />
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
              Convertly Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>

          <p className="text-xs text-gray-500 mt-5">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#202020] border border-white/5 rounded-2xl p-5 sm:p-9">
          <div className="legal-content">
            {children}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 pt-7 border-t border-white/10">
          <p className="text-sm text-gray-500 mb-5">
            Need help or have a question?
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>

            <Link
              to="/cookie-policy"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              Cookie Policy
            </Link>

            <Link
              to="/contact"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .legal-content h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .legal-content h2:first-child {
          margin-top: 0;
        }

        .legal-content p {
          color: #a3a3a3;
          line-height: 1.85;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .legal-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 1rem 0 1.5rem;
        }

        .legal-content li {
          color: #a3a3a3;
          line-height: 1.8;
          padding-left: 0.3rem;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .legal-content strong {
          color: #e5e5e5;
          font-weight: 600;
        }

        .legal-content a {
          color: #fbbf24;
          text-decoration: none;
        }

        .legal-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </main>
  );
}