import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ProductSlider from '../components/ProductSlider';
import { useCart } from '../context/CartContext';

const TipsBedtijdPage = () => {
  const { addToCart, setIsCartOpen } = useCart();
  
  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const tips = [
    {
      icon: "🕐",
      title: "Vaste Bedtijdroutine",
      description: "Een consistente routine helpt kinderen ontspannen en signaleert dat het tijd is om te slapen.",
      items: [
        "Houd dezelfde bedtijd aan, ook in het weekend",
        "Start de routine 30-60 minuten voor bedtijd",
        "Maak het voorspelbaar en rustig"
      ]
    },
    {
      icon: "🛁",
      title: "Rustgevende Activiteiten",
      description: "Kies activiteiten die je kind helpen kalmeren en voorbereiden op slaap.",
      items: [
        "Een warm bad nemen",
        "Zachtjes voorlezen",
        "Rustige muziek of white noise",
        "Knuffelen met jullie Droomvriendje"
      ]
    },
    {
      icon: "💡",
      title: "De Juiste Sfeer",
      description: "Creëer een slaapkamer die uitnodigt tot rust en ontspanning.",
      items: [
        "Dim het licht 1 uur voor bedtijd",
        "Houd de kamer koel (16-18°C)",
        "Gebruik een zacht nachtlampje",
        "Zorg voor een rustige omgeving"
      ]
    },
    {
      icon: "📱",
      title: "Geen Schermen",
      description: "Blauw licht van schermen verstoort de natuurlijke slaap-waak cyclus.",
      items: [
        "Stop met schermtijd 1-2 uur voor bed",
        "Verwijder tv's en tablets uit de slaapkamer",
        "Kies voor boekjes in plaats van digitaal"
      ]
    },
    {
      icon: "🧸",
      title: "Gebruik een Slaapknuffel",
      description: "Een Droomvriendje biedt geborgenheid en helpt bij het inslapen.",
      items: [
        "Kies één vaste knuffel voor de nacht",
        "Gebruik de rustgevende lichtjes",
        "Zet kalmerende geluiden aan",
        "Maak het onderdeel van de routine"
      ]
    },
    {
      icon: "😌",
      title: "Rust en Geduld",
      description: "Blijf kalm en geduldig, zelfs als het even duurt.",
      items: [
        "Spreek met zachte, rustige stem",
        "Geef geruststelling bij angst",
        "Forceer slaap niet",
        "Blijf consistent in je aanpak"
      ]
    }
  ];

  const ageGroups = [
    {
      icon: "👶",
      title: "Baby's (0-12 maanden)",
      tips: [
        "Leg baby slaperig maar wakker neer",
        "Gebruik white noise voor rustgevende achtergrond",
        "Inbakeren kan helpen (tot 4 maanden)",
        "Houd de kamer donker en stil",
        "Volg de slaapsignalen van je baby"
      ],
      products: "🦁 Baby Slaapmaatje Leeuw\n🐑 Baby Slaapmaatje Schaap\nMet zachte white noise en rustgevend licht"
    },
    {
      icon: "👧",
      title: "Peuters (1-3 jaar)",
      tips: [
        "Duidelijke routine van 3-4 stappen",
        "Gebruik visuele hulpmiddelen (plaatjes routine)",
        "Laat ze zelf hun pyjama uitkiezen",
        "Voorkom dutjes na 15:00 uur",
        "Geef een vaste slaapknuffel"
      ],
      products: "🐼 Panda Projector Knuffel\n🦄 Kalmerende Eenhoorn Knuffel\nMet sterrenprojector voor magische nachten"
    },
    {
      icon: "🧒",
      title: "Kinderen (4-8 jaar)",
      tips: [
        "Betrek ze bij het maken van de routine",
        "Gebruik een slaapklok of timer",
        "Bespreek zorgen overdag, niet voor bed",
        "Geef ze controle over kleine keuzes",
        "Beloon goed slaapgedrag"
      ],
      products: "🦖 Dinosaurus Slaapknuffel\n🐧 Pinguïn Nachtlampje\nMet stoere designs en rustgevende functies"
    }
  ];

  const routineSteps = [
    { time: "19:00", title: "Avondeten", description: "Zorg dat het laatste eten 1-2 uur voor bedtijd is. Vermijd zware maaltijden en suiker." },
    { time: "19:30", title: "Opruimen & Rustige Speltijd", description: "Ruim samen speelgoed op. Kies rustige activiteiten zoals puzzelen of kleuren." },
    { time: "19:45", title: "Bad & Pyjama", description: "Een warm bad ontspant. Laat je kind zijn/haar favoriete pyjama kiezen." },
    { time: "20:00", title: "Tandenpoetsen", description: "Maak het gezellig met een leuk liedje of tandenborstel-timer." },
    { time: "20:10", title: "Voorlezen & Knuffeltijd", description: "Lees 1-2 verhaaltjes voor in bed. Dim de lichten verder." },
    { time: "20:25", title: "Droomvriendje Activeren", description: "Zet het nachtlampje en rustgevende geluiden van de Droomvriendje aan." },
    { time: "20:30", title: "Slaaptijd", description: "Geef een nachtkus, zeg welterusten en verlaat rustig de kamer." }
  ];

  const droomvriendjesTips = [
    {
      icon: "🌟",
      title: "Sterrenprojector",
      description: "De zachte sterren aan het plafond creëren een magische, rustgevende sfeer:",
      items: [
        "Zet de projector aan tijdens het voorlezen",
        "Laat je kind naar de sterren kijken terwijl je vertelt",
        "Perfect als vervanging voor felle lampen",
        "Helpt bij angst voor het donker"
      ]
    },
    {
      icon: "🎵",
      title: "Rustgevende Geluiden",
      description: "Kies uit verschillende kalmerende geluiden:",
      items: [
        "White noise: Voor baby's en kinderen die veel prikkels hebben",
        "Hartslag: Herkennend en rustgevend voor baby's",
        "Natuurgeluiden: Regen, golven of bos voor oudere kinderen",
        "Slaapliedjes: Zachte melodieën voor extra ontspanning"
      ]
    },
    {
      icon: "⏲️",
      title: "Timer Functie",
      description: "Alle Droomvriendjes hebben een handige timer:",
      items: [
        "Stel in op 15, 30 of 60 minuten",
        "Licht en geluid gaan automatisch uit",
        "Bespaart batterij en energie",
        "Ideaal voor kinderen die met licht willen inslapen"
      ]
    }
  ];

  const faqs = [
    {
      question: "Wat als mijn kind niet wil slapen?",
      answer: "Blijf kalm en consistent. Leid je kind rustig terug naar bed zonder discussie. Herhaal dit geduldig zo vaak als nodig. Zorg dat je kind overdag voldoende lichaamsbeweging heeft gehad."
    },
    {
      question: "Hoe lang duurt het om een routine in te slijpen?",
      answer: "Gemiddeld 2-3 weken. Wees geduldig en blijf consequent, ook als het even lastig is. De resultaten zijn het wachten waard!"
    },
    {
      question: "Mag mijn kind meerdere knuffels in bed?",
      answer: "Voor baby's onder 1 jaar: alleen de Droomvriendje (veilig en CE-gecertificeerd). Voor oudere kinderen: prima, maar één vaste \"slaap-knuffel\" werkt het beste voor de routine."
    },
    {
      question: "Mijn kind wordt 's nachts wakker, wat nu?",
      answer: "Dat is normaal! Ga rustig naar binnen, stel gerust, maar probeer niet te veel te praten of te spelen. Zet eventueel de Droomvriendje weer aan voor 15 minuten."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f9f5]">
      {/* Header */}
      <div className="bg-white py-4 px-4 border-b border-[#c5d9c8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="Droomvriendjes.nl" 
              className="h-12 w-auto"
            />
          </Link>
          <Link to="/knuffels" className="bg-[#2d5a3d] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#3d7a4d] transition-colors">
            Bekijk knuffels
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="bg-white p-8 md:p-12 text-center rounded-2xl mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">🌙 Tips voor Bedtijd</h1>
          <p className="text-lg md:text-xl text-[#5a7a5a]">Alles voor een perfecte nachtrust van jouw kleintje</p>
        </header>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#c5d9c8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="text-5xl block mb-4">{tip.icon}</span>
              <h3 className="text-xl font-bold text-[#2d5a3d] mb-3">{tip.title}</h3>
              <p className="text-[#5a7a5a] mb-4">{tip.description}</p>
              <ul className="space-y-2 text-[#5a7a5a]">
                {tip.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#2d5a3d] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Age Groups Section */}
        <section className="bg-white rounded-2xl p-8 md:p-10 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">🎯 Tips per Leeftijd</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageGroups.map((group, index) => (
              <div key={index} className="bg-[#e8f0e8] rounded-xl p-6 border-l-4 border-[#2d5a3d]">
                <h4 className="text-xl font-bold text-[#2d5a3d] mb-4">{group.icon} {group.title}</h4>
                <ul className="space-y-2 text-[#5a7a5a] mb-6">
                  {group.tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#2d5a3d] mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
                <div className="bg-[#f5f9f5] rounded-lg p-4 border border-[#c5d9c8]">
                  <h5 className="font-bold text-[#2d5a3d] mb-2">Perfect hiervoor:</h5>
                  <p className="text-[#5a7a5a] text-sm whitespace-pre-line">{group.products}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Routine Timeline Section */}
        <section className="bg-white rounded-2xl p-8 md:p-10 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-4">⏰ De Perfecte Bedtijdroutine</h2>
          <p className="text-center text-[#5a7a5a] mb-8">Een stappenplan voor een ontspannen avond</p>
          
          <div className="bg-[#e8f0e8] rounded-xl p-6">
            {routineSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-4 last:mb-0 flex items-center gap-4 border border-[#c5d9c8]">
                <div className="bg-[#2d5a3d] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-[#2d5a3d]">{step.time} - {step.title}</h5>
                  <p className="text-[#5a7a5a] text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#f5f9f5] rounded-lg p-4 mt-6 border-l-4 border-[#3d7a4d]">
            <p className="text-[#5a7a5a]">
              <strong className="text-[#2d5a3d]">💡 Tip:</strong> Pas de tijden aan naar de leeftijd van je kind. Baby's hebben eerdere bedtijden (18:30-19:30), oudere kinderen kunnen later (20:30-21:00).
            </p>
          </div>
        </section>

        {/* Droomvriendjes Tips Section */}
        <section className="bg-white rounded-2xl p-8 md:p-10 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">✨ Zo Gebruik je de Droomvriendjes Optimaal</h2>
          
          <div className="space-y-6">
            {droomvriendjesTips.map((tip, index) => (
              <div key={index} className="bg-[#f5f9f5] rounded-xl p-6 border border-[#c5d9c8]">
                <span className="text-4xl block mb-3">{tip.icon}</span>
                <h3 className="text-xl font-bold text-[#2d5a3d] mb-2">{tip.title}</h3>
                <p className="text-[#5a7a5a] mb-4">{tip.description}</p>
                <ul className="space-y-2 text-[#5a7a5a]">
                  {tip.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#2d5a3d] mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 md:p-10 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">❓ Veelgestelde Vragen</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#f5f9f5] rounded-xl p-6 border border-[#c5d9c8]">
                <h3 className="text-lg font-bold text-[#2d5a3d] mb-2">{faq.question}</h3>
                <p className="text-[#5a7a5a]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Slider Section */}
        <ProductSlider 
          onAddToCart={handleAddToCart}
          title="Onze Droomvriendjes"
          subtitle="Perfect voor een rustiger bedtijdritueel"
        />

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#2d5a3d] to-[#3d7a4d] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar voor Betere Nachtrust? 🌙</h2>
          <p className="text-lg mb-2">Ontdek onze collectie slaapknuffels met rustgevende lichtjes en geluiden</p>
          <p className="text-white/80 mb-6">⭐ 4.7/5 sterren • 🚚 Voor 23:00 besteld, morgen in huis • ↩️ 14 dagen bedenktijd</p>
          <Link 
            to="/knuffels" 
            className="inline-block bg-white text-[#2d5a3d] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#f5f9f5] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Bekijk Alle Droomvriendjes
          </Link>
        </section>
      </div>

      <Footer variant="green" />
    </div>
  );
};

export default TipsBedtijdPage;
