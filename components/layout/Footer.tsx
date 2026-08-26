import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from '@/data/site';
import Container from '@/components/layout/Container';
import SocialIcon from '@/components/layout/SocialIcon';

const FOOTER_LINK =
  'inline-block text-base text-on-dark-muted transition-[color,transform] ease-out ' +
  'hover:translate-x-1 hover:text-on-dark';

const FOOTER_HEADING =
  'mb-4 font-sans text-xs font-bold tracking-wider uppercase text-on-dark';

export default function Footer() {
  return (
    <footer className="bg-ink pt-[clamp(2.5rem,5vw,4rem)] pb-8 text-on-dark">
      <Container>
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <div>
            <span className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-none font-bold tracking-[0.04em] text-on-dark">
              {SITE.name}
            </span>
            <p className="mt-3 max-w-[28ch] text-base text-on-dark-muted">{SITE.tagline}</p>
          </div>

          <div>
            <h2 className={FOOTER_HEADING}>Navigation</h2>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={FOOTER_HEADING}>Visit &amp; Contact</h2>
            <address className="text-base leading-normal text-on-dark-muted not-italic">
              <span className="mb-3 flex gap-2">
                <MapPin className="mt-1 shrink-0" size={16} aria-hidden="true" />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </span>
              <span className="flex gap-2">
                <Mail className="mt-1 shrink-0" size={16} aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className={FOOTER_LINK}>
                  {SITE.email}
                </a>
              </span>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-on-dark/14 pt-6">
          <p className="text-sm text-on-dark/55">
            © {SITE.established} {SITE.name} Estate. All rights reserved.
          </p>

          <ul className="flex gap-2">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  className="grid size-[38px] place-items-center rounded-full border border-on-dark/18 text-on-dark-muted transition-[color,background-color,border-color,transform] ease-out hover:-translate-y-[3px] hover:border-on-dark hover:bg-on-dark hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${social.label}`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
