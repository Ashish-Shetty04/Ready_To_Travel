"use client";

import React, { useState, useEffect } from 'react';
import { 
  Globe, MapPin, Calendar, Search, Car, Ticket, Info, Phone, X, 
  ChevronRight, ChevronDown, Star, Map, ArrowLeft, Clock, Landmark, 
  Sunrise, Sun, Sunset, Navigation, Menu, Quote, ShieldCheck, Compass, HeartHandshake, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const POPULAR_PLACES = [
  {
    id: '1',
    name: 'Malshej Ghat',
    location: 'Maharashtra, India',
    rating: 4.8,
    reviews: 1240,
    description: 'A spectacular mountain pass in the Western Ghats. Famous for its dark woods, misty mountains, and countless cascading waterfalls during the monsoon season.',
    image: 'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595188846399-56fbac096230?auto=format&fit=crop&q=80&w=1200'
    ],
    isGhat: true,
    attractions: [
      { name: "Malshej Falls", type: "Nature", desc: "Cascading waterfalls right on the highway.", img: "https://images.unsplash.com/photo-1432405972618-c60b0242231c?auto=format&fit=crop&w=800", history: "Formed by monsoon rains over millions of years along the Sahyadri mountains.", timings: "06:00 AM - 06:00 PM", fee: "Free" },
      { name: "Pimpalgaon Joga Dam", type: "Nature", desc: "A massive dam surrounded by scenic mountains.", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800", history: "Built on the Pushpavati River, it provides water to nearby regions.", timings: "Open 24 hrs", fee: "Free" },
      { name: "Shivneri Fort", type: "Historical", desc: "The birthplace of Chhatrapati Shivaji Maharaj.", img: "https://images.unsplash.com/photo-1565017834516-72877cb7db6e?auto=format&fit=crop&w=800", history: "A 17th-century military fortification.", timings: "06:00 AM - 06:00 PM", fee: "Free" },
      { name: "Harishchandragad", type: "Historical", desc: "Ancient fort famous for trekking and Konkan Kada cliff.", img: "https://images.unsplash.com/photo-1581403061214-3511eb900137?auto=format&fit=crop&w=800", history: "Built in the 6th century during the rule of Kalachuri dynasty.", timings: "Daytime", fee: "Free" },
    ]
  },
  {
    id: '2',
    name: 'Udupi',
    location: 'Karnataka, India',
    rating: 4.7,
    reviews: 890,
    description: 'A coastal city in Karnataka, famous for its Hindu temples, beautiful beaches, and unique cuisine.',
    image: 'https://images.unsplash.com/photo-1632207908994-5264871b6fa2?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1632207908994-5264871b6fa2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1596489370603-5d519b5c5e88?auto=format&fit=crop&q=80&w=1200'
    ],
    isGhat: false,
    attractions: [
      { name: "Sri Krishna Temple", type: "Historical", desc: "A famous historic Hindu temple.", img: "https://images.unsplash.com/photo-1627883216892-0b297b83f064?auto=format&fit=crop&w=800", history: "Founded by saint Shri Madhvacharya in the 13th century.", timings: "04:00 AM - 09:00 PM", fee: "Free" },
      { name: "St. Mary's Island", type: "Nature", desc: "Island with unique basalt rock formations.", img: "https://images.unsplash.com/photo-1610058778438-e6b7280dcb45?auto=format&fit=crop&w=800", history: "Vasco da Gama is said to have landed here in 1498.", timings: "09:00 AM - 05:00 PM", fee: "₹300 Ferry" },
      { name: "Malpe Beach", type: "Leisure", desc: "Pristine white sand beach.", img: "https://images.unsplash.com/photo-1596489370603-5d519b5c5e88?auto=format&fit=crop&w=800", history: "Historically an important port and fishing harbor on the Karnataka coast.", timings: "Open 24 hrs", fee: "Free" },
      { name: "Kaup Lighthouse", type: "Historical", desc: "Historic lighthouse built in 1901.", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800", history: "Constructed by the British East India Company.", timings: "04:00 PM - 06:00 PM", fee: "₹10" },
    ]
  },
  {
    id: '3',
    name: 'Kyoto',
    location: 'Kyoto, Japan',
    rating: 4.9,
    reviews: 3420,
    description: 'Famous for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&q=80&w=1200'
    ],
    isGhat: false,
    attractions: [
      { name: "Fushimi Inari Shrine", type: "Historical", desc: "Thousands of vermilion torii gates.", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800", history: "Dedicated to Inari, the Shinto god of rice.", timings: "Open 24 hrs", fee: "Free" },
      { name: "Kinkaku-ji", type: "Historical", desc: "The stunning Golden Pavilion Zen temple.", img: "https://images.unsplash.com/photo-1597554909062-8e100e4cdbf9?auto=format&fit=crop&w=800", history: "Originally a retirement villa for the shogun Ashikaga Yoshimitsu.", timings: "09:00 AM - 05:00 PM", fee: "¥500" },
      { name: "Arashiyama Bamboo Grove", type: "Nature", desc: "A mesmerizing walking path through towering bamboo.", img: "https://images.unsplash.com/photo-1522030623253-e57726deff87?auto=format&fit=crop&w=800", history: "A highly photographed and serene natural forest.", timings: "Open 24 hrs", fee: "Free" }
    ]
  },
  {
    id: '4',
    name: 'Amalfi Coast',
    location: 'Campania, Italy',
    rating: 4.8,
    reviews: 2150,
    description: 'A stunning coastline with sheer cliffs and a rugged shoreline dotted with pastel-colored villages.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800',
    photos: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1499596884605-24cebb90bd95?auto=format&fit=crop&q=80&w=1200'
    ],
    isGhat: false,
    attractions: [
      { name: "Positano Village", type: "Cultural", desc: "Iconic cliffside village with narrow, steep streets.", img: "https://images.unsplash.com/photo-1516483638261-f40af5edca87?auto=format&fit=crop&w=800", history: "A wealthy port of the Amalfi Republic in the Middle Ages.", timings: "Open 24 hrs", fee: "Free" },
      { name: "Villa Rufolo", type: "Historical", desc: "Historic villa in Ravello with breathtaking terrace gardens.", img: "https://images.unsplash.com/photo-1563200780-60b642a8b9f1?auto=format&fit=crop&w=800", history: "Built by the wealthy Rufolo family in the 13th century.", timings: "09:00 AM - 08:00 PM", fee: "€7" },
    ]
  }
];

