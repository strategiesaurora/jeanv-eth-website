import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Menu, X, Building2, MapPin, Coins, Shield, 
  Calculator, CheckCircle2, ChevronRight, Lock, 
  Globe2, UserCheck, CheckSquare, ArrowRight, Quote
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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl border-white/10 py-3" 
            : "bg-transparent border-transparent py-5"
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
              <div className="inline-block px-3 py-1 mb-6 rounded-full glass-panel border-primary/30 text-primary text-sm font-medium">
                Corporate Service Provider
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                <span className="text-gradient">Jean V. Rak</span> 
                <span className="text-muted-foreground block text-3xl md:text-4xl mt-2 font-normal">jeanv.eth</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-foreground mb-6">
                Manager – <span className="text-primary font-medium text-glow">Corporate Service Provider</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Je structure tous types de sociétés avec rigueur et je rémunère généreusement les apporteurs d'affaires sérieux.
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

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.04 }}
              className="flex justify-center lg:justify-end cursor-pointer"
            >
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                {/* Diffuse ambient halo — always visible, intensifies on hover */}
                <div className="absolute -inset-6 rounded-full bg-primary/15 blur-[60px] opacity-80 group-hover:opacity-100 group-hover:bg-primary/25 transition-all duration-700" />
                {/* Sharp inner glow ring */}
                <div className="absolute -inset-1 rounded-lg bg-primary/10 blur-[20px] opacity-60 group-hover:opacity-100 group-hover:blur-[30px] transition-all duration-500" />
                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg border-2 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_50px_rgba(0,212,255,0.5),inset_0_0_30px_rgba(0,212,255,0.08)] transition-all duration-500" />
                {/* CryptoPunk image */}
                <img 
                  src={cryptoPunk} 
                  alt="Jean V. Rak – jeanv.eth CryptoPunk" 
                  className="w-full h-full object-cover rounded-lg relative z-10 group-hover:brightness-110 transition-all duration-500"
                  style={{ imageRendering: "pixelated" }}
                />
                {/* Bottom label */}
                <div className="absolute -bottom-8 left-0 right-0 text-center text-xs tracking-[0.2em] text-primary/60 uppercase font-medium group-hover:text-primary transition-colors">
                  jeanv.eth
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Qui suis-je ?</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Manager expérimenté au sein d'un Corporate Service Provider de premier plan, j'accompagne la création et la structuration de <span className="text-foreground font-medium">tous types de sociétés</span> : crypto & Web3, technologies, entreprises traditionnelles, holdings et fondations. Mon expertise couvre la mise en place de véhicules légaux robustes, la conformité réglementaire et l'optimisation des structures internationales. Propriétaire du domaine <span className="text-foreground font-medium">jeanv.eth</span>, je comprends intimement les enjeux de l'écosystème crypto comme ceux du business traditionnel.
            </p>
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

      {/* Nos Services */}
      <section id="services" className="py-40 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Services Corporate</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Une gamme complète de services de structuration et de gestion pour tous types d'entreprises — crypto, tech, holdings et structures traditionnelles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Constitution de sociétés",
                desc: "Création d'entités offshore et onshore pour tous secteurs : crypto, tech, holdings, DAOs et entreprises traditionnelles.",
                icon: Building2
              },
              {
                title: "Domiciliation & Substance",
                desc: "Fourniture d'adresses enregistrées, bureaux physiques et substance économique locale.",
                icon: MapPin
              },
              {
                title: "Structuration & Compliance",
                desc: "Ingénierie légale pour émissions de tokens, analyses juridiques et conformité AML/KYC.",
                icon: Coins
              },
              {
                title: "Obtention de licences",
                desc: "Accompagnement dans vos demandes d'agrément (VASP, CASP, etc.) auprès des régulateurs.",
                icon: Shield
              },
              {
                title: "Fiduciaire & Administration",
                desc: "Comptabilité spécialisée crypto, gestion administrative courante et représentation.",
                icon: Calculator
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="glass-panel h-full rounded-xl p-9 group hover:shadow-[0_0_45px_rgba(0,212,255,0.2)] hover:border-primary/50 transition-all duration-400 relative overflow-hidden cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-7 relative group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.35)] transition-all duration-400">
                    <service.icon size={26} className="relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10 group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Devenez apporteur d'affaires et monétisez votre réseau
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Que vos contacts soient dans la crypto, la tech ou le business traditionnel, je vous accompagne sur tous types de projets. Commissions attractives jusqu'à 20 %, processus simple en 3 étapes, support complet et paiements rapides.
              </p>
              
              <div className="glass-panel rounded-2xl p-6 mb-8 inline-block shadow-[0_0_40px_rgba(0,212,255,0.15)] animate-glow border-primary/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white mb-2">
                    Jusqu'à <span className="text-gradient">20%</span> de commission
                  </div>
                  <div className="text-sm text-primary uppercase tracking-wider font-semibold">Sur les frais de structuration initiale</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base animate-glow transition-all"
                onClick={() => scrollTo("contact")}
              >
                Je souhaite devenir apporteur <ChevronRight className="ml-2" size={18} />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold mb-8 text-white">Processus en 3 étapes</h3>
              
              <div className="space-y-8 relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-primary/20" />
                
                {[
                  { step: "1", title: "Identifiez un projet", desc: "Vous présentez un prospect qui a besoin de structuration corporate." },
                  { step: "2", title: "Mettez en relation", desc: "Une seule introduction suffit, nous gérons tout le reste." },
                  { step: "3", title: "Percevez vos commissions", desc: "Paiement rapide dès signature du mandat, jusqu'à 20%." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(0,212,255,0.3)] z-10">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-4xl md:text-5xl font-bold">Pourquoi me faire confiance ?</h2>
              <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
            {[
              { icon: Lock, label: "Confidentialité absolue" },
              { icon: UserCheck, label: "Expérience éprouvée" },
              { icon: Globe2, label: "Réseau international" },
              { icon: CheckSquare, label: "Approche personnalisée" },
              { icon: Shield, label: "Conformité stricte" }
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 250 }}
                className="glass-panel p-7 rounded-xl flex flex-col items-center text-center group hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.12)] transition-all cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_18px_rgba(0,212,255,0.3)] transition-all duration-300">
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
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="glass-panel p-8 rounded-xl flex flex-col"
              >
                <Quote className="text-primary/40 mb-4" size={32} />
                <p className="text-muted-foreground leading-relaxed flex-grow mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-primary">{testimonial.role}</div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Prenons contact</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
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
                  
                  <div className="space-y-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Globe2 size={18} />
                      </div>
                      <span className="font-medium text-foreground">jeanv.eth</span>
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

                <div className="mt-12 relative z-10">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium pb-1 border-b border-primary/30 hover:border-primary transition-all group"
                  >
                    Prendre rendez-vous directement <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
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
            <span className="text-sm font-bold text-white tracking-wider">jeanv.eth</span>
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
