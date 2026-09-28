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

type LivePlaceResult = {
  pageid: number;
  title: string;
  extract?: string;
  thumbnail?: { source: string };
  coordinates?: { lat: number; lon: number }[];
};

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
  const [searchResults, setSearchResults] = useState<LivePlaceResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchLoading || searchResults.length > 0 || searchError) {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchLoading, searchResults.length, searchError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = [formData.place.trim(), formData.country.trim()].filter(Boolean).join(' ');
    setSearchQuery(query);
    setSearchResults([]);
    setSearchError('');
    setSearchLoading(true);
    setActivePlace(null);
    setMobileMenuOpen(false);

    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: query,
      gsrnamespace: '0',
      gsrlimit: '12',
      prop: 'pageimages|extracts|coordinates',
      piprop: 'thumbnail',
      pithumbsize: '1000',
      exintro: '1',
      explaintext: '1',
      format: 'json',
      formatversion: '2',
      origin: '*'
    });

    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
      if (!response.ok) throw new Error('Search request failed');
      const data: { query?: { pages?: LivePlaceResult[] }; error?: { info?: string } } = await response.json();
      if (data.error) throw new Error(data.error.info || 'Search request failed');

      const places = (data.query?.pages ?? []).filter(
        (place) => Boolean(place.coordinates?.length && place.thumbnail?.source && place.extract?.trim())
      );
      setSearchResults(places);
      if (places.length === 0) setSearchError('No photo-backed places were found. Try a nearby city or a broader region.');
    } catch {
      setSearchError('We couldn’t load live place data right now. Please try again in a moment.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectLivePlace = (place: LivePlaceResult) => {
    const relatedPlaces = searchResults
      .filter((result) => result.pageid !== place.pageid)
      .map((result) => ({
        name: result.title,
        type: 'Place',
        desc: result.extract || `Explore ${result.title}.`,
        img: result.thumbnail?.source || '',
        history: result.extract || `Explore ${result.title}.`,
        timings: 'Check locally before visiting',
        fee: 'Check locally'
      }));

    setActivePlace({
      id: String(place.pageid),
      name: place.title,
      location: formData.country || 'Travel inspiration',
      description: place.extract,
      image: place.thumbnail?.source,
      photos: place.thumbnail?.source ? [place.thumbnail.source] : [],
      isGhat: false,
      attractions: relatedPlaces
    });
    setItinerary([]);
    setSelectedAttraction(null);
  };

  const handleGenerateGuide = () => {
    const generated = generateItinerary(activePlace.name, formData.days, activePlace.attractions);
    setItinerary(generated);
    setExpandedDay(1); 
    setSelectedAttraction(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3] font-sans text-[#1d2925] selection:bg-emerald-200 relative overflow-x-hidden">
      
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
      <nav aria-label="Main navigation" className={`fixed top-0 w-full z-50 px-5 lg:px-12 py-4 transition-all duration-500 flex justify-between items-center ${isScrolled ? 'bg-[#f6f7f3]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(29,41,37,0.08)] text-slate-900 border-b border-slate-200/60' : 'bg-gradient-to-b from-black/55 to-transparent text-white'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePlace(null)}>
          <div className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${isScrolled ? 'bg-[#21483e] text-white shadow-md' : 'bg-white/15 text-white backdrop-blur-md border border-white/25'}`}>
            <Navigation className="w-[18px] h-[18px]" />
          </div>
          <span className="font-heading font-bold text-[1.35rem] tracking-tight">Ready<span className={isScrolled ? 'text-[#bd7559]' : 'text-[#f0b293]'}>To</span>Travel</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <a href="#destinations" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#bd7559]' : 'text-white/90 hover:text-white'}`}>Destinations</a>
          <a href="#experiences" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#bd7559]' : 'text-white/90 hover:text-white'}`}>Experiences</a>
          <a href="#features" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#bd7559]' : 'text-white/90 hover:text-white'}`}>How it works</a>
          <a href="#testimonials" className={`transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#bd7559]' : 'text-white/90 hover:text-white'}`}>Stories</a>
          <a href="#trip-search" className={`px-5 py-2.5 rounded-full font-bold transition-all ${isScrolled ? 'bg-[#21483e] text-white hover:bg-[#bd7559] shadow-md' : 'bg-white text-slate-900 hover:bg-[#f4e9e1]'}`}>
            Sign In
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#f6f7f3] text-[#1d2925] pt-24 px-6 flex flex-col gap-6 text-xl font-heading font-bold"
          >
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">Destinations</a>
            <a href="#experiences" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">Experiences</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">How it works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">Stories</a>
            <a href="#trip-search" onClick={() => setMobileMenuOpen(false)} className="bg-[#21483e] text-white py-4 rounded-full mt-4 text-center">Plan a trip</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <main className="relative min-h-[780px] h-[min(920px,100svh)] flex flex-col justify-center px-4 sm:px-6 lg:px-10 pt-24 pb-14">
        <div className="absolute inset-x-2 top-2 bottom-0 z-0 rounded-[1.75rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_-35px_rgba(21,40,34,0.55)]">
          <motion.img 
            initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,35,30,0.76)_0%,rgba(16,35,30,0.48)_47%,rgba(16,35,30,0.08)_100%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#13251f]/55 via-transparent to-black/10"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start mt-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/12 backdrop-blur-md text-white/90 text-xs font-bold tracking-[0.14em] uppercase mb-7 border border-white/25 shadow-xl">
            <SparklesIcon className="w-4 h-4 text-[#f0b293]" />
            Thoughtful trips, made simple
          </div>
          <h1 className="font-heading text-[3.6rem] sm:text-7xl lg:text-[6.4rem] font-medium text-white max-w-4xl mb-5 drop-shadow-2xl leading-[0.98]">
            The world is wide.<br />
            <span className="italic text-[#f4c3a7]">Your next story</span> is closer.
          </h1>
          <p className="text-base md:text-lg text-white/85 mb-9 max-w-xl drop-shadow-md leading-relaxed">
            Find the places that stay with you. We’ll turn your destination into a thoughtful, day-by-day guide worth looking forward to.
          </p>
          
          <form 
            onSubmit={handleSearchSubmit}
            id="trip-search"
            aria-busy={searchLoading}
            className="bg-white/95 backdrop-blur-2xl rounded-2xl md:rounded-full p-2 md:p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.42)] flex flex-col md:flex-row items-center w-full max-w-5xl gap-1 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 border border-white/70"
          >
            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 rounded-t-2xl md:rounded-l-full md:rounded-t-none transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-1.5 group-hover:text-[#bd7559] transition-colors">Destination</label>
              <input type="text" name="place" required value={formData.place} onChange={handleInputChange} placeholder="Where would you love to go?" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold text-base truncate"/>
            </div>
            
            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-1.5 group-hover:text-[#bd7559] transition-colors">Country / region</label>
              <input type="text" name="country" required value={formData.country} onChange={handleInputChange} placeholder="Add a country" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold text-base truncate"/>
            </div>

            <div className="flex-1 px-6 py-4 w-full hover:bg-teal-50/50 transition-colors group cursor-text">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-1.5 group-hover:text-[#bd7559] transition-colors">Your trip</label>
              <div className="flex items-center gap-2">
                <input type="number" name="days" min="1" required value={formData.days} onChange={handleInputChange} placeholder="3" className="w-12 bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold text-base"/>
                <span className="text-slate-400 font-medium">Days</span>
              </div>
            </div>

            <div className="pl-4 pr-2 pb-2 md:pb-0 w-full md:w-auto mt-2 md:mt-0">
              <button type="submit" disabled={searchLoading} className="w-full md:w-auto bg-[#21483e] hover:bg-[#bd7559] disabled:opacity-75 text-white rounded-xl md:rounded-full p-4 md:px-8 md:py-4 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 font-bold group">
                <span>{searchLoading ? 'Finding places…' : 'Find my trip'}</span>
                {searchLoading ? <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          {/* Trusted Badges */}
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 items-center text-white/80 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#f0b293]"/> Thoughtfully curated</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#f0b293] fill-[#f0b293]"/> Loved by 2,000+ travelers</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#f0b293]"/> Your plan in moments</span>
          </div>
        </motion.div>
      </main>

      {(searchLoading || searchResults.length > 0 || searchError) && (
        <section id="search-results" aria-live="polite" className="scroll-mt-24 bg-[#eef1eb] border-y border-[#dfe6de] px-6 py-14 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">Live destination search</span>
                <h2 className="font-heading text-3xl lg:text-4xl font-medium text-[#1d2925]">Places to explore</h2>
                {searchQuery && <p className="mt-2 text-slate-600">Showing photo-backed matches for <strong className="text-[#1d2925]">{searchQuery}</strong></p>}
              </div>
              {searchResults.length > 0 && <span className="text-sm text-slate-500">Place summaries and photos via Wikipedia</span>}
            </div>

            {searchLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" role="status" aria-label="Searching for places">
                {[0, 1, 2].map((item) => <div key={item} className="h-[390px] rounded-[1.25rem] bg-white animate-pulse border border-slate-200" />)}
                <span className="sr-only">Searching Wikipedia for places with photos.</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.map((place) => (
                  <article key={place.pageid} className="group overflow-hidden rounded-[1.25rem] bg-white border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-20px_rgba(29,41,37,0.4)] transition-all duration-300">
                    <button type="button" onClick={() => handleSelectLivePlace(place)} className="block w-full text-left">
                      <div className="relative h-56 overflow-hidden bg-[#dfe6de]">
                        <img src={place.thumbnail?.source} alt={place.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#21483e] backdrop-blur">Place match</span>
                      </div>
                      <div className="p-5 pb-3">
                        <h3 className="font-heading text-2xl font-medium text-[#1d2925] group-hover:text-[#bd7559] transition-colors">{place.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">{place.extract}</p>
                      </div>
                    </button>
                    <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-2">
                      <a href={`https://en.wikipedia.org/?curid=${place.pageid}`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-[#21483e]">Source: Wikipedia</a>
                      <button type="button" onClick={() => handleSelectLivePlace(place)} className="inline-flex items-center gap-2 rounded-full bg-[#21483e] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#bd7559]">Build this trip <ChevronRight className="h-4 w-4" /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-[#d7dfd8] bg-white px-6 py-8 text-center">
                <Search className="mx-auto h-7 w-7 text-[#bd7559]" />
                <p className="mt-3 font-semibold text-[#1d2925]">{searchError}</p>
                <p className="mt-1 text-sm text-slate-500">You can also explore one of the destinations below.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- DESTINATIONS SECTION --- */}
      <section id="destinations" className="max-w-7xl mx-auto px-6 py-24 lg:py-28 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">A little inspiration</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-medium text-[#1d2925] leading-tight">Somewhere wonderful<br className="hidden sm:block" /> is waiting.</h2>
            <p className="text-slate-600 mt-4 text-base lg:text-lg">Start with a place you’ve been dreaming about. We’ll help you make the most of every day there.</p>
          </div>
          <a href="#trip-search" className="hidden md:flex items-center gap-2 text-[#21483e] font-bold hover:text-[#bd7559] transition-colors">Plan somewhere new <ArrowRightIcon className="w-4 h-4" /></a>
        </div>

        <motion.div 
          variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {POPULAR_PLACES.map((place) => (
            <motion.div
              variants={fadeUpItem}
              key={place.id}
              className="group relative bg-white rounded-[1.25rem] shadow-sm hover:shadow-[0_24px_45px_-20px_rgba(23,46,38,0.48)] transition-all duration-500 cursor-pointer overflow-hidden border border-white flex flex-col h-[390px]"
              onClick={() => {
                setActivePlace(place);
                setItinerary([]);
                setSelectedAttraction(null);
              }}
            >
                <div className="absolute inset-0 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#142720]/90 via-[#142720]/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                <div className="flex justify-end">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {place.rating} 
                    <span className="text-slate-400 font-medium">({place.reviews})</span>
                  </div>
                </div>
                
                <div className="translate-y-0 sm:translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#f0b293] text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {place.location}
                  </p>
                  <h3 className="font-heading font-medium text-3xl text-white drop-shadow-md leading-tight mb-3">{place.name}</h3>
                  <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-full transition-all w-max group-hover:bg-white group-hover:text-[#21483e]">Explore destination <ChevronRight className="w-4 h-4" /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="experiences" className="bg-[#e9eee8] py-20 lg:py-24 border-y border-[#dfe6de]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10">
            <div>
              <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">Travel your way</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-medium text-[#1d2925]">Choose your kind of escape.</h2>
            </div>
            <p className="max-w-md text-slate-600 leading-relaxed">A slow morning by the sea or a trail that takes your breath away. Your next trip should feel like you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Coastal slow-down", category: "Sea air & sunshine", rating: "4.9", image: "https://images.unsplash.com/photo-1516483638261-f40af5edca87?auto=format&fit=crop&q=85&w=1100", alt: "Colorful villages along the Italian coast" },
              { title: "Into the wild", category: "Trails & open skies", rating: "4.8", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=85&w=1100", alt: "Sunlit mountain landscape" },
              { title: "A city, slowly", category: "Culture & discovery", rating: "5.0", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=85&w=1100", alt: "Traditional street in Kyoto" },
            ].map((experience) => (
              <a key={experience.title} href="#trip-search" className="group relative min-h-[360px] overflow-hidden rounded-[1.25rem] bg-slate-800 shadow-sm">
                <img src={experience.image} alt={experience.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13251f]/85 via-[#13251f]/15 to-transparent" />
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">{experience.category}</span>
                  <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-bold text-[#1d2925]"><Star className="h-3.5 w-3.5 fill-[#bd7559] text-[#bd7559]" /> {experience.rating}</span>
                </div>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <h3 className="font-heading text-3xl font-medium">{experience.title}</h3>
                  <span aria-label="Plan this experience" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#21483e] transition-transform group-hover:translate-x-1"><ArrowRightIcon className="h-5 w-5" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] bg-slate-300">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=85&w=1400" alt="A quiet alpine lake surrounded by mountains" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142720]/45 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-xl border border-white/50 bg-white/85 px-5 py-4 shadow-lg backdrop-blur-lg">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#bd7559]">The good part starts here</p>
              <p className="mt-1 font-heading text-2xl text-[#1d2925]">Less planning. More living.</p>
            </div>
          </div>
          <div>
            <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">Your trip, taking shape</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-medium text-[#1d2925] leading-tight">From “one day”<br />to “we’re going.”</h2>
            <p className="text-slate-600 mt-5 mb-8 text-lg leading-relaxed">A few details are all it takes to turn a place on your list into a trip you can picture.</p>
            <ol className="space-y-6">
              {[
                { number: "01", title: "Pick the place", detail: "Choose a destination you love, or find a little inspiration." },
                { number: "02", title: "Set your pace", detail: "Tell us how many days you have and what your trip looks like." },
                { number: "03", title: "Get out there", detail: "Explore a day-by-day guide with the details worth knowing." },
              ].map((step) => (
                <li key={step.number} className="flex gap-5 border-b border-[#dce3dd] pb-5 last:border-0">
                  <span className="font-heading text-xl italic text-[#bd7559]">{step.number}</span>
                  <div><h3 className="font-bold text-[#1d2925]">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p></div>
                </li>
              ))}
            </ol>
            <a href="#trip-search" className="mt-7 inline-flex items-center gap-2 font-bold text-[#21483e] hover:text-[#bd7559] transition-colors">Start planning <ArrowRightIcon className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="bg-white py-24 lg:py-28 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">A better way to get there</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-medium text-[#1d2925] leading-tight">The details, taken care of.</h2>
            <p className="text-slate-600 mt-4 text-lg">Thoughtful routes, helpful context, and the freedom to enjoy the journey instead of planning every minute.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: <Compass className="w-8 h-8 text-teal-600" />, title: "Smart Chronological Guides", desc: "No more backtracking. Our engine maps out morning, afternoon, and evening slots perfectly." },
              { icon: <Landmark className="w-8 h-8 text-teal-600" />, title: "Deep Historical Insights", desc: "Click any location in your itinerary to reveal rich historical facts, timings, and ticket prices." },
              { icon: <HeartHandshake className="w-8 h-8 text-teal-600" />, title: "Verified Local Contacts", desc: "Book with confidence using our curated list of top-rated, verified local tourist agencies." }
            ].map((feat, i) => (
              <div key={i} className="bg-[#f6f7f3] rounded-[1.25rem] p-7 lg:p-8 border border-slate-100 hover:border-[#becfc3] hover:shadow-[0_18px_36px_-22px_rgba(29,41,37,0.35)] transition-all duration-300">
                <div className="bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mb-6 [&>svg]:text-[#21483e]">
                  {feat.icon}
                </div>
                <h3 className="font-heading text-2xl font-medium text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#bd7559] font-bold tracking-[0.18em] uppercase text-xs mb-3 block">Notes from the road</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-medium text-[#1d2925]">Good trips leave a mark.</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1 text-[#bd7559]"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></span>
            <span><strong className="text-[#1d2925]">4.9/5</strong> from travelers</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white p-7 lg:p-9 rounded-[1.25rem] shadow-sm border border-slate-100 relative">
            <Quote className="absolute top-7 right-7 w-10 h-10 text-[#e9eee8]" />
            <div className="flex gap-1 mb-5 text-[#bd7559]"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <p className="text-slate-700 text-lg mb-7 relative z-10 leading-relaxed">&ldquo;Ready To Travel completely changed how we planned our trip to Udupi. The chronological timeline told us exactly when to visit the temples and beaches. Perfect execution!&rdquo;</p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#e9eee8] flex items-center justify-center font-bold text-[#21483e]">AR</div>
              <div><p className="font-bold text-slate-900">Ananya R.</p><p className="text-sm text-slate-500">Traveled to Udupi</p></div>
            </div>
          </div>
          <div className="bg-white p-7 lg:p-9 rounded-[1.25rem] shadow-sm border border-slate-100 relative">
            <Quote className="absolute top-7 right-7 w-10 h-10 text-[#e9eee8]" />
            <div className="flex gap-1 mb-5 text-[#bd7559]"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <p className="text-slate-700 text-lg mb-7 relative z-10 leading-relaxed">&ldquo;The Ghat section advisory for Malshej was a lifesaver. We knew exactly what vehicle guidelines to follow. The detailed historical info inside the itinerary is brilliant.&rdquo;</p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#f4e9e1] flex items-center justify-center font-bold text-[#9d5e46]">MS</div>
              <div><p className="font-bold text-slate-900">Michael S.</p><p className="text-sm text-slate-500">Traveled to Maharashtra</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA / FOOTER --- */}
      <footer className="bg-[#18342c] text-white relative overflow-hidden">
        <div className="relative px-6 py-20 lg:py-24 text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#18342c]/95 via-[#18342c]/85 to-[#18342c]/75"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[#f0b293] font-bold tracking-[0.18em] uppercase text-xs mb-4 block">The best days are still ahead</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium mb-5 leading-tight">Let’s make your next trip happen.</h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto leading-relaxed">Bring the idea. We’ll help with the plan. Your next great story starts with a destination.</p>
            <a href="#trip-search" className="inline-flex items-center justify-center gap-3 bg-[#f0b293] hover:bg-white text-[#18342c] px-7 py-4 rounded-full font-bold transition-all shadow-lg">Plan your trip <ArrowRightIcon className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/15 px-6 py-7 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm gap-4">
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-white"><Navigation className="w-5 h-5 text-[#f0b293]" /> ReadyToTravel</div>
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
