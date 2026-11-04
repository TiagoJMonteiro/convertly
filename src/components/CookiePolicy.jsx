
const LAST_UPDATED = "4 November 2026";
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#121212] text-neutral-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <a href="/" className="text-amber-500 hover:text-amber-400 text-sm">
          ← Back to Convertly
        </a>

        <h1 className="text-4xl font-bold text-white mt-8 mb-3">
          Cookie Policy
        </h1>
        <p className="text-sm text-neutral-500 mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you
              visit a website. They can help websites function, remember
              preferences and understand how visitors interact with pages.
            </p>
            <p className="mt-3">
              Similar technologies, such as local storage and pixels, may
              also be used for related purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Current Use of Cookies
            </h2>
            <p>
              Convertly does not currently use Google AdSense or advertising
              cookies. The cookies and similar technologies actually used
              by the website depend on the features and third-party services
              enabled in the current version.
            </p>
            <p className="mt-3">
              Some technologies may be strictly necessary for the website
              to function. We will request consent before using non-essential
              cookies or similar technologies where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Types of Cookies
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">Strictly Necessary</h3>
                <p>
                  These technologies may be required for core website
                  functionality, security or the delivery of a service
                  explicitly requested by the visitor.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Analytics</h3>
                <p>
                  Analytics technologies may be introduced in the future
                  to understand website usage and improve performance.
                  Where required, they will only be activated after valid
                  consent.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Advertising</h3>
                <p>
                  Advertising cookies are not currently used by Google
                  AdSense on Convertly. If advertising is introduced in
                  the future, advertising providers may use cookies or
                  similar technologies to deliver and measure advertisements
                  and, where permitted, personalise them.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Functional</h3>
                <p>
                  These technologies may remember preferences or settings
                  to improve the visitor experience, if such features are
                  implemented.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Future Advertising Services
            </h2>
            <p>
              Convertly may use Google AdSense or other advertising services
              in the future. If implemented, these services may store or
              access information on your device and process information
              such as IP addresses, browser identifiers and interactions
              with advertisements.
            </p>
            <p className="mt-3">
              Before enabling technologies that require consent, we will
              provide an appropriate consent mechanism and update this
              Cookie Policy with relevant details.
            </p>
            <p className="mt-3">
              More information about Google's advertising technologies is
              available at:
              {" "}
              <a
                href="https://policies.google.com/technologies/ads?hl=en"
                target="_blank"
                rel="noreferrer"
                className="text-amber-500 hover:underline"
              >
                Google Advertising Technologies
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Managing Cookies
            </h2>
            <p>
              You can manage or delete cookies through your browser settings.
              Blocking certain cookies may affect the functionality of some
              websites.
            </p>
            <p className="mt-3">
              Where Convertly provides a consent-management interface, you
              can use it to review or change your choices. Withdrawing
              consent does not affect processing that took place before
              withdrawal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Changes to This Policy
            </h2>
            <p>
              This Cookie Policy may be updated when we introduce new
              features, analytics tools, advertising services or other
              technologies. The latest version will be published here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
            <p>For questions about cookies or this policy, contact:</p>
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
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </main>
  );
}
