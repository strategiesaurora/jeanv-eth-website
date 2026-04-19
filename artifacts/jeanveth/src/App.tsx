import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import createGlobe from "cobe";
import { 
  Menu, X, Building2, MapPin, Coins, Shield, 
  Calculator, CheckCircle2, ChevronRight, Lock, 
  Globe2, UserCheck, CheckSquare, ArrowRight, Quote,
  BadgeCheck, Copy, Check
} from "lucide-react";
import cryptoPunk from "@assets/regular_1776549681584.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4,
      gold: Math.random() < 0.28,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,164,76,${p.opacity})`
          : `rgba(0,212,255,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

/**
 * AnimatedNumber — counts from 0 to target value once it scrolls into view.
 * Uses ease-out cubic for organic deceleration. Triggered once, never re-runs.
 */
function AnimatedNumber({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);
  const startedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honor reduced-motion preference: jump straight to final value
    const prefersReduced = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.unobserve(node);
          if (prefersReduced) {
            setDisplayed(value);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.round(value * eased));
            if (progress < 1) {
              rafIdRef.current = requestAnimationFrame(tick);
            } else {
              rafIdRef.current = null;
            }
          };
          rafIdRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

/**
 * CryptoPunkPortrait — hero portrait with mouse-tracked 3D parallax tilt
 * and ornamental gold corner brackets (Swiss watch frame aesthetic).
 */
function CryptoPunkPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-center lg:justify-end"
    >
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative w-72 h-72 md:w-80 md:h-80 group cursor-pointer"
        style={{ perspective: "1200px" }}
      >
        {/* Tilting inner wrapper */}
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg) translateZ(0)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Pulsating ambient cyan halo */}
          <div className="absolute -inset-10 rounded-full bg-primary/22 animate-crypto-pulse pointer-events-none" />
          {/* Pulsating gold halo (offset phase) */}
          <div
            className="absolute -inset-6 rounded-full pointer-events-none animate-crypto-pulse"
            style={{
              background: "radial-gradient(circle, rgba(201,164,76,0.14) 0%, transparent 70%)",
              animationDelay: "-2.5s",
            }}
          />
          {/* Sharp inner glow */}
          <div className="absolute -inset-1 rounded-lg bg-primary/10 blur-[20px] opacity-70 group-hover:opacity-100 group-hover:blur-[30px] transition-all duration-500" />
          {/* Animated cyan border */}
          <div className="absolute inset-0 rounded-lg border-2 border-primary/55 group-hover:border-primary group-hover:shadow-[0_0_70px_rgba(0,212,255,0.6),inset_0_0_30px_rgba(0,212,255,0.1)] transition-all duration-500" />

          {/* CryptoPunk image */}
          <img
            src={cryptoPunk}
            alt="Jean V. Rak – jeanv.eth CryptoPunk"
            className="w-full h-full object-cover rounded-lg relative z-10 group-hover:brightness-110 transition-all duration-500"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Ornamental gold corner brackets — Swiss watch frame */}
          <div className="absolute -top-3 -left-3 w-7 h-7 z-20 pointer-events-none"
            style={{ borderTop: "2px solid #c9a44c", borderLeft: "2px solid #c9a44c" }} />
          <div className="absolute -top-3 -right-3 w-7 h-7 z-20 pointer-events-none"
            style={{ borderTop: "2px solid #c9a44c", borderRight: "2px solid #c9a44c" }} />
          <div className="absolute -bottom-3 -left-3 w-7 h-7 z-20 pointer-events-none"
            style={{ borderBottom: "2px solid #c9a44c", borderLeft: "2px solid #c9a44c" }} />
          <div className="absolute -bottom-3 -right-3 w-7 h-7 z-20 pointer-events-none"
            style={{ borderBottom: "2px solid #c9a44c", borderRight: "2px solid #c9a44c" }} />
        </div>

        {/* Floating ENS label outside parallax */}
        <div className="absolute -bottom-10 left-0 right-0 text-center text-xs tracking-[0.3em] text-primary/70 uppercase font-medium group-hover:text-primary transition-colors">
          jeanv.eth
        </div>
      </div>
    </motion.div>
  );
}