// Helper to generate chronological non-repeating itinerary
const generateItinerary = (placeName: string, daysStr: string, attractions: any[]) => {
  const days = parseInt(daysStr) || 3;
  const itinerary = [];
  
  const fallbackAttractions = [
    { name: `Historic Center of ${placeName}`, type: "Historical", desc: "Explore local architecture.", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800", history: `Centuries old historical site.`, timings: "08:00 AM - 05:00 PM", fee: "₹50" },
    { name: `Grand Temple`, type: "Historical", desc: "A majestic ancient temple.", img: "https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?auto=format&fit=crop&w=800", history: `Built over 800 years ago.`, timings: "06:00 AM - 08:00 PM", fee: "Free" },
    { name: `Local Museum`, type: "Cultural", desc: "Rich history and arts.", img: "https://images.unsplash.com/photo-1518998053401-8789024c47ce?auto=format&fit=crop&w=800", history: `Preserves local heritage.`, timings: "10:00 AM - 05:00 PM", fee: "₹100" },
    { name: `Scenic Viewpoint`, type: "Nature", desc: "Stunning sunset views.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800", history: "Natural landscape.", timings: "Open 24 hrs", fee: "Free" },
    { name: `Botanical Gardens`, type: "Nature", desc: "Lush green exotic plants.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800", history: "Planted in the 19th century.", timings: "09:00 AM - 06:00 PM", fee: "₹20" },
    { name: `Local Market Walk`, type: "Leisure", desc: "Shop for souvenirs and street food.", img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800", history: "A bustling trading hub for centuries.", timings: "10:00 AM - 09:00 PM", fee: "Free" },
  ];

  let availableAttractions = [...(attractions?.length ? attractions : fallbackAttractions)];
  let nextFallbackIndex = 0;

  const timeSlots = [
    { time: "09:00 AM", label: "Morning", icon: <Sunrise className="w-5 h-5 text-amber-500" /> },
    { time: "01:00 PM", label: "Afternoon", icon: <Sun className="w-5 h-5 text-amber-500" /> },
    { time: "05:00 PM", label: "Evening", icon: <Sunset className="w-5 h-5 text-amber-500" /> }
  ];

  for (let i = 1; i <= days; i++) {
    const dayPlaces = [];
    for (let slot = 0; slot < 3; slot++) {
      let selectedPlace = null;
      if (availableAttractions.length > 0) {
        selectedPlace = availableAttractions.shift();
      } else {
        selectedPlace = fallbackAttractions[nextFallbackIndex % fallbackAttractions.length];
        selectedPlace = { ...selectedPlace, name: `${selectedPlace.name} (Part ${Math.floor(nextFallbackIndex / fallbackAttractions.length) + 2})` };
        nextFallbackIndex++;
      }
      
      dayPlaces.push({
        ...selectedPlace,
        visitTime: timeSlots[slot].time,
        timeLabel: timeSlots[slot].label,
        TimeIcon: timeSlots[slot].icon
      });
    }

    itinerary.push({
      day: i,
      title: `Day ${i}: Highlights of ${placeName}`,
      places: dayPlaces
    });
  }
  return itinerary;
};

// --- ANIMATION VARIANTS ---
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search Form State
  const [formData, setFormData] = useState({
    country: '',
    place: '',
    days: '3',
    date: ''
  });

  // UI States
  const [activePlace, setActivePlace] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1); 
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let foundPlace = POPULAR_PLACES.find(p => p.name.toLowerCase().includes(formData.place.toLowerCase()));
    
    if (!foundPlace) {
      foundPlace = {
        id: 'new',
        name: formData.place || 'Unknown Destination',
        location: formData.country || 'Global',
        rating: 4.8,
        reviews: 120,
        description: `Experience the magic of ${formData.place}. A wonderful destination offering unique culture, scenic views, and unforgettable adventures.`,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
        photos: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200'],
        isGhat: formData.place.toLowerCase().includes('ghat'),
        attractions: []
      };
    }
    
    setActivePlace(foundPlace);
    setItinerary([]); 
    setSelectedAttraction(null);
    setMobileMenuOpen(false);
  };

  const handleGenerateGuide = () => {
    const generated = generateItinerary(activePlace.name, formData.days, activePlace.attractions);
    setItinerary(generated);
    setExpandedDay(1); 
    setSelectedAttraction(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-teal-200 relative overflow-x-hidden">
      
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* --- PREMIUM NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 px-6 lg:px-12 py-4 transition-all duration-500 flex justify-between items-center ${isScrolled ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-slate-900 border-b border-slate-200/50' : 'bg-gradient-to-b from-black/60 to-transparent text-white'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePlace(null)}>
          <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-teal-500 text-white shadow-md' : 'bg-white/20 text-white backdrop-blur-md'}`}>
            <Navigation className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight">Ready<span className={isScrolled ? 'text-teal-600' : 'text-teal-400'}>To</span>Travel</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <a href="#destinations" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white/90 hover:text-white'}`}>Destinations</a>
          <a href="#features" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white/90 hover:text-white'}`}>How It Works</a>
          <a href="#testimonials" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white/90 hover:text-white'}`}>Testimonials</a>
          <button className={`px-5 py-2.5 rounded-full font-bold transition-all ${isScrolled ? 'bg-slate-900 text-white hover:bg-teal-600 shadow-md' : 'bg-white text-slate-900 hover:bg-teal-50'}`}>
            Sign In
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 text-xl font-heading font-bold"
          >
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">Destinations</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">How It Works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">Testimonials</a>
            <button className="bg-teal-600 text-white py-4 rounded-2xl mt-4">Sign In</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <main className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 lg:px-12 pt-20 pb-16">
        <div className="absolute inset-x-2 top-2 bottom-0 z-0 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl">
          <motion.img 
            initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/80"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-semibold tracking-wider uppercase mb-8 border border-white/20 shadow-xl">
            <SparklesIcon className="w-4 h-4 text-teal-300" />
            AI-Powered Trip Planning
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white text-center mb-6 tracking-tight drop-shadow-2xl leading-[1.1]">
            Experience The World, <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-teal-100 relative">
              Beautifully Planned.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 text-center mb-14 max-w-2xl font-medium drop-shadow-md leading-relaxed">
            Stop stressing over itineraries. Tell us where you want to go, and our intelligent engine builds your perfect chronological guide in seconds.
          </p>
          
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl md:rounded-full p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center w-full max-w-5xl gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-white/60"
          >
            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 rounded-t-2xl md:rounded-l-full md:rounded-t-none transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-teal-600 transition-colors">Where To?</label>
              <input type="text" name="place" required value={formData.place} onChange={handleInputChange} placeholder="Destination (e.g. Kyoto)" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-300 font-bold text-lg truncate"/>
            </div>
            
            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-teal-600 transition-colors">Country / Region</label>
              <input type="text" name="country" required value={formData.country} onChange={handleInputChange} placeholder="E.g. Japan" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-300 font-bold text-lg truncate"/>
            </div>

            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-teal-600 transition-colors">Duration</label>
              <div className="flex items-center gap-2">
                <input type="number" name="days" min="1" required value={formData.days} onChange={handleInputChange} placeholder="3" className="w-12 bg-transparent outline-none text-slate-800 placeholder-slate-300 font-bold text-lg"/>
                <span className="text-slate-400 font-medium">Days</span>
              </div>
            </div>

            <div className="pl-4 pr-2 pb-2 md:pb-0 w-full md:w-auto mt-2 md:mt-0">
              <button type="submit" className="w-full md:w-auto bg-slate-900 hover:bg-teal-600 text-white rounded-2xl md:rounded-full p-4 md:px-10 md:py-5 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 font-bold group">
                <span className="md:hidden">Start Planning</span>
                <span className="hidden md:block">Plan Trip</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Trusted Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center text-white/60 text-sm font-medium">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Verified Guides</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4"/> 4.9/5 Average Rating</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4"/> Instant Itineraries</span>
          </div>
        </motion.div>
      </main>

      {/* --- DESTINATIONS SECTION --- */}
      <section id="destinations" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-3 block">Discover</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Trending Destinations</h2>
            <p className="text-slate-500 mt-4 text-lg">Hand-picked locations highly rated by our community. Click to explore tailored guides.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-600 font-bold hover:text-teal-600 transition-colors">
            View All Destinations <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <motion.div 
          variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {POPULAR_PLACES.map((place) => (
            <motion.div
              variants={fadeUpItem}
              key={place.id}
              className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-[420px]"
              onClick={() => {
                setActivePlace(place);
                setItinerary([]);
                setSelectedAttraction(null);
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>
              
              <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                <div className="flex justify-end">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {place.rating} 
                    <span className="text-slate-400 font-medium">({place.reviews})</span>
                  </div>
                </div>
                
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {place.location}
                  </p>
                  <h3 className="font-heading font-extrabold text-3xl text-white drop-shadow-md tracking-tight leading-tight mb-3">{place.name}</h3>
                  <button className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl transition-all w-max hover:bg-teal-500">
                    Explore Guide <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-3 block">Why Choose Us</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Travel Planning, Perfected.</h2>
            <p className="text-slate-500 mt-4 text-lg">We eliminate the stress of research by generating beautifully structured, chronological itineraries packed with deep local insights.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Compass className="w-8 h-8 text-teal-600" />, title: "Smart Chronological Guides", desc: "No more backtracking. Our engine maps out morning, afternoon, and evening slots perfectly." },
              { icon: <Landmark className="w-8 h-8 text-teal-600" />, title: "Deep Historical Insights", desc: "Click any location in your itinerary to reveal rich historical facts, timings, and ticket prices." },
              { icon: <HeartHandshake className="w-8 h-8 text-teal-600" />, title: "Verified Local Contacts", desc: "Book with confidence using our curated list of top-rated, verified local tourist agencies." }
            ].map((feat, i) => (
              <div key={i} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl font-extrabold text-slate-900 tracking-tight">Loved by Explorers</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100" />
            <div className="flex gap-1 mb-4 text-amber-500"><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/></div>
            <p className="text-slate-700 text-lg mb-6 relative z-10 font-medium leading-relaxed">"Ready To Travel completely changed how we planned our trip to Udupi. The chronological timeline told us exactly when to visit the temples and beaches. Perfect execution!"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">AR</div>
              <div>
                <p className="font-bold text-slate-900">Ananya R.</p>
                <p className="text-sm text-slate-500">Traveled to Udupi</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100" />
            <div className="flex gap-1 mb-4 text-amber-500"><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/><Star className="w-5 h-5 fill-amber-500"/></div>
            <p className="text-slate-700 text-lg mb-6 relative z-10 font-medium leading-relaxed">"The Ghat section advisory for Malshej was a lifesaver. We knew exactly what vehicle guidelines to follow. The detailed historical info inside the itinerary is brilliant."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">MS</div>
              <div>
                <p className="font-bold text-slate-900">Michael S.</p>
                <p className="text-sm text-slate-500">Traveled to Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA / FOOTER --- */}
      <footer className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden rounded-t-[3rem] lg:rounded-t-[5rem]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000')] opacity-5 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-heading text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight">Ready to start your journey?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Join thousands of travelers who plan smarter, explore deeper, and travel better with Ready To Travel.</p>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-10 py-5 rounded-full font-extrabold text-lg transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)]">
            Build Your First Itinerary Now
          </button>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-white">
            <Navigation className="w-5 h-5 text-teal-500" /> ReadyToTravel
          </div>
          <p>© 2026 Ready To Travel. All rights reserved.</p>
        </div>
      </footer>


      {/* --- ITINERARY / PLACE DETAILS MODAL (UNCHANGED LOGIC, ENHANCED UI) --- */}
      <AnimatePresence>
        {activePlace && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setActivePlace(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-[1200px] h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button onClick={() => setActivePlace(null)} className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:bg-slate-100 hover:rotate-90 text-slate-800 shadow-md transition-all duration-300">
                <X className="w-5 h-5" />
              </button>

              {/* Photos Column */}
              <div className="w-full md:w-5/12 bg-slate-100 flex flex-col h-[35vh] md:h-full shrink-0 relative">
                <div className="relative h-3/4 overflow-hidden">
                  <motion.img 
                    key={selectedAttraction ? selectedAttraction.img : activePlace.photos[0]}
                    initial={{ scale: 1.05, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
                    src={selectedAttraction ? selectedAttraction.img : activePlace.photos[0]} 
                    className="w-full h-full object-cover" alt="View" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
                {!selectedAttraction && (
                  <div className="h-1/4 flex gap-3 p-4 overflow-x-auto bg-slate-900 scrollbar-hide items-center">
                    {activePlace.photos.map((url: string, idx: number) => (
                      <div key={idx} className="h-full aspect-video rounded-xl overflow-hidden border-2 border-white/10 hover:border-white/40 cursor-pointer transition-colors shrink-0">
                        <img src={url} className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="thumbnail" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Information Column */}
              <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto bg-white relative scroll-smooth scrollbar-hide">
                
                {/* DETAILED ATTRACTION VIEW */}
                {selectedAttraction ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button onClick={() => setSelectedAttraction(null)} className="mb-8 inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                      <ArrowLeft className="w-4 h-4" /> Back to Itinerary
                    </button>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100">{selectedAttraction.type}</span>
                    </div>
                    
                    <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">{selectedAttraction.name}</h2>
                    
                    <div className="bg-slate-50 p-6 lg:p-8 rounded-[1.5rem] border border-slate-100 mb-8">
                      <h3 className="font-heading text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                        <span className="p-2 bg-white rounded-lg shadow-sm text-teal-600"><Landmark className="w-5 h-5" /></span>
                        Historical & Contextual Info
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">{selectedAttraction.history}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                      <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><Clock className="w-6 h-6" /></div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Suggested Visit</p>
                          <p className="text-slate-500">{selectedAttraction.visitTime} <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded-md ml-1">{selectedAttraction.timeLabel}</span></p>
                        </div>
                      </div>
                      <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Ticket className="w-6 h-6" /></div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Entry Fee</p>
                          <p className="text-slate-500 font-medium">{selectedAttraction.fee}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                ) : (
                  /* MAIN ITINERARY VIEW */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-2 text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">
                      <Map className="w-4 h-4" /> {activePlace.location}
                    </div>
                    
                    <h2 className="font-heading text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-none">{activePlace.name}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10">{activePlace.description}</p>

                    {activePlace.isGhat && (
                      <div className="mb-10 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-200/50 p-6 rounded-[1.5rem]">
                        <h3 className="font-heading flex items-center gap-3 text-amber-900 font-bold text-xl mb-6">
                          <span className="p-2 bg-white rounded-xl shadow-sm text-amber-600"><Info className="w-5 h-5" /></span> Ghat Section Advisory
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">Entry Fees</h4>
                            <p className="text-slate-600 text-sm">Free public access. Forest check-posts may charge ₹20-50 per vehicle.</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">Guidelines</h4>
                            <p className="text-slate-600 text-sm">Avoid night driving. Ensure fog lights are working. Use designated viewpoints.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {itinerary.length === 0 ? (
                      <button onClick={handleGenerateGuide} className="w-full bg-slate-900 hover:bg-teal-600 text-white font-bold py-5 rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group text-lg">
                        Build Custom Itinerary <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="space-y-10 pb-10">
                        <div className="pt-6 border-t border-slate-100">
                          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                            <h3 className="font-heading text-3xl font-bold text-slate-900 flex items-center gap-3">
                              <span className="p-2 bg-teal-50 text-teal-600 rounded-xl"><Calendar className="w-6 h-6" /></span> 
                              Your {formData.days}-Day Itinerary
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            {itinerary.map((dayItem) => (
                              <div key={dayItem.day} className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm hover:border-teal-300 transition-colors duration-300">
                                <button 
                                  onClick={() => setExpandedDay(expandedDay === dayItem.day ? null : dayItem.day)}
                                  className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-5">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 ${expandedDay === dayItem.day ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg scale-110' : 'bg-slate-100 text-slate-600'}`}>
                                      D{dayItem.day}
                                    </div>
                                    <span className="font-heading font-bold text-xl text-slate-900 tracking-tight">{dayItem.title}</span>
                                  </div>
                                  <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${expandedDay === dayItem.day ? 'rotate-180 text-teal-600' : ''}`} />
                                </button>

                                <AnimatePresence>
                                  {expandedDay === dayItem.day && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100 bg-slate-50/50">
                                      <div className="p-6 md:px-8 relative before:absolute before:inset-0 before:ml-[4.5rem] before:h-full before:w-0.5 before:bg-slate-200/60">
                                        {dayItem.places.map((place: any, idx: number) => (
                                          <div key={idx} onClick={() => setSelectedAttraction(place)} className="relative flex items-center mb-8 last:mb-0 cursor-pointer group">
                                            <div className="absolute left-[2.25rem] w-3 h-3 bg-white border-[3px] border-teal-500 rounded-full z-10 shadow-sm group-hover:scale-150 group-hover:bg-teal-500 transition-all"></div>
                                            <div className="ml-16 w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-5 items-center group-hover:border-teal-400 group-hover:shadow-lg transition-all duration-300">
                                              <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50/80 p-3 rounded-xl border border-slate-100 min-w-[90px] shrink-0">
                                                {place.TimeIcon}
                                                <span className="text-[10px] font-bold text-slate-500 uppercase mt-2">{place.timeLabel}</span>
                                                <span className="text-xs font-bold text-slate-800">{place.visitTime}</span>
                                              </div>
                                              <img src={place.img} alt={place.name} className="w-24 h-24 rounded-xl object-cover shadow-sm shrink-0" />
                                              <div className="pr-10 flex-1">
                                                <div className="flex items-center flex-wrap gap-2 mb-1.5">
                                                  <h5 className="font-bold text-lg text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">{place.name}</h5>
                                                  {place.type === 'Historical' && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Historic</span>}
                                                </div>
                                                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{place.desc}</p>
                                                <div className="sm:hidden mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 w-max px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5"/> {place.visitTime}</div>
                                              </div>
                                              <div className="absolute right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><ChevronRight className="w-6 h-6 text-teal-500" /></div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Icon Helpers
const SparklesIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const ArrowRightIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
