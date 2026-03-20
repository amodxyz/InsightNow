import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for InsightNow - Learn about how we use cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-500">Last updated: March 20, 2026</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-8">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">2. Types of Cookies We Use</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mt-6">Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core features like user authentication, security, and accessibility.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6">Performance Cookies</h3>
        <p>
          These cookies collect information about how visitors use our website, such as which pages are most visited. This data helps us improve our website.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6">Functionality Cookies</h3>
        <p>
          These cookies remember your preferences and settings, such as your language preference, to provide a more personalized experience.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6">Targeting/Advertising Cookies</h3>
        <p>
          These cookies are used to deliver relevant advertisements to you. They track your browsing habits to show targeted ads based on your interests.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">3. Third-Party Cookies</h2>
        <p>Some cookies on our website are set by third-party services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Google Analytics:</strong> To analyze website traffic and usage</li>
          <li><strong>Google AdSense:</strong> To display relevant advertisements</li>
          <li><strong>Social Media:</strong> To enable sharing content on social platforms</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">4. How Long Do Cookies Last?</h2>
        <p>
          Cookies can be either session cookies (deleted when you close your browser) or persistent cookies (remain on your device for a set period).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">5. Managing Cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
        </p>
        <p>To manage cookies in your browser:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
          <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
          <li><strong>Edge:</strong> Settings → Privacy and Services → Cookies</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">6. Impact of Disabling Cookies</h2>
        <p>
          If you choose to disable cookies, some features of our website may not work properly. You may experience reduced functionality and personalized experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">7. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">8. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at:<br />
          Email: privacy@insightnow.com
        </p>
      </div>
    </div>
  );
}
