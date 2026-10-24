'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Award, 
  Globe2, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Building2, 
  Layers, 
  Music, 
  BookOpen, 
  Scissors, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MediaItem {
  id: string;
  type: 'video' | 'image';
  title: string;
  subtitle: string;
  src: string;
  poster?: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'vid-1',
    type: 'video',
    title: 'Tannery Bleaching & Lime Processing',
    subtitle: 'Direct drum & paddle processing from raw hides to bleached state',
    src: '/static/images/rawhides/tannery-video-1.mp4',
    poster: '/static/images/rawhides/parchment-sheet-1.jpeg',
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Beamhouse Fleshing & Preparation',
    subtitle: 'Scraping and uniform grain leveling for 0.70 - 1.00mm parchment',
    src: '/static/images/rawhides/tannery-video-2.mp4',
    poster: '/static/images/rawhides/parchment-sheet-2.jpeg',
  },
  {
    id: 'vid-3',
    type: 'video',
    title: 'Parchment Tacking & Natural Tension Drying',
    subtitle: 'Precision stretching on wooden decks ensuring flat 6+ sq. ft. yield',
    src: '/static/images/rawhides/tannery-video-3.mp4',
    poster: '/static/images/rawhides/parchment-sheet-1.jpeg',
  },
  {
    id: 'vid-4',
    type: 'video',
    title: 'Parchment Inspection & Thickness Gauge',
    subtitle: 'Micrometer testing of buff calf & goat parchment sheets',
    src: '/static/images/rawhides/tannery-video-4.mp4',
    poster: '/static/images/rawhides/parchment-sheet-2.jpeg',
  },
  {
    id: 'vid-5',
    type: 'video',
    title: 'Export Packing for European Consignments',
    subtitle: 'Desiccated climate packing for Germany & continental Europe',
    src: '/static/images/rawhides/tannery-video-5.mp4',
    poster: '/static/images/rawhides/parchment-sheet-1.jpeg',
  },
  {
    id: 'img-1',
    type: 'image',
    title: 'Stretched Bleached Skins on Drying Decks',
    subtitle: 'Traditional Kanpur sun & frame tension cure',
    src: '/static/images/rawhides/parchment-sheet-1.jpeg',
  },
  {
    id: 'img-2',
    type: 'image',
    title: 'Full 6+ Sq. Ft. Translucent Whole Hide',
    subtitle: 'Pristine surface ready for bookbinders & drumheads',
    src: '/static/images/rawhides/parchment-sheet-2.jpeg',
  },
];

const USE_CASES = [
  {
    icon: Music,
    title: 'Musical Drum Heads',
    desc: 'High acoustic resonance & uniform tension for bodhráns, bongos, congas, djembes & banjos.',
  },
  {
    icon: BookOpen,
    title: 'Archival Bookbinding & Vellum',
    desc: 'Pure bleached vellum skins for luxury hand-binding, antique restoration & illuminated folios.',
  },
  {
    icon: Layers,
    title: 'Bespoke Stationery & Diplomas',
    desc: 'Ink-receptive pounced parchment surfaces for diplomatic scrolls, certificates & calligraphy.',
  },
  {
    icon: Scissors,
    title: 'Lace Making & Fine Crafts',
    desc: 'High tensile strength buff calf rawhide for durable leather lacing, braided saddlery & crafts.',
  },
];

