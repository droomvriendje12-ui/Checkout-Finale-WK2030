import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Sparkles, Heart, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';

const HSPPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "MEEST ZACHT" : p.id === 11 ? "EXTRA RUSTIG" : "POPULAIR",
    }));

  const reviews = [
    { name: "Monique", context: "Moeder van HSP-kind Eva (6 jaar)", rating: 5, text: "Eva voelt alles intens. Geluiden, emoties, indrukken. Het Droomvriendje geeft haar een veilige cocon om tot rust te komen. Het zachte licht is precies goed - niet te fel.", product: "Beer Sterrenprojector" },
    { name: "Karin", context: "Moeder van HSP-kind Daan (4 jaar)", rating: 5, text: "Daan is hoogsensitief en had altijd moeite met inslapen. Te veel indrukken van de dag. Nu focust hij op zijn knuffel en de sterren, en vergeet hij even alle prikkels.", product: "Panda Projector" },
    { name: "Inge", context: "Moeder van HSP-kind Lina (5 jaar)", rating: 5, text: "Als HSP-moeder van een HSP-kind herken ik de behoefte aan zachtheid. Dit product is precies dat - zacht licht, zachte geluiden, zachte stof. Perfect voor ons.", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Wat is hoogsensitiviteit (HSP)?", answer: "Hoogsensitieve personen (HSP) verwerken prikkels dieper en intenser. Dit kan leiden tot snellere overprikkeling, maar ook tot grote empathie en creativiteit. Ongeveer 15-20% van de mensen is HSP." },
    { question: "Waarom werkt dit goed voor HSP-kinderen?", answer: "HSP-kinderen hebben behoefte aan zachte, voorspelbare prikkels. Het gedimde licht en de rustige geluiden van een Droomvriendje bieden precies dat - geen overweldigende stimulatie, maar troostende aanwezigheid." },
    { question: "Is het licht niet te stimulerend voor HSP?", answer: "Het licht is speciaal ontworpen om kalmerend te werken. Je kunt het dimmen tot een zeer laag niveau. Veel HSP-kinderen vinden juist troost in een klein beetje licht - het donker kan ook overweldigend aanvoelen." },
    { question: "Kan mijn HSP-kind de geluiden zelf kiezen?", answer: "Ja, en dat is juist fijn voor HSP-kinderen. Zij weten vaak precies wat ze nodig hebben. Door zelf te kiezen krijgen ze ook een gevoel van controle, wat rust geeft." }
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
                Speciaal voor hoogsensitieve kinderen
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Zachtheid voor<br />
                <span className="text-[#3d7a4d]">gevoelige zieltjes</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Hoogsensitieve kinderen voelen alles intenser. De wereld kan overweldigend zijn met alle prikkels. Een Droomvriendje biedt een zachte, veilige cocon — precies afgestemd op wat gevoelige kinderen nodig hebben.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Sparkles className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Zachte prikkels</strong> — Gedimde verlichting en rustige geluiden</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Veilige cocon</strong> — Een eigen plek om tot rust te komen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Troost zonder woorden</strong> — Soms is vasthouden genoeg</span>
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
                  <p className="text-[#2d5a3d] font-semibold text-lg">Extra zacht en rustig</p>
                  <p className="text-[#5a7a5a]">Perfect voor HSP-kinderen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <ProductSlider 
        onAddToCart={handleAddToCart}
        title="Aanbevolen voor HSP-kinderen"
        subtitle="Extra zachte modellen met minimale prikkels"
      />

      <section className="py-16 bg-[#f5f9f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Ervaringen van HSP-ouders</h2>
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
            <div><p className="text-4xl font-bold mb-2">15-20%</p><p className="text-[#a5d6a7]">is HSP</p></div>
            <div><p className="text-4xl font-bold mb-2">1000+</p><p className="text-[#a5d6a7]">tevreden gezinnen</p></div>
            <div><p className="text-4xl font-bold mb-2">4.9★</p><p className="text-[#a5d6a7]">van HSP-ouders</p></div>
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
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Zachtheid voor je gevoelige kind</h2>
            <p className="text-lg text-[#5a7a5a] mb-8">14 dagen proberen. Niet tevreden? Geld terug.</p>
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

export default HSPPage;
