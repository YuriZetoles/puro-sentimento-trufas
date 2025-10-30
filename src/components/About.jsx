import { motion } from 'framer-motion'
import { Heart, Users, Award, Target } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Ingredientes selecionados e rigor no processo artesanal'
    },
    {
      icon: Heart,
      title: 'Carinho',
      description: 'Atenção aos detalhes, da produção à embalagem'
    },
    {
      icon: Target,
      title: 'Criatividade',
      description: 'Inovação constante em sabores e apresentação'
    },
    {
      icon: Users,
      title: 'Proximidade',
      description: 'Atendimento humanizado e amigável'
    }
  ]

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-truffle-dark mb-4">
            Nossa História
          </h2>
          <div className="w-24 h-1 bg-truffle-caramel mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            O nome <span className="font-bold text-truffle-dark">PS: Puro Sentimento</span> utiliza 
            o trocadilho "PS:", sigla para <em>Post Scriptum</em> (aquilo que se escreve depois do fim de uma carta), 
            brincando com a ideia de que o chocolate é um "algo a mais", um carinho extra, 
            um puro sentimento adicionado ao seu dia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-truffle-cream to-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="font-playfair font-bold text-3xl text-truffle-dark mb-4">
              🎯 Nossa Missão
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Transformar momentos comuns em ocasiões especiais através de chocolates artesanais, 
              entregando sabor, carinho e um "Puro Sentimento" em cada mordida.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-truffle-cream to-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="font-playfair font-bold text-3xl text-truffle-dark mb-4">
              🌟 Nossa Visão
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ser a marca de trufas artesanais mais lembrada e querida de Vilhena, 
              reconhecida pela criatividade, qualidade incomparável e pela conexão emocional com nossos clientes.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="inline-block p-4 bg-truffle-cream rounded-full mb-4">
                <value.icon className="w-8 h-8 text-truffle-dark" />
              </div>
              <h4 className="font-playfair font-bold text-xl text-truffle-dark mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-r from-truffle-caramel to-chocolate-700 text-white p-10 rounded-2xl shadow-2xl"
        >
          <h3 className="font-playfair font-bold text-3xl mb-4">
            📍 Vilhena/RO
          </h3>
          <p className="text-xl max-w-2xl mx-auto">
            Produção 100% artesanal e caseira, com todo carinho e dedicação 
            de quatro sócios apaixonados por chocolate e por criar momentos especiais.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About
