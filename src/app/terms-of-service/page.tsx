import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for InsightNow - Read our terms and conditions for using our website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-500">Last updated: March 20, 2026</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing and using InsightNow, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Description of Service</h2>
        <p>
          InsightNow provides news aggregation and content delivery services. We reserve the right to modify, suspend, or discontinue any part of our service at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use our service for any illegal purposes</li>
          <li>Post false, misleading, or harmful content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of the website</li>
          <li>Collect user information without consent</li>
          <li>Use automated tools to access the site without permission</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Intellectual Property</h2>
        <p>
          All content on InsightNow, including articles, images, and design, is protected by copyright. You may not reproduce, distribute, or create derivative works without our permission.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Third-Party Content</h2>
        <p>
          Our website may include links to third-party websites or content. We do not endorse or assume responsibility for any third-party content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Advertisements</h2>
        <p>
          Our website displays advertisements from third parties. These advertisements may use cookies to deliver targeted ads. We are not responsible for the practices of these advertisers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Disclaimer of Warranties</h2>
        <p>
          OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Limitation of Liability</h2>
        <p>
          In no event shall InsightNow be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless InsightNow and its affiliates from any claims, damages, or expenses arising from your use of our service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">10. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">11. Governing Law</h2>
        <p>
          These terms shall be governed by the laws of the United States, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">12. Contact Information</h2>
        <p>
          For questions about these Terms of Service, please contact us at:<br />
          Email: legal@amodkumar.com
        </p>
      </div>
    </div>
  );
}
