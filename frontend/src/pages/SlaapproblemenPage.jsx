import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Moon, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const SlaapproblemenPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "BESTSELLER" : p.id === 11 ? "POPULAIR" : "FAVORIET",
    }));

  const reviews = [
    { name: "Marloes", context: "Moeder van Sem (2 jaar)", rating: 5, text: "Sem deed er soms 2 uur over om in slaap te vallen. Met het vaste ritueel van zijn Droomvriendje is dit teruggebracht naar 20 minuten. Echt ongelofelijk!", product: "Beer Sterrenprojector" },
    { name: "Rick", context: "Vader van Lotte (3 jaar)", rating: 5, text: "Lotte werd elke nacht 3-4 keer wakker. Nu zet ze zelf haar knuffel aan als ze wakker wordt en valt ze weer in slaap. Wij slapen eindelijk door!", product: "Panda Projector" },
    { name: "Denise", context: "Moeder van Thomas (4 jaar)", rating: 5, text: "Het bedtijdritueel was altijd een strijd. Nu vraagt Thomas zelf om naar bed te gaan om met zijn Droomvriendje te knuffelen. Wat een verandering!", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Hoe helpt dit bij inslapen?", answer: "De combinatie van zacht licht en kalmerende geluiden helpt het brein om te schakelen naar slaapmodus. Het creëren van een vast ritueel rond het Droomvriendje versterkt dit effect." },
    { question: "Helpt het ook bij doorslapen?", answer: "Ja! Veel kinderen worden 's nachts wakker en kunnen dan zelf hun knuffel aanzetten voor geruststelling. Dit helpt hen om weer in slaap te vallen zonder hulp van ouders." },
    { question: "Wat zijn de beste instellingen voor slaap?", answer: "We raden aan om te beginnen met het laagste lichtniveau en een zacht, constant geluid zoals white noise of hartslag. De timer op 30 of 60 minuten is ideaal." },
    { question: "Hoe creëer ik een goed bedtijdritueel?", answer: "Start elke avond op hetzelfde tijdstip. Zet het Droomvriendje samen aan, dim de lichten, en laat je kind zelf kiezen welk geluid. Deze voorspelbaarheid helpt het lichaam om te weten dat het bedtijd is." }
  ];

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f9f5]">
      <CartSidebar />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.svg" alt="Droomvriendjes.nl" className="h-16 w-auto" />
            </Link>
            <a href="#producten">
              <Button className="bg-white border-2 border-[#2d5a3d] text-[#2d5a3d] hover:bg-[#f5f9f5] rounded-full px-6">
                Bekijk knuffels <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white border border-[#c5d9c8] rounded-full px-4 py-2 text-sm text-[#2d5a3d] mb-6">
                Tips voor betere bedtijd
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Van worstelen naar<br />
                <span className="text-[#3d7a4d]">rustig inslapen</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Bedtijd hoeft geen strijd te zijn. Met de juiste routine en hulpmiddelen kan je kind leren om rustig in slaap te vallen — en door te slapen. Een Droomvriendje maakt het bedtijdritueel iets om naar uit te kijken.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Clock className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Vast ritueel</strong> — Voorspelbaarheid helpt het lichaam ontspannen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Moon className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Zacht licht</strong> — Signaleert aan het brein dat het bedtijd is</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Sparkles className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Kalmerende geluiden</strong> — White noise helpt bij in- én doorslapen</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <a href="#producten">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Bekijk Slaapknuffels
                  </Button>
                </a>
                <span className="text-sm text-[#5a7a5a]">14 dagen retourgarantie</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <img src={landingProducts[0]?.image} alt="Droomvriendjes" className="w-full h-auto max-h-96 object-contain mx-auto" />
                <div className="text-center mt-6">
                  <p className="text-[#2d5a3d] font-semibold text-lg">Het perfecte bedtijdritueel</p>
                  <p className="text-[#5a7a5a]">Maakt inslapen leuk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="producten" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Populair bij Slaapproblemen</h2>
            <p className="text-lg text-[#5a7a5a]">Deze knuffels helpen het meest bij in- en doorslapen</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingProducts.map((product) => (
              <Card key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border">
                <div className="relative">
                  <span className="absolute top-4 left-4 bg-[#2d5a3d] text-white px-3 py-1 rounded-full text-sm font-semibold">{product.landingBadge}</span>
                  <div className="p-6 bg-gradient-to-b from-[#f5f9f5] to-white">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-contain mx-auto" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2d5a3d] mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />))}
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#2d5a3d]">€{product.price}</span>
                    <Button onClick={() => handleAddToCart(product)} className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-6">Bestel nu</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f5f9f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Ervaringen van Ouders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white rounded-2xl p-6 border-0 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />))}
                </div>
                <p className="text-[#4a6a4a] mb-4 italic">"{review.text}"</p>
                <div className="border-t border-[#c5d9c8] pt-4">
                  <p className="font-semibold text-[#2d5a3d]">{review.name}</p>
                  <p className="text-sm text-[#5a7a5a]">{review.context}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2d5a3d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div><p className="text-4xl font-bold mb-2">86%</p><p className="text-[#a5d6a7]">slaapt sneller in</p></div>
            <div><p className="text-4xl font-bold mb-2">1000+</p><p className="text-[#a5d6a7]">tevreden gezinnen</p></div>
            <div><p className="text-4xl font-bold mb-2">4.8★</p><p className="text-[#a5d6a7]">gemiddelde score</p></div>
            <div><p className="text-4xl font-bold mb-2">14</p><p className="text-[#a5d6a7]">dagen proberen</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Veelgestelde Vragen</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-[#f5f9f5] rounded-xl px-6 border-0">
                <AccordionTrigger className="text-left text-[#2d5a3d] font-semibold hover:no-underline py-6">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#5a7a5a] pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-[#f5f9f5]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Start een beter bedtijdritueel</h2>
            <p className="text-lg text-[#5a7a5a] mb-8">14 dagen proberen. Niet tevreden? Geld terug.</p>
            <Link to="/knuffels">
              <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-10 py-6 text-lg">Bekijk Alle Slaapknuffels</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SlaapproblemenPage;
