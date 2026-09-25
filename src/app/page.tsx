"use client";

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  MapPin, 
  Calendar, 
  Search, 
  Car, 
  Ticket, 
  Info,
  Phone,
  X,
  ChevronRight,
  ChevronDown,
  Star,
  Map,
  ArrowLeft,
  Clock,
  Landmark,
  Sunrise,
  Sun,
  Sunset
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
      { name: "Ajoba Hill Fort", type: "Adventure", desc: "Famous among rock climbers and trekkers.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800", history: "Valmiki ashram is situated halfway up the mountain, linked to the Ramayana.", timings: "Daytime", fee: "Free" },
      { name: "Naneghat", type: "Historical", desc: "A mountain pass with ancient caves and inscriptions.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800", history: "Used as a toll booth in the Satavahana era (200 BCE).", timings: "Daytime", fee: "Free" }
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
      { name: "Manipal End Point", type: "Nature", desc: "A cliff overlooking the Swarna river.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800", history: "Originally a dense forest, now developed into a park.", timings: "08:00 AM - 08:00 PM", fee: "Free" },
      { name: "Hasta Shilpa Village", type: "Cultural", desc: "Restored traditional houses and museums.", img: "https://images.unsplash.com/photo-1518998053401-8789024c47ce?auto=format&fit=crop&w=800", history: "An open-air museum preserving the traditional architecture of coastal Karnataka.", timings: "10:00 AM - 05:00 PM", fee: "₹300" }
    ]
  }
];

