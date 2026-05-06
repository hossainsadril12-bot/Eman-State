import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Phone,
  Menu,
  X,
  GraduationCap,
  Users,
  User,
  Mail,
  MessageSquare,
  Landmark,
  Waves,
  Sunset,
  BellRing,
  ShieldCheck,
  FileBadge,
  Mountain,
  Gavel,
  Bed,
  TrendingUp,
  Share2,
  Coins,
  ShoppingBag,
  Star,
  Check
} from 'lucide-react';

/* --- ANIMATION PRIMITIVES (Vivre-style) --- */

const splitVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
};
const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const SplitText = ({ children, className = '', delay = 0 }: { children: string; className?: string; delay?: number }) => (
  <motion.span
    className={`inline-block overflow-hidden ${className}`}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.018, delayChildren: delay } } }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    style={{ display: 'block' }}
  >
    {children.split('').map((char, i) => (
      <motion.span key={i} variants={charVariants} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </motion.span>
    ))}
  </motion.span>
);

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const FadeUp = ({ children, className = '', delay = 0, as: Tag = 'div' }: { children: React.ReactNode; className?: string; delay?: number; as?: any }) => (
  <motion.div
    className={className}
    variants={fadeUpVariants}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    style={{ display: (Tag === 'span' ? 'inline-block' : undefined) }}
  >
    {children}
  </motion.div>
);

const FadeIn = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 1.04 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    viewport={{ once: true, margin: '-60px' }}
  >
    {children}
  </motion.div>
);

const AnimatedLine = ({ className = '', delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`h-[1px] bg-warm-gold origin-left ${className}`}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    viewport={{ once: true, margin: '-60px' }}
  />

);

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const staggerItemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/* --- UI COMPONENTS --- */

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: {
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'outline',
  className?: string,
  [key: string]: any
}) => {
  const base = "px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-500 flex items-center gap-2 group cursor-pointer h-14";
  const styles = {
    primary: "bg-warm-gold text-estate-navy hover:bg-white",
    secondary: "text-white hover:text-warm-gold",
    outline: "border border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-estate-navy"
  };

  return (
    <button className={`${base} ${styles[variant === 'primary' || variant === 'secondary' || variant === 'outline' ? variant : 'primary']} ${className}`} {...props}>
      {children}
      {variant === 'secondary' && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
      )}
    </button>
  );
};

const Card = ({ title, category, image, price }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white border border-stone p-8 group cursor-pointer hover:shadow-luxury transition-all duration-700"
  >
    <div className="overflow-hidden mb-6 aspect-[4/5] bg-sand">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
    </div>
    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-mist mb-2">{category}</p>
    <h3 className="text-xl mb-4 group-hover:text-warm-gold transition-colors">{title}</h3>
    <div className="flex justify-between items-center pt-4 border-t border-stone/30">
      <span className="font-serif italic text-lg">{price}</span>
      <ArrowRight className="w-5 h-5 text-warm-gold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
    </div>
  </motion.div>
);

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left cursor-pointer"
      >
        <span className="text-lg font-serif tracking-tight">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-warm-gold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-mist leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqs = [
  {
    question: "What exactly do I own when I purchase a unit?",
    answer: "You own a specific hotel unit with a registered deed (Saf Kabala) in your name, along with a proportional undivided share in the project land. Both are legally documented and registered under the laws of Bangladesh."
  },
  {
    question: "Will I receive a registered deed in my name?",
    answer: "Yes. Upon full payment, a Unit Ownership Deed (Saf Kabala) is executed and registered under the Registration Act, 1908. Your proportional land share is also mutated and registered in your name."
  },
  {
    question: "How does the profit sharing work?",
    answer: "The hotel operates as a single business. All revenue is pooled, operating costs and a management fee are deducted, and the remaining net profit is distributed to unit owners in proportion to their unit's size relative to the total hotel."
  },
  {
    question: "How and when are profits distributed?",
    answer: "Net profit is distributed to unit owners on a schedule determined by Eiman Estates and communicated to all owners in advance. Complete details of distribution frequency, fee structures, and financial reporting are shared during the onboarding process."
  },
  {
    question: "Can I use my unit personally?",
    answer: "This is your property — and we want you to enjoy it. Unit owners have priority booking rights and discounted usage of their unit and hotel facilities, subject to the hotel's operational schedule and availability."
  },
  {
    question: "Can I sell or transfer my unit?",
    answer: "Your unit is a legally owned asset that can be held, transferred, or inherited. All transfers are subject to the terms of your ownership agreement and require prior written approval from Eiman Estates to ensure operational continuity."
  },
  {
    question: "What is the equity model?",
    answer: "The equity model allows you to introduce additional participants into your unit — family members, business partners, or trusted associates — each holding a documented fractional interest. You remain the primary registered owner. All sub-participation is structured and managed under the oversight of Eiman Estates."
  },
  {
    question: "Who manages the hotel?",
    answer: "Eiman Estates retains full and exclusive operational control of the hotel — from construction through to daily guest experience and financial reporting. Owners are not required to be involved in any aspect of hotel management."
  },
  {
    question: "Who designed the project?",
    answer: "Velora Inani is designed by HuaDu Architecture & Urban Design (HDD), a Shanghai-based firm with projects across Asia, Europe, and the Americas. Structural advisory is led by Prof. Dr. M Shamim Z Bosunia, one of Bangladesh's most prominent structural engineers."
  },
  {
    question: "What stage is the project currently at?",
    answer: "The project land at Inani has been secured and development is underway. A limited number of units are being offered in this first phase."
  },
  {
    question: "When will the hotel be operational?",
    answer: "Construction timelines and projected completion dates are shared with investors during the onboarding process. Eiman Estates provides regular progress updates to all unit owners throughout the development phase."
  },
  {
    question: "Where exactly is the project located?",
    answer: "Velora Inani is located on Marine Drive, Inani, Cox's Bazar — set along an elevated stretch of coastline where the hills meet the sea, away from the main tourist corridor."
  },
  {
    question: "Is my investment legally protected?",
    answer: "Your ownership is structured under the Registration Act, 1908, the Transfer of Property Act, 1882, and the Companies Act, 1994, among other applicable laws of Bangladesh. All terms are documented in a comprehensive ownership agreement."
  },
  {
    question: "What happens to my unit if Eiman Estates faces financial difficulty?",
    answer: "Your unit and proportional land share are registered in your name under the laws of Bangladesh. This ownership survives independently of the Company's status. Your registered deed and land title are your assets — they do not form part of the Company's holdings."
  }
];

