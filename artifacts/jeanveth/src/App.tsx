import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Menu, X, Building2, MapPin, Coins, Shield, 
  Calculator, CheckCircle2, ChevronRight, Lock, 
  Globe2, UserCheck, CheckSquare, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-border/50 py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="text-xl font-bold text-primary tracking-tight cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            jeanv.eth
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
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
            className="absolute top-full left-0 w-full bg-background border-b border-border/50 py-4 flex flex-col px-6 gap-4 md:hidden shadow-xl"
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
        {/* Subtle background effects */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                Corporate Service Provider
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-glow">
                Jean V. Rak <span className="text-muted-foreground block text-3xl md:text-4xl mt-2 font-normal">jeanv.eth</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-foreground mb-6">
                Manager spécialisé <span className="text-primary font-medium">Crypto & Web3</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Je structure des sociétés solides pour projets crypto et je rémunère généreusement les apporteurs d'affaires sérieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-14 px-8 text-base shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
                  onClick={() => scrollTo("contact")}
                >
                  Prendre rendez-vous
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/5 h-14 px-8 text-base"
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
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-sm bg-gradient-to-b from-card to-background border border-border/50 p-2 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="w-full h-full rounded-sm bg-background border border-border/30 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="text-7xl font-light text-muted-foreground/30 tracking-widest">JVR</div>
                  <div className="absolute bottom-6 text-xs tracking-[0.2em] text-muted-foreground/50 uppercase">Corporate Trust</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qui suis-je? */}
      <section className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Qui suis-je ?</h2>
            <div className="w-12 h-1 bg-primary mx-auto mb-8 rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Manager expérimenté au sein d'un Corporate Service Provider de premier plan, je suis spécialisé dans la structuration d'entités pour les projets Web3. Mon expertise couvre la mise en place de véhicules légaux robustes, la conformité réglementaire et l'optimisation des structures internationales. Propriétaire du domaine <span className="text-foreground font-medium">jeanv.eth</span>, je comprends intimement les enjeux techniques et légaux de l'écosystème crypto.
            </p>
            <a 
              href="https://x.com/jeanv_rak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Suivez-moi sur X (@jeanv_rak) <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Nos Services */}
      <section id="services" className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services Corporate</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Une gamme complète de services de structuration et de gestion pour les acteurs de l'écosystème Web3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Constitution de sociétés crypto",
                desc: "Création d'entités offshore et onshore adaptées à vos activités Web3, DAOs et fondations.",
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 h-full group hover:shadow-[0_0_30px_rgba(0,212,255,0.05)]">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apporteurs d'Affaires - Highlight Section */}
      <section id="apporteurs" className="py-32 relative overflow-hidden bg-[#0f1a2e]/20 border-y border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Programme Partenaires
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Devenez apporteur d'affaires et monétisez votre réseau
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Vous êtes avocat, consultant, influenceur Web3 ou business developer ? Recommandez nos services de structuration à vos clients et percevez des commissions récurrentes.
              </p>
              
              <div className="p-6 rounded-lg bg-background border border-primary/30 mb-8 inline-block shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                <div className="text-3xl font-bold text-white mb-1">
                  Jusqu'à <span className="text-primary">20%</span> de commission
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Sur les frais de structuration initiale</div>
              </div>

              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                onClick={() => scrollTo("contact")}
              >
                Je souhaite devenir apporteur <ChevronRight className="ml-2" size={18} />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { title: "Commissions attractives et transparentes", desc: "Rémunération claire sur chaque mandat signé grâce à votre introduction." },
                { title: "Processus simple et rapide", desc: "Mise en relation directe, nous prenons en charge tout le travail opérationnel et légal." },
                { title: "Support complet à chaque étape", desc: "Informations claires sur l'avancement des dossiers de vos clients." },
                { title: "Paiements fiables et réguliers", desc: "Règlements effectués promptement dès l'encaissement des honoraires de structuration." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi travailler avec moi */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Pourquoi me faire confiance ?</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
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
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4 text-primary">
                  <point.icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="font-medium text-foreground">{point.label}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-5">
              
              {/* Contact Info Side */}
              <div className="md:col-span-2 bg-[#111] p-10 flex flex-col justify-between border-r border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Discutons de vos projets</h3>
                  <p className="text-muted-foreground mb-8 text-sm">
                    Remplissez le formulaire ou prenez directement rendez-vous via Calendly pour une première consultation confidentielle.
                  </p>
                  
                  <div className="space-y-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Globe2 size={18} className="text-primary" />
                      <span>jeanv.eth</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-[18px] h-[18px] text-primary fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <a href="https://x.com/jeanv_rak" className="hover:text-white transition-colors">@jeanv_rak</a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative z-10">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium pb-1 border-b border-primary/30 hover:border-primary transition-all"
                  >
                    Prendre rendez-vous directement <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Form Side */}
              <div className="md:col-span-3 p-10">
                <form action="https://formspree.io/f/PLACEHOLDER" method="POST" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" name="name" required className="bg-background border-border/50" placeholder="Jean Dupont" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required className="bg-background border-border/50" placeholder="jean@exemple.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone (optionnel)</Label>
                    <Input id="phone" name="phone" type="tel" className="bg-background border-border/50" placeholder="+33 6 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Type de demande</Label>
                    <Select name="subject" required defaultValue="apporteur">
                      <SelectTrigger className="bg-background border-border/50">
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      required 
                      className="min-h-[120px] bg-background border-border/50 resize-none" 
                      placeholder="Décrivez brièvement vos attentes..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                    Envoyer le message
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} jeanv.eth. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-foreground">jeanv.eth</span>
            <a href="https://x.com/jeanv_rak" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              @jeanv_rak sur X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;