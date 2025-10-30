import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { submitSurvey, checkEmailExists } from '../services/surveyService'
import { useUser } from '../context/UserContext'

const Survey = () => {
  const { completesurvey } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    satisfaction: '',
    favoriteProduct: '',
    recommendation: '',
    suggestions: '',
    frequency: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [surveyId, setSurveyId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validações obrigatórias
      if (!formData.name || formData.name.trim().length < 2) {
        throw new Error('Nome é obrigatório (mínimo 2 caracteres)!')
      }
      
      if (!formData.email) {
        throw new Error('E-mail é obrigatório!')
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor, insira um e-mail válido!')
      }
      
      if (!formData.satisfaction || !formData.favoriteProduct || !formData.recommendation || !formData.frequency) {
        throw new Error('Por favor, responda todas as perguntas obrigatórias!')
      }

      // Enviar para Firestore
      const result = await submitSurvey(formData)
      
      // Atualizar contexto
      completesurvey(result.email)
      
      setSurveyId(result.surveyId)
      setSubmitted(true)
      
      // Reset após 3 segundos
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          satisfaction: '',
          favoriteProduct: '',
          recommendation: '',
          suggestions: '',
          frequency: ''
        })
      }, 3000)
    } catch (err) {
      setError(err.message || 'Erro ao enviar pesquisa. Tente novamente.')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pesquisa" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-truffle-dark mb-4">
            📋 Pesquisa de Satisfação
          </h2>
          <div className="w-24 h-1 bg-truffle-caramel mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
            Sua opinião é muito importante para nós! Ajude-nos a melhorar cada vez mais.
          </p>
          <div className="bg-gradient-to-r from-truffle-gold/20 to-truffle-caramel/20 border-2 border-truffle-gold p-6 rounded-xl max-w-2xl mx-auto">
            <p className="text-truffle-dark font-semibold text-lg mb-2">
              🎁 Complete a pesquisa e GANHE uma chance de girar a Roleta da Sorte!
            </p>
            <ul className="text-left text-gray-700 space-y-2">
              <li>✅ Email obrigatório para participar</li>
              <li>🍫 Chance de ganhar <strong>1 trufa grátis</strong></li>
              <li>💰 Cupons de desconto de até <strong>20% OFF</strong> para sua próxima compra</li>
              <li>🎲 <strong>Uma chance por email</strong> - não perca!</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-truffle-cream to-white p-8 md:p-12 rounded-2xl shadow-2xl space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  E-mail <span className="text-red-500">*</span>
                  <span className="text-sm font-normal text-gray-600 ml-2">(obrigatório para girar a roleta)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Satisfação Geral */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Como você avalia nossos produtos? *
                </label>
                <select
                  name="satisfaction"
                  value={formData.satisfaction}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                  <option value="4">⭐⭐⭐⭐ Muito Bom</option>
                  <option value="3">⭐⭐⭐ Bom</option>
                  <option value="2">⭐⭐ Regular</option>
                  <option value="1">⭐ Precisa Melhorar</option>
                </select>
              </div>

              {/* Produto Favorito */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Qual seu sabor favorito? *
                </label>
                <select
                  name="favoriteProduct"
                  value={formData.favoriteProduct}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="brigadeiro">🍫 Brigadeiro</option>
                  <option value="beijinho">🥥 Beijinho</option>
                  <option value="doce-leite">� Doce de Leite</option>
                </select>
              </div>

              {/* Frequência de Compra */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Com que frequência você compraria nossas trufas? *
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="semanal">Semanalmente</option>
                  <option value="quinzenal">Quinzenalmente</option>
                  <option value="mensal">Mensalmente</option>
                  <option value="ocasional">Ocasionalmente</option>
                </select>
              </div>

              {/* Recomendaria */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Você recomendaria PS: Puro Sentimento para amigos? *
                </label>
                <div className="space-y-2">
                  {['Sim, com certeza!', 'Provavelmente sim', 'Talvez', 'Provavelmente não', 'Não'].map((option) => (
                    <label key={option} className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-truffle-cream transition-colors">
                      <input
                        type="radio"
                        name="recommendation"
                        value={option}
                        checked={formData.recommendation === option}
                        onChange={handleChange}
                        required
                        className="mr-3 w-5 h-5 text-truffle-caramel"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sugestões */}
              <div>
                <label className="block text-truffle-dark font-semibold mb-2">
                  Sugestões ou comentários
                </label>
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-truffle-caramel focus:outline-none transition-colors resize-none"
                  placeholder="Conte-nos o que podemos melhorar ou o que você mais gostou..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-5 h-5" />
                    </motion.div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Pesquisa
                  </>
                )}
              </motion.button>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Erro!</strong>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-12 rounded-2xl shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="font-playfair font-bold text-4xl text-truffle-dark mb-4">
                Muito Obrigado! 💝
              </h3>
              <p className="text-xl text-gray-700">
                Sua opinião é muito valiosa para nós e nos ajuda a criar momentos ainda mais especiais!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Survey