/* --- MAIN APP --- */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [earnStep, setEarnStep] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const earnRef = useRef(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: earnScrollProgress } = useScroll({
    target: earnRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(earnScrollProgress, "change", (latest) => {
    const step = Math.min(3, Math.floor(latest * 4));
    setEarnStep(step);
  });

  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const navText = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 1)", "rgba(27, 35, 65, 1)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.1)", "rgba(212, 207, 198, 0.3)"]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  const aboutImageY = useTransform(aboutScrollProgress, [0, 1], [0, 100]);
  const aboutImg1Y = useTransform(aboutScrollProgress, [0, 1], [0, 60]);
  const aboutImg2Y = useTransform(aboutScrollProgress, [0, 1], [0, -40]);
  const aboutImg3Y = useTransform(aboutScrollProgress, [0, 1], [0, 110]);

  return (
    <div className="bg-white min-h-screen">
      {/* SCROLL-REACTIVE NAVIGATION */}
      <motion.nav
        style={{ backgroundColor: navBg, backdropFilter: navBlur, borderBottomColor: navBorder }}
        className="fixed top-0 w-full z-50 transition-all duration-500"
      >
        {/* TOP BAR */}
        <div className="luxury-container h-24 flex items-center justify-between border-b border-white/10">
          <motion.div
            style={{ color: navText }}
            className="flex-1 flex items-center gap-4 cursor-pointer group"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold hidden md:block">Menu</span>
          </motion.div>

          <motion.div
            style={{ color: navText }}
            className="flex items-center gap-12"
          >
            <div className="flex flex-col items-center">
              <motion.img
                src="/logo-white.svg"
                alt="Eman State Logo"
                style={{ filter: useTransform(scrollY, [0, 100], ["invert(0)", "invert(1)"]) }}
                className="h-12 w-auto"
              />
            </div>
          </motion.div>

          <motion.div
            style={{ color: navText }}
            className="flex-1 flex justify-end items-center gap-8"
          >
            <motion.button
              style={{ borderColor: navText, color: navText }}
              className="px-6 py-2.5 border text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-warm-gold hover:text-estate-navy hover:border-warm-gold transition-all duration-500 cursor-pointer"
            >
              Booking
            </motion.button>
          </motion.div>
        </div>

        {/* BOTTOM LINKS BAR */}
        <div className="luxury-container h-16 hidden md:flex items-center justify-center gap-12">
          {['About Us', 'Ownership', 'The Project', 'Location', 'Registry', 'Gallery', 'Contact'].map((link) => (
            <motion.a
              key={link}
              href="#"
              style={{ color: navText }}
              className="text-[9px] tracking-[0.3em] uppercase font-bold hover:text-warm-gold transition-all duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-warm-gold transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY - No changes here */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-estate-navy text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center text-warm-gold">
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] uppercase">Velora</span>
                <span className="text-[6px] tracking-[0.5em] uppercase -mt-1">By Eiman Estates</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 border border-warm-gold/30 rounded-full cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {['The Residences', 'Private Viewing', 'Investment Atlas', 'Concierge Service', 'Inquire Now'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  href="#"
                  className="text-4xl md:text-6xl font-serif hover:italic hover:text-warm-gold transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex gap-8 text-mist text-xs uppercase tracking-widest border-t border-white/10 pt-8">
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* IMPROVED HERO SECTION */}
        <section ref={heroRef} className="relative h-[200vh] overflow-visible">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <motion.div style={{ scale: heroScale }} className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/hero-bg.mp4" type="video/mp4" />
              </video>
              {/* Deep Teal/Navy Overlay to match image */}
              <div className="absolute inset-0 bg-[#0a192f]/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/50 via-transparent to-[#0a192f]/70" />
            </motion.div>

            <div className="luxury-container relative z-10 h-full flex flex-col items-center justify-center text-center pt-48">
              <motion.div
                style={{ opacity: heroOpacity, y: heroTextY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl flex flex-col items-center"
              >
                {/* Brand Area */}
                <div className="mb-8 flex flex-col items-center">
                  <h2 className="text-white text-3xl md:text-5xl tracking-[0.3em] uppercase font-serif mb-3">Velora Inani</h2>
                  <p className="text-warm-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold opacity-90 italic">By Eiman Estates</p>
                </div>

                <h1 className="text-white text-5xl md:text-8xl lg:text-9xl leading-[1] mb-8 tracking-tight font-serif lowercase italic">
                  Own What <span className="not-italic font-normal">Matters.</span>
                </h1>

                <div className="space-y-6 max-w-2xl">
                  <p className="text-white/90 text-xl md:text-2xl font-serif italic leading-relaxed">
                    A Hotel you don’t just stay in - <span className="not-italic font-sans text-xs tracking-[0.3em] uppercase">you own.</span>
                  </p>
                </div>

                <div className="mt-12">
                  <button className="px-10 py-5 border border-white/30 text-white text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-4 hover:scale-105 hover:bg-white/5 hover:backdrop-blur-md hover:border-warm-gold transition-all duration-700 group cursor-pointer">
                    <span>Explore Project</span>
                    <Check className="w-4 h-4 text-warm-gold group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute bottom-12 w-full flex flex-col items-center gap-4 text-white/40"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-warm-gold"
                    animate={{
                      y: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                </div>
                <span className="text-[8px] tracking-[0.5em] uppercase">Scroll to Discover</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION → Seamless + Editorial Flow */}
        <section ref={aboutRef} className="relative z-20 bg-white -mt-[100vh] section-padding pt-[160px] pb-[160px] overflow-hidden">
          {/* Subtle Puzzle Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 5.523 4.477 10 10 10s10-4.477 10-10h20v20c-5.523 0-10 4.477-10 10s4.477 10 10 10v20h-20c0-5.523-4.477-10-10-10s-10 4.477-10 10h-20v-20c5.523 0 10-4.477 10-10s-4.477-10-10-10v-20h20z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px'
            }}
          />

          <div className="luxury-container grid md:grid-cols-2 gap-24 items-center relative z-10">
            <div className="space-y-10 max-w-[600px]">
              <div className="space-y-4">
                <FadeUp className="text-mist text-[10px] tracking-[0.4em] uppercase font-bold">
                  ABOUT THE PROJECT
                </FadeUp>
                <h2 className="text-4xl lg:text-7xl text-estate-navy tracking-tight leading-[1.1]">
                  <SplitText>About </SplitText>
                  <SplitText className="italic text-warm-gold" delay={0.08}>Velora Inani</SplitText>
                </h2>
              </div>

              <div className="space-y-8">
                <FadeUp delay={0.1} className="text-slate text-xl leading-relaxed font-light">
                  Velora Inani is a fully managed hotel development set along a quiet, elevated stretch of Inani's coastline where the hills meet the sea - away from the congestion of the main tourist corridor.
                </FadeUp>

                <FadeUp delay={0.18} className="text-warm-gold text-lg font-serif italic border-l-2 border-warm-gold/30 pl-8">
                  A beachfront asset on Marine Drive, Cox's Bazar, designed for long-term ownership. A limited number of units are being offered in this first phase.
                </FadeUp>

                <p className="text-mist text-base leading-relaxed">
                  The project is designed by <span className="text-estate-navy font-semibold">HuaDu Architecture & Urban Design (HDD)</span>, a Shanghai-based firm whose portfolio spans three continents, including the Beijing Sunrise East Kempinski Hotel. HDD is responsible for the architectural, structural, MEP, and interior design of Velora Inani.
                </p>
              </div>

              <FadeUp delay={0.32} className="pt-8">
                <Button variant="secondary">The Vision Dossier</Button>
              </FadeUp>
            </div>

            <div className="relative h-[650px] w-full">
              {/* Image 2: Beach Sunset (Top Right) - Further back */}
              <motion.div
                style={{ y: aboutImg2Y }}
                className="absolute top-0 right-0 w-[50%] h-[70%] bg-sand overflow-hidden shadow-xl z-0"
              >
                <FadeIn className="w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Destination"
                  />
                </FadeIn>
              </motion.div>

              {/* Image 1: Kayak (Middle Left) */}
              <motion.div
                style={{ y: aboutImg1Y }}
                className="absolute top-[10%] left-0 w-[60%] aspect-square bg-sand overflow-hidden shadow-2xl z-10"
              >
                <FadeIn delay={0.1} className="w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Experience"
                  />
                </FadeIn>
              </motion.div>

              {/* Image 3: Resort Pool (Bottom Center) - Front */}
              <motion.div
                style={{ y: aboutImg3Y }}
                className="absolute top-[40%] left-[30%] w-[60%] aspect-[4/5] bg-sand overflow-hidden shadow-2xl z-20 border-4 border-white"
              >
                <FadeIn delay={0.2} className="w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Relaxation"
                  />
                </FadeIn>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STRUCTURAL ADVISORY → Leading Authority Section */}
        <section className="section-padding bg-[#F9F7F4] relative overflow-hidden">
          {/* Architectural Full-Page Background */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
            <img
              src="/bosunia-bg.png"
              className="w-full h-full object-cover"
              alt="Architectural Pattern Background"
            />
          </div>

          <div className="luxury-container grid lg:grid-cols-12 gap-16 items-center">
            {/* Portrait Column */}
            <FadeIn className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-sand overflow-hidden shadow-2xl relative z-10">
                <img
                  src="/prof-portrait.jpg"
                  className="w-full h-full object-cover transition-all duration-1000"
                  alt="Prof. Dr. M Shamim Z Bosunia"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-warm-gold/20 -z-0" />
            </FadeIn>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <FadeUp className="text-estate-navy text-[10px] tracking-[0.4em] uppercase font-bold opacity-80">
                    STRUCTURAL ADVISORY IS LED BY
                  </FadeUp>
                  <AnimatedLine className="w-16" delay={0.2} />
                </div>
                <h2 className="text-4xl lg:text-5xl text-estate-navy font-serif leading-tight">
                  <SplitText>Prof. Dr. M </SplitText>
                  <SplitText className="italic" delay={0.1}>Shamim Z Bosunia</SplitText>
                </h2>
                <FadeUp delay={0.15} className="text-slate text-lg leading-relaxed max-w-2xl font-light">
                  A distinguished leader in the field of civil engineering, whose vision and expertise continue to shape some of the nation's most iconic infrastructure projects.
                </FadeUp>
              </div>

              <div className="space-y-8 pt-6 border-t border-stone/30 max-w-xl">
                {[
                  {
                    label: 'Former Dean',
                    sub: 'Faculty of Civil Engineering, BUET',
                    icon: <GraduationCap className="w-6 h-6" />
                  },
                  {
                    label: 'President',
                    sub: 'Bangladesh Association of Consulting Engineers (BACE)',
                    icon: <Users className="w-6 h-6" />
                  },
                  {
                    label: 'Chairman',
                    sub: 'Government-appointed Panel of Experts for Padma Multipurpose Bridge and Karnaphuli Tunnel',
                    icon: <Landmark className="w-6 h-6" />
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="p-4 bg-estate-navy text-warm-gold rounded-full transition-transform duration-500 group-hover:scale-110 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-estate-navy font-bold text-lg leading-tight">{item.label}</h4>
                      <p className="text-mist text-sm mt-2 leading-relaxed">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BREATHER → Emotional Reset Moment */}
        <section className="h-[80vh] flex items-center justify-center overflow-hidden bg-sand relative border-y border-stone/20">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="/breather-bg.jpg"
              className="w-full h-full object-cover opacity-15 saturate-[0.8]"
              alt="Background Atmosphere"
            />
          </div>

          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none z-1"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, #C9A96E 0%, transparent 70%)",
                "radial-gradient(circle at 80% 70%, #C9A96E 0%, transparent 70%)",
                "radial-gradient(circle at 20% 30%, #C9A96E 0%, transparent 70%)",
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <div className="luxury-container text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[48px] font-serif text-estate-navy lowercase tracking-tight leading-tight italic max-w-5xl mx-auto">
                "A decision like this
                <span className="text-[#B28E4B] not-italic font-sans text-[48px] tracking-[0.3em] uppercase align-middle mx-6 font-bold whitespace-nowrap">
                  deserves
                </span>
                clarity, not pressure."
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-[1px] bg-warm-gold mx-auto mt-12"
              />
            </motion.div>
          </div>
        </section>

        {/* OWNERSHIP MODEL → Structured + Scannable */}
        {/* OWNERSHIP MODEL → Structured + Scannable */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Subtle background element - puzzle pattern from About section */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 5.523 4.477 10 10 10s10-4.477 10-10h20v20c-5.523 0-10 4.477-10 10s4.477 10 10 10v20h-20c0-5.523-4.477-10-10-10s-10 4.477-10 10h-20v-20c5.523 0 10-4.477 10-10s-4.477-10-10-10v-20h20z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="luxury-container relative z-10">
            {/* Header: Centered layout */}
            <div className="mb-20 text-center space-y-6">
              <FadeUp className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold">Ownership</FadeUp>
              <h2 className="text-4xl lg:text-7xl text-estate-navy tracking-tighter leading-[1.1] font-serif">
                What you own
              </h2>
              <FadeUp delay={0.1} className="text-estate-navy/60 text-lg max-w-4xl mx-auto leading-relaxed">
                When you invest in Velora Inani, you acquire a specific, <span className="text-warm-gold">identifiable</span> hotel unit - <span className="italic opacity-60">not a share in a fund, not a promise on paper.</span>
              </FadeUp>
            </div>

            <div className="space-y-32">
              {/* Redesigned grid from image, now on light background */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {[
                  {
                    title: "A Registered Deed (Saf Kabala)",
                    description: "Executed and recorded under the Registration Act, 1908, in your name.",
                    image: "/saf-kabala.png"
                  },
                  {
                    title: "A Proportional Share Of The Land",
                    description: "An undivided interest in the project land, mutated and registered in your name.",
                    image: "/land-share.png"
                  },
                  {
                    title: "Legal Title To Your Unit",
                    description: "Your asset to hold, transfer, or inherit, subject to the terms of your ownership agreement.",
                    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={staggerItemVariants}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden mb-8 bg-estate-navy/5 relative border border-estate-navy/5">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        alt={item.title}
                      />
                    </div>

                    <div className="space-y-4 px-4">
                      <h3 className="text-2xl text-estate-navy font-bold leading-tight uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-estate-navy/70 text-base leading-relaxed max-w-[340px] mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Closing statement block */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-16"
              >
                <div className="bg-estate-navy text-white p-12 lg:p-20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-warm-gold/[0.03] -translate-y-1/2 translate-x-1/2 rotate-45 border border-white/5 pointer-events-none" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 relative z-10">
                    <p className="font-serif italic text-3xl lg:text-5xl leading-[1.2] max-w-3xl text-white">
                      "You own the asset. <span className="text-warm-gold not-italic">Eiman Estates runs the business</span> operating the hotel as a single, unified property to protect the value of every owner's investment."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 items-center lg:shrink-0">
                      <Button className="!bg-warm-gold !text-estate-navy border-none h-16 px-10 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all">Request Legal Dossier</Button>
                      <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold text-center lg:text-left">Verified Ownership <br /> Structure</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW YOU EARN → Apple-Style Sticky Scroll Storytelling */}
        <section ref={earnRef} className="relative h-[400vh] bg-white">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-[160px]">
            {/* Background Watermarks */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <Landmark className="absolute top-20 left-20 w-96 h-96 -rotate-12" />
              <div className="absolute bottom-40 right-20 w-[500px] h-[500px] border border-estate-navy rounded-full" />
            </div>

            <div className="luxury-container h-full grid lg:grid-cols-2 gap-24 items-center">
              {/* Left Side: Large Portrait Image (States) */}
              <div className="relative hidden lg:block h-[70vh] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl bg-sand">
                <AnimatePresence mode="wait">
                  {earnStep === 0 && (
                    <motion.img
                      key="img0"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Income Generation"
                    />
                  )}
                  {earnStep === 1 && (
                    <motion.img
                      key="img1"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Revenue Pool"
                    />
                  )}
                  {earnStep === 2 && (
                    <motion.img
                      key="img2"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Operations"
                    />
                  )}
                  {earnStep === 3 && (
                    <motion.img
                      key="img3"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Yield Distribution"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 border border-black/5" />
                {/* Floating Label */}
                <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-md px-6 py-4 shadow-xl">
                  <span className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold">0{earnStep + 1}</span>
                </div>
              </div>

              {/* Right Side: Narrative Content Panels */}
              <div className="relative h-[80vh] flex flex-col justify-center">
                <div className="mb-20">
                  <h2 className="text-5xl md:text-7xl text-estate-navy tracking-tight leading-none mb-8 font-serif">
                    How you <span className="italic">earn</span>
                  </h2>
                  <div className="space-y-4">
                    <p className="text-warm-gold text-xs tracking-[0.3em] font-bold uppercase italic inline-block border-b border-warm-gold/20 pb-2">
                      Simple. Structured. Passive.
                    </p>
                    <p className="text-mist text-lg leading-relaxed opacity-80 max-w-lg">
                      Your unit doesn't sit idle. It earns - as part of a collectively operated hotel where every unit contributes to and benefits from the property's total performance.
                    </p>
                  </div>
                </div>

                <div className="relative h-[400px]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={earnStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="absolute inset-0 space-y-6"
                    >
                      <span className="text-estate-navy/30 text-5xl font-serif italic">Step 0{earnStep + 1}</span>
                      <h4 className="text-3xl md:text-5xl text-estate-navy font-bold leading-tight">
                        {[
                          "The hotel generates income",
                          "All revenue is pooled",
                          "Operating costs and a management fee are deducted",
                          "Net profit is distributed"
                        ][earnStep]}
                      </h4>
                      <p className="text-mist text-xl leading-relaxed font-light min-h-[3.5em]">
                        {[
                          "from rooms, food and beverage, events, and all guest services",
                          "across the property",
                          "",
                          "to unit owners in proportion to their unit's size relative to the total hotel"
                        ][earnStep]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Stable Progress Bar (Outside AnimatePresence) */}
                <div className="pt-12 relative z-10">
                  <div className="flex gap-4">
                    {[0, 1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 transition-all duration-700 ${s <= earnStep ? 'bg-warm-gold' : 'bg-stone/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE EQUITY MODEL → Cinematic Immersive Section */}
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-estate-navy">
          {/* Background Image with Parallax-like scale effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-full object-cover opacity-60 saturate-[0.8]"
              alt="Aerial Coastal View"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-estate-navy via-transparent to-estate-navy/20" />
          </motion.div>

          <div className="luxury-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-end">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <FadeUp className="text-[#DBAF5D] text-[10px] tracking-[0.5em] uppercase font-bold block">The Equity Model</FadeUp>
                  <h2 className="text-4xl md:text-[64px] text-white tracking-tighter leading-[1.3] font-serif">
                    <SplitText>Ownership </SplitText>
                    <SplitText className="italic whitespace-nowrap" delay={0.08}>You Can Share</SplitText>
                  </h2>
                </div>

                <div className="h-[1px] w-24 bg-warm-gold" />

                <p className="text-white text-xl md:text-2xl font-serif max-w-xl leading-relaxed italic">
                  "Velora Inani offers something most hotel developments do not - a built - in equity model that lets you bring others into your investment."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 lg:pb-12"
              >
                <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                  As a primary unit owner, you can introduce additional participants - family, partners, or trusted associates - each holding a documented fractional interest. You remain the registered owner. All participation is structured, documented, and managed under the oversight of Eiman Estates.
                </p>

                <p className="text-[#DBAF5D] text-lg font-serif italic border-l border-warm-gold pl-6">
                  This makes Velora Inani not just a personal investment, but one you can share on your terms.
                </p>

                <div className="pt-8">
                  <button className="group relative flex items-center gap-4 text-white uppercase text-[10px] tracking-[0.4em] font-bold">
                    <span>Explore Structure</span>
                    <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500" />
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT EIMAN ESTATES → Trust Anchor */}
        <section className="section-padding bg-sand">
          <div className="luxury-container">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">About Eiman Estates</FadeUp>
                  <h2 className="text-4xl lg:text-6xl text-estate-navy tracking-tight leading-[1.1] font-serif">
                    <SplitText>Built To The Same Standard </SplitText>
                    <SplitText className="italic" delay={0.08}>It Is Managed.</SplitText>
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-warm-gold text-xl lg:text-2xl font-serif italic leading-relaxed border-l-2 border-warm-gold pl-6">
                    "Velora Inani is the first development by Eiman Estates - founded by a group of entrepreneurs with experience across real estate development, healthcare operations, manufacturing, and technology, including hospitality management software."
                  </p>

                  <div className="space-y-6 text-mist text-base lg:text-lg leading-relaxed">
                    <p>
                      When you invest in Velora Inani, you don't manage tenants. You don't coordinate maintenance. You don't negotiate rates or handle compliance. That's our job - and it's the only job we do.
                    </p>
                    <p>
                      Eiman Estates holds full responsibility for three things: building the asset right, operating it professionally, and reporting to you transparently.
                    </p>
                    <p>
                      The project is designed by an international team led by HDD Shanghai and advised by Prof. Dr. M Shamim Z Bosunia - reflecting the same standard of rigour that defines how we build and how we operate.
                    </p>
                  </div>

                  <div className="pt-8">
                    <button className="group relative flex items-center gap-4 text-estate-navy uppercase text-[10px] tracking-[0.4em] font-bold">
                      <span>Our Heritage</span>
                      <div className="w-12 h-[1px] bg-estate-navy group-hover:w-20 transition-all duration-500" />
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative lg:pl-12"
              >
                <div className="aspect-[4/5] relative overflow-hidden shadow-[0_20px_50px_rgba(27,35,65,0.1)] group">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
                    alt="Eiman Estates Architecture"
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/30 m-6 pointer-events-none" />
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-warm-gold/20 rounded-full flex items-center justify-center pointer-events-none hidden md:flex">
                  <div className="w-32 h-32 border border-warm-gold/10 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION FAQ */}
        <section className="section-padding bg-white relative">
          <div className="luxury-container">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* FAQ Header */}
              <div className="lg:col-span-4 space-y-6">
                <FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Frequently Asked Questions</FadeUp>
                <h2 className="text-4xl md:text-5xl text-estate-navy tracking-tight leading-none font-serif">
                  <SplitText>Clear, </SplitText>
                  <SplitText className="italic text-warm-gold" delay={0.06}>transparent</SplitText>
                  <SplitText delay={0.12}> answers.</SplitText>
                </h2>
                <FadeUp delay={0.15} className="text-mist text-lg leading-relaxed pt-6">
                  We believe absolute clarity is the foundation of trust. Explore the essential details of ownership and operation.
                </FadeUp>
                <div className="pt-8 hidden lg:block">
                  <AnimatedLine className="w-24 opacity-30" delay={0.2} />
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="lg:col-span-8">
                <div className="border-t border-stone">
                  {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 8 — CONTACT → Conversion Engine */}
        <section className="section-padding bg-sand relative">
          <div className="luxury-container">
            <div className="text-center mb-16 space-y-8">
              <div className="space-y-6">
                <FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Contact</FadeUp>
                <h2 className="text-4xl md:text-6xl text-estate-navy tracking-tight leading-none font-serif">
                  <SplitText>A Considered </SplitText>
                  <SplitText className="italic text-warm-gold" delay={0.08}>Entry.</SplitText>
                </h2>
              </div>
              <FadeUp delay={0.1} className="text-slate text-lg max-w-2xl mx-auto leading-relaxed">
                When you're ready to learn more, we're ready to walk you through everything - clearly and at your pace.
              </FadeUp>

              <div className="pt-4 pb-8 flex justify-center">
                <a
                  href="#"
                  className="bg-[#25D366] text-white px-10 py-5 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-500 flex items-center gap-4 animate-pulse inline-flex"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-base font-bold tracking-[0.2em] uppercase">WhatsApp Us Directly</span>
                </a>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-12">
              <FadeIn delay={0.2} className="bg-white p-12 lg:p-16 shadow-2xl relative z-10 border border-stone/10">
                <form className="space-y-6">
                  <div className="w-full relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B28F4F]" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-stone/30 py-4 pl-10 text-estate-navy text-lg outline-none placeholder:text-stone transition-all duration-300 focus:border-warm-gold focus:py-6"
                    />
                  </div>
                  <div className="w-full relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B28F4F]" />
                    <input
                      type="email"
                      placeholder="Private Email"
                      className="w-full bg-transparent border-b border-stone/30 py-4 pl-10 text-estate-navy text-lg outline-none placeholder:text-stone transition-all duration-300 focus:border-warm-gold focus:py-6"
                    />
                  </div>
                  <div className="w-full relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B28F4F]" />
                    <input
                      type="tel"
                      placeholder="Phone Details"
                      className="w-full bg-transparent border-b border-stone/30 py-4 pl-10 text-estate-navy text-lg outline-none placeholder:text-stone transition-all duration-300 focus:border-warm-gold focus:py-6"
                    />
                  </div>
                  <div className="w-full relative">
                    <MessageSquare className="absolute left-0 top-8 w-5 h-5 text-[#B28F4F]" />
                    <textarea
                      placeholder="Message"
                      rows={3}
                      className="w-full bg-transparent border-b border-stone/30 py-4 pl-10 text-estate-navy text-lg outline-none placeholder:text-stone transition-all duration-300 focus:border-warm-gold focus:py-6 resize-none"
                    ></textarea>
                  </div>
                  <div className="pt-8">
                    <button type="button" className="w-full bg-estate-navy text-white text-[10px] tracking-[0.4em] uppercase font-bold py-6 hover:bg-warm-gold hover:text-estate-navy transition-colors duration-500">
                      Submit Registration
                    </button>
                  </div>
                </form>
              </FadeIn>

              {/* Address Information */}
              <div className="text-center space-y-2 text-slate/80 font-serif">
                <p className="font-bold text-estate-navy text-lg">Eiman Estates Ltd.</p>
                <p>[Office Address]</p>
                <p>[Phone Number]</p>
                <p className="border-b border-warm-gold/30 inline-block pb-1 mt-2 text-warm-gold hover:text-estate-navy transition-colors cursor-pointer">
                  [Email Address]
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-estate-navy text-white relative overflow-hidden">

        {/* Top Footer Grid */}
        <div className="luxury-container pt-20 pb-16 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white/10 relative z-10">

          {/* LEFT: CTA Column */}
          <div className="space-y-8">
            <p className="text-3xl md:text-4xl font-serif leading-tight text-white">
              We develop real estate assets built on ownership clarity, <span className="italic text-warm-gold">operational discipline</span>, and long-term trust.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-white/30 text-white text-[10px] tracking-[0.3em] uppercase font-bold px-6 py-4 hover:bg-warm-gold hover:text-estate-navy hover:border-warm-gold transition-all duration-500 group"
            >
              <span>Let's Talk</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <p className="text-mist/50 text-[10px] tracking-[0.2em] uppercase pt-4">
              © 2026 Eiman Estates Ltd. All rights reserved.
            </p>
          </div>

          {/* CENTER: Navigation Column */}
          <div className="space-y-6 md:pt-2">
            <p className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-8">Navigate</p>
            {['About Us', 'Ownership', 'The Project', 'Location', 'Registry', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="block text-white/70 text-base font-serif italic hover:text-warm-gold hover:translate-x-2 transition-all duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* RIGHT: Connect Column */}
          <div className="space-y-6 md:pt-2">
            <p className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-8">Connect</p>
            <div className="space-y-2 text-mist/70 text-sm leading-relaxed">
              <p className="text-white font-bold">Eiman Estates Ltd.</p>
              <p>[Office Address]</p>
              <p>[Phone Number]</p>
              <a href="mailto:" className="text-warm-gold hover:text-white transition-colors border-b border-warm-gold/30 hover:border-white/30 inline-block pb-1">
                [Email Address]
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 pt-4">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-all duration-300 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-all duration-300 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-all duration-300 text-white/60">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <div className="flex gap-8 pt-6 border-t border-white/10">
              <a href="#" className="text-mist/50 text-[9px] tracking-[0.2em] uppercase hover:text-warm-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-mist/50 text-[9px] tracking-[0.2em] uppercase hover:text-warm-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>

        {/* BOTTOM: Giant Brand Watermark */}
        <div className="relative overflow-hidden select-none pointer-events-none" style={{ height: 'clamp(120px, 18vw, 260px)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif font-bold uppercase tracking-[0.05em] text-transparent leading-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(80px, 14vw, 220px)',
                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                backgroundImage: 'url(/footer-text-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Eiman Estates
            </span>
          </div>
          {/* Subtle gold divider line at the top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warm-gold/20 to-transparent" />
        </div>

        {/* Bottom signature tagline */}
        <div className="text-center pb-8 relative z-10">
          <p className="text-warm-gold font-serif text-lg italic">Own What Matters.</p>
        </div>

      </footer>
    </div>
  );
}
