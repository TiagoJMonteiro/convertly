
const LAST_UPDATED = "4 November 2026";
const CONTACT_EMAIL = "kidsemail939@gmail.com";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#121212] text-neutral-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <a href="/" className="text-amber-500 hover:text-amber-400 text-sm">
          ← Back to Convertly
        </a>

        <h1 className="text-4xl font-bold text-white mt-8 mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-500 mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Convertly, you agree to these Terms of
              Service. If you do not agree with these terms, please do not
              use the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. About Convertly</h2>
            <p>
              Convertly provides online utilities and tools designed to help
              users perform common digital tasks, including conversions,
              formatting and other processing operations.
            </p>
            <p className="mt-3">
              The website is provided for general informational and practical
              use. Individual tools may have their own limitations or
              instructions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use Convertly for unlawful purposes;</li>
              <li>Attempt to disrupt, damage or compromise the website;</li>
              <li>Attempt to gain unauthorised access to systems or services;</li>
              <li>Use automated methods in a way that places unreasonable load on the website;</li>
              <li>Copy, redistribute or exploit website content in violation of applicable rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. User Content and Files
            </h2>
            <p>
              You are responsible for the text, files or other content you
              choose to process using Convertly. You must ensure that you
              have the necessary rights and permissions to use that content.
            </p>
            <p className="mt-3">
              Do not submit confidential, sensitive or otherwise protected
              information unless you have assessed the relevant tool and
              understand how it processes your content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Availability and Changes
            </h2>
            <p>
              We aim to keep Convertly available and functional, but we do
              not guarantee uninterrupted access. Features may be changed,
              suspended or discontinued at any time where reasonably necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Disclaimer
            </h2>
            <p>
              Convertly is provided on an "as is" and "as available" basis,
              subject to mandatory rights under applicable law.
            </p>
            <p className="mt-3">
              Although we aim to provide useful and accurate tools, we do not
              guarantee that every result will be accurate, complete or
              suitable for every purpose. You should independently verify
              important results before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, Convertly shall not
              be liable for indirect or consequential losses arising from
              the use or inability to use the website.
            </p>
            <p className="mt-3">
              Nothing in these Terms excludes or limits liability where such
              exclusion or limitation is prohibited by law, including
              mandatory consumer rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, the Convertly name, website design,
              original content and software are protected by applicable
              intellectual property laws.
            </p>
            <p className="mt-3">
              You may use the tools for their intended purposes but may not
              reproduce or commercially exploit protected website material
              without prior permission, except where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Third-Party Services and Advertising
            </h2>
            <p>
              Convertly does not currently display advertisements through
              Google AdSense. Advertising services or other third-party
              integrations may be introduced in the future.
            </p>
            <p className="mt-3">
              If introduced, third-party services may be subject to their
              own terms and privacy policies. We will update the relevant
              website information when those services are implemented.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. External Links
            </h2>
            <p>
              Convertly may contain links to third-party websites. We do not
              control and are not responsible for the content, availability
              or policies of external websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms when necessary. Updated terms will
              be published on this page, together with a revised date.
              Continued use of the website after changes take effect
              constitutes acceptance where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Applicable Law
            </h2>
            <p>
              These Terms are governed by the laws of Portugal, without
              prejudice to mandatory consumer protection rules that may
              apply. Any disputes shall be handled by the competent courts
              under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Contact</h2>
            <p>For questions about these Terms, contact:</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block mt-3 text-amber-500 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </section>
        </div>

        <div className="border-t border-neutral-800 mt-14 pt-6 text-sm text-neutral-500 flex flex-wrap gap-5">
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/cookie-policy" className="hover:text-white">Cookie Policy</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </main>
  );
}
