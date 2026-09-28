"use client";

import React, { useState, useEffect } from 'react';
import { 
  Globe, MapPin, Calendar, Search, Car, Ticket, Info, Phone, X, 
  ChevronRight, ChevronDown, Star, Map, ArrowLeft, Clock, Landmark, 
  Sunrise, Sun, Sunset, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const POPULAR_PLACES = [
  {
    id: '1',
    name: 'Malshej Ghat',
    location: 'Maharashtra, India',
    rating: 4.8,
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
    { name: `Riverfront Promenade`, type: "Leisure", desc: "Relaxing evening walk.", img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800", history: "Newly developed scenic pathway.", timings: "Open 24 hrs", fee: "Free" }
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
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const [language, setLanguage] = useState('English');
  const [isScrolled, setIsScrolled] = useState(false);
  
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
  };

  const handleGenerateGuide = () => {
    const generated = generateItinerary(activePlace.name, formData.days, activePlace.attractions);
    setItinerary(generated);
    setExpandedDay(1); 
    setSelectedAttraction(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-200 relative">
      
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-[-1] opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-6 lg:px-12 py-5 transition-all duration-300 flex justify-between items-center ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm text-slate-900 border-b border-slate-200/50' : 'bg-gradient-to-b from-black/60 to-transparent text-white'}`}>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-teal-50 text-teal-600' : 'bg-white/20 text-white backdrop-blur-md'}`}>
            <Navigation className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight">Ready To Travel</span>
        </div>
        
        <div className={`relative rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer transition-all font-medium text-sm ${isScrolled ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20 text-white'}`}>
          <Globe className="w-4 h-4" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent outline-none cursor-pointer appearance-none pr-2"
          >
            <option value="English" className="text-black">English</option>
            <option value="Hindi" className="text-black">Hindi</option>
            <option value="French" className="text-black">French</option>
            <option value="Spanish" className="text-black">Spanish</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 px-4 lg:px-12 pb-12">
        <div className="absolute inset-0 z-0 rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1682687982501-1e58f81bef68?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80 backdrop-blur-[2px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-8"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20 shadow-xl">
            Plan your next journey
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white text-center mb-6 tracking-tight drop-shadow-xl leading-tight">
            Discover Your Next <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 text-center mb-12 max-w-2xl font-medium drop-shadow-md leading-relaxed">
            Uncover breathtaking destinations, generate custom itineraries, and get all the local details in a single click.
          </p>
          
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl md:rounded-full p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-center w-full max-w-5xl gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-white/50"
          >
            <div className="flex-1 px-6 py-4 w-full hover:bg-slate-50/80 rounded-t-2xl md:rounded-l-full md:rounded-t-none transition-colors group cursor-pointer">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors">Country</label>
              <input type="text" name="country" required value={formData.country} onChange={handleInputChange} placeholder="Where are you going?" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold truncate"/>
            </div>
            
            <div className="flex-1 px-6 py-4 w-full hover:bg-slate-50/80 transition-colors group cursor-pointer">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors">Place</label>
              <input type="text" name="place" required value={formData.place} onChange={handleInputChange} placeholder="Specific Destination" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold truncate"/>
            </div>

            <div className="flex-1 px-6 py-4 w-full hover:bg-slate-50/80 transition-colors group cursor-pointer">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors">Duration (Days)</label>
              <input type="number" name="days" min="1" required value={formData.days} onChange={handleInputChange} placeholder="3 Days" className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 font-semibold"/>
            </div>

            <div className="flex-1 px-6 py-4 w-full hover:bg-slate-50/80 transition-colors group cursor-pointer">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-600 transition-colors">Start Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-transparent outline-none text-slate-800 font-semibold"/>
            </div>

            <div className="pl-4 pr-2 pb-2 md:pb-0 w-full md:w-auto mt-2 md:mt-0">
              <button type="submit" className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-2xl md:rounded-full p-4 md:px-10 md:py-5 transition-all shadow-[0_8px_20px_-6px_rgba(20,184,166,0.6)] flex items-center justify-center gap-2 font-bold group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="md:hidden">Search Destinations</span>
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Trending Places Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-heading text-4xl font-extrabold text-slate-900 tracking-tight">Trending Destinations</h2>
            <p className="text-slate-500 mt-2 text-lg">Hand-picked locations for your next getaway.</p>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {POPULAR_PLACES.map((place) => (
            <motion.div
              variants={itemVariants}
              key={place.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
              onClick={() => {
                setActivePlace(place);
                setItinerary([]);
                setSelectedAttraction(null);
              }}
            >
              <div className="relative h-72 overflow-hidden shrink-0 m-2 rounded-[1.5rem]">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {place.rating}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-heading font-bold text-2xl text-white drop-shadow-md tracking-tight leading-tight mb-1">{place.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-teal-400" /> {place.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Place Details Modal & Guide */}
      <AnimatePresence>
        {activePlace && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setActivePlace(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
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
                    initial={{ scale: 1.05, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    src={selectedAttraction ? selectedAttraction.img : activePlace.photos[0]} 
                    className="w-full h-full object-cover" 
                    alt="View" 
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
                
                {/* --- DETAILED ATTRACTION VIEW --- */}
                {selectedAttraction ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button 
                      onClick={() => setSelectedAttraction(null)}
                      className="mb-8 inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-200"
                    >
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
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {selectedAttraction.history}
                      </p>
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
                  /* --- MAIN ITINERARY VIEW --- */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-2 text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">
                      <Map className="w-4 h-4" />
                      {activePlace.location}
                    </div>
                    
                    <h2 className="font-heading text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-none">{activePlace.name}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10">{activePlace.description}</p>

                    {activePlace.isGhat && (
                      <div className="mb-10 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-200/50 p-6 rounded-[1.5rem]">
                        <h3 className="font-heading flex items-center gap-3 text-amber-900 font-bold text-xl mb-6">
                          <span className="p-2 bg-white rounded-xl shadow-sm text-amber-600"><Info className="w-5 h-5" /></span> Ghat Section Advisory
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex gap-4">
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">Entry Fees</h4>
                              <p className="text-slate-600 text-sm">Free public access. Forest check-posts may charge ₹20-50 per vehicle.</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">Guidelines</h4>
                              <p className="text-slate-600 text-sm">Avoid night driving. Ensure fog lights are working. Use designated viewpoints.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {itinerary.length === 0 ? (
                      <button onClick={handleGenerateGuide} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group text-lg">
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
                            {formData.date && <div className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">{formData.date}</div>}
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
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t border-slate-100 bg-slate-50/50"
                                    >
                                      <div className="p-6 md:px-8 relative before:absolute before:inset-0 before:ml-[4.5rem] before:h-full before:w-0.5 before:bg-slate-200/60">
                                        {dayItem.places.map((place: any, idx: number) => (
                                          <div 
                                            key={idx} 
                                            onClick={() => setSelectedAttraction(place)}
                                            className="relative flex items-center mb-8 last:mb-0 cursor-pointer group"
                                          >
                                            <div className="absolute left-[2.25rem] w-3 h-3 bg-white border-[3px] border-teal-500 rounded-full z-10 shadow-sm group-hover:scale-150 group-hover:bg-teal-500 transition-all"></div>
                                            <div className="ml-16 w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-5 items-center group-hover:border-teal-400 group-hover:shadow-lg transition-all duration-300">
                                              
                                              {/* TIME SLOT */}
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
                                                {/* Mobile Time */}
                                                <div className="sm:hidden mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 w-max px-2 py-1 rounded-md">
                                                  <Clock className="w-3.5 h-3.5"/> {place.visitTime}
                                                </div>
                                              </div>
                                              <div className="absolute right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                                <ChevronRight className="w-6 h-6 text-teal-500" />
                                              </div>
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

                        {/* Contacts */}
                        <div className="border-t border-slate-100 pt-8">
                          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="p-2 bg-teal-50 text-teal-600 rounded-xl"><Phone className="w-6 h-6"/></span> 
                            Local Expert Guides
                          </h3>
                          <div className="bg-white rounded-[1.5rem] p-5 border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                              <p className="font-bold text-slate-900 text-lg">Wanderlust Experts</p>
                              <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 4.9 Verified Partner
                              </p>
                            </div>
                            <button className="bg-slate-900 text-white hover:bg-teal-600 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-md">
                               Call Now
                            </button>
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
