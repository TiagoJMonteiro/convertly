
const LAST_UPDATED = "4 November 2026";
const CONTACT_EMAIL = "kidsemail939@gmail.com";
const OPERATOR_NAME = "Tiago Monteiro";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#121212] text-neutral-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <a href="/" className="text-amber-500 hover:text-amber-400 text-sm">
          ← Back to Convertly
        </a>

        <h1 className="text-4xl font-bold text-white mt-8 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-500 mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to Convertly. This Privacy Policy explains how information
              may be processed when you visit or use our website and its online
              tools.
            </p>
            <p className="mt-3">
              Convertly is operated by {OPERATOR_NAME} ("we", "us" or "our").
              We aim to collect as little personal information as reasonably
              possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Information We Process
            </h2>
            <p>
              Convertly does not currently require visitors to create accounts
              or provide personal information to use its tools.
            </p>
            <p className="mt-3">
              Depending on the tools used, information or files selected by
              visitors may be processed in their browser. Where a tool operates
              locally, the selected content is not intentionally uploaded to
              Convertly's servers. Please check the individual tool's behaviour
              before relying on this statement.
            </p>
            <p className="mt-3">
              Our hosting provider and technical infrastructure may
              automatically process technical information such as IP addresses,
              browser details, access times, requested pages and server logs
              for security, operation and troubleshooting purposes. The exact
              information and retention periods depend on the providers used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. How We Use Information
            </h2>
            <p>Information processed in connection with the website may be used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Operate and maintain the website;</li>
              <li>Provide the requested tools and functionality;</li>
              <li>Protect the website against abuse, fraud and security incidents;</li>
              <li>Diagnose technical problems and improve reliability;</li>
              <li>Respond to messages sent to our contact email.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Cookies and Similar Technologies
            </h2>
            <p>
              Convertly does not currently use Google AdSense. We may use
              essential cookies or similar technologies where necessary for
              website functionality, depending on the services and features
              enabled.
            </p>
            <p className="mt-3">
              If analytics, advertising or other non-essential technologies
              are introduced, this policy and our Cookie Policy will be updated.
              Where required by law, we will request consent before activating
              those technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Third-Party Services and Future Advertising
            </h2>
            <p>
              Convertly does not currently display advertisements through
              Google AdSense. In the future, we may introduce advertising
              services, including Google AdSense, to support the operation
              of the website.
            </p>
            <p className="mt-3">
              If advertising is introduced, third-party providers may use
              cookies, device identifiers, IP addresses or similar technologies
              to provide, measure and personalise advertisements, subject to
              applicable law and the visitor's consent choices.
            </p>
            <p className="mt-3">
              Further information about Google's data practices is available
              in Google's Privacy Policy:
              {" "}
              <a
                href="https://policies.google.com/privacy?hl=en"
                target="_blank"
                rel="noreferrer"
                className="text-amber-500 hover:underline"
              >
                Google Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Data Sharing
            </h2>
            <p>
              We do not sell visitors' personal information. Technical
              information may be processed by hosting, infrastructure or
              security providers where necessary to operate and protect the
              website. Any future third-party integrations will be described
              in this policy as appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Data Retention and Security
            </h2>
            <p>
              We retain information only for as long as necessary for the
              purposes described in this policy or as required by law.
              Technical log retention may be determined by our hosting
              provider.
            </p>
            <p className="mt-3">
              We take reasonable technical and organisational measures to
              protect information. However, no internet transmission or
              storage system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Your Rights
            </h2>
            <p>
              Where applicable under the GDPR and other data protection laws,
              visitors may have rights to access, rectify, erase, restrict or
              object to certain processing of their personal data, and to
              request data portability.
            </p>
            <p className="mt-3">
              You may contact us using the email address below to make a
              privacy-related request. You also have the right to lodge a
              complaint with the competent data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Children's Privacy
            </h2>
            <p>
              Convertly is not designed to knowingly collect personal
              information from children. If you believe that a child has
              provided personal information to us, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy when the website, its
              technologies or applicable legal requirements change. The
              latest version will always be published on this page with
              its updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Contact
            </h2>
            <p>
              For questions or requests relating to this Privacy Policy,
              contact:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block mt-3 text-amber-500 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </section>
        </div>

        <div className="border-t border-neutral-800 mt-14 pt-6 text-sm text-neutral-500 flex flex-wrap gap-5">
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/cookie-policy" className="hover:text-white">Cookie Policy</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </main>
  );
}
