import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Produtos', href: '#produtos' },
    { name: 'Ganhe Prêmios', href: '#roleta' },
    { name: 'Pesquisa', href: '#pesquisa' },
    { name: 'Vídeos', href: '#videos' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center space-x-3 group hover:scale-105 transition-transform">
            <img 
              src="/icone.png" 
              alt="PS: Puro Sentimento" 
              className="w-12 h-12 rounded-full shadow-lg group-hover:shadow-xl transition-shadow"
            />
            <div>
              <div className={`font-playfair font-bold text-2xl ${isScrolled ? 'text-truffle-dark' : 'text-white'}`}>
                PS:
              </div>
              <div className={`font-playfair text-sm -mt-1 ${isScrolled ? 'text-truffle-caramel' : 'text-truffle-cream'}`}>
                Puro Sentimento
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-truffle-dark hover:text-truffle-caramel' 
                    : 'text-white hover:text-truffle-gold'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? 'text-truffle-dark' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-truffle-dark hover:bg-truffle-cream transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
