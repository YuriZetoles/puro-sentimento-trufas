import { motion } from 'framer-motion'
import { Youtube } from 'lucide-react'

const Videos = () => {
  // URLs de vídeos
  const videos = [
    {
      id: 1,
      title: 'Mario e Trufas - PS: Puro Sentimento',
      embedUrl: 'https://www.youtube.com/embed/XdljuQpIQ5E',
      description: 'O herói bigodudo recomenda: pule para um novo nível de sabor com estas trufas!'
    },
    {
      id: 2,
      title: 'Sonic e Trufas - PS: Puro Sentimento',
      embedUrl: 'https://www.youtube.com/embed/bpyG-h3Lqk0',
      description: 'Rápido! Garanta a sua. Sonic aprova a velocidade e o sabor incrível destas trufas.'
    },
    {
      id: 3,
      title: 'Como Fazer Trufas de Chocolate',
      embedUrl: 'https://www.youtube.com/embed/IKRt_60aZoc',
      description: 'O maior especialista em doces convida você a provar uma criação mágica. Uma delícia pura!'
    }
  ]

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-truffle-cream to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-truffle-dark mb-4">
            🎬 Nossos Vídeos
          </h2>
          <div className="w-24 h-1 bg-truffle-caramel mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Acompanhe nosso processo artesanal e conheça mais sobre a PS: Puro Sentimento
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Video Embed */}
              <div className="relative aspect-video bg-gray-900">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-playfair font-bold text-xl text-truffle-dark mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Videos
