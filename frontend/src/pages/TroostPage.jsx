import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Heart, Coffee, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';

const TroostPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "VOOR OUDERS" : p.id === 11 ? "RUSTGEVEND" : "POPULAIR",
    }));

  const reviews = [
    { name: "Marieke", context: "Moeder van twee (3 en 5 jaar)", rating: 5, text: "Als de kinderen eindelijk slapen, zet ik hun Droomvriendje ook even voor mezelf aan. Dat zachte licht en geluid... het is ook voor mij een moment van rust na een drukke dag.", product: "Beer Projector" },
    { name: "Jessica", context: "Moeder van Mila (2 jaar)", rating: 5, text: "Het Droomvriendje heeft niet alleen Mila geholpen, maar ook mij. Als zij rustig inslaapt, heb ik eindelijk even tijd voor mezelf. Dat is goud waard als moeder.", product: "Panda Projector" },
    { name: "Caroline", context: "Moeder van drieling (1 jaar)", rating: 5, text: "Met drie baby's tegelijk is rust een zeldzaamheid. Als ze allemaal liggen met hun Droomvriendjes, heb ik eindelijk even een moment om op adem te komen.", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Kunnen ouders dit ook gebruiken?", answer: "Absoluut! Hoewel Droomvriendjes zijn ontworpen voor kinderen, vinden veel ouders de zachte geluiden en het licht ook ontspannend. Sommige ouders hebben zelfs hun eigen knuffel!" },
    { question: "Hoe creëer ik meer rust als ouder?", answer: "Begin met een vast bedtijdritueel voor je kinderen. Als zij sneller en beter slapen, krijg je vanzelf meer tijd voor jezelf. Het Droomvriendje kan hierbij helpen." },
    { question: "Ik ben uitgeput. Helpt dit echt?", answer: "Een Droomvriendje is geen wondermiddel voor oudermoeheid, maar het kan wel helpen doordat je kind beter slaapt. En elk extra uur slaap telt als ouder!" },
    { question: "Kan ik de geluiden ook zonder de knuffel gebruiken?", answer: "De geluiden zitten in de knuffel zelf, maar veel ouders vinden het prettig om soortgelijke geluiden op hun telefoon af te spelen voor hun eigen ontspanning." }
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
                Ook voor vermoeide ouders
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Een rustmoment<br />
                <span className="text-[#3d7a4d]">voor jou als ouder</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Je geeft de hele dag. Aan je kinderen, je werk, je huishouden. Maar wanneer krijg jij even rust? Als je kind sneller en beter slaapt dankzij een Droomvriendje, krijg jij ook eindelijk even een moment voor jezelf.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Clock className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Meer avondtijd</strong> — Als je kind sneller slaapt, krijg jij meer tijd</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Coffee className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Minder strijd</strong> — Een fijn bedtijdritueel in plaats van gezeur</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Beter doorslapen</strong> — Minder nachtelijke onderbrekingen</span>
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
                  <p className="text-[#2d5a3d] font-semibold text-lg">Rust voor het hele gezin</p>
                  <p className="text-[#5a7a5a]">Jij verdient het ook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="producten" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Favorieten van Ouders</h2>
            <p className="text-lg text-[#5a7a5a]">Deze knuffels geven de meeste rust — voor kind én ouder</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Van Ouder tot Ouder</h2>
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
            <div><p className="text-4xl font-bold mb-2">2+ uur</p><p className="text-[#a5d6a7]">extra avondtijd</p></div>
            <div><p className="text-4xl font-bold mb-2">1000+</p><p className="text-[#a5d6a7]">blije ouders</p></div>
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
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Gun jezelf ook rust</h2>
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

export default TroostPage;
