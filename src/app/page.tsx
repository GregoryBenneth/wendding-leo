import Link from "next/link";
import Navigation from "@/app/components/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Elementos decorativos (flores) posicionadas em cantos estratégicos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[url('/flores-canto-1.png')] bg-no-repeat bg-contain opacity-30 -translate-x-8 -translate-y-8 rotate-12 animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[url('/flores-canto-2.png')] bg-no-repeat bg-contain opacity-30 translate-x-8 translate-y-8 -rotate-12 animate-float-slow-reverse pointer-events-none"></div>
      <div className="absolute top-1/4 right-8 w-40 h-40 bg-[url('/flores-pequenas.png')] bg-no-repeat bg-contain opacity-20 rotate-45 animate-float pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-8 w-40 h-40 bg-[url('/flores-pequenas.png')] bg-no-repeat bg-contain opacity-20 -rotate-45 animate-float-reverse pointer-events-none"></div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f5f3f0] to-[#e9d2ac]/30 z-0"></div>

        {/* Círculo decorativo atrás do conteúdo principal */}
        <div className="absolute w-[120%] h-[120%] rounded-full border-[30px] border-[#e9d2ac]/10 animate-pulse-slow"></div>
        <div className="absolute w-[100%] h-[100%] rounded-full border-[20px] border-[#e9d2ac]/15 animate-pulse-slow-reverse"></div>

        <div className="container mx-auto px-4 z-20 text-center">
          <div className="flex items-center justify-center">
            <Heart className="text-[#e9d2ac] h-8 w-8 animate-beat mr-2" />
            <span className="text-lg text-[#e9d2ac]/80 font-medium tracking-widest">
              19 · 07 · 2025
            </span>
            <Heart className="text-[#e9d2ac] h-8 w-8 animate-beat ml-2" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-primary mt-6 mb-8 opacity-90 animate-fade-in">
            Janine & Leonardo
          </h1>

          <p className="text-xl md:text-2xl text-primary/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Convidam para celebrar o seu casamento em uma cerimônia cheia de
            amor e carinho
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12 animate-fade-in-delay">
            <div className="flex items-center bg-white/80 px-6 py-4 rounded-full shadow-sm">
              <Calendar className="w-6 h-6 mr-3 text-[#c5bdb2]" />
              <span className="text-lg">19 de Julho de 2025</span>
            </div>
            <div className="flex items-center bg-white/80 px-6 py-4 rounded-full shadow-sm">
              <Clock className="w-6 h-6 mr-3 text-[#c5bdb2]" />
              <span className="text-lg">16:00</span>
            </div>
          </div>

          <Link href="/rsvp">
            <Button className="bg-[#e9d2ac] hover:bg-[#c5bdb2] text-primary font-medium px-10 py-7 rounded-full text-lg shadow-md transition-all duration-300 transform hover:scale-105 animate-pulse-button">
              Confirmar Presença
            </Button>
          </Link>
        </div>
      </section>

      {/* Ceremony Details */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#e9d2ac]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#e9d2ac]/20 to-transparent"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-[url('/flores-laterais.png')] bg-no-repeat bg-contain opacity-20 pointer-events-none"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-[url('/flores-laterais.png')] bg-no-repeat bg-contain opacity-20 transform scale-x-[-1] pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-16 relative">
              <span className="relative">
                Cerimônia
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#e9d2ac]"></span>
              </span>
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-16 border border-[#e9d2ac]/30 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
              {/* Efeito de overlay ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e9d2ac]/5 to-[#e9d2ac]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-2xl font-playfair font-semibold mb-6 text-primary/90">
                Santuário de Nossa Senhora da Conceição
              </h3>

              <div className="flex items-center justify-center mb-6 text-lg">
                <MapPin className="w-6 h-6 mr-3 text-[#c5bdb2]" />
                <p className="text-gray-700">
                  Praça Cel. Joaquim Antunes, s/n – Pedra Azul-MG
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#c5bdb2]" />
                  <span className="text-lg text-gray-700">
                    19 de Julho de 2025
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#c5bdb2]" />
                  <span className="text-lg text-gray-700">16:00</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-16 relative">
              <span className="relative">
                Jantar Comemorativo
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#e9d2ac]"></span>
              </span>
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e9d2ac]/30 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
              {/* Efeito de overlay ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e9d2ac]/5 to-[#e9d2ac]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <h3 className="text-2xl font-playfair font-semibold mb-6 text-primary/90">
                Bistrô Rancho do Ipê
              </h3>

              <div className="flex items-center justify-center mb-6 text-lg">
                <MapPin className="w-6 h-6 mr-3 text-[#c5bdb2]" />
                <p className="text-gray-700">
                  Tv. das Aroeiras - Ipê Amarelo, Pedra Azul – MG
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#c5bdb2]" />
                  <span className="text-lg text-gray-700">
                    19 de Julho de 2025
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#c5bdb2]" />
                  <span className="text-lg text-gray-700">19:00</span>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Link href="/rsvp">
                <Button className="bg-[#e9d2ac] hover:bg-[#c5bdb2] text-primary font-medium px-10 py-6 rounded-full text-lg shadow-md transition-all duration-300 transform hover:scale-105">
                  Confirmar Presença
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-24 bg-[#f5f3f0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-fundo.png')] bg-repeat opacity-5"></div>

        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-16 text-center relative">
            <span className="relative">
              Nossa História
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#e9d2ac]"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fotos do casal com efeitos de hover */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-square bg-white rounded-lg shadow-md overflow-hidden group relative"
              >
                <div className="w-full h-full bg-[#e9d2ac]/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 bg-[url('/placeholder-foto.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <p className="text-[#c5bdb2] font-playfair text-xl relative z-10 group-hover:text-primary transition-colors duration-300">
                    Momento {item}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary font-medium text-sm">
                    Nossa história continua a cada dia...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-8 bg-white border-t border-[#e9d2ac]/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">Com carinho,</p>
          <p className="text-xl font-playfair text-primary mb-4">
            Janine & Leonardo
          </p>
          <p className="text-sm text-gray-500">
            © 2025 · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}