/**
 * VerifiedHandle — affiche un identifiant Web3 (ex: "jeanv.eth") avec un badge
 * de vérification cyan luminescent. Visuellement traité comme une identité
 * blockchain officielle (à la Twitter Verified, mais en cyan premium).
 */
function VerifiedHandle({
  text = "jeanv.eth",
  size = "md",
  underline = true,
  className = "",
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
  underline?: boolean;
  className?: string;
}) {
  const iconSize = size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <span className={`inline-flex items-center gap-1.5 align-baseline ${className}`}>
      <span
        className={underline ? "relative" : ""}
        style={
          underline
            ? {
                backgroundImage:
                  "linear-gradient(transparent calc(100% - 2px), hsl(var(--primary) / 0.55) calc(100% - 2px))",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }
            : undefined
        }
      >
        {text}
      </span>
      <BadgeCheck
        size={iconSize}
        className="text-primary flex-shrink-0 drop-shadow-[0_0_6px_rgba(0,212,255,0.7)]"
        aria-label="Identité Web3 vérifiée"
      />
    </span>
  );
}

/**
 * NostrIcon — logo officiel stylisé Nostr (lettre N avec arc).
 * Conserve la silhouette reconnaissable du protocole décentralisé.
 */
function NostrIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cercle extérieur */}
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
      {/* Lettre N stylisée + arc Nostr */}
      <path
        d="M8.2 16.5V8.2c0-.4.4-.7.8-.5l5.6 4c.5.4.5 1.2 0 1.6l-3.2 2.3c-.4.3-.4.9 0 1.2l1.4 1c.4.3.9.3 1.3 0l1.7-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Point identité */}
      <circle cx="16.5" cy="9" r="0.9" fill="currentColor" />
    </svg>
  );
}

/**
 * BlockchainGlobe — globe 3D interactif (cobe) avec marqueurs cyan
 * pour chaque juridiction opérée. Auto-rotation + drag pointeur.
 * La même librairie que Linear, Vercel, Stripe utilisent pour leurs globes.
 */
const JURISDICTION_MARKERS: Array<{ name: string; location: [number, number]; size: number; premium?: boolean }> = [
  { name: "Suisse",            location: [46.20, 6.14],     size: 0.09, premium: true },
  { name: "Dubaï · UAE",       location: [25.20, 55.27],    size: 0.11, premium: true },
  { name: "Singapour",         location: [1.35, 103.82],    size: 0.10, premium: true },
  { name: "Luxembourg",        location: [49.61, 6.13],     size: 0.07 },
  { name: "Cayman Islands",    location: [19.31, -81.25],   size: 0.08 },
  { name: "BVI",               location: [18.42, -64.62],   size: 0.07 },
  { name: "Hong Kong",         location: [22.30, 114.17],   size: 0.09 },
  { name: "Estonie",           location: [59.44, 24.75],    size: 0.07 },
  { name: "Delaware · USA",    location: [39.16, -75.52],   size: 0.08 },
  { name: "Malte",             location: [35.90, 14.51],    size: 0.06 },
  { name: "Liechtenstein",     location: [47.14, 9.52],     size: 0.06 },
  { name: "Panama",            location: [8.97, -79.53],    size: 0.07 },
  { name: "Île Maurice",       location: [-20.35, 57.55],   size: 0.07 },
  { name: "Seychelles",        location: [-4.62, 55.45],    size: 0.06 },
  { name: "Wyoming · USA",     location: [42.96, -107.30],  size: 0.07 },
  { name: "Marshall Islands",  location: [7.13, 171.18],    size: 0.06 },
];

function BlockchainGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.offsetWidth;
    const onResize = () => {
      if (canvas) width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const prefersReduced = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 5.5,
      // Tons sombres bleutés pour matcher le bg du site
      baseColor: [0.08, 0.13, 0.20],
      // Cyan signature (#00d4ff)
      markerColor: [0, 0.83, 1],
      // Glow cyan profond derrière le globe
      glowColor: [0.0, 0.32, 0.55],
      markers: JURISDICTION_MARKERS.map(m => ({ location: m.location, size: m.size })),
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null && !prefersReduced) {
          phiRef.current += 0.0028;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as Parameters<typeof createGlobe>[1]);

    // Fade-in après que le globe a rendu son premier frame
    const fadeTimer = setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 80);

    return () => {
      clearTimeout(fadeTimer);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[560px] mx-auto" style={{ aspectRatio: "1 / 1" }}>
      {/* Halo cyan profond derrière le globe */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.06) 35%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Halo doré subtil en bas (impression de socle/ancrage) */}
      <div
        className="absolute -inset-x-8 -bottom-4 h-32 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(201,164,76,0.08) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1.2s ease",
        }}
      />
    </div>
  );
}

