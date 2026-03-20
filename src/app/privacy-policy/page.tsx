import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for InsightNow - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-500">Last updated: March 20, 2026</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name and email address when you create an account or subscribe to our newsletter</li>
          <li>Comments and feedback you provide on our articles</li>
          <li>Information you provide when contacting us</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Send you newsletters and updates you have subscribed to</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Cookies</h2>
        <p>
          We use cookies and similar technologies to collect information about your browsing activities. You can control cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Third-Party Services</h2>
        <p>
          We may use third-party services like Google Analytics and Google AdSense that collect and use data. These services have their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Contact us at privacy@insightnow.com for any requests.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:<br />
          Email: privacy@insightnow.com
        </p>
      </div>
    </div>
  );
}
