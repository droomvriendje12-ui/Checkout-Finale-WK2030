import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Heart, Brain, Smile } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';

const StressPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "MEEST KALMEREND" : p.id === 11 ? "POPULAIR" : "FAVORIET",
    }));

  const reviews = [
    { name: "Marieke", context: "Moeder van Sven (5 jaar)", rating: 5, text: "Sven had veel last van stress op school. Sinds hij zijn Droomvriendje heeft, is het avondritueel veel rustiger geworden. Hij ontspant echt met het zachte licht.", product: "Beer Sterrenprojector" },
    { name: "Peter", context: "Vader van Emma (4 jaar)", rating: 5, text: "Emma piekte veel over van alles. De kalmerende geluiden helpen haar om los te laten. Ze slaapt nu veel beter door.", product: "Panda Projector" },
    { name: "Linda", context: "Moeder van Bram (6 jaar)", rating: 5, text: "Bram is een gevoelig kind met veel stress. Het Droomvriendje geeft hem iets om vast te houden en op te focussen. Echt een verschil!", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Helpt dit echt bij stress?", answer: "Ja, de combinatie van zacht licht, kalmerende geluiden en een knuffelbaar object helpt kinderen om te ontspannen. Dit is gebaseerd op bewezen ontspanningstechnieken." },
    { question: "Vanaf welke leeftijd geschikt?", answer: "Droomvriendjes zijn geschikt vanaf 0 maanden. Voor stressvermindering zien we de beste resultaten bij kinderen vanaf 2 jaar die bewust kunnen focussen op het licht en geluid." },
    { question: "Hoe snel zie ik resultaat?", answer: "De meeste ouders merken binnen 1-2 weken een verschil. Het belangrijkste is om het consequent te gebruiken als onderdeel van het bedtijdritueel." },
    { question: "Kan dit overdag ook gebruikt worden?", answer: "Absoluut! Droomvriendjes kunnen ook overdag worden gebruikt voor rustmomenten, na school, of wanneer je kind even tot rust moet komen." }
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
            <Link to="/knuffels">
              <Button className="bg-white border-2 border-[#2d5a3d] text-[#2d5a3d] hover:bg-[#f5f9f5] rounded-full px-6">
                Bekijk knuffels <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white border border-[#c5d9c8] rounded-full px-4 py-2 text-sm text-[#2d5a3d] mb-6">
                Speciaal voor kinderen met stress
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Help je kind<br />
                <span className="text-[#3d7a4d]">stress los te laten</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Stress bij kinderen uit zich vaak in slaapproblemen, buikpijn of onrust. Een Droomvriendje biedt een veilig rustpunt: zacht licht om op te focussen, kalmerende geluiden om gedachten te stoppen, en iets warms om vast te houden.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Brain className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Helpt gedachten stoppen</strong> — Focus op licht en geluid in plaats van zorgen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Geeft veiligheid</strong> — Iets vertrouwds om vast te houden</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Smile className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Creëert een ritueel</strong> — Voorspelbaarheid vermindert stress</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <Link to="/knuffels">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Bekijk Slaapknuffels
                  </Button>
                </Link>
                <span className="text-sm text-[#5a7a5a]">14 dagen retourgarantie</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <img src={landingProducts[0]?.image} alt="Droomvriendjes" className="w-full h-auto max-h-96 object-contain mx-auto" />
                <div className="text-center mt-6">
                  <p className="text-[#2d5a3d] font-semibold text-lg">Kalmerende slaapknuffel</p>
                  <p className="text-[#5a7a5a]">Helpt je kind ontspannen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <ProductSlider 
        onAddToCart={handleAddToCart}
        title="Aanbevolen bij Stress"
        subtitle="Deze knuffels zijn het meest kalmerend"
      />

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
            <div><p className="text-4xl font-bold mb-2">86%</p><p className="text-[#a5d6a7]">minder stress</p></div>
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
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Geef je kind rust</h2>
            <p className="text-lg text-[#5a7a5a] mb-8">Probeer een Droomvriendje 14 dagen. Niet tevreden? Geld terug.</p>
            <Link to="/knuffels">
              <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-10 py-6 text-lg">Bekijk Alle Slaapknuffels</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer variant="green" />
    </div>
  );
};

export default StressPage;
