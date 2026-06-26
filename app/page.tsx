"use client";

import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  Bath,
  Brush,
  Building2,
  CheckCircle2,
  ChevronDown,
  Facebook,
  Hammer,
  Home,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assets = (name: string) => `${basePath}/assets/${name}`;

const business = "Goats Restoration and Remodeling LLC";
const phone = "(917) 891-5218";
const phoneHref = "tel:+19178915218";
const emailAddress = "goatsrestorationllc@outlook.com";
const address = "38 Middle Street, Waterbury, CT 06706";
const mapsQuery = encodeURIComponent(`${business} ${address}`);
const mapEmbedQuery = encodeURIComponent(`${business}, 38 Middle Street, Waterbury, CT 06706`);
const mapsUrl =
  "https://www.google.com/maps/place/Goats+Restoration+and+Remodeling+LLC/@41.5353838,-73.0377336,886m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89e7c1750a3ee6ad:0x20ccc64b56c9da35!8m2!3d41.5353838!4d-73.0351587!16s%2Fg%2F11xf_x5zw6";
const facebookUrl = "https://www.facebook.com/profile.php?id=61575457281235";
const instagramUrl = "https://www.instagram.com/goats_rr/";
const thumbtackUrl = "https://www.thumbtack.com/ct/waterbury/tile/goats-restoration-remodeling-llc/service/389468571867815937";

const services = [
  {
    icon: Home,
    title: "Roof replacement",
    body: "Full roof replacement, exterior protection and roof work for Connecticut homes that need a clean, durable finish.",
  },
  {
    icon: Wrench,
    title: "Roof repairs",
    body: "Leak, storm, snow and exterior repair help when the house needs attention before small problems spread.",
  },
  {
    icon: Bath,
    title: "Kitchen and bathroom remodeling",
    body: "Interior remodeling, bathroom updates, kitchen work and tile installation for rooms that need a proper reset.",
  },
  {
    icon: Hammer,
    title: "Restoration and additions",
    body: "Home restoration, decks, siding, additions and commercial project support from a Waterbury-based crew.",
  },
];

const gallery = [
  { src: "work-03.jpg", alt: "Aerial view of a dark roof completed on a multi-story home", label: "Roof replacement" },
  { src: "work-02.jpg", alt: "Aerial view of a finished gray shingle roof and rear deck", label: "Finished roofing" },
  { src: "work-04.jpg", alt: "Overhead view of a large gray roof on a residential property", label: "Exterior project" },
  { src: "work-05.jpg", alt: "Front view of a completed roof on a raised ranch home", label: "Connecticut home" },
  { src: "work-01.jpg", alt: "Aerial view of a house with a finished dark roof", label: "Roof work" },
];

const testimonials = [
  {
    quote: "They were on time, efficient, and tidy.",
    name: "Lyn",
    source: "BBB",
  },
  {
    quote: "He contacted me quickly, was on time and did quality work. Would hire again!",
    name: "Kristin P.",
    source: "BBB",
  },
  {
    quote: "I hired Manuel (Goats) to install my kitchen backsplash, and I couldn't be more pleased with the results.",
    name: "Hannah J.",
    source: "Thumbtack",
  },
];

const proofPoints = [
  "Waterbury based, serving homeowners across Connecticut.",
  "Roofing, remodeling, restoration, kitchen, bathroom and tile work.",
  "Direct estimate line for roofing, siding, decks, additions and remodels.",
  "Customer comments point to responsive, tidy work.",
];

const faqs = [
  ["Do you handle more than roofing?", "Yes. Public profiles list roofing, restoration, kitchen remodeling, bathroom remodeling, tile work, siding, decks and additions."],
  ["Where is Goats Restoration based?", "The business is listed at 38 Middle Street in Waterbury, Connecticut."],
  ["What is the fastest way to ask for an estimate?", `Use the enquiry form or call ${phone}. Include the property address, project type and what needs work.`],
  ["Can I ask about interior and exterior work?", "Yes. Goats handles roofing, restoration, remodeling, tile, siding, decks and additions."],
];

