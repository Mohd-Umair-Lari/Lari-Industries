'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Factory, 
  Users, 
  Globe, 
  Sparkles, 
  Microscope, 
  Flame, 
  Check, 
  HeartHandshake,
  Layers,
  FlaskConical,
  Zap,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const FACTORY_PROFILE_IMAGES = [
  {
    src: '/static/images/Profile/1.jpeg',
    title: 'Raw Hide Selection & Tannery Processing',
    category: 'Tannery Operations',
    description: 'Carefully sorted buffalo and cowhide selected for tight grain fiber orientation before pit tanning.',
  },
  {
    src: '/static/images/Profile/2.jpeg',
    title: 'Hydraulic Press & Precision Clicking',
    category: 'Cutting Plant',
    description: 'High-tonnage hydraulic clicking presses cutting pattern dies with sub-millimeter precision.',
  },
  {
    src: '/static/images/Profile/3.jpeg',
    title: 'Heavy-Duty Split Leather Stamping',
    category: 'Fabrication',
    description: 'Splitting and skiving leather hides to exact uniform thicknesses (1.2mm to 1.8mm).',
  },
  {
    src: '/static/images/Profile/4.jpeg',
    title: 'Ergonomic Glove Pattern Assembly',
    category: 'Stitching Lines',
    description: 'Skilled artisans assembling winged and keystone thumb patterns for fatigue-free grip.',
  },
  {
    src: '/static/images/Profile/5.jpeg',
    title: 'Kevlar® Heat-Resistant Seam Stitching',
    category: 'Reinforcement',
    description: 'Double-needle lockstitch machines using fire-retardant DuPont™ Kevlar® bonded thread.',
  },
  {
    src: '/static/images/Profile/6.jpeg',
    title: 'In-House Gauge & Seam Inspection',
    category: 'Quality Control',
    description: 'Micrometer thickness calibration and welted seam pull tests conducted on every production batch.',
  },
  {
    src: '/static/images/Profile/7.jpeg',
    title: 'Hand-Burnishing & Finishing Department',
    category: 'Artisanal Finishing',
    description: 'Hand-beveled and burnished leather edges treated with natural organic waxes and tallow.',
  },
  {
    src: '/static/images/Profile/8.jpeg',
    title: 'Industrial Apron & Coverall Lines',
    category: 'Garment Division',
    description: 'Assembly of heavy welder aprons, dangri suits, and lab coats with reinforced brass hardware.',
  },
  {
    src: '/static/images/Profile/9.jpeg',
    title: 'Tensile & Tear Stress Testing Station',
    category: 'Lab Pre-Testing',
    description: 'Internal testing machines checking seam rupture and tensile strength before external NABL audits.',
  },
  {
    src: '/static/images/Profile/10.jpeg',
    title: 'Export Packaging & Barcoding Facility',
    category: 'Logistics',
    description: 'Vacuum packaging and palletization ready for containerized air and ocean freight.',
  },
  {
    src: '/static/images/Profile/11.jpeg',
    title: 'Master Warehouse & Dispatches',
    category: 'Logistics Hub',
    description: 'Climate-controlled Kanpur warehousing maintaining inventory ready for rapid international dispatch.',
  },
];

