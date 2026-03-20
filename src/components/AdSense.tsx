'use client';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'vertical' | 'rectangle';
  style?: string;
  className?: string;
}

export default function AdSense({ 
  slot = '1234567890', 
  format = 'auto',
  style = "display: block",
  className = "" 
}: AdSenseProps) {
  const publisherId = 'ca-pub-8725656527291179';
  
  return (
    <div className={`adsense-container my-4 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...(style.includes('min-height') ? {} : { minHeight: '100px' }) }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
        }}
      />
    </div>
  );
}

export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-100 rounded-xl p-4 text-center ${className}`}>
      <AdSense slot="1234567890" format="horizontal" className="my-0" />
    </div>
  );
}

export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-100 rounded-xl p-3 text-center ${className}`}>
      <AdSense slot="9876543210" format="rectangle" className="my-0" />
    </div>
  );
}

export function InArticleAd({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 ${className}`}>
      <AdSense slot="5555555555" format="fluid" />
    </div>
  );
}
