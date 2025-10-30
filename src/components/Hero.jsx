import { motion } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 gradient-chocolate"></div>
      
      {/* Animated chocolate drops */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-truffle-gold rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-truffle-gold opacity-20 rounded-full blur-2xl"
              ></motion.div>
              <img 
                src="/icone.png" 
                alt="PS: Puro Sentimento" 
                className="relative w-32 h-32 rounded-full shadow-2xl animate-pulse-slow mx-auto"
              />
            </div>
          </div>

          <h1 className="font-playfair font-bold text-6xl md:text-8xl text-white mb-4 text-shadow">
            PS: Puro Sentimento
          </h1>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="text-truffle-gold w-6 h-6" />
            <p className="font-playfair text-2xl md:text-3xl text-truffle-cream">
              Feito com Carinho
            </p>
            <Sparkles className="text-truffle-gold w-6 h-6" />
          </div>

          <p className="text-xl md:text-2xl text-truffle-cream max-w-3xl mx-auto mb-8 leading-relaxed">
            Transforme momentos comuns em ocasiões especiais através de chocolates artesanais. 
            Sabor, carinho e um puro sentimento em cada mordida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#produtos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Conheça Nossos Produtos
            </motion.a>
            
            <motion.a
              href="#roleta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-truffle-gold text-truffle-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🎁 Girar a Roleta da Sorte
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