export default function AboutPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % FACTORY_PROFILE_IMAGES.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + FACTORY_PROFILE_IMAGES.length) % FACTORY_PROFILE_IMAGES.length);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>ESTD: 2005 • KANPUR, INDIA</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 tracking-tight">
            About Lari Industries
          </h1>
          <p className="text-lg sm:text-xl font-serif text-brand-600 font-bold">
            &ldquo;THINK SAFETY BEFORE YOU START&rdquo;
          </p>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            <strong className="text-stone-900 font-semibold">Lari Industries</strong> stands as a benchmark of excellence in industrial safety equipment and high-performance leather personal protective equipment (PPE). Since 2005, we have combined generational Kanpur tanning mastery with modern engineering to protect workforce personnel across heavy industries globally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-brand-600 font-serif block mb-1">
              20+
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Years of Excellence
            </span>
            <p className="text-xs text-stone-500 mt-2">Continuous manufacturing legacy since 2005.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-stone-900 font-serif block mb-1">
              1,000+
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Industries Served
            </span>
            <p className="text-xs text-stone-500 mt-2">Fabrication, foundries, construction, & mining.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 font-serif block mb-1">
              100%
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Quality Assurance
            </span>
            <p className="text-xs text-stone-500 mt-2">Verified by NABL labs, EN 388, EN 407 & ISO 9001.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-sm space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5 text-brand-600" />
                <span>End-to-End Vertical Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
                In-House Manufacturing & Latest Production Technology
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                At Lari Industries, we operate a fully integrated, modern manufacturing plant in Kanpur. By retaining total in-house command over every stage — from raw hide selection and specialized pit tanning to computerized hydraulic clicking, Kevlar seam bonding, and multi-stage testing — we eliminate third-party quality discrepancies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <SlidersHorizontal className="w-5 h-5 text-brand-600 mb-2" />
                  <h4 className="font-bold text-stone-900 text-sm">Automated Precision Cutting</h4>
                  <p className="text-xs text-stone-500 mt-1">High-pressure hydraulic clicking presses ensure clean die tolerances on all glove palms and apron chest shields.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <Zap className="w-5 h-5 text-amber-600 mb-2" />
                  <h4 className="font-bold text-stone-900 text-sm">DuPont™ Kevlar® Stitching</h4>
                  <p className="text-xs text-stone-500 mt-1">Double-lockstitched seams with virgin para-aramid thread that will not melt, burn, or unravel under molten spark showers.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
                <Image
                  src={FACTORY_PROFILE_IMAGES[1].src}
                  alt="In-house machinery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400">Plant Technology</span>
                  <p className="text-sm font-bold">Heavy-Duty Precision Hydraulic Pressing Line</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">
                  Inside Our Factory
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                  Manufacturing Facility Photo Tour
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevImage}
                  aria-label="Previous photo"
                  className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-stone-500 px-2">
                  {activeImageIndex + 1} / {FACTORY_PROFILE_IMAGES.length}
                </span>
                <button
                  onClick={nextImage}
                  aria-label="Next photo"
                  className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-2xl">
              <Image
                src={FACTORY_PROFILE_IMAGES[activeImageIndex].src}
                alt={FACTORY_PROFILE_IMAGES[activeImageIndex].title}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black uppercase tracking-wider">
                  {FACTORY_PROFILE_IMAGES[activeImageIndex].category}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white pt-1">
                  {FACTORY_PROFILE_IMAGES[activeImageIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  {FACTORY_PROFILE_IMAGES[activeImageIndex].description}
                </p>
              </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-6 lg:grid-cols-11 gap-2 pt-2 pb-1">
              {FACTORY_PROFILE_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-auto sm:h-auto aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-500 scale-105 shadow-md ring-2 ring-brand-300'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-rose-50/20 to-amber-50/30 rounded-3xl p-8 sm:p-14 border border-rose-100 shadow-glass space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
              <span>Dermatologically Safe • Worker Health Priority</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 leading-tight">
              Self Hand-Tanned Leather: 100% AZO-Free & PCP-Free
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Worker safety begins against the skin. Prolonged shifts in high-temperature environments cause sweat and pore dilation, making cheap, chemically adulterated leathers dangerous to human health. At Lari Industries, all leathers are hand-tanned in-house following stringent hypoallergenic green chemistry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                100% AZO-Free Formulations
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Formulated strictly without hazardous synthetic azo dyes or restricted aromatic amines. Certified to eliminate risks of skin sensitization, occupational rashes, and toxic leaching into the bloodstream.
              </p>
              <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Carcinogenic Amines</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                PCP-Free Preservation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zero Pentachlorophenol (PCP) or banned organochlorine biocides. We use natural organic vegetable tannins and eco-compatible anti-mildew solutions that respect skin biocompatibility and environmental safety.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Pentachlorophenol &lt; 0.5 ppm</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Optimal Skin pH Balance (3.5 - 4.5)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our artisanal tanning drums carefully neutralize acidity to preserve the human skin’s natural lipid mantle. Even during 10-hour continuous shifts in steel mills, workers experience zero abrasive dermatitis or irritation.
              </p>
              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Chromium-VI &lt; 3 mg/kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-14 border border-stone-800 shadow-2xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-bold uppercase tracking-wider">
                <Microscope className="w-3.5 h-3.5" />
                <span>Certified National & International Verification</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
                Regularly Tested & Verified by NABL-Accredited Laboratories
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                To guarantee absolute compliance with international occupational safety mandates, every production lot of Lari Industries PPE undergoes recurring batch testing at independent <strong>NABL-accredited (National Accreditation Board for Testing and Calibration Laboratories)</strong> test facilities.
              </p>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Testing protocols strictly follow ISO/IEC 17025 standards, validating structural integrity, flame-resistance, and chemical safety before any product is packed for export.
              </p>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="inline-block p-6 rounded-3xl bg-stone-800/80 border border-stone-700 text-center space-y-2">
                <Award className="w-12 h-12 text-amberGold-400 mx-auto" />
                <p className="font-serif font-bold text-xl text-white">NABL Certified</p>
                <p className="text-[11px] text-stone-400 uppercase tracking-widest">ISO/IEC 17025 Test Standards</p>
                <div className="pt-2">
                  <Link 
                    href="/static/docs/lari_industries_certificate.pdf" 
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-bold underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official PDF</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-stone-800">
            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
              <div className="text-brand-400 font-bold text-xs uppercase tracking-wider">EN 388:2016</div>
              <h4 className="font-bold text-white text-base">Mechanical Risks</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Martindale abrasion test up to 8,000 cycles, circular blade cut index, tear strength &gt; 75N, and puncture needle defense.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
              <div className="text-amberGold-400 font-bold text-xs uppercase tracking-wider">EN 407:2020</div>
              <h4 className="font-bold text-white text-base">Thermal & Flame Hazards</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Contact heat resistance up to 500°C for 15+ seconds, radiant heat index, and molten metal splash droplet resistance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">EN ISO 11611</div>
              <h4 className="font-bold text-white text-base">Welding Shield Class 2</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Complete flame-spread containment, slag bounce deflection, and electrical resistance testing for heavy arc welders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">REACH Compliance</div>
              <h4 className="font-bold text-white text-base">Chemical Safety</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Strict testing for Chromium VI, formaldehydes, extractable heavy metals, and organotin compounds.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Factory className="w-8 h-8 text-brand-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Modern Infrastructure</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              State-of-the-art cutting, hydraulic press embossing, and Kevlar stitching facilities located in Chandra Nagar, Kanpur.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Users className="w-8 h-8 text-amberGold-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Master Craftsmen</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Skilled artisans with generational tanning and leathercraft knowledge ensuring flawless seam strength and comfort.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Worldwide Export</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Reliable container load and air cargo shipping globally with direct pricing in US Dollars ($).
            </p>
          </div>
        </div>

        <div className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight">
            Schedule a Direct Consultation with Our Safety Engineers
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you require standard stock or custom manufactured leather aprons and gloves, our Kanpur headquarters is ready to assist.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-stone-700 text-white hover:border-brand-500">
                <span>Browse Products (USD)</span>
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
