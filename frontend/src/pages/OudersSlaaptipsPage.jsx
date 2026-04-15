import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const OudersSlaaptipsPage = () => {
  const goldenRules = [
    {
      icon: "⏰",
      title: "1. Consistentie is Alles",
      description: "Een vaste bedtijdroutine is het allerbelangrijkste voor goede slaap.",
      items: [
        "Zelfde bedtijd elke dag (ook weekenden!)",
        "Zelfde routine van 30-60 minuten",
        "Voorspelbare stappen die je kind herkent"
      ]
    },
    {
      icon: "🛁",
      title: "2. Creëer een Ritueel",
      description: "Maak van bedtijd een rustig, positief moment.",
      items: [
        "Bad → Pyjama → Tandenpoetsen → Verhaal",
        "Dim het licht geleidelijk",
        "Zacht stemgeluid gebruiken",
        "Knuffelmoment met Droomvriendje"
      ]
    },
    {
      icon: "🌡️",
      title: "3. Optimale Slaapomgeving",
      description: "De juiste omgeving maakt enorm verschil.",
      items: [
        "Temperatuur: 16-18°C",
        "Donker (nachtlampje mag)",
        "Stil of white noise",
        "Comfortabel bed en beddengoed"
      ]
    },
    {
      icon: "📱",
      title: "4. Geen Schermen",
      description: "Blauw licht onderdrukt melatonine productie.",
      items: [
        "Stop 1-2 uur voor bedtijd",
        "Geen tv in de slaapkamer",
        "Kies boekjes boven tablets",
        "Ook voor jou als ouder!"
      ]
    },
    {
      icon: "☀️",
      title: "5. Daglicht & Beweging",
      description: "Wat overdag gebeurt, beïnvloedt de nacht.",
      items: [
        "Minstens 1 uur buitenspelen",
        "Ochtendlicht helpt bioklok",
        "Actieve spelen voor 17:00 uur",
        "Rustige activiteiten na het eten"
      ]
    },
    {
      icon: "🍪",
      title: "6. Let op Voeding",
      description: "Wat je kind eet beïnvloedt de slaap.",
      items: [
        "Laatste maaltijd 2 uur voor bed",
        "Vermijd suiker na 17:00 uur",
        "Licht avondsnackje mag (banaan, warme melk)",
        "Voldoende water overdag"
      ]
    },
    {
      icon: "🧘",
      title: "7. Ontspanningstechnieken",
      description: "Leer je kind bewust te ontspannen.",
      items: [
        "Ademhalingsoefeningen (4-6-8 methode)",
        "Kindermeditatie of mindfulness",
        "Rustige muziek of natuurgeluiden",
        "Visualisatie: \"stel je voor dat...\""
      ]
    },
    {
      icon: "💪",
      title: "8. Wees Consequent",
      description: "De eerste weken zijn het zwaarst, maar volhouden loont.",
      items: [
        "Blijf bij de routine, ook als het lastig is",
        "Geef het minimaal 2-3 weken",
        "Blijf kalm en geduldig",
        "Vier kleine overwinningen"
      ]
    }
  ];

  const stats = [
    { number: "70%", label: "van ouders heeft last van slaaptekort" },
    { number: "10-12u", label: "heeft een peuter (1-3 jaar) nodig" },
    { number: "9-11u", label: "heeft een schoolkind (6-12 jaar) nodig" },
    { number: "86%", label: "van ouders ziet verbetering met vaste routine" }
  ];

  const ageGroups = [
    {
      icon: "👶",
      title: "Baby's (0-12 maanden)",
      challenge: "Nachtvoedingen, slaapritme ontwikkelen",
      tips: [
        "Leg wakker neer: Leer je baby zelf in te slapen",
        "White noise: Maskeert huisgeluiden",
        "Swaddling: Tot 4 maanden (veilig inbakeren)",
        "4-3-2 regel: 4u na opstaan, 3u na 1e dutje, 2u na 2e dutje",
        "Slaapsignalen: Geeuwen, oogwrijven = direct naar bed"
      ]
    },
    {
      icon: "👧",
      title: "Peuters (1-3 jaar)",
      challenge: "Niet in bed willen blijven, angsten",
      tips: [
        "Visuele routine: Plaatjesschema aan de muur",
        "Keuzevrijheid: \"Welke pyjama?\" \"Welk verhaal?\"",
        "Beloningssysteem: Stickers voor goed in bed blijven",
        "Dutje timing: Niet na 15:00, max 1-2 uur",
        "Duidelijke grenzen: \"1 verhaal, 1 liedje, 1 kus\""
      ]
    },
    {
      icon: "🧒",
      title: "Schoolkinderen (4-8 jaar)",
      challenge: "Uitstelgedrag, nachtmerries, angsten",
      tips: [
        "Betrekken: Laat hen meedenken over routine",
        "Wekker/klok: \"Om 20:30 gaat het licht uit\"",
        "Zorgen bespreken: Overdag, niet voor bed",
        "Ademhalingsoefeningen: Leer ze zelf kalmeren",
        "Respecteer angsten: Nachtlampje, deur op kier"
      ]
    }
  ];

  const problems = [
    {
      title: "Probleem 1: \"Mijn kind komt constant uit bed\"",
      solutions: [
        "Eerste keer: Rustig terugbrengen, minimaal praten: \"Het is bedtijd, welterusten\"",
        "Tweede keer: Nog korter: \"Bed\", zonder oogcontact",
        "Daarna: Gewoon terugbrengen, nul woorden",
        "Consequent zijn: Elke keer hetzelfde, ook als het 20x is",
        "Overdag: Extra aandacht en quality time geven"
      ]
    },
    {
      title: "Probleem 2: \"Het duurt uren voordat mijn kind slaapt\"",
      solutions: [
        "Check dutjes: Niet te laat of te lang overdag",
        "Vroeger beginnen: Routine 30 min eerder starten",
        "Meer beweging: Minstens 1 uur buiten spelen",
        "Rustgevende hulpmiddelen: White noise, nachtlampje",
        "Ontspanning: Ademhalingsoefeningen, zachte muziek"
      ]
    },
    {
      title: "Probleem 3: \"Mijn kind wordt 's nachts vaak wakker\"",
      solutions: [
        "Check basics: Kamertemperatuur, luier, honger",
        "Leer zelf inslapen: Niet direct oppakken, even wachten",
        "Nachtlampje: Minder eng bij wakker worden",
        "Zelfde routine: Ook bij nachtelijk wakker worden",
        "White noise: Hele nacht aan laten staan"
      ]
    },
    {
      title: "Probleem 4: \"Mijn kind heeft nachtmerries of angsten\"",
      solutions: [
        "Serieus nemen: Angsten zijn echt voor je kind",
        "Geruststellen: \"Je bent veilig, mama/papa is er\"",
        "Nachtlampje: Zacht licht hele nacht aan",
        "Droomvriendje: \"Beschermer\" tegen monsters",
        "Overdag bespreken: Niet vlak voor bedtijd",
        "Vermijd enge content: Films, verhalen, nieuws"
      ]
    }
  ];

  const droomvriendjesHelps = [
    {
      icon: "💡",
      title: "Rustgevend Licht",
      description: "Het zachte nachtlampje:",
      items: [
        "Neemt angst voor het donker weg",
        "Biedt visuele geruststelling",
        "Niet fel genoeg om wakker te houden",
        "Automatische timer (15-60 min)"
      ]
    },
    {
      icon: "🎵",
      title: "Kalmerende Geluiden",
      description: "White noise en natuurgeluiden:",
      items: [
        "Maskeert storende achtergrondgeluiden",
        "Creëert voorspelbare geluidsmuur",
        "Helpt bij focussen op ontspanning",
        "Verschillende geluiden beschikbaar"
      ]
    },
    {
      icon: "🤗",
      title: "Fysieke Geruststelling",
      description: "De knuffel zelf biedt:",
      items: [
        "Iets om vast te houden",
        "Gevoel van veiligheid",
        "Overgangsobject (scheiding ouders)",
        "Herkenbaarheid en routine"
      ]
    }
  ];

  const parentTips = [
    {
      title: "Voor Jezelf Zorgen",
      items: [
        "Slaap als je kind slaapt (serieus!)",
        "Vraag hulp aan partner/familie",
        "Wees niet te streng voor jezelf",
        "Kleine stapjes = vooruitgang"
      ]
    },
    {
      title: "Werk Samen",
      items: [
        "Beide ouders zelfde aanpak",
        "Wissel nachten af als mogelijk",
        "Communiceer over wat werkt",
        "Steun elkaar in frustratie"
      ]
    },
    {
      title: "Wanneer Hulp Zoeken",
      items: [
        "Na 3+ maanden geen verbetering",
        "Heftig snurken of ademstops",
        "Extreme angsten of trauma",
        "Jouw eigen uitputting/depressie"
      ]
    }
  ];

  const doList = [
    "Vaste bedtijd en routine aanhouden",
    "Kind slaperig maar wakker in bed leggen",
    "Rustig en consistent blijven",
    "Nachtlampje gebruiken bij angst",
    "Knuffeldier of dekentje toestaan",
    "Overdag veel bewegen en buitenspelen",
    "Positieve bedtijd-associaties creëren"
  ];

  const dontList = [
    "Wisselende bedtijden hanteren",
    "Kind in slaap laten vallen op de bank",
    "Boos of gefrustreerd reageren",
    "Schermen vlak voor bedtijd",
    "Zware maaltijden 's avonds laat",
    "Suiker na 17:00 uur",
    "Bedtijd als straf gebruiken"
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-4">💚 Slaaptips voor Ouders</h1>
          <p className="text-lg md:text-xl text-[#5a7a5a] max-w-3xl mx-auto">
            Praktische tips om jouw kind (en jezelf!) naar een betere nachtrust te begeleiden
          </p>
        </header>

        {/* Intro Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8] text-center">
          <p className="text-lg text-[#5a7a5a] mb-4">
            <strong className="text-[#2d5a3d]">Als ouder weet je het:</strong> slapeloze nachten zijn een van de grootste uitdagingen van het ouderschap.
          </p>
          <p className="text-[#5a7a5a] mb-6">
            Of je nu een baby hebt die om de 2 uur wakker wordt, een peuter die niet in bed wil blijven, of een kind dat nachtmerries heeft — slaapgebrek is zwaar.
          </p>
          <p className="text-xl text-[#2d5a3d] font-bold">
            De goede nieuws? Er zijn bewezen strategieën die werken.
          </p>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">📊 Waarom Slaap zo Belangrijk is</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center border-2 border-[#c5d9c8]">
                <div className="text-3xl md:text-4xl font-bold text-[#2d5a3d] mb-2">{stat.number}</div>
                <div className="text-sm text-[#5a7a5a]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#5a7a5a] mt-6 italic">
            Bron: Nederlands Jeugdinstituut & Thuisarts.nl
          </p>
        </section>

        {/* 8 Golden Rules */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">🌟 De 8 Gouden Regels voor Betere Kinderslaap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goldenRules.map((rule, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-[#c5d9c8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl block mb-3">{rule.icon}</span>
                <h3 className="text-lg font-bold text-[#2d5a3d] mb-2">{rule.title}</h3>
                <p className="text-sm text-[#5a7a5a] mb-3">{rule.description}</p>
                <ul className="space-y-1 text-sm text-[#5a7a5a]">
                  {rule.items.map((item, i) => (
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

        {/* Do / Don't Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">✅ Wel Doen / ❌ Niet Doen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#e8f0e8] rounded-xl p-6 border-l-4 border-[#2d5a3d]">
              <h4 className="text-xl font-bold text-[#2d5a3d] mb-4">✅ WEL DOEN</h4>
              <ul className="space-y-2 text-[#5a7a5a]">
                {doList.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#2d5a3d] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#fff5f5] rounded-xl p-6 border-l-4 border-[#d94848]">
              <h4 className="text-xl font-bold text-[#d94848] mb-4">❌ NIET DOEN</h4>
              <ul className="space-y-2 text-[#5a7a5a]">
                {dontList.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#d94848] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Age Groups Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">👶 Tips per Leeftijdsfase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageGroups.map((group, index) => (
              <div key={index} className="bg-[#e8f0e8] rounded-xl p-6 border-l-4 border-[#2d5a3d]">
                <h4 className="text-xl font-bold text-[#2d5a3d] mb-2">{group.icon} {group.title}</h4>
                <p className="text-sm text-[#5a7a5a] mb-4"><strong>Uitdaging:</strong> {group.challenge}</p>
                <ul className="space-y-2 text-sm text-[#5a7a5a]">
                  {group.tips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#2d5a3d] mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Common Problems Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-8">🚨 Veelvoorkomende Slaapproblemen & Oplossingen</h2>
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="bg-[#e8f0e8] rounded-xl p-6 border-2 border-[#c5d9c8]">
                <h3 className="text-xl font-bold text-[#2d5a3d] mb-4">{problem.title}</h3>
                <p className="font-semibold text-[#2d5a3d] mb-2">Oplossing:</p>
                <ul className="space-y-2 text-[#5a7a5a]">
                  {problem.solutions.map((solution, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#2d5a3d] mr-2">•</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Droomvriendjes Helps Section */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-4">🧸 Hoe Droomvriendjes Helpt</h2>
          <p className="text-center text-[#5a7a5a] mb-8">
            Droomvriendjes is ontworpen als ondersteuning bij een gezonde slaaproutine
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {droomvriendjesHelps.map((help, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-[#c5d9c8] hover:shadow-lg transition-all">
                <span className="text-4xl block mb-3">{help.icon}</span>
                <h3 className="text-lg font-bold text-[#2d5a3d] mb-2">{help.title}</h3>
                <p className="text-sm text-[#5a7a5a] mb-3">{help.description}</p>
                <ul className="space-y-1 text-sm text-[#5a7a5a]">
                  {help.items.map((item, i) => (
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

        {/* Extra Tips for Parents */}
        <section className="bg-white rounded-2xl p-8 mb-10 shadow-lg border-2 border-[#c5d9c8]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d5a3d] text-center mb-4">💡 Extra Tips voor Vermoeide Ouders</h2>
          
          <div className="bg-[#f5f9f5] rounded-lg p-4 border-l-4 border-[#3d7a4d] mb-8">
            <p className="text-[#5a7a5a]">
              <strong className="text-[#2d5a3d]">Onthoud:</strong> De eerste 2-3 weken van een nieuwe routine zijn het zwaarst. Daarna wordt het makkelijker!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {parentTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-[#c5d9c8]">
                <h3 className="text-lg font-bold text-[#2d5a3d] mb-4">{tip.title}</h3>
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#2d5a3d] to-[#3d7a4d] rounded-2xl p-8 md:p-12 text-center text-white mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om te Starten? 🌙</h2>
          <p className="text-lg mb-2">Ontdek hoe Droomvriendjes jouw bedtijdroutine kan ondersteunen</p>
          <p className="text-white/80 mb-6">⭐ 4.7/5 sterren • 🚚 Gratis verzending • ↩️ 14 dagen bedenktijd</p>
          <Link 
            to="/knuffels" 
            className="inline-block bg-white text-[#2d5a3d] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#f5f9f5] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Bekijk Onze Slaapknuffels
          </Link>
        </section>

        {/* Disclaimer */}
        <div className="bg-[#f5f9f5] rounded-lg p-4 border-l-4 border-[#3d7a4d] text-center">
          <p className="text-sm text-[#5a7a5a]">
            <strong className="text-[#2d5a3d]">Disclaimer:</strong> Deze tips zijn gebaseerd op algemeen geaccepteerde slaapadviezen. Bij aanhoudende ernstige slaapproblemen, raadpleeg altijd je huisarts of een slaapspecialist.
          </p>
        </div>
      </div>

      <Footer variant="green" />
    </div>
  );
};

export default OudersSlaaptipsPage;
