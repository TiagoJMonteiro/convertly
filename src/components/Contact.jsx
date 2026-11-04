
import { Mail, ArrowLeft, MessageCircle } from "lucide-react";

const CONTACT_EMAIL = "kidsemail939@gmail.com";
const OPERATOR_NAME = "Tiago Monteiro";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#121212] text-neutral-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Convertly
        </a>

        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={30} className="text-amber-500" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>

          <p className="text-neutral-400 leading-7 mb-12">
            Have a question, found a problem or want to share a suggestion?
            We'd be happy to hear from you.
          </p>

          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl p-8 text-left">
            <div className="flex items-center gap-3 mb-5">
              <Mail size={22} className="text-amber-500" />
              <h2 className="text-xl font-semibold text-white">
                Email Support
              </h2>
            </div>

            <p className="text-neutral-400 text-sm leading-6 mb-5">
              For general questions, feedback, technical issues or privacy
              requests, contact the person responsible for Convertly:
            </p>

            <p className="text-white font-medium mb-2">{OPERATOR_NAME}</p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-amber-500 hover:text-amber-400 break-all"
            >
              {CONTACT_EMAIL}
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Convertly%20Support`}
              className="mt-7 ml-4 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-xl transition"
            >
              <Mail size={17} />
              Send an Email
            </a>
          </div>

          <p className="text-sm text-neutral-500 mt-8">
            We aim to respond to messages as soon as reasonably possible.
          </p>
        </div>

        <div className="border-t border-neutral-800 pt-6 text-sm text-neutral-500 flex flex-wrap justify-center gap-5">
          <a href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms of Service
          </a>
          <a href="/cookie-policy" className="hover:text-white">
            Cookie Policy
          </a>
        </div>
      </div>
    </main>
  );
}
