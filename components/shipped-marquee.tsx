"use client";

import Link from "next/link";
import { DeviceFrame } from "./device-frame";

type Item = { slug: string; src: string; label: string };

const ITEMS: Item[] = [
  { slug: "servicecalltracker", src: "/work/servicecalltracker.webp", label: "servicecalltracker.com" },
  { slug: "basisweb", src: "/work/basisweb.webp", label: "basisweb.net" },
  { slug: "hammock", src: "/work/hammock.webp", label: "hammockpropertyinspections.com" },
  { slug: "operations-command", src: "/work/operations-command.webp", label: "restaurun.basisweb.net" },
  { slug: "google-maps-scraper", src: "/work/google-maps-scraper.webp", label: "maps scraper · tool" },
  { slug: "acc-scraper", src: "/work/acc-scraper.webp", label: "acc scraper · tool" },
  { slug: "warpspeed", src: "/work/warpspeed.webp", label: "warpspeed · tool" },
];

function Track({ clone = false }: { clone?: boolean }) {
  return (
    <ul className="flex shrink-0 items-stretch gap-5" aria-hidden={clone || undefined}>
      {ITEMS.map((it) => (
        <li key={`${it.slug}${clone ? "-c" : ""}`} className="w-[300px] shrink-0">
          <Link
            href={`/work/${it.slug}`}
            tabIndex={clone ? -1 : 0}
            className="group/card block transition duration-base hover:-translate-y-1"
          >
            <DeviceFrame
              chrome="browser"
              src={it.src}
              alt={`${it.label} preview`}
              label={it.label}
              aspect="aspect-[16/10]"
              glow={false}
              sizes="300px"
              className="transition-[filter] duration-base group-hover/card:brightness-110"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/*
  A slow, pausable marquee of his REAL captures, framed, each linking to its case
  page. Duplicated track for a seamless loop; the clone is aria-hidden and not
  focusable. Static under reduced motion (the global reduced-motion rule stops
  the animation).
*/
export function ShippedMarquee() {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
      <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track clone />
      </div>
    </div>
  );
}
