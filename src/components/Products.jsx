import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

const Products = () => {
  const products = [
    {
      name: 'Brigadeiro',
      description: 'Chocolate clássico e irresistível, puro chocolate com toque de doçura',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="#4A2511"/>
          <circle cx="50" cy="50" r="30" fill="#6B3410"/>
          <circle cx="42" cy="42" r="3" fill="#8B5A2B" opacity="0.6"/>
          <circle cx="58" cy="45" r="2" fill="#8B5A2B" opacity="0.6"/>
          <circle cx="48" cy="55" r="2.5" fill="#8B5A2B" opacity="0.6"/>
          <circle cx="60" cy="58" r="2" fill="#8B5A2B" opacity="0.6"/>
          <ellipse cx="38" cy="38" rx="8" ry="5" fill="#ffffff" opacity="0.2"/>
        </svg>
      ),
      color: 'from-chocolate-800 to-chocolate-900'
    },
    {
      name: 'Beijinho',
      description: 'Coco irresistível que derrete na boca com sabor delicado',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="#F5F5DC"/>
          <circle cx="50" cy="50" r="30" fill="#FFFACD"/>
          <circle cx="50" cy="45" r="4" fill="#FF1493"/>
          <path d="M 50 45 Q 45 42 42 45" stroke="#FF1493" strokeWidth="1.5" fill="none"/>
          <path d="M 50 45 Q 55 42 58 45" stroke="#FF1493" strokeWidth="1.5" fill="none"/>
          <circle cx="44" cy="54" r="1.5" fill="#E6E6B8" opacity="0.7"/>
          <circle cx="56" cy="56" r="1.5" fill="#E6E6B8" opacity="0.7"/>
          <circle cx="50" cy="60" r="1.5" fill="#E6E6B8" opacity="0.7"/>
          <ellipse cx="35" cy="35" rx="10" ry="6" fill="#ffffff" opacity="0.3"/>
        </svg>
      ),
      color: 'from-yellow-50 to-yellow-100'
    },
    {
      name: 'Doce de Leite',
      description: 'Cremoso e envolvente, com aquele sabor tradicional brasileiro',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="#C19A6B"/>
          <circle cx="50" cy="50" r="30" fill="#D4AF37"/>
          <path d="M 30 48 Q 35 45 40 48 T 50 48 T 60 48 T 70 48" stroke="#E6C87F" strokeWidth="1.5" fill="none" opacity="0.6"/>
          <path d="M 32 55 Q 37 52 42 55 T 52 55 T 62 55 T 68 55" stroke="#E6C87F" strokeWidth="1.5" fill="none" opacity="0.6"/>
          <circle cx="43" cy="42" r="2" fill="#F4E4C1" opacity="0.5"/>
          <circle cx="57" cy="44" r="1.5" fill="#F4E4C1" opacity="0.5"/>
          <circle cx="48" cy="60" r="2" fill="#F4E4C1" opacity="0.5"/>
          <ellipse cx="35" cy="35" rx="12" ry="7" fill="#ffffff" opacity="0.25"/>
        </svg>
      ),
      color: 'from-amber-300 to-amber-500'
    }
  ]

  return (
    <section id="produtos" className="py-20 bg-gradient-to-b from-truffle-cream to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-truffle-dark mb-4">
            Nossos Sabores
          </h2>
          <div className="w-24 h-1 bg-truffle-caramel mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Trufas artesanais feitas com ingredientes selecionados. 
            Cada sabor é uma experiência única de puro sentimento!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-8`}>
                {product.svg}
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-bold text-2xl text-truffle-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-truffle-caramel">
                    R$ 6,00
                  </span>
                  <span className="text-sm text-gray-500">unidade</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-truffle-dark to-chocolate-800 text-white p-10 rounded-2xl shadow-2xl inline-block">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-playfair font-bold text-3xl mb-4">
              Faça seu Pedido
            </h3>
            <p className="text-xl mb-6 max-w-xl">
              Entre em contato conosco pelo WhatsApp ou Instagram para fazer sua encomenda!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5569984995632"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
              >
                📱 WhatsApp
              </a>
              <a
                href="https://instagram.com/Trufas_puro.sentimento"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
              >
                📸 Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products