/**
 * AtmosphereDepth — couche de gradients radiaux fixés en viewport
 * pour casser la transition abrupte bleu→noir entre les sections.
 * Fixed position + z-0 (au-dessus du fond noir, sous les particules).
 */
function AtmosphereDepth() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        background: [
          // Voile cyan en haut-gauche (ancrage hero)
          "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(0,212,255,0.10) 0%, transparent 60%)",
          // Voile cyan profond à droite (équilibre)
          "radial-gradient(ellipse 50% 50% at 100% 35%, rgba(0,140,200,0.08) 0%, transparent 55%)",
          // Voile doré au milieu (chaleur premium)
          "radial-gradient(ellipse 70% 30% at 50% 55%, rgba(201,164,76,0.04) 0%, transparent 65%)",
          // Voile cyan en bas (continuité)
          "radial-gradient(ellipse 80% 50% at 30% 100%, rgba(0,180,230,0.07) 0%, transparent 60%)",
          // Voile doré bas-droite
          "radial-gradient(ellipse 50% 40% at 85% 95%, rgba(201,164,76,0.05) 0%, transparent 55%)",
        ].join(", "),
      }}
    />
  );
}

/**
 * NostrContactCard — carte premium pour identifiant Nostr.
 * Au clic, copie l'identifiant `_@jeanv.eth` dans le presse-papier
 * et affiche un feedback "Copié !" pendant 2 secondes.
 * (Pas de lien externe car nécessite un client Nostr installé localement.)
 */
