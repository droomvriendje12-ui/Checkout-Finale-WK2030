import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Shield, Heart, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';

const AngstPage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "MEEST TROOSTEND" : p.id === 11 ? "POPULAIR" : "FAVORIET",
    }));

  const reviews = [
    { name: "Sandra", context: "Moeder van Lucas (5 jaar)", rating: 5, text: "Lucas was doodsbang in het donker. Elke nacht huilen en bij ons in bed. Sinds zijn Droomvriendje slaapt hij trots in zijn eigen kamer. Het zachte licht geeft hem moed.", product: "Beer Sterrenprojector" },
    { name: "Bart", context: "Vader van Sophie (4 jaar)", rating: 5, text: "Sophie had nachtmerries en durfde niet alleen te slapen. Nu houdt ze haar knuffel vast en kijkt naar de sterren op het plafond. Ze voelt zich veilig.", product: "Panda Projector" },
    { name: "Ellen", context: "Moeder van Tim (6 jaar)", rating: 5, text: "Tim had veel angst, ook overdag. Het Droomvriendje is zijn maatje geworden. Als hij bang is, pakt hij het en wordt hij rustig. Een echte steun.", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Hoe helpt dit tegen angst in het donker?", answer: "Het zachte nachtlicht geeft net genoeg verlichting om het donker minder eng te maken, zonder de slaap te verstoren. De sterrenprojectie geeft iets moois om naar te kijken in plaats van het 'enge' donker." },
    { question: "Mijn kind is ook overdag angstig. Helpt dit dan ook?", answer: "Ja, een Droomvriendje kan ook overdag worden gebruikt. Het vasthouden van iets vertrouwds en zachts kan troost bieden bij angstgevoelens, ongeacht het tijdstip." },
    { question: "Wordt mijn kind niet afhankelijk van de knuffel?", answer: "Een overgangs- of troostobject is normaal en gezond voor kinderen. Naarmate ze ouder worden en meer zelfvertrouwen krijgen, hebben ze het vanzelf minder nodig." },
    { question: "Wat als mijn kind nog steeds bang is?", answer: "Een Droomvriendje is een hulpmiddel, geen wondermiddel. Bij ernstige angstklachten raden we altijd aan om ook professionele hulp te zoeken. Maar voor veel kinderen maakt het een groot verschil." }
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
                Hulp bij angst en bangheid
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Een maatje tegen<br />
                <span className="text-[#3d7a4d]">angst in het donker</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Bang in het donker. Nachtmerries. Niet alleen durven slapen. Zoveel kinderen worstelen hiermee. Een Droomvriendje biedt een veilig, zacht maatje dat waakt in de nacht — met licht en geluid als geruststelling.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Moon className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Zacht nachtlicht</strong> — Maakt het donker minder eng</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Veilig maatje</strong> — Iets vertrouwds om vast te houden</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Geeft moed</strong> — Kinderen voelen zich minder alleen</span>
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
                  <p className="text-[#2d5a3d] font-semibold text-lg">Troostend maatje</p>
                  <p className="text-[#5a7a5a]">Waakt over je kind in de nacht</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <ProductSlider 
        onAddToCart={handleAddToCart}
        title="Aanbevolen bij Angst"
        subtitle="Deze knuffels geven het meeste gevoel van veiligheid"
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
            <div><p className="text-4xl font-bold mb-2">89%</p><p className="text-[#a5d6a7]">minder angst</p></div>
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
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Geef je kind een veilig maatje</h2>
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

export default AngstPage;
