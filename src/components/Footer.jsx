import { Heart, Instagram, Mail, MapPin, Phone, Github } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-truffle-dark to-chocolate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/icone.png" 
                alt="PS: Puro Sentimento" 
                className="w-12 h-12 rounded-full shadow-lg"
              />
              <div>
                <div className="font-playfair font-bold text-2xl">PS: Puro Sentimento</div>
                <div className="font-playfair text-sm text-truffle-caramel">Feito com Carinho</div>
              </div>
            </div>
            <p className="text-truffle-cream mb-6 max-w-md">
              Transformando momentos comuns em ocasiões especiais através de chocolates artesanais. 
              Sabor, carinho e muito sentimento em cada mordida.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/Trufas_puro.sentimento"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5569984995632"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-3 rounded-full hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:trufaspurosentimento@gmail.com"
                className="bg-truffle-caramel p-3 rounded-full hover:scale-110 transition-transform"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-xl mb-4 text-truffle-gold">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {['Início', 'Sobre', 'Produtos', 'Roleta', 'Pesquisa', 'Vídeos'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-truffle-cream hover:text-truffle-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair font-bold text-xl mb-4 text-truffle-gold">
              Contato
            </h3>
            <ul className="space-y-3 text-truffle-cream">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-truffle-caramel" />
                <span>Vilhena/RO<br/>Brasil</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-truffle-caramel" />
                <span>(69) 9 8499-5632</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-truffle-caramel" />
                <span className="text-sm">trufaspurosentimento@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-truffle-caramel/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-truffle-cream text-sm text-center md:text-left">
              © {currentYear} PS: Puro Sentimento. Todos os direitos reservados.
            </p>
            <p className="text-truffle-cream text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-truffle-gold fill-current animate-pulse" /> em Vilhena/RO
            </p>
          </div>
          
          {/* Team Credits */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-truffle-caramel text-sm font-semibold">
              Equipe PS: Puro Sentimento
            </p>
            <p className="text-truffle-cream text-xs">
              João Pedro Pires e Macedo • Luiz Guilhermy Moretti de Oliveira • 
              Yasmin Rocha de Almeida • Yuri Ribeiro Zetoles
            </p>
            <div className="flex items-center justify-center gap-2 text-truffle-cream/70 text-xs">
              <span>Desenvolvedor:</span>
              <a 
                href="https://github.com/YuriZetoles" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-truffle-gold transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Yuri Zetoles</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