function NostrContactCard() {
  const NOSTR_ID = "_@jeanv.eth";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(NOSTR_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencieux : on tente prompt() pour les navigateurs sans clipboard API
      window.prompt("Copiez l'identifiant Nostr :", NOSTR_ID);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copier l'identifiant Nostr ${NOSTR_ID}`}
      className="group relative block w-full text-left rounded-xl p-4 overflow-hidden transition-all duration-400 cursor-pointer"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,164,76,0.06) 0%, rgba(0,212,255,0.04) 100%)",
        border: "1px solid rgba(201,164,76,0.25)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset, 0 4px 20px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,164,76,0.5)";
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(0,0,0,0.4) inset, 0 4px 30px rgba(201,164,76,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,164,76,0.25)";
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(0,0,0,0.4) inset, 0 4px 20px rgba(0,0,0,0.25)";
      }}
    >
      {/* Halo doré subtil au survol */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,76,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icône Nostr dans son médaillon */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,164,76,0.18) 0%, rgba(201,164,76,0.06) 100%)",
            border: "1px solid rgba(201,164,76,0.4)",
            color: "#c9a44c",
          }}
        >
          <NostrIcon size={22} />
        </div>

        <div className="flex-grow min-w-0">
          {/* En-tête + badge NIP-05 */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-white text-sm">
              Me contacter via Nostr
            </span>
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.4)",
                color: "hsl(var(--primary))",
              }}
            >
              <BadgeCheck size={10} />
              NIP-05
            </span>
          </div>

          {/* Identifiant + bouton copier dynamique */}
          <div className="flex items-center justify-between gap-2">
            <code
              className="text-xs font-mono tracking-tight truncate"
              style={{ color: "rgba(201,164,76,0.85)" }}
            >
              {NOSTR_ID}
            </code>
            <span
              className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                copied
                  ? "bg-primary/15 text-primary border border-primary/40"
                  : "bg-white/[0.04] text-muted-foreground/70 border border-white/10 group-hover:text-gold group-hover:border-gold/40"
              }`}
              style={copied ? { boxShadow: "0 0 12px rgba(0,212,255,0.4)" } : undefined}
            >
              {copied ? (
                <>
                  <Check size={10} strokeWidth={3} />
                  Copié
                </>
              ) : (
                <>
                  <Copy size={10} />
                  Copier
                </>
              )}
            </span>
          </div>

          {/* Mention sécurité */}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-muted-foreground/60">
            <Lock size={9} />
            <span>Chiffré · Décentralisé · Sans serveur</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let prevY = window.scrollY;
    const handleScroll = () => {
      const curr = window.scrollY;
      setIsScrolled(curr > 20);
      if (curr < 80) {
        setHeaderVisible(true);
      } else if (curr > prevY + 8) {
        setHeaderVisible(false);
      } else if (curr < prevY - 6) {
        setHeaderVisible(true);
      }
      prevY = curr;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Accueil", id: "hero" },
    { label: "Services", id: "services" },
    { label: "Apporteurs", id: "apporteurs" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AtmosphereDepth />
      <ParticleBackground />
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Header — Smart Sticky: hides on scroll-down, reveals on scroll-up */}
      <header 
        className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled 
            ? "bg-black/55 backdrop-blur-2xl border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3" 
            : "bg-transparent border-transparent py-5"
        } ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo("hero")}
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-md border border-primary/40 group-hover:border-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(0,212,255,0.6)] flex-shrink-0">
              <img src={cryptoPunk} alt="jeanv.eth" className="w-full h-full object-cover" style={{ imageRendering: "pixelated" }} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-primary tracking-tight group-hover:text-glow transition-all">jeanv.eth</span>
              <span className="text-[10px] text-muted-foreground/60 tracking-[0.15em] uppercase font-medium">Corporate Service Provider</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full glass-panel bg-black/90 py-4 flex flex-col px-6 gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-medium text-foreground py-2 border-b border-border/30 last:border-0"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        {/* Animated grid and glowing backgrounds */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-float-bg" />
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-float-bg" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block px-3 py-1 mb-8 rounded-full glass-panel border-primary/30 text-primary text-sm font-medium tracking-widest uppercase"
              >
                Corporate Service Provider
              </motion.div>
              {/* Letter-by-letter reveal — drama d'entrée */}
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 leading-[0.92] text-gradient">
                {"Jean V. Rak".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.05,
                      duration: 0.7,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
              <p className="text-muted-foreground/70 text-sm tracking-[0.3em] uppercase mb-8 font-sans flex items-center gap-3 flex-wrap">
                <VerifiedHandle text="jeanv.eth" size="sm" underline={false} className="text-primary/90" />
                <span className="text-muted-foreground/40">·</span>
                <span>Manager</span>
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-foreground/90 mb-4 leading-snug italic">
                « L'architecture invisible derrière <br className="hidden md:block" />
                <span className="text-gradient-gold not-italic font-semibold">les structures qui durent.</span> »
              </h2>
              <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-md">
                Je structure tous types de sociétés — crypto, tech, holdings, traditionnel — avec rigueur et discrétion. Je rémunère généreusement les apporteurs d'affaires sérieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button 
                  size="lg" 
                  className="bg-primary text-black hover:bg-primary/85 font-bold h-14 px-10 text-base shadow-[0_0_24px_rgba(0,212,255,0.45)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-all duration-300 tracking-wide"
                  onClick={() => scrollTo("contact")}
                >
                  Prendre rendez-vous
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/40 hover:border-primary/80 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] h-14 px-10 text-base backdrop-blur-sm text-foreground transition-all duration-300 tracking-wide"
                  onClick={() => scrollTo("apporteurs")}
                >
                  Devenir apporteur d'affaires
                </Button>
              </div>
            </motion.div>

            <CryptoPunkPortrait />
          </div>
        </div>
      </section>

      {/* Qui suis-je? */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* CryptoPunk profile avatar */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 rounded-sm bg-primary/30 blur-[20px] opacity-70 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
                <div className="relative w-24 h-24 rounded-sm border-2 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_24px_rgba(0,212,255,0.5)] transition-all duration-300 overflow-hidden">
                  <img 
                    src={cryptoPunk} 
                    alt="Jean V. Rak" 
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-8">Qui suis-je ?</h2>
            <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: "linear-gradient(90deg, #00d4ff, #c9a44c)" }} />
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Manager expérimenté au sein d'un Corporate Service Provider de premier plan, j'accompagne la création et la structuration de <span className="text-foreground font-medium">tous types de sociétés</span> : crypto & Web3, technologies, entreprises traditionnelles, holdings et fondations. Mon expertise couvre la mise en place de véhicules légaux robustes, la conformité réglementaire et l'optimisation des structures internationales. Propriétaire du domaine <span className="text-foreground font-medium">jeanv.eth</span>, je comprends intimement les enjeux de l'écosystème crypto comme ceux du business traditionnel.
            </p>

            {/* Stats row — animated count-up */}
            <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
              {[
                { value: 150, suffix: "+", label: "structures constituées" },
                { value: 12, suffix: "+", label: "juridictions couvertes" },
                { value: 5, suffix: " ans", label: "d'expertise" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="glass-panel rounded-xl p-5 text-center border-white/8 hover:border-primary/20 transition-colors"
                >
                  <div className="stat-number text-gradient-gold">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <a 
              href="https://x.com/jeanv_rak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
            >
              Suivez-moi sur X (@jeanv_rak) <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* Présence Mondiale — Globe blockchain interactif */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs tracking-[0.3em] uppercase text-primary font-semibold">
                Réseau International
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-5 leading-tight">
              Une présence <span className="text-gradient-gold">mondiale</span>.
              <br className="hidden md:block" />
              Une exécution <span className="text-primary">locale</span>.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              16 juridictions opérées à travers les 5 continents.
              Chaque structure est positionnée là où elle sert vos intérêts —
              fiscalité, réputation, accès aux marchés.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Globe — colonne large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7 relative"
            >
              <BlockchainGlobe />
              {/* Mention discrète d'interactivité */}
              <div className="text-center mt-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-medium">
                Glissez pour explorer
              </div>
            </motion.div>

            {/* Liste des juridictions en grille — colonne droite */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="text-xs tracking-[0.4em] uppercase text-muted-foreground/60 mb-5 font-semibold flex items-center gap-3">
                <span>Juridictions opérées</span>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-primary tabular-nums">{JURISDICTION_MARKERS.length}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {JURISDICTION_MARKERS.map((j, i) => (
                  <motion.div
                    key={j.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.03 }}
                    className="flex items-center gap-2.5 group"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                        j.premium ? "bg-gold shadow-[0_0_8px_rgba(201,164,76,0.6)]" : "bg-primary/70"
                      } group-hover:scale-150`}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {j.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center gap-4 text-[11px] text-muted-foreground/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(201,164,76,0.6)]" />
                  <span>Hubs prioritaires</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                  <span>Juridictions partenaires</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manifesto — full-bleed quote section, le moment qui ancre le tout */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,164,76,0.06) 0%, transparent 60%)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="container mx-auto px-6 max-w-5xl text-center relative z-10"
        >
          {/* Ornamental top divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <Quote className="text-gold/60" size={28} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <p className="font-display italic text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-white/95 mb-12">
            Une structure légale n'est pas un coût.
            <br />
            <span className="not-italic font-semibold text-gradient-gold">
              C'est l'infrastructure
            </span>{" "}
            <span className="text-white/80">de votre liberté entrepreneuriale.</span>
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-white/15" />
            <div className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-medium">
              Jean V. Rak — jeanv.eth
            </div>
            <div className="h-px w-12 bg-white/15" />
          </div>
        </motion.div>
      </section>

      {/* Nos Services */}
      <section id="services" className="py-40 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Nos Services Corporate</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Une gamme complète de services de structuration et de gestion pour tous types d'entreprises — crypto, tech, holdings et structures traditionnelles.
            </p>
          </motion.div>

          {/* Bento Grid — asymmetric, cinq cartes en deux rangées */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* Card 1 — Featured large: Constitution */}
            <motion.div
              className="md:col-span-5 bento-card glass-panel rounded-2xl p-10 relative overflow-hidden cursor-default group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_24px_rgba(0,212,255,0.3)] transition-all duration-400">
                <Building2 size={30} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white leading-tight">Constitution de sociétés</h3>
              <p className="text-muted-foreground leading-relaxed">
                Création d'entités offshore et onshore pour tous secteurs : crypto, tech, holdings, DAOs et entreprises traditionnelles. Chaque structure est taillée sur mesure.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-primary/60 text-sm font-medium group-hover:text-primary transition-colors">
                Offshore · Onshore · DAOs
              </div>
            </motion.div>

            {/* Card 2 — Domiciliation */}
            <motion.div
              className="md:col-span-4 bento-card glass-panel rounded-2xl p-8 relative overflow-hidden cursor-default group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/18 group-hover:border-primary/35 transition-all duration-400">
                <MapPin size={26} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-white">Domiciliation & Substance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Adresses enregistrées, bureaux physiques et substance économique locale dans les juridictions les plus stratégiques.
              </p>
            </motion.div>

            {/* Card 3 — Compliance */}
            <motion.div
              className="md:col-span-3 bento-card glass-panel rounded-2xl p-8 relative overflow-hidden cursor-default group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ borderColor: "rgba(201,164,76,0.12)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-400"
                style={{ background: "rgba(201,164,76,0.08)", border: "1px solid rgba(201,164,76,0.2)", color: "#c9a44c" }}>
                <Coins size={26} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-white">Structuration & Compliance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ingénierie légale pour tokens, conformité AML/KYC et analyses juridiques.
              </p>
            </motion.div>

            {/* Card 4 — Licences */}
            <motion.div
              className="md:col-span-4 bento-card glass-panel rounded-2xl p-8 relative overflow-hidden cursor-default group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ borderColor: "rgba(201,164,76,0.12)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-400"
                style={{ background: "rgba(201,164,76,0.08)", border: "1px solid rgba(201,164,76,0.2)", color: "#c9a44c" }}>
                <Shield size={26} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-white">Obtention de licences</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Accompagnement dans vos demandes d'agrément VASP, CASP et autres auprès des régulateurs compétents.
              </p>
            </motion.div>

            {/* Card 5 — Fiduciaire — Wide horizontal */}
            <motion.div
              className="md:col-span-8 bento-card glass-panel rounded-2xl p-8 relative overflow-hidden cursor-default group flex flex-col md:flex-row md:items-center gap-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/[0.03] pointer-events-none" />
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all duration-400">
                <Calculator size={28} />
              </div>
              <div className="flex-grow">
                <h3 className="font-display text-2xl font-bold mb-2 text-white">Fiduciaire & Administration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comptabilité spécialisée crypto, gestion administrative courante, représentation légale et reporting. Un partenaire de confiance de bout en bout.
                </p>
              </div>
              <div className="flex-shrink-0 text-primary/20 group-hover:text-primary/40 transition-colors">
                <ChevronRight size={32} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Apporteurs d'Affaires - Highlight Section */}
      <section id="apporteurs" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 glass-panel border-y border-primary/20 bg-primary/[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass-panel border-accent/30 text-accent text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Programme Partenaires
              </div>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.0]">
                Devenez apporteur d'affaires et monétisez votre réseau
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Que vos contacts soient dans la crypto, la tech ou le business traditionnel, je vous accompagne sur tous types de projets. Commissions attractives jusqu'à 20 %, processus simple en 3 étapes, support complet et paiements rapides.
              </p>
              
              {/* Sceau officiel 20% — médaille numérique */}
              <div className="flex items-center gap-8 mb-10">
                <div className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center">
                  {/* Outer rotating dashed ring */}
                  <div className="absolute inset-0 rounded-full animate-seal-rotate"
                    style={{ border: "1.5px dashed rgba(201,164,76,0.45)" }} />
                  {/* Middle counter-rotating ring */}
                  <div className="absolute inset-2 rounded-full animate-seal-rotate-rev"
                    style={{ border: "1px solid rgba(201,164,76,0.2)" }} />
                  {/* Solid inner medal */}
                  <div className="absolute inset-4 rounded-full flex flex-col items-center justify-center"
                    style={{
                      background: "radial-gradient(circle at 35% 35%, rgba(255,220,100,0.18) 0%, rgba(201,164,76,0.08) 60%, rgba(0,0,0,0) 100%)",
                      border: "1px solid rgba(201,164,76,0.5)",
                      boxShadow: "0 0 30px rgba(201,164,76,0.2), inset 0 0 20px rgba(201,164,76,0.05)"
                    }}>
                    <span className="font-display text-3xl font-bold leading-none" style={{ color: "#c9a44c" }}>20%</span>
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-white mb-1">Jusqu'à 20% de commission</div>
                  <div className="text-sm uppercase tracking-widest font-medium" style={{ color: "rgba(201,164,76,0.7)" }}>Sur les frais de structuration initiale</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-black hover:bg-primary/85 font-bold h-14 px-10 text-base shadow-[0_0_24px_rgba(0,212,255,0.45)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-all duration-300 tracking-wide"
                onClick={() => scrollTo("contact")}
              >
                Je souhaite devenir apporteur <ChevronRight className="ml-2" size={18} />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-panel p-10 rounded-2xl relative overflow-hidden"
            >
              {/* Subtle ambient gold gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(201,164,76,0.06) 0%, transparent 70%)" }} />

              <div className="flex items-baseline justify-between mb-10 relative z-10">
                <h3 className="font-display text-3xl font-bold text-white">Le processus</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-gold/60">en 3 actes</span>
              </div>

              <div className="space-y-10 relative z-10">
                {[
                  { step: 1, title: "Identifiez un projet", desc: "Vous présentez un prospect qui a besoin de structuration corporate. Crypto, tech, traditionnel — tous secteurs accueillis." },
                  { step: 2, title: "Mettez en relation", desc: "Une seule introduction suffit. Je prends le relais et orchestre l'intégralité de la structuration." },
                  { step: 3, title: "Percevez vos commissions", desc: "Paiement rapide dès signature du mandat, jusqu'à 20% des frais. Sans délai, sans question." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="flex gap-6 items-start group"
                  >
                    {/* Giant gold step number */}
                    <div className="step-number flex-shrink-0 w-20 text-right opacity-90 group-hover:opacity-100 transition-opacity duration-400">
                      {String(item.step).padStart(2, "0")}
                    </div>
                    {/* Vertical divider line */}
                    <div className="flex-shrink-0 w-px self-stretch bg-gradient-to-b from-gold/40 via-gold/15 to-transparent group-hover:from-gold/70 transition-colors duration-400" />
                    {/* Content */}
                    <div className="flex-grow pt-2">
                      <h4 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-gold/95 transition-colors duration-400">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center gap-3 relative z-10">
                <CheckCircle2 size={16} className="text-gold/70" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Sans engagement · Confidentialité totale · Paiements rapides
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi me faire confiance */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl md:text-6xl font-bold">Pourquoi me faire confiance ?</h2>
              <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: "linear-gradient(90deg, #00d4ff, #c9a44c)" }} />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
            {[
              { icon: Lock, label: "Confidentialité absolue", gold: true },
              { icon: UserCheck, label: "Expérience éprouvée", gold: false },
              { icon: Globe2, label: "Réseau international", gold: false },
              { icon: CheckSquare, label: "Approche personnalisée", gold: false },
              { icon: Shield, label: "Conformité stricte", gold: true }
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 250 }}
                className="glass-panel p-7 rounded-xl flex flex-col items-center text-center group transition-all cursor-default"
                style={point.gold ? { borderColor: "rgba(201,164,76,0.2)" } : {}}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
                  style={point.gold ? {
                    background: "rgba(201,164,76,0.1)",
                    border: "1px solid rgba(201,164,76,0.3)",
                    color: "#c9a44c",
                  } : {
                    background: "rgba(0,212,255,0.07)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00d4ff",
                  }}
                >
                  <point.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className="font-semibold text-foreground">{point.label}</h4>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Un partenaire de confiance exceptionnel. La rapidité d'exécution et la rigueur juridique nous ont permis de lancer notre token dans les délais.",
                author: "Fondateur",
                role: "Projet DeFi (Europe)"
              },
              {
                quote: "J'ai référé plusieurs clients et chaque fois, le processus a été transparent et les commissions versées sans délai. Je recommande sans hésitation.",
                author: "Business Developer Web3",
                role: "Réseau de partenaires"
              },
              {
                quote: "La structuration de notre entité offshore a été gérée avec une discrétion et un professionnalisme remarquables. Résultat : licence VASP obtenue.",
                author: "CEO",
                role: "Infrastructure Blockchain"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                className="glass-panel p-8 rounded-xl flex flex-col hover:border-white/20 transition-colors cursor-default"
              >
                <Quote style={{ color: "#c9a44c", opacity: 0.7 }} className="mb-4" size={32} />
                <p className="text-muted-foreground leading-relaxed flex-grow mb-6 italic font-light">"{testimonial.quote}"</p>
                <div className="border-t border-white/8 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm" style={{ color: "#c9a44c" }}>{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative">
        <div className="absolute inset-0 bg-card/30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Prenons contact</h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #00d4ff, #c9a44c)" }} />
            <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto">
              Première consultation confidentielle — remplissez le formulaire ou prenez directement rendez-vous.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,212,255,0.08)] border border-white/10"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px)" }}
          >
            <div className="grid md:grid-cols-5">
              
              {/* Contact Info Side */}
              <div className="md:col-span-2 bg-black/40 backdrop-blur-xl p-10 flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white">Discutons de vos projets</h3>
                  <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
                    Remplissez le formulaire ou prenez directement rendez-vous via Calendly pour une première consultation confidentielle.
                  </p>
                  
                  <div className="space-y-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Globe2 size={18} />
                      </div>
                      <VerifiedHandle text="jeanv.eth" size="md" underline={false} className="font-medium text-foreground" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <a href="https://x.com/jeanv_rak" className="font-medium text-foreground hover:text-primary transition-colors">@jeanv_rak</a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 relative z-10 space-y-4">
                  {/* Shimmer Calendly CTA — canal premium principal */}
                  <a 
                    href="https://calendly.com/jeanv-rak" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer flex items-center justify-center gap-2 w-full h-12 rounded-xl font-bold text-sm tracking-widest uppercase group"
                    style={{ boxShadow: "0 0 30px rgba(201,164,76,0.25), 0 4px 20px rgba(0,0,0,0.3)" }}
                  >
                    Réserver un appel de 30 min
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Délimiteur "OU" subtil */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/40 font-medium">ou</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  {/* Carte Nostr — Canal décentralisé chiffré, copie l'identifiant */}
                  <NostrContactCard />

                  <p className="text-xs text-muted-foreground/40 text-center mt-2">
                    Consultation confidentielle &amp; sans engagement
                  </p>
                </div>
              </div>

              {/* Form Side */}
              <div className="md:col-span-3 p-10 bg-white/[0.02]">
                <form action="https://formspree.io/f/PLACEHOLDER" method="POST" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-muted-foreground">Nom complet</Label>
                      <Input id="name" name="name" required className="bg-black/20 border-white/10 focus:border-primary/50 text-white" placeholder="Jean Dupont" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                      <Input id="email" name="email" type="email" required className="bg-black/20 border-white/10 focus:border-primary/50 text-white" placeholder="jean@exemple.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-muted-foreground">Téléphone (optionnel)</Label>
                    <Input id="phone" name="phone" type="tel" className="bg-black/20 border-white/10 focus:border-primary/50 text-white" placeholder="+33 6 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-muted-foreground">Type de demande</Label>
                    <Select name="subject" required defaultValue="apporteur">
                      <SelectTrigger className="bg-black/20 border-white/10 focus:border-primary/50 text-white">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apporteur">Je suis apporteur d'affaires</SelectItem>
                        <SelectItem value="projet">J'ai un projet crypto</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      required 
                      className="min-h-[120px] bg-black/20 border-white/10 focus:border-primary/50 text-white resize-none" 
                      placeholder="Décrivez brièvement vos attentes..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/85 h-14 text-base font-bold shadow-[0_0_24px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.65)] transition-all duration-300 tracking-wide">
                    Envoyer le message
                  </Button>
                </form>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-background pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.8)]" />
        
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} jeanv.eth. Tous droits réservés.
          </div>
          <div className="flex items-center gap-8">
            <VerifiedHandle text="jeanv.eth" size="md" underline={true} className="text-sm font-bold text-white tracking-wider" />
            <a href="https://x.com/jeanv_rak" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @jeanv_rak
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
