import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ContactForm from '@/components/forms/ContactForm';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with VINT — questions about our homemade wines, orders, or a special occasion. Based in Puwakpitiya, Avissawella, Sri Lanka.',
};

/**
 * Google Maps embed for the estate. No API key required.
 *
 * Prefer coordinates: Google cannot geocode the house number here, so searching
 * the written address returns the surrounding area with no marker. With
 * coordinates it drops a pin on the exact spot and zooms in close. Falling back
 * to the locality at least resolves to the right neighbourhood.
 */
const { coordinates, locality, country } = SITE.address;
const MAP_QUERY = coordinates ?? `${locality}, ${country}`;
const MAP_ZOOM = coordinates ? 17 : 14;
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=${MAP_ZOOM}&output=embed`;

/** Opens the full Google Maps app or site at the estate, for directions. */
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAP_QUERY,
)}`;

/** One labelled contact detail with its icon. */
function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="group flex gap-4 border-b border-line-soft pb-6 last:border-b-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-soft bg-cream-deep text-burgundy transition-colors ease-out group-hover:bg-burgundy group-hover:text-on-dark">
        {icon}
      </span>
      <div>
        <span className="text-xs font-bold tracking-wide uppercase text-faint">{label}</span>
        {children}
      </div>
    </div>
  );
}

const CONTACT_VALUE = 'text-md leading-snug text-body not-italic';

export default function ContactPage() {
  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/contact-hero.jpg"
        imageAlt="Red wine being poured into a glass on an evening table strung with warm lights"
        photo
        eyebrow="Contact VINT"
        title="Let's Raise a Glass Together"
        subtitle="We'd love to hear from you. Whether you have a question about our homemade wines, want to know more, or would like to place an order, feel free to get in touch."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Details + form                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="contact-details">
        <Container>
          <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] min-[860px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Reveal className="flex flex-col gap-6">
              <div>
                <Eyebrow>Find Us</Eyebrow>
                <h2 className="mt-2 mb-8">Come say hello</h2>
              </div>

              <ContactItem
                icon={<MapPin size={20} strokeWidth={1.5} aria-hidden="true" />}
                label="Address"
              >
                <address className={CONTACT_VALUE}>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </address>
              </ContactItem>

              <ContactItem
                icon={<Mail size={20} strokeWidth={1.5} aria-hidden="true" />}
                label="Email"
              >
                <p className={CONTACT_VALUE}>
                  <a href={`mailto:${SITE.email}`} className="hover:text-burgundy hover:underline">
                    {SITE.email}
                  </a>
                </p>
              </ContactItem>

              <ContactItem
                icon={<Clock size={20} strokeWidth={1.5} aria-hidden="true" />}
                label="Response Time"
              >
                <p className={CONTACT_VALUE}>
                  We reply to every message personally, usually within one working day.
                </p>
              </ContactItem>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Live map                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section band>
        <Container>
          <SectionHeading
            eyebrow="The Estate"
            title="Where We Make It"
            subtitle={`${SITE.address.full}.`}
            align="center"
          />

          <Reveal className="relative overflow-hidden rounded-md border border-line-soft leading-none shadow-sm">
            {/* The free Google embed labels a coordinate pin with the raw
                latitude and longitude and offers no way to override it, so the
                address is shown on the map here instead. Full width above the
                map on a phone — a floating card would cover most of it. */}
            <div className="border-b border-line-soft bg-ivory-soft px-6 py-4 leading-snug min-[560px]:absolute min-[560px]:top-6 min-[560px]:left-6 min-[560px]:z-1 min-[560px]:max-w-80 min-[560px]:rounded-sm min-[560px]:border min-[560px]:bg-ivory-soft/96 min-[560px]:shadow-md min-[560px]:backdrop-blur-[6px]">
              <span className="flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-burgundy">
                <MapPin size={13} aria-hidden="true" />
                VINT Estate
              </span>
              <address className="mt-1 text-sm text-body not-italic">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </address>
              <a
                className="mt-2 inline-flex items-center gap-1 border-b border-transparent text-xs font-bold text-burgundy transition-colors ease-out hover:border-b-burgundy"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <iframe
              src={MAP_SRC}
              title={`Map showing the VINT estate at ${SITE.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[clamp(300px,45vh,460px)] w-full border-0"
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
