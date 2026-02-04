"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Send, MessageSquare, Anchor, 
  Mountain, Plane, Sparkles, X, Phone
} from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { title: "MAR", sub: "Yates & Islas", icon: <Anchor />, img: "/assets/hero_yacht.png", color: "from-blue-900/40" },
    { title: "TIERRA", sub: "Cenotes & Cultura", icon: <Mountain />, img: "/assets/beach_club_exclusive.png", color: "from-emerald-900/40" },
    { title: "CIELO", sub: "Vuelos Privados", icon: <Plane />, img: "/assets/hero_yacht.png", color: "from-amber-900/40" }, // Reusing assets
    { title: "BIENESTAR", sub: "Spa & Chef", icon: <Sparkles />, img: "/assets/mystiq_tulum.jpg", color: "from-purple-900/40" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    startMayaInteraction(query);
  };

  const startMayaInteraction = async (text: string) => {
    setIsChatOpen(true);
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, history: [] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, estoy teniendo un momento de desconexión. ¿Podemos seguir por WhatsApp?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <main className="relative min-h-screen selection:bg-amber-500/30">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative">
             <Image src="/assets/colibri_isotipo.png" alt="Colibrí" fill className="invert" />
          </div>
          <span className="text-xl font-playfair tracking-[6px] uppercase pt-1">
             Colibrí <span className="font-light opacity-60">Concierge</span>
          </span>
        </div>
        <div className="hidden lg:flex gap-12 text-[10px] tracking-[4px] uppercase font-bold opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Experiencias</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Sobre Nosotros</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Reservar</a>
        </div>
        <button className="luxe-btn !bg-white !text-black !py-2.5 !px-8 border-none flex items-center gap-2">
           <Phone className="w-3 h-3" /> WhatsApp
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 -z-10">
          <Image 
            src="/assets/hero_yacht.png" 
            alt="Colibrí Experience" 
            fill 
            className="object-cover opacity-50 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-zinc-950" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl w-full text-center"
        >
          <span className="text-[10px] tracking-[12px] uppercase opacity-40 mb-8 block font-montserrat">
             Por Cielo, Mar y Tierra
          </span>
          <h1 className="text-6xl md:text-[130px] leading-[0.9] font-playfair mb-10 italic">
             La libertad es tu <br />
             <span className="text-gradient not-italic">Único Lujo</span>
          </h1>
          <p className="text-sm md:text-lg max-w-2xl mx-auto opacity-70 mb-16 font-light leading-relaxed">
             Tu insider local orquestando los secretos mejor guardados de la Riviera Maya.
             Háblame de tu próximo viaje y dejaré que Maya diseñe tu logística invisible.
          </p>

          {/* MAYA SEARCH BOX */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
             <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 to-amber-200/30 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
             <div className="relative flex items-center bg-black/40 backdrop-blur-[30px] border border-white/10 rounded-full p-2.5 transition-all duration-500 hover:border-white/30">
                <Search className="w-5 h-5 ml-6 opacity-30" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Cómo quieres vivir el paraíso hoy?"
                  className="bg-transparent border-none outline-none flex-1 px-6 py-4 text-sm font-montserrat tracking-wide text-white placeholder:text-white/20"
                />
                <button type="submit" className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors">
                   <Send className="w-5 h-5 mr-0.5" />
                </button>
             </div>
          </form>
        </motion.div>
      </section>

      {/* ATMOSPHERES GRID */}
      <section className="bg-zinc-950 py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
             <div className="max-w-xl">
                <h5 className="text-[10px] tracking-[6px] uppercase opacity-40 mb-4">Colecciones</h5>
                <h2 className="text-4xl md:text-6xl italic leading-tight">Explora por <br /><span className="text-gradient not-italic">Atmósfera</span></h2>
             </div>
             <button className="luxe-btn">Descubrir Todo</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image 
                  src={cat.img} 
                  alt={cat.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80`} />
                <div className={`absolute inset-0 bg-gradient-to-tr ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                   {cat.icon}
                </div>

                <div className="absolute bottom-10 left-10">
                   <span className="text-[10px] tracking-[4px] opacity-60 uppercase mb-2 block">{cat.sub}</span>
                   <h3 className="text-4xl font-playfair tracking-tight">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING MAYA BUTTON */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-10 right-10 z-[110] w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* MAYA CHAT PANEL (AGENTIC) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed inset-0 md:inset-auto md:bottom-32 md:right-10 md:w-[480px] md:h-[700px] z-[120] flex flex-col glass-panel shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-white flex justify-between items-center text-black">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 relative">
                     <Image src="/assets/colibri_isotipo.png" alt="Maya" fill className="opacity-80" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl tracking-tight leading-none mb-1">Maya</h3>
                    <p className="text-[9px] tracking-[3px] uppercase opacity-40 font-bold">Experience Architect</p>
                  </div>
               </div>
               <button onClick={() => setIsChatOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5 opacity-40" />
               </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-20 px-10">
                   <Sparkles className="w-8 h-8 mx-auto mb-6 opacity-20 text-amber-400" />
                   <p className="text-sm opacity-40 leading-relaxed italic">
                      &quot;Soy Maya, tu insider personal. Cuéntame cómo imaginas tu día perfecto o déjame sorprenderte con los secretos de la costa.&quot;
                   </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                     m.role === 'user' 
                     ? 'bg-amber-400 text-black font-medium rounded-tr-none' 
                     : 'bg-white/5 border border-white/10 text-zinc-100 rounded-tl-none'
                   }`}>
                      {m.content}
                   </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/5 p-4 rounded-2xl animate-pulse text-[10px] tracking-widest opacity-40">
                      Maya está orquestando tu respuesta...
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-6 bg-black/40 border-t border-white/5">
                <div className="relative flex items-center bg-zinc-950 border border-white/10 rounded-full py-1.5 px-2 transition-focus focus-within:border-amber-400/50">
                   <input 
                    autoFocus
                    type="text" 
                    placeholder="Escribe aquí..."
                    className="bg-transparent border-none outline-none flex-1 px-6 py-3 text-sm text-white placeholder:text-white/20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        startMayaInteraction(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                   />
                   <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                      <Send className="w-4 h-4" />
                   </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
