import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Sparkles, Moon, Sun, Clock, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

const OudersPeutersPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      subtitle: p.id === 7 ? "Meest gekozen" : p.id === 11 ? "Super rustgevend" : "Zacht en knuffelbaar",
      landingBadge: p.id === 7 ? "⭐ BESTSELLER #1" : p.id === 11 ? "⭐ BESTSELLER #2" : "⭐ BESTSELLER #3",
    }));

  const reviews = [
    { name: "Sanne", context: "Moeder van Daan (3 jaar)", rating: 5, text: "Daan had elke nacht nachtmerries. Zijn dinosaurus is nu zijn 'beschermer'. De nachtmerries zijn bijna helemaal weg!", product: "Dinosaurus" },
    { name: "Peter", context: "Vader van Sophie (2,5 jaar)", rating: 5, text: "Het bedtijdritueel was altijd een strijd. Nu vraagt Sophie zelf om haar eenhoorn en het 'sterrenfeestje'!", product: "Eenhoorn" },
    { name: "Linda", context: "Moeder van Lucas (4 jaar)", rating: 5, text: "Lucas werd altijd wakker als wij naar bed gingen. Nu blijft hij liggen met zijn pinguïn. Eindelijk een avond voor onszelf!", product: "Pinguïn" }
  ];

  const faqs = [
    { question: "Mijn peuter wil niet alleen slapen. Helpt dit?", answer: "Veel ouders melden dat hun peuter zich veiliger voelt met een Droomvriendje. De combinatie van een knuffelmaatje, zacht licht en rustgevend geluid geeft kinderen het gevoel dat ze niet alleen zijn." },
    { question: "Mijn kind heeft nachtmerries. Kan dit helpen?", answer: "Het zachte licht van een Droomvriendje kan kinderen helpen om zich veiliger te voelen in het donker. Veel ouders melden een vermindering van nachtmerries." },
    { question: "Is dit geschikt voor een kind van 2-4 jaar?", answer: "Ja! In deze leeftijd ontwikkelen kinderen vaak angst voor het donker. De knuffels zijn stevig genoeg om mee te spelen en zacht genoeg om mee te knuffelen." },
    { question: "Hoe voorkom ik dat het licht de hele nacht aan blijft?", answer: "Alle Droomvriendjes hebben een timer functie (30 of 60 minuten). Zo leert je kind om in te slapen met het licht, maar slaapt het de rest van de nacht in het donker." }
  ];

  const bedtimeSteps = [
    { icon: Sun, title: "18:30 - Afronden", desc: "Laatste speeltijd, tv uit, rustiger worden" },
    { icon: Clock, title: "19:00 - Bad tijd", desc: "Warm bad, tandenpoetsen, pyjama aan" },
    { icon: Moon, title: "19:30 - Verhaal", desc: "Lekker samen lezen in bed" },
    { icon: Sparkles, title: "19:45 - Droomvriendje", desc: "Licht aan, knuffel vast, welterusten!" }
  ];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fffef5]">
      <CartSidebar />
      
      {/* Decorative stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Sparkles className="absolute top-32 left-[10%] w-6 h-6 text-yellow-300 animate-pulse" />
        <Sparkles className="absolute top-48 right-[15%] w-4 h-4 text-yellow-400 animate-pulse" style={{animationDelay: '0.5s'}} />
        <Moon className="absolute top-24 right-[25%] w-8 h-8 text-[#2d5a3d]/20" />
        <Sparkles className="absolute bottom-32 left-[20%] w-5 h-5 text-yellow-300 animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      {/* Header */}
      <header className="bg-white border-b-4 border-[#2d5a3d] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.svg" alt="Droomvriendjes.nl" className="h-14 w-auto" />
            </Link>
            <Link to="/knuffels">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-[#2d5a3d] font-bold rounded-full px-6 py-2 shadow-lg transition-all hover:scale-105 hover:-rotate-1">
                ⭐ Bekijk knuffels
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Screen Playful */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-full px-4 py-2 text-sm text-[#2d5a3d] mb-6 rotate-[-2deg]">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Voor peuters van 1-4 jaar
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d5a3d] mb-6 leading-tight" style={{fontFamily: 'Quicksand, sans-serif'}}>
                Geen monsters<br />
                <span className="relative inline-block">
                  meer onder het bed
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#FDFD96" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-[#5a7a5a] mb-8 leading-relaxed">
                Maak van bedtijd een fijn avontuur! Met een Droomvriendje wordt de kamer magisch en voelt je peuter zich veilig.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {["✨ Sterrenprojectie", "🛡️ Beschermer", "⏰ Timer functie"].map((item, idx) => (
                  <span key={idx} className="bg-white border-2 border-[#2d5a3d] rounded-full px-4 py-2 text-sm font-medium text-[#2d5a3d]">
                    {item}
                  </span>
                ))}
              </div>
              
              <Link to="/knuffels">
                <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-10 py-6 text-lg shadow-xl transition-all hover:scale-105 hover:rotate-1">
                  Ontdek de magie ✨
                </Button>
              </Link>
            </div>
            
            {/* Right - Floating Products */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[400px] md:h-[500px]">
                {/* Main product */}
                <Link to={`/product/${landingProducts[0]?.id}`} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <Card className="w-56 md:w-64 rounded-2xl border-b-4 border-[#2d5a3d] shadow-2xl rotate-[-3deg] hover:rotate-0 hover:shadow-3xl transition-all cursor-pointer">
                    <div className="bg-gradient-to-b from-yellow-50 to-white p-4 rounded-t-2xl aspect-square flex items-center justify-center">
                      <img src={landingProducts[0]?.image} alt={landingProducts[0]?.shortName} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <CardContent className="p-4 text-center bg-white rounded-b-2xl">
                      <p className="font-bold text-[#2d5a3d]">{landingProducts[0]?.shortName}</p>
                    </CardContent>
                  </Card>
                </Link>
                
                {/* Side products */}
                <Link to={`/product/${landingProducts[1]?.id}`} className="absolute top-8 left-4 z-10">
                  <Card className="w-36 md:w-44 rounded-xl border-b-4 border-[#2d5a3d] shadow-lg rotate-[8deg] hover:rotate-[12deg] hover:shadow-xl transition-all cursor-pointer">
                    <div className="bg-pink-50 p-3 rounded-t-xl aspect-square flex items-center justify-center">
                      <img src={landingProducts[1]?.image} alt={landingProducts[1]?.shortName} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </Card>
                </Link>
                
                <Link to={`/product/${landingProducts[2]?.id}`} className="absolute bottom-8 right-4 z-10">
                  <Card className="w-36 md:w-44 rounded-xl border-b-4 border-[#2d5a3d] shadow-lg rotate-[-8deg] hover:rotate-[-12deg] hover:shadow-xl transition-all cursor-pointer">
                    <div className="bg-blue-50 p-3 rounded-t-xl aspect-square flex items-center justify-center">
                      <img src={landingProducts[2]?.image} alt={landingProducts[2]?.shortName} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section - Zig Zag */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyMCA0MCIgc3Ryb2tlPSIjZjBmNGYwIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMCAyMEw0MCAyMCIgc3Ryb2tlPSIjZjBmNGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Herken je dit? 🙋
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "😰", title: "Angst voor donker", desc: "Rond 2-3 jaar heel normaal" },
              { emoji: "🛏️", title: "Niet alleen slapen", desc: "Wil bij papa of mama" },
              { emoji: "⏰", title: "Eindeloze bedtijd", desc: "'Nog één verhaaltje!'" },
              { emoji: "😱", title: "Nachtmerries", desc: "Enge dromen" }
            ].map((item, idx) => (
              <Card key={idx} className={`rounded-xl border-2 border-dashed border-[#2d5a3d]/30 p-6 text-center hover:border-[#2d5a3d] hover:shadow-lg transition-all ${idx % 2 === 1 ? 'mt-4' : ''}`}>
                <span className="text-4xl mb-3 block">{item.emoji}</span>
                <p className="font-bold text-[#2d5a3d] mb-1">{item.title}</p>
                <p className="text-sm text-[#7a9a7a]">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bedtime Routine Timeline */}
      <section className="py-20 bg-[#f8fdf8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Het perfecte bedtijdritueel 🌙
            </h2>
            <p className="text-[#5a7a5a]">Een vast ritueel geeft rust en voorspelbaarheid</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-[#2d5a3d] to-[#2d5a3d] rounded-full hidden md:block"></div>
            
            <div className="space-y-6">
              {bedtimeSteps.map((step, idx) => (
                <div key={idx} className={`flex items-start gap-6 ${idx % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${idx === 3 ? 'bg-yellow-400' : 'bg-[#2d5a3d]'}`}>
                    <step.icon className={`w-8 h-8 ${idx === 3 ? 'text-[#2d5a3d]' : 'text-white'}`} />
                  </div>
                  <Card className={`flex-1 rounded-xl p-6 border-2 ${idx === 3 ? 'border-yellow-400 bg-yellow-50' : 'border-[#e0ebe0] bg-white'}`}>
                    <p className="font-bold text-[#2d5a3d] text-lg mb-1">{step.title}</p>
                    <p className="text-[#5a7a5a]">{step.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
              Andere ouders vertellen 💬
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className={`rounded-2xl p-6 border-b-4 border-[#2d5a3d] ${idx === 1 ? 'md:-mt-4 bg-yellow-50' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#2d5a3d]">{review.name}</p>
                    <p className="text-sm text-[#7a9a7a]">{review.context}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-[#4a6a4a] italic">"{review.text}"</p>
                <p className="text-sm text-[#7a9a7a] mt-3">✨ {review.product}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="producten" className="py-24 bg-[#fffef5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link to="/knuffels" className="hover:opacity-80 transition-opacity">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4" style={{fontFamily: 'Quicksand, sans-serif'}}>
                Welke wordt jouw held? ⭐
              </h2>
            </Link>
            <p className="text-[#5a7a5a] text-lg">Stoere dino, magische eenhoorn of vrolijke pinguïn?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingProducts.map((product, idx) => (
              <Card key={product.id} className={`rounded-2xl border-b-4 border-[#2d5a3d] overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 ${idx === 0 ? 'bg-green-50' : idx === 1 ? 'bg-pink-50' : 'bg-blue-50'}`}>
                <Link to={`/product/${product.id}`}>
                  <div className="p-8 flex items-center justify-center aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-contain max-h-[180px] hover:scale-110 transition-transform" />
                  </div>
                </Link>
                <CardContent className="p-6 text-center bg-white">
                  <span className="inline-block bg-yellow-100 text-[#2d5a3d] text-xs font-bold px-3 py-1 rounded-full mb-3">{product.landingBadge}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#2d5a3d] text-xl mb-1 hover:text-[#4a8a5a]">{product.shortName}</h3>
                  </Link>
                  <p className="text-sm text-[#7a9a7a] mb-4">{product.subtitle}</p>
                  <p className="text-2xl font-bold text-[#2d5a3d] mb-4">€{product.price.toFixed(2).replace('.', ',')}</p>
                  <Button onClick={() => handleAddToCart(product)} className="w-full bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full py-5 shadow-lg transition-all hover:scale-[1.02]">
                    In winkelwagen ⭐
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2d5a3d] mb-12 text-center" style={{fontFamily: 'Quicksand, sans-serif'}}>
            Vragen? 🤔
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-[#f8fdf8] rounded-xl px-6 border-2 border-dashed border-[#2d5a3d]/20">
                <AccordionTrigger className="text-left font-semibold text-[#2d5a3d] hover:text-[#4a8a5a] py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#5a7a5a] pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer variant="green" />
    </div>
  );
};

export default OudersPeutersPage;
