import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GTM_ID = 'GTM-KS6LVTSR';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoRepair',
      '@id': 'https://3mcarcarestudios.in/#localbusiness',
      name: '3M Car Care Studio Kanakapura Road',
      alternateName: '3M Car Care Studio',
      url: 'https://3mcarcarestudios.in/',
      description:
        '3M Car Care Studio Kanakapura Road offers premium car care services including paint protection film, ceramic coating, graphene coating, sun control film, interior cleaning, anti-corrosion treatment, wraps and styling in Bengaluru.',
      telephone: '+91 91672 53584',
      email: '3mcarcarestudiokrrr@gmail.com',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd Block, B No 1124, 80 Feet Rd, Banashankari Stage 6, Kariyana Palya',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560098',
        addressCountry: 'IN'
      },
      areaServed: [
        { '@type': 'Place', name: 'Kanakapura Road' },
        { '@type': 'Place', name: 'Banashankari Stage 6' },
        { '@type': 'Place', name: 'South Bengaluru' },
        { '@type': 'Place', name: 'Bengaluru' }
      ],
      hasMap:
        'https://www.google.com/maps/dir/?api=1&destination=3M+Car+Care+Studio+Kanakapura+Road+Bengaluru',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91 91672 53584',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Kannada', 'Hindi']
        },
        {
          '@type': 'ContactPoint',
          telephone: '+91 88928 88336',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Kannada', 'Hindi']
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '3M Car Care Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Paint Protection Film',
              serviceType: '3M Paint Protection Film',
              description:
                'Transparent paint protection film that protects car paint from scratches, stone chips, UV damage and daily wear.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sun Control Film',
              serviceType: '3M Sun Control Film for Cars',
              description:
                'Sun control film service to reduce heat, glare and UV rays for a cooler and safer drive.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Graphene Coating',
              serviceType: 'Car Graphene Coating',
              description:
                'Graphene coating service to improve car paint durability, gloss and environmental protection.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Ceramic Coating',
              serviceType: '3M Ceramic Coating',
              description:
                'Ceramic coating service that gives deep gloss, hydrophobic protection and long-lasting paint safety.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Interior GermKleen',
              serviceType: 'Car Interior Cleaning',
              description:
                'Interior hygiene service to remove bacteria, viruses, odours and maintain a clean car cabin.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Anti-Corrosion Treatment',
              serviceType: 'Car Anti Rust Coating',
              description:
                'Anti-corrosion treatment to help prevent rust on underbody and exposed vehicle areas.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wraps and Styling',
              serviceType: 'Car Vinyl Wrap and Styling',
              description:
                'Car wrap and styling service for custom colours, graphics and paint protection.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nomad Floor Mats',
              serviceType: '3M Nomad Floor Mats',
              description:
                'Premium all-weather 3M Nomad mats designed to trap dirt and improve cabin comfort.'
            }
          }
        ]
      }
    },
    {
      '@type': 'WebSite',
      '@id': 'https://3mcarcarestudios.in/#website',
      url: 'https://3mcarcarestudios.in/',
      name: '3M Car Care Studio',
      description:
        'Premium 3M car care services in Bengaluru including PPF, ceramic coating, graphene coating, sun control film, car detailing, anti-corrosion treatment and wraps.',
      publisher: { '@id': 'https://3mcarcarestudios.in/#localbusiness' }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://3mcarcarestudios.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does 3M Car Care Studio offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3M Car Care Studio offers paint protection, ceramic and graphene coatings, sun control films, interior cleaning, anti-corrosion treatment, car wraps, custom styling and premium floor mats.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is 3M Paint Protection Film?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3M Paint Protection Film is a transparent and durable film that protects car paint from scratches, stone chips, UV damage and daily wear while maintaining the glossy finish.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does 3M Paint Protection Film last?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With proper care, 3M Paint Protection Film can last 5 to 7 years, depending on coverage and environmental exposure.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the benefit of 3M Sun Control Film?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3M Sun Control Film helps reduce heat, glare and UV rays. It protects the car interior, improves driving comfort and helps keep passengers safe from harmful sun exposure.'
          }
        }
      ]
    }
  ]
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL('https://3mcarcarestudios.in/'),
  title: '3M Car Care Studio Kanakapura Road | PPF & Ceramic Coating',
  description:
    'Visit 3M Car Care Studio Kanakapura Road for PPF, ceramic coating, graphene coating, sun control film, detailing, anti-rust coating and wraps.',
  openGraph: {
    type: 'website',
    url: 'https://3mcarcarestudios.in/',
    siteName: '3M Car Care Studio',
    title: '3M Car Care Studio Kanakapura Road | PPF & Ceramic Coating',
    description:
      'Premium 3M car care services in Kanakapura Road, Bengaluru. Book PPF, ceramic coating, graphene coating, sun control film, detailing and anti-rust coating.',
    locale: 'en_IN',
    images: [
      {
        url: 'https://3mcarcarestudios.in/og-image.jpg',
        secureUrl: 'https://3mcarcarestudios.in/og-image.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: '3M Car Care Studio Kanakapura Road - PPF, Ceramic Coating and Car Detailing'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '3M Car Care Studio Kanakapura Road | PPF & Ceramic Coating',
    description:
      'Book premium 3M PPF, ceramic coating, graphene coating, sun film, detailing, anti-rust coating and wraps at Kanakapura Road, Bengaluru.',
    images: [
      {
        url: 'https://3mcarcarestudios.in/og-image.jpg',
        alt: '3M Car Care Studio Kanakapura Road - PPF and Ceramic Coating'
      }
    ]
  },
  alternates: {
    canonical: 'https://3mcarcarestudios.in/'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#08080a'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <Script
          id="ld-json-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