const projectModes = [
  {
    key: "roof",
    label: "Roof",
    icon: Home,
    headline: "Roof replacement or repair?",
    points: ["leak or age", "storm or snow damage", "full replacement", "roof access"],
    subject: "Roofing estimate",
  },
  {
    key: "remodel",
    label: "Remodel",
    icon: Bath,
    headline: "Kitchen, bath or tile work?",
    points: ["room size", "current condition", "finish style", "timing"],
    subject: "Remodeling estimate",
  },
  {
    key: "exterior",
    label: "Exterior",
    icon: Building2,
    headline: "Siding, deck or addition?",
    points: ["property address", "access notes", "repair or build", "timing"],
    subject: "Exterior project estimate",
  },
  {
    key: "restore",
    label: "Restore",
    icon: Brush,
    headline: "Restoration work to price?",
    points: ["damage area", "materials", "urgency", "walkthrough needs"],
    subject: "Restoration estimate",
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function EstimateForm() {
  const [jobType, setJobType] = useState("Roof replacement");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const sendEnquiry = () => {
    const body = encodeURIComponent(
      [
        `Name: ${name || "[name]"}`,
        `Contact: ${contact || "[phone or email]"}`,
        `Project type: ${jobType}`,
        `Town / address: ${area || "[property town or address]"}`,
        "",
        "Project details:",
        details || "[roofing, remodeling, restoration or repair details]",
      ].join("\n"),
    );
    const subject = encodeURIComponent(`${jobType} enquiry`);
    setSent(true);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <form id="hero-enquiry" className="rounded-3xl border border-white/10 bg-white/[0.075] p-7 text-white backdrop-blur-2xl lg:p-9" onSubmit={(event) => { event.preventDefault(); sendEnquiry(); }}>
      <p className="mb-3 text-xs font-black uppercase text-amber-300">Estimate request</p>
      <h2 className="text-4xl font-black leading-none">Tell us what needs work.</h2>
      <div className="mt-8 grid gap-4 text-sm font-bold text-white/72">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span>Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="min-h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-amber-300" />
          </label>
          <label className="grid gap-2">
            <span>Phone or email</span>
            <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Best contact" className="min-h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-amber-300" />
          </label>
        </div>
        <label className="grid gap-2">
          <span>Project type</span>
          <select value={jobType} onChange={(event) => setJobType(event.target.value)} className="min-h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-amber-300">
            <option>Roof replacement</option>
            <option>Roof repair</option>
            <option>Kitchen or bathroom remodel</option>
            <option>Tile, siding, deck or addition</option>
            <option>Restoration work</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span>Town or address</span>
          <input value={area} onChange={(event) => setArea(event.target.value)} placeholder="Waterbury / nearby" className="min-h-12 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-amber-300" />
        </label>
        <label className="grid gap-2">
          <span>Project details</span>
          <textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Roof leak, storm damage, room remodel, siding, deck, tile work, timing..." className="min-h-28 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-amber-300" />
        </label>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="submit" variant="brass" className="min-h-12 rounded-xl px-5"><Mail size={18} />{sent ? "Opening email" : "Send enquiry"}</Button>
        <a href={phoneHref}><Button asChild variant="secondary" className="min-h-12 rounded-xl border-white/15 bg-white/10 px-5 text-white hover:bg-white/16"><span><Phone size={18} />Call instead</span></Button></a>
      </div>
      <p className="mt-4 text-xs leading-6 text-white/45">The form opens a ready-made email to Goats Restoration with your project details.</p>
    </form>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "220px" });

  useEffect(() => {
    if (!ref.current || !inView) return;
    const controls = animate(0, value, {
      duration: 1.15,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, suffix, value]);

  return <span ref={ref}>{value}{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="group w-full rounded-xl border border-white/10 bg-white/[0.045] p-5 text-left transition hover:border-amber-300/35 hover:bg-white/[0.075]"
      onClick={() => setOpen((current) => !current)}
      type="button"
    >
      <span className="flex items-center justify-between gap-4 text-base font-black text-white">
        {q}
        <ChevronDown className={`shrink-0 text-amber-300 transition ${open ? "rotate-180" : ""}`} size={20} />
      </span>
      {open ? <span className="mt-4 block text-sm leading-7 text-white/64">{a}</span> : null}
    </button>
  );
}

function ProjectSelector() {
  const [activeKey, setActiveKey] = useState(projectModes[0].key);
  const active = useMemo(() => projectModes.find((mode) => mode.key === activeKey) || projectModes[0], [activeKey]);
  const ActiveIcon = active.icon;

  return (
    <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
      <Reveal>
        <p className="mb-3 text-xs font-black uppercase text-amber-300">Choose the work</p>
        <h2 className="text-4xl font-black leading-none sm:text-6xl">Get the right details into the first call.</h2>
        <p className="mt-5 text-base leading-8 text-white/62">Pick the closest job type, then send the enquiry or call with the details that help price the work cleanly.</p>
      </Reveal>
      <Reveal className="rounded-2xl border border-white/10 bg-black/32 p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {projectModes.map((mode) => {
            const Icon = mode.icon;
            const selected = mode.key === active.key;
            return (
              <button
                key={mode.key}
                type="button"
                onClick={() => setActiveKey(mode.key)}
                className={`flex min-h-14 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-black transition ${
                  selected ? "border-amber-300 bg-amber-300 text-black" : "border-white/10 bg-white/[0.045] text-white/70 hover:border-amber-300/35"
                }`}
              >
                <Icon size={17} />
                {mode.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#07090b] p-6">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/10 text-amber-300">
            <ActiveIcon size={25} />
          </div>
          <h3 className="text-3xl font-black leading-tight sm:text-5xl">{active.headline}</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.points.map((point) => (
              <span key={point} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-black text-white/70">
                {point}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={phoneHref}><Button asChild variant="brass" className="rounded-xl"><span><Phone size={18} />Call now</span></Button></a>
            <a href={`mailto:${emailAddress}?subject=${encodeURIComponent(active.subject)}`}><Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16"><span><Mail size={18} />Email details</span></Button></a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Page() {
  const main = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.26], [0, -76]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gsap-rise", {
        y: 54,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 72%" },
      });
      gsap.to(".gallery-track", {
        xPercent: -13,
        ease: "none",
        scrollTrigger: { trigger: ".gallery-stage", start: "top 78%", end: "bottom top", scrub: 0.7 },
      });
      gsap.from(".proof-line", {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { trigger: ".why-section", start: "top 68%", end: "bottom 35%", scrub: true },
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: business,
    image: assets("logo.jpg"),
    telephone: "+19178915218",
    email: emailAddress,
    address: {
      "@type": "PostalAddress",
      streetAddress: "38 Middle Street",
      addressLocality: "Waterbury",
      addressRegion: "CT",
      postalCode: "06706",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 41.5353838, longitude: -73.0351587 },
    areaServed: ["Waterbury", "Connecticut", "New Haven County", "Hartford County"],
    sameAs: [facebookUrl, instagramUrl, thumbtackUrl, mapsUrl],
    url: "https://deanooooooooo.github.io/goats-restoration-remodeling-premium-next/",
  };

  return (
    <motion.main
      ref={main}
      className="min-h-screen overflow-hidden bg-[#07090b] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <motion.div style={{ y: glowY }} className="pointer-events-none fixed left-1/2 top-0 z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07090b]/76 px-4 py-3 backdrop-blur-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <Image src={assets("logo.jpg")} width={46} height={46} alt="Goats Restoration and Remodeling logo" className="h-11 w-11 rounded-full bg-white object-cover ring-1 ring-amber-200/30" />
            <span className="min-w-0">
              <strong className="block text-sm leading-none sm:text-base">Goats Restoration</strong>
              <small className="mt-1 block text-xs text-white/56">Roofing and remodeling in Waterbury</small>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-white/62 lg:flex">
            {["Services", "Work", "Reviews", "Estimate", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-amber-300">{item}</a>
            ))}
          </nav>
          <a href={phoneHref} aria-label="Call Goats Restoration and Remodeling">
            <Button asChild variant="brass" className="min-h-11 rounded-xl px-4 shadow-[0_0_28px_rgba(211,159,74,0.28)]">
              <span><Phone size={18} /><span className="hidden sm:inline">{phone}</span></span>
            </Button>
          </a>
        </div>
      </header>

      <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-8">
        <Image src={assets("hero-roof-remodel-highres.webp")} alt="" fill priority sizes="100vw" className="object-cover opacity-36" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(211,159,74,0.22),transparent_34%),linear-gradient(90deg,rgba(7,9,11,0.93)_0%,rgba(7,9,11,0.72)_44%,rgba(7,9,11,0.22)_100%),linear-gradient(180deg,rgba(7,9,11,0.18),#07090b_94%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.88fr]">
          <motion.div style={{ y: heroY }} className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase text-amber-200 backdrop-blur-xl">
              <ShieldCheck size={15} /> Waterbury roofing and remodeling
            </div>
            <h1 className="text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">Roofing, restoration and remodeling in Connecticut.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Roof replacement, repairs, kitchen and bathroom remodeling, tile work, siding, decks and additions from a Waterbury-based crew.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={phoneHref}><Button asChild variant="brass" className="rounded-xl"><span><Phone size={19} />Call {phone}</span></Button></a>
              <a href="#hero-enquiry"><Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16"><span><ArrowUpRight size={19} />Request estimate</span></Button></a>
            </div>
          </motion.div>
          <motion.aside
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative rounded-3xl border border-white/12 bg-white/[0.055] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            aria-label="Request an estimate"
          >
            <EstimateForm />
          </motion.aside>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-3">
        {[
          [6, "+", "years in business"],
          [4, "", "core project lanes"],
          [3, "", "customer comments"],
        ].map(([value, suffix, label]) => (
          <Card key={String(label)} className="rounded-2xl border-white/12 bg-white/[0.075] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <CardContent className="p-6">
              <strong className="block text-5xl font-black text-amber-300"><Counter value={Number(value)} suffix={String(suffix)} /></strong>
              <span className="mt-3 block text-sm font-bold text-white/58">{label}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase text-amber-300">Services</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Exterior protection and interior remodeling under one crew.</h2>
        </Reveal>
        <div className="services-grid mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} className="gsap-rise group min-h-[310px] rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl" whileHover={{ y: -10, rotateX: 3, rotateY: -3, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
                <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/10 text-amber-300 transition group-hover:bg-amber-300 group-hover:text-black">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{service.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="estimate" className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <ProjectSelector />
      </section>

      <section id="proof" className="why-section relative bg-white/[0.035] px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <Reveal>
            <p className="mb-3 text-xs font-black uppercase text-amber-300">Why call</p>
            <h2 className="text-4xl font-black leading-none sm:text-6xl">A practical contractor for roof and remodel jobs.</h2>
          </Reveal>
          <div className="space-y-5">
            {proofPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-black/22 p-5 backdrop-blur-xl">
                  <div className="proof-line mb-4 h-px w-full bg-gradient-to-r from-amber-300 to-sky-300" />
                  <p className="m-0 flex gap-3 text-lg font-black text-white/86"><BadgeCheck className="shrink-0 text-amber-300" />{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="gallery-stage overflow-hidden bg-[#030506] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <p className="mb-3 text-xs font-black uppercase text-amber-300">Roof work</p>
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">Roof work that shows the finished exterior clearly.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">Project views show roof shape, shingle finish and the full home context before the estimate call.</p>
          </Reveal>
        </div>
        <div className="gallery-track mt-12 flex w-[106rem] gap-4 px-4 sm:px-8">
          {gallery.map((item) => (
            <motion.figure key={item.src} className="relative h-[330px] w-[430px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:w-[520px]" whileHover={{ y: -10, scale: 1.018 }}>
              <Image src={assets(item.src)} alt={item.alt} fill sizes="520px" loading="eager" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-5 text-sm font-black">{item.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase text-amber-300">Customer words</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Short, real review snippets from public profiles.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.quote} className="rounded-2xl border-white/10 bg-white/[0.055] text-white backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-6 flex gap-1 text-amber-300" aria-label="5 star review snippet">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={17} fill="currentColor" />)}
                </div>
                <p className="text-lg italic leading-8 text-white/78">"{item.quote}"</p>
                <p className="mt-5 text-sm font-black text-white/74">{item.name}</p>
                <p className="mt-2 text-xs font-bold uppercase text-white/38">{item.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[0.72fr_1fr]">
        <Reveal>
          <p className="mb-3 text-xs font-black uppercase text-amber-300">FAQ</p>
          <h2 className="text-4xl font-black leading-none sm:text-6xl">Clear answers before the call.</h2>
        </Reveal>
        <div className="space-y-3">{faqs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}</div>
      </section>

      <section id="contact" className="relative px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <Card className="rounded-3xl border-white/10 bg-white/[0.075] text-white backdrop-blur-2xl">
            <CardContent className="p-7 lg:p-9">
              <p className="mb-3 text-xs font-black uppercase text-amber-300">Contact</p>
              <h2 className="text-4xl font-black leading-none">Call, email, or check the Waterbury location.</h2>
              <div className="mt-8 grid gap-4 text-sm font-bold text-white/68">
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-amber-300/40" href={phoneHref}>
                  <Phone className="shrink-0 text-amber-300" size={19} /> {phone}
                </a>
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-amber-300/40" href={`mailto:${emailAddress}`}>
                  <Mail className="shrink-0 text-amber-300" size={19} /> {emailAddress}
                </a>
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-amber-300/40" href={facebookUrl}>
                  <Facebook className="shrink-0 text-amber-300" size={19} /> Facebook profile
                </a>
                <a className="flex gap-3 rounded-xl border border-white/10 bg-black/24 p-4 transition hover:border-amber-300/40" href={mapsUrl}>
                  <MapPin className="shrink-0 text-amber-300" size={19} /> Directions to Middle Street
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={phoneHref}><Button asChild variant="brass" className="rounded-xl"><span><Phone size={18} />Call now</span></Button></a>
                <a href={`mailto:${emailAddress}`}><Button asChild variant="secondary" className="rounded-xl border-white/15 bg-white/10 text-white hover:bg-white/16"><span><Mail size={18} />Email Goats</span></Button></a>
              </div>
            </CardContent>
          </Card>
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#181c1e,#0b0d0f)] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="p-7 lg:p-9">
              <p className="mb-3 text-xs font-black uppercase text-amber-300">Waterbury base</p>
              <h3 className="max-w-2xl text-4xl font-black leading-none">{business}</h3>
              <div className="mt-7 grid gap-4 text-sm font-bold text-white/70">
                <span className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-4"><MapPin className="shrink-0 text-amber-300" size={19} />{address}</span>
                <span className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-4"><Sparkles className="shrink-0 text-amber-300" size={19} />Connecticut roofing, remodeling and exterior projects</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-black/24 p-3">
              {gallery.slice(0, 3).map((item) => (
                <div key={item.src} className="relative h-36 overflow-hidden rounded-xl bg-black/30 sm:h-48">
                  <Image src={assets(item.src)} alt={item.alt} fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover object-center" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-amber-300/20 bg-amber-300 p-8 text-black shadow-[0_30px_120px_rgba(211,159,74,0.24)] lg:p-12">
          <p className="mb-3 text-xs font-black uppercase">Roof, remodel, restore.</p>
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-4xl text-4xl font-black leading-none sm:text-6xl">Need roofing or remodeling priced clearly?</h2>
            <a href={phoneHref}><Button asChild className="rounded-xl bg-black text-white hover:bg-black/86"><span><Phone size={19} />Call {phone}</span></Button></a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-white/10 bg-white/[0.055] p-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="p-4">
            <p className="mb-3 text-xs font-black uppercase text-amber-300">Roofing contractor in Waterbury, CT</p>
            <h2 className="text-3xl font-black leading-tight">{business}, {address}</h2>
            <p className="mt-4 text-sm leading-7 text-white/64">Call {phone} for roof replacement, roof repairs, remodeling, restoration, tile, siding, decks and additions.</p>
          </div>
          <iframe title="Map to Goats Restoration and Remodeling LLC" src={`https://maps.google.com/maps?width=100%25&height=430&hl=en&q=${mapEmbedQuery}&t=&z=15&ie=UTF8&iwloc=B&output=embed`} width="100%" height="430" loading="lazy" className="min-h-[360px] rounded-2xl border-0" />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-4 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image src={assets("logo.jpg")} width={38} height={38} alt="" className="h-10 w-10 rounded-full bg-white object-cover" />
            <span>
              <strong className="block font-black">Goats Restoration</strong>
              <small className="text-white/48">Roofing and remodeling in Waterbury</small>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: phoneHref, label: "Call Goats Restoration and Remodeling", icon: <Phone size={19} /> },
              { href: facebookUrl, label: "Facebook", icon: <Facebook size={19} /> },
              { href: instagramUrl, label: "Instagram", icon: <Instagram size={19} /> },
              { href: thumbtackUrl, label: "Thumbtack", icon: <Wrench size={19} /> },
              { href: mapsUrl, label: "Google Maps directions", icon: <MapPin size={19} /> },
            ].map((link) => (
              <a key={link.label} aria-label={link.label} href={link.href} className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-white/82 transition hover:border-amber-300/45 hover:bg-amber-300 hover:text-black">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