export const ExclusiveRawHidesSection = () => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeMedia = MEDIA_ITEMS[activeMediaIndex];

  const handleSelectMedia = (index: number) => {
    setActiveMediaIndex(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="raw-hides-showcase" className="relative py-24 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-brand-500/20 to-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Exclusive Export Division • Direct Tanning Facility</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white uppercase">
            Kanpur Bleached Raw Hides & Parchment
          </h2>

          <p className="text-base sm:text-xl text-stone-300 font-light max-w-3xl mx-auto leading-relaxed">
            Supplying premium goat & buff calf parchment to <strong className="text-amber-300 font-semibold">Germany & Continental Europe</strong> for over 10 years.
          </p>
        </div>

        {/* Tannery Executive Performa Card */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-stone-800/90 via-stone-900/90 to-stone-950/90 border border-amber-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  In-House Tannery in Kanpur, India
                </span>
                <span className="px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  10+ Years Exporting to German Market
                </span>
                <span className="px-3 py-1 rounded-md bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Whole Skins 6+ Sq. Ft.
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl text-stone-200 font-serif italic leading-relaxed border-l-4 border-amber-400 pl-6 py-1">
                &ldquo;Operating our own dedicated tanning facility in Kanpur, India, we process and tan directly from raw hides and skins to a pristine bleached level for both goat and buffalo calf. Our goat and calf parchment (0.70 mm &ndash; 1.00 mm calibrated thickness, averaging 6+ sq. ft. per skin) is supplied as whole hides for all types of master craft making, book binding, luxury stationery, lace making, and acoustic musical drum heads. We have been continuously supplying top-tier craftsmen in the German market and throughout continental Europe for more than a decade.&rdquo;
              </blockquote>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <p className="text-amber-400 text-xl font-bold font-serif">0.7 - 1.0 mm</p>
                  <p className="text-[11px] text-stone-400 font-medium">Calibrated Gauge</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <p className="text-amber-400 text-xl font-bold font-serif">6+ Sq. Ft.</p>
                  <p className="text-[11px] text-stone-400 font-medium">Avg. Area Per Skin</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <p className="text-amber-400 text-xl font-bold font-serif">Goat & Calf</p>
                  <p className="text-[11px] text-stone-400 font-medium">Pure Bleached Tanning</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/60">
                  <p className="text-amber-400 text-xl font-bold font-serif">10+ Years</p>
                  <p className="text-[11px] text-stone-400 font-medium">German & EU Export</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-stone-800/80 to-stone-900 border border-amber-500/20 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white">Direct Factory Dispatch</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Air cargo or sea freight containers dispatched directly from our Kanpur tanneries to your workshop or port worldwide.
                </p>
              </div>
              <div className="w-full pt-2 space-y-2">
                <Link href="/products?category=Raw%20Hides" className="block w-full">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black shadow-lg shadow-amber-500/30">
                    <span>Shop Parchment Catalog (USD)</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/contact" className="block w-full">
                  <Button variant="outline" className="w-full border-stone-600 text-stone-200 hover:bg-stone-800 text-xs">
                    <span>Request Wholesale Sample / Performa</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Media Showcase: Videos & Photos */}
        <div className="mb-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Authentic Video & Photo Proof
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white">
                Inside Our Kanpur Tanning Facility
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md">
              Watch real footage of raw hides undergoing bleaching, beamhouse fleshing, tension stretching on drying boards, and export inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Media Display */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl relative">
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                {activeMedia.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={activeMedia.src}
                      poster={activeMedia.poster}
                      playsInline
                      muted={isMuted}
                      onEnded={() => setIsPlaying(false)}
                      className="w-full h-full object-contain bg-black"
                    />

                    {/* Custom Video Controls Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between z-20">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                          className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                        >
                          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                        </button>
                        <button
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                          className="w-10 h-10 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white flex items-center justify-center border border-white/20"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <div className="hidden sm:block">
                          <p className="text-xs font-bold text-white">{activeMedia.title}</p>
                          <p className="text-[11px] text-stone-300">{activeMedia.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-amber-500/30 text-amber-300 border border-amber-400/30">
                          HD Tannery Video
                        </span>
                      </div>
                    </div>

                    {!isPlaying && (
                      <div 
                        onClick={togglePlay}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/20 cursor-pointer transition-colors z-10"
                      >
                        <div className="w-20 h-20 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                          <Play className="w-8 h-8 ml-1 fill-current" />
                        </div>
                        <p className="text-xs font-bold text-white mt-3 bg-stone-900/80 px-4 py-1.5 rounded-full border border-stone-700">
                          Click to Play Tannery Footage
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={activeMedia.src}
                      alt={activeMedia.title}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                      <p className="text-sm font-bold text-white">{activeMedia.title}</p>
                      <p className="text-xs text-stone-300">{activeMedia.subtitle}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Media Selector Playlist */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Select Footage & High-Res Photos ({MEDIA_ITEMS.length})
              </p>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {MEDIA_ITEMS.map((item, index) => {
                  const isSelected = index === activeMediaIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectMedia(index)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3.5 ${
                        isSelected 
                          ? 'bg-amber-500/20 border-amber-400/60 shadow-md ring-1 ring-amber-400/30' 
                          : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-850'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-stone-950 flex-shrink-0 border border-stone-700/60">
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-stone-800 relative">
                            {item.poster && (
                              <Image src={item.poster} alt={item.title} fill className="object-cover opacity-60" />
                            )}
                            <Play className="w-4 h-4 text-amber-400 fill-current relative z-10" />
                          </div>
                        ) : (
                          <Image src={item.src} alt={item.title} fill className="object-cover" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            item.type === 'video' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {item.type}
                          </span>
                          <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{item.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Professional Use Case Columns */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Versatile Applications
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Supplied for European Craftsmen & Artisans
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((uc, i) => (
              <div 
                key={i}
                className="p-6 rounded-3xl bg-stone-900/70 border border-stone-800/80 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                    <uc.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">{uc.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{uc.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center text-[11px] font-bold text-amber-300">
                  <span>Export Grade A+ Whole Hides</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Export Products Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Direct Tannery Catalog
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white">
                Available Whole Hides & Parchment Cuts
              </h3>
            </div>
            <Link
              href="/products?category=Raw%20Hides"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 hover:underline"
            >
              <span>View All Raw Hide Products in USD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Product 1 */}
            <div className="rounded-3xl bg-stone-900 border border-amber-500/40 hover:border-amber-400 p-5 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-950 mb-4 border border-stone-800">
                  <Image 
                    src="/static/images/rawhides/parchment-sheet-1.jpeg" 
                    alt="Bleached Goat Skin Parchment"
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                    Bestseller
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white hover:text-amber-300 transition-colors">
                  Bleached Goat Skin Parchment
                </h4>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  0.70 &ndash; 1.00 mm thickness, avg size 6+ sq.ft. Pristine bleached whole skins.
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold font-serif text-amber-400">$18.50</span>
                  <span className="text-xs text-stone-400">/ full hide</span>
                  <span className="text-xs text-stone-500 line-through">$24.00</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800">
                <Link href="/products/bleached-goat-skin-parchment" className="block w-full">
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold">
                    <span>Order Hide (USD)</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product 2 */}
            <div className="rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-400/60 p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-950 mb-4 border border-stone-800">
                  <Image 
                    src="/static/images/rawhides/parchment-sheet-2.jpeg" 
                    alt="Buff Calf Rawhide Parchment"
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                    Heavy Grade
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white hover:text-amber-300 transition-colors">
                  Buff Calf Rawhide Parchment
                </h4>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  0.80 &ndash; 1.00 mm calibrated rawhide for drum heads, saddlery lacing & crafts.
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold font-serif text-amber-400">$22.00</span>
                  <span className="text-xs text-stone-400">/ full hide</span>
                  <span className="text-xs text-stone-500 line-through">$28.50</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800">
                <Link href="/products/buff-calf-rawhide-parchment" className="block w-full">
                  <Button variant="outline" className="w-full border-stone-700 text-stone-200 hover:bg-stone-800 text-xs font-bold">
                    <span>Order Hide (USD)</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product 3 */}
            <div className="rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-400/60 p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-950 mb-4 border border-stone-800">
                  <Image 
                    src="/static/images/rawhides/parchment-sheet-1.jpeg" 
                    alt="Acoustic Drum Head Skins"
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                    Musical Grade
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white hover:text-amber-300 transition-colors">
                  Acoustic Musical Drumhead Skins
                </h4>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  Acoustically tuned bleached skins for bongos, congas, djembes & banjos.
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold font-serif text-amber-400">$16.50</span>
                  <span className="text-xs text-stone-400">/ skin</span>
                  <span className="text-xs text-stone-500 line-through">$21.00</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800">
                <Link href="/products/acoustic-drum-head-rawhides" className="block w-full">
                  <Button variant="outline" className="w-full border-stone-700 text-stone-200 hover:bg-stone-800 text-xs font-bold">
                    <span>Order Skin (USD)</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product 4 */}
            <div className="rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-400/60 p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-950 mb-4 border border-stone-800">
                  <Image 
                    src="/static/images/rawhides/parchment-sheet-2.jpeg" 
                    alt="Archival Bookbinding Vellum"
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                    Archival Vellum
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white hover:text-amber-300 transition-colors">
                  Archival Bookbinding Vellum
                </h4>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  Acid-neutral velvety parchment for fine manuscript restoration & luxury stationery.
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold font-serif text-amber-400">$24.00</span>
                  <span className="text-xs text-stone-400">/ full hide</span>
                  <span className="text-xs text-stone-500 line-through">$31.00</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800">
                <Link href="/products/archival-bookbinding-vellum-parchment" className="block w-full">
                  <Button variant="outline" className="w-full border-stone-700 text-stone-200 hover:bg-stone-800 text-xs font-bold">
                    <span>Order Vellum (USD)</span>
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
