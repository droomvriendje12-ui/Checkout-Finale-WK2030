import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ChevronRight, Heart, Moon, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../mockData';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';

const DementiePage = () => {
  const { addToCart, setIsCartOpen } = useCart();

  // Only show IN STOCK products - 7=Beer, 11=Panda, 12=Baby Slaapmaatje Schaap
  const selectedProductIds = [7, 11, 12];
  const landingProducts = allProducts
    .filter(p => selectedProductIds.includes(p.id) && p.inStock !== false)
    .map(p => ({
      ...p,
      landingBadge: p.id === 7 ? "MEEST GEKOZEN" : p.id === 11 ? "EXTRA ZACHT" : "RUSTGEVEND",
    }));

  const reviews = [
    { name: "Annemarie", context: "Dochter van moeder met dementie (78)", rating: 5, text: "Mijn moeder is vaak onrustig, vooral 's avonds. Het Droomvriendje geeft haar iets om vast te houden en het zachte licht kalmeert haar. De verpleging is ook enthousiast.", product: "Beer Projector" },
    { name: "Gerard", context: "Zoon van vader met dementie (82)", rating: 5, text: "Pa heeft het Droomvriendje op zijn nachtkastje. Als hij 's nachts wakker wordt, zet hij het aan. Het geeft hem troost en afleiding van verwarrende gedachten.", product: "Panda Projector" },
    { name: "Marlies", context: "Verzorgende in verpleeghuis", rating: 5, text: "We gebruiken Droomvriendjes bij meerdere bewoners. Het helpt echt bij onrust en geeft een gevoel van geborgenheid. Vooral het vasthouden en het zachte licht werken kalmerend.", product: "Baby Slaapmaatje Schaap" }
  ];

  const faqs = [
    { question: "Werkt dit bij mensen met dementie?", answer: "Ja, veel verzorgenden en familieleden rapporteren dat Droomvriendjes helpen bij onrust. Het vasthouden van iets zachts en het kijken naar kalmerend licht kan troostend werken, ook als woorden niet meer helpen." },
    { question: "Is dit niet kinderachtig voor volwassenen?", answer: "Nee. Bij dementie gaat het om wat troost biedt, niet om wat 'gepast' is. Veel mensen met dementie reageren positief op zachte, knuffelbare objecten. Het gaat om comfort, niet om leeftijd." },
    { question: "Kunnen ze het zelf bedienen?", answer: "De knoppen zijn groot en simpel. Veel mensen met dementie kunnen het zelf aan- en uitzetten. Zo niet, dan kan een verzorger of familielid het instellen." },
    { question: "Helpt het bij sundowning (avondonrust)?", answer: "Sundowning — toenemende onrust aan het einde van de dag — is een bekend verschijnsel bij dementie. Het zachte, warme licht van een Droomvriendje kan helpen om deze overgang naar de avond rustiger te maken." }
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
                Voor mensen met dementie
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2d5a3d] mb-6 leading-tight">
                Troost en rust<br />
                <span className="text-[#3d7a4d]">zonder woorden</span>
              </h1>
              
              <p className="text-lg text-[#5a7a5a] mb-8 leading-relaxed">
                Dementie is verwarrend en eng. Woorden werken niet altijd meer. Maar zachtheid wel. Een Droomvriendje biedt iets om vast te houden, zacht licht om naar te kijken, en troostende geluiden. Soms is dat genoeg.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Heart className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Troostend om vast te houden</strong> — Fysiek contact kalmeert</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Moon className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Zacht licht</strong> — Geeft oriëntatie zonder te prikkelen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="text-[#2d5a3d] mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-[#4a6a4a]"><strong>Helpt bij onrust</strong> — Vooral bij sundowning effectief</span>
                </li>
              </ul>
              
              <div className="flex items-center space-x-6">
                <Link to="/knuffels">
                  <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-8 py-6 text-lg">
                    Bekijk Droomvriendjes
                  </Button>
                </Link>
                <span className="text-sm text-[#5a7a5a]">14 dagen retourgarantie</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <img src={landingProducts[0]?.image} alt="Droomvriendjes" className="w-full h-auto max-h-96 object-contain mx-auto" />
                <div className="text-center mt-6">
                  <p className="text-[#2d5a3d] font-semibold text-lg">Troost en geborgenheid</p>
                  <p className="text-[#5a7a5a]">Ook voor volwassenen met dementie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <ProductSlider 
        onAddToCart={handleAddToCart}
        title="Aanbevolen bij Dementie"
        subtitle="Deze modellen zijn het meest geschikt voor volwassenen"
      />

      <section className="py-16 bg-[#f5f9f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">Ervaringen</h2>
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
            <div><p className="text-4xl font-bold mb-2">280K+</p><p className="text-[#a5d6a7]">mensen met dementie in NL</p></div>
            <div><p className="text-4xl font-bold mb-2">100+</p><p className="text-[#a5d6a7]">in zorginstellingen</p></div>
            <div><p className="text-4xl font-bold mb-2">4.7★</p><p className="text-[#a5d6a7]">door verzorgenden</p></div>
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
            <h2 className="text-3xl font-bold text-[#2d5a3d] mb-4">Geef troost aan uw dierbare</h2>
            <p className="text-lg text-[#5a7a5a] mb-8">14 dagen proberen. Niet tevreden? Geld terug.</p>
            <Link to="/knuffels">
              <Button className="bg-[#2d5a3d] hover:bg-[#234a31] text-white rounded-full px-10 py-6 text-lg">Bekijk Alle Droomvriendjes</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer variant="green" />
    </div>
  );
};

export default DementiePage;