// Helper to generate chronological non-repeating itinerary
const generateItinerary = (placeName: string, daysStr: string, attractions: any[]) => {
  const days = parseInt(daysStr) || 3;
  const itinerary = [];
  
  // Fallback generic attractions if none provided or we need more
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
  // Shuffle or use generic if we run out
  let nextFallbackIndex = 0;

  const timeSlots = [
    { time: "09:00 AM", label: "Morning", icon: <Sunrise className="w-4 h-4" /> },
    { time: "01:00 PM", label: "Afternoon", icon: <Sun className="w-4 h-4" /> },
    { time: "05:00 PM", label: "Evening", icon: <Sunset className="w-4 h-4" /> }
  ];

  for (let i = 1; i <= days; i++) {
    const dayPlaces = [];
    
    // Pick up to 3 non-repeating places for the day
    for (let slot = 0; slot < 3; slot++) {
      let selectedPlace = null;
      if (availableAttractions.length > 0) {
        selectedPlace = availableAttractions.shift();
      } else {
        // If we run out of unique places, generate a generic unique one
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
      title: `Day ${i}: Best of ${placeName}`,
      places: dayPlaces
    });
  }
  return itinerary;
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

  // Handle scroll for Navbar
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
    <div className="min-h-screen bg-slate-50/90 font-sans text-slate-900 selection:bg-rose-200 relative">
      
      {/* Subtle Travel Background Pattern */}
      <div 
        className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="fixed inset-0 z-[-1] bg-white/70 pointer-events-none" />

      {/* 1. Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 flex justify-between items-center ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm text-slate-900' : 'bg-transparent text-white'}`}>
        <div className="flex items-center gap-2 cursor-pointer font-bold text-2xl tracking-tight">
          <Globe className={`w-7 h-7 ${isScrolled ? 'text-rose-600' : 'text-white'}`} />
          Ready To Travel
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 px-4">
        <div className="absolute inset-0 z-0 rounded-b-[4rem] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1682687982501-1e58f81bef68?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-12"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center mb-6 tracking-tight drop-shadow-lg">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">Adventure</span>
          </h1>
          
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-xl rounded-full p-3 shadow-2xl flex flex-col md:flex-row items-center w-full max-w-4xl gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 mt-12"
          >
            <div className="flex-1 px-6 py-2 w-full hover:bg-slate-50 rounded-l-full transition-colors cursor-pointer">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide cursor-pointer">Where</label>
              <input type="text" name="country" required value={formData.country} onChange={handleInputChange} placeholder="Country (e.g. India)" className="w-full bg-transparent outline-none text-slate-600 placeholder-slate-400 font-medium truncate"/>
            </div>
            
            <div className="flex-1 px-6 py-2 w-full hover:bg-slate-50 transition-colors cursor-pointer">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide cursor-pointer">Place</label>
              <input type="text" name="place" required value={formData.place} onChange={handleInputChange} placeholder="Specific Location" className="w-full bg-transparent outline-none text-slate-600 placeholder-slate-400 font-medium truncate"/>
            </div>

            <div className="flex-1 px-6 py-2 w-full hover:bg-slate-50 transition-colors cursor-pointer">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide cursor-pointer">Duration</label>
              <input type="number" name="days" min="1" required value={formData.days} onChange={handleInputChange} placeholder="How many days?" className="w-full bg-transparent outline-none text-slate-600 placeholder-slate-400 font-medium"/>
            </div>

            <div className="flex-1 px-6 py-2 w-full hover:bg-slate-50 transition-colors cursor-pointer">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide cursor-pointer">Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-transparent outline-none text-slate-600 font-medium"/>
            </div>

            <div className="pl-4 pr-2 w-full md:w-auto mt-2 md:mt-0">
              <button type="submit" className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white rounded-full p-4 md:px-8 md:py-4 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 font-bold">
                <Search className="w-5 h-5" />
                <span className="md:hidden">Search</span>
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* 4. Place Details Modal & Guide */}
      <AnimatePresence>
        {activePlace && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setActivePlace(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button onClick={() => setActivePlace(null)} className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white text-slate-800 shadow-lg transition-all">
                <X className="w-6 h-6" />
              </button>

              {/* Photos Column */}
              <div className="w-full md:w-5/12 bg-slate-100 flex flex-col h-[30vh] md:h-full shrink-0 relative">
                <div className="relative h-3/4">
                  <img src={selectedAttraction ? selectedAttraction.img : activePlace.photos[0]} className="w-full h-full object-cover transition-opacity duration-300" alt="View" />
                </div>
                {!selectedAttraction && (
                  <div className="h-1/4 flex gap-2 p-2 overflow-x-auto bg-slate-900 scrollbar-hide">
                    {activePlace.photos.map((url: string, idx: number) => (
                      <img key={idx} src={url} className="h-full w-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity" alt="thumbnail" />
                    ))}
                  </div>
                )}
              </div>

              {/* Information Column */}
              <div className="w-full md:w-7/12 p-8 md:p-10 overflow-y-auto bg-slate-50 relative scroll-smooth">
                
                {/* --- DETAILED ATTRACTION VIEW --- */}
                {selectedAttraction ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button 
                      onClick={() => setSelectedAttraction(null)}
                      className="mb-6 flex items-center gap-2 text-rose-600 hover:text-rose-800 font-bold transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back to Itinerary
                    </button>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{selectedAttraction.type}</span>
                    </div>
                    
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedAttraction.name}</h2>
                    
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-rose-500" /> Historical Significance
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {selectedAttraction.history}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Suggested Visit Time</p>
                          <p className="text-sm text-slate-500">{selectedAttraction.visitTime} ({selectedAttraction.timeLabel})</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
                        <Ticket className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Entry Fee</p>
                          <p className="text-sm text-slate-500">{selectedAttraction.fee}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                ) : (
                  /* --- MAIN ITINERARY VIEW --- */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-sm tracking-widest uppercase mb-3">
                      <Map className="w-4 h-4" />
                      {activePlace.location}
                    </div>
                    
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{activePlace.name}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">{activePlace.description}</p>

                    {itinerary.length === 0 ? (
                      <button onClick={handleGenerateGuide} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        Build Custom Itinerary <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="space-y-8 pb-10">
                        <div className="pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                              <Calendar className="w-6 h-6 text-rose-500" /> Your {formData.days}-Day Itinerary
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            {itinerary.map((dayItem) => (
                              <div key={dayItem.day} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-rose-300 transition-colors">
                                <button 
                                  onClick={() => setExpandedDay(expandedDay === dayItem.day ? null : dayItem.day)}
                                  className="w-full p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${expandedDay === dayItem.day ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}>
                                      D{dayItem.day}
                                    </div>
                                    <span className="font-bold text-lg text-slate-900">{dayItem.title}</span>
                                  </div>
                                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedDay === dayItem.day ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                  {expandedDay === dayItem.day && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t border-slate-100 bg-slate-50/50"
                                    >
                                      <div className="p-5 relative before:absolute before:inset-0 before:ml-[3.5rem] before:h-full before:w-0.5 before:bg-slate-200">
                                        {dayItem.places.map((place: any, idx: number) => (
                                          <div 
                                            key={idx} 
                                            onClick={() => setSelectedAttraction(place)}
                                            className="relative flex items-center mb-6 last:mb-0 cursor-pointer group"
                                          >
                                            <div className="absolute left-6 w-3 h-3 bg-white border-2 border-rose-500 rounded-full z-10"></div>
                                            <div className="ml-12 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-center group-hover:border-rose-400 group-hover:shadow-md transition-all">
                                              
                                              {/* TIME SLOT */}
                                              <div className="hidden md:flex flex-col items-center justify-center bg-slate-50 p-2 rounded-lg border border-slate-100 min-w-[80px]">
                                                {place.TimeIcon}
                                                <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">{place.timeLabel}</span>
                                                <span className="text-xs font-bold text-slate-800">{place.visitTime}</span>
                                              </div>

                                              <img src={place.img} alt={place.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                                              <div className="pr-8 flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <h5 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{place.name}</h5>
                                                  {place.type === 'Historical' && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Historic</span>}
                                                </div>
                                                <p className="text-slate-600 text-sm line-clamp-2">{place.desc}</p>
                                                {/* Mobile Time */}
                                                <div className="md:hidden mt-2 flex items-center gap-1 text-xs font-bold text-slate-500">
                                                  <Clock className="w-3 h-3"/> {place.visitTime}
                                                </div>
                                              </div>
                                              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight className="w-5 h-5 text-rose-500" />
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
