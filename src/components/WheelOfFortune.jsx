import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, X, Lock } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { recordSpin, checkIfSpinned } from '../services/surveyService'

const WheelOfFortune = () => {
  const { hasSurveyCompleted, userEmail, hasSpinned, spinWheel: updateSpinStatus } = useUser()
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [loading, setLoading] = useState(false)
  const [spinError, setSpinError] = useState(null)

  // Prêmios com probabilidades generosas (sem jackpot, giro único)
  const prizes = [
    { 
      id: 1, 
      name: 'Tente Novamente', 
      color: '#D1D5DB', 
      probability: 35, 
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" fill="#9CA3AF"/>
          <path d="M8 15 Q12 18 16 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="9" r="1.5" fill="white"/>
          <circle cx="15" cy="9" r="1.5" fill="white"/>
        </svg>
      )
    },
    { 
      id: 2, 
      name: '5% OFF', 
      color: '#FDE68A', 
      probability: 25,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <rect x="4" y="6" width="16" height="12" rx="2" fill="#F59E0B"/>
          <path d="M4 9 L20 9" stroke="#FBBF24" strokeWidth="1"/>
          <text x="12" y="15" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">5%</text>
        </svg>
      )
    },
    { 
      id: 3, 
      name: '10% OFF', 
      color: '#FCD34D', 
      probability: 20,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M12 2 L14 8 L20 9 L15 14 L17 20 L12 17 L7 20 L9 14 L4 9 L10 8 Z" fill="#F59E0B"/>
          <text x="12" y="14" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">10%</text>
        </svg>
      )
    },
    { 
      id: 4, 
      name: '15% OFF', 
      color: '#FBBF24', 
      probability: 12,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" fill="#F59E0B"/>
          <path d="M12 4 L13 11 L12 11 L11 4 Z" fill="#FBBF24"/>
          <circle cx="12" cy="12" r="7" fill="#FBBF24"/>
          <text x="12" y="14" fontSize="5" fill="#D97706" textAnchor="middle" fontWeight="bold">15%</text>
        </svg>
      )
    },
    { 
      id: 5, 
      name: '20% OFF', 
      color: '#F59E0B', 
      probability: 5,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M12 2 L15 9 L22 10 L16 16 L18 23 L12 19 L6 23 L8 16 L2 10 L9 9 Z" fill="#D97706"/>
          <circle cx="12" cy="12" r="5" fill="#FBBF24"/>
          <text x="12" y="14" fontSize="4.5" fill="#92400E" textAnchor="middle" fontWeight="bold">20%</text>
        </svg>
      )
    },
    { 
      id: 6, 
      name: '1 Trufa Grátis', 
      color: '#D97706', 
      probability: 3,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <circle cx="12" cy="13" r="7" fill="#6B3410"/>
          <circle cx="12" cy="13" r="6" fill="#8B4513"/>
          <ellipse cx="10" cy="10" rx="2" ry="1.5" fill="#A0522D" opacity="0.6"/>
          <circle cx="14" cy="12" r="0.8" fill="#A0522D" opacity="0.6"/>
          <circle cx="11" cy="15" r="0.7" fill="#A0522D" opacity="0.6"/>
          <path d="M12 6 Q10 7 11 8 T12 6" fill="#228B22" stroke="#228B22" strokeWidth="0.5"/>
        </svg>
      )
    }
  ]

  const spinWheel = () => {
    if (isSpinning || hasSpinned || !hasSurveyCompleted) return

    setIsSpinning(true)
    setShowResult(false)
    setSpinError(null)
    
    // Gerar resultado baseado nas probabilidades
    const random = Math.random() * 100
    let cumulative = 0
    let selectedPrize = prizes[0]

    for (const prize of prizes) {
      cumulative += prize.probability
      if (random <= cumulative) {
        selectedPrize = prize
        break
      }
    }

    // Calcular rotação (múltiplas voltas + posição final)
    const spins = 8 + Math.random() * 4 // 8-12 voltas completas para melhor visualização
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id)
    const segmentAngle = 360 / prizes.length
    const finalAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2)
    const totalRotation = rotation + (spins * 360) + finalAngle

    setRotation(totalRotation)

    // Mostrar resultado após a animação
    setTimeout(async () => {
      setResult(selectedPrize)
      setShowResult(true)
      setIsSpinning(false)
      
      // Registrar a rotação no Firebase
      if (userEmail) {
        try {
          await recordSpin(userEmail, {
            prizeName: selectedPrize.name,
            probability: selectedPrize.probability
          })
          updateSpinStatus()
        } catch (error) {
          console.error('Erro ao registrar rotação:', error)
        }
      }
    }, 5000)
  }

  return (
    <section id="roleta" className="py-20 bg-gradient-to-b from-white to-truffle-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              rotate: Math.random() * 360
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            🍫
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-truffle-dark mb-4">
            🎰 Roleta da Sorte
          </h2>
          <div className="w-24 h-1 bg-truffle-caramel mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Gire a roleta e tente a sorte! Você pode ganhar descontos incríveis ou até uma trufa grátis! 
            <span className="block mt-2 text-sm text-gray-500">
              (Uma chance por cliente via QR Code)
            </span>
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Wheel Container */}
          <div className="relative mb-8">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500 drop-shadow-xl"></div>
            </div>

            {/* Wheel */}
            <div className="bg-white p-8 rounded-full shadow-2xl">
              <motion.div
                className="relative w-full aspect-square rounded-full overflow-hidden shadow-inner border-4 border-truffle-gold"
                animate={{
                  rotate: rotation,
                }}
                transition={{
                  duration: 5,
                  ease: [0.17, 0.67, 0.12, 0.99]
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {prizes.map((prize, index) => {
                    const segmentAngle = 360 / prizes.length
                    const startAngle = index * segmentAngle - 90
                    const endAngle = startAngle + segmentAngle
                    
                    const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180)
                    
                    const largeArcFlag = segmentAngle > 180 ? 1 : 0
                    
                    return (
                      <g key={prize.id}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={prize.color}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <g transform={`rotate(${startAngle + segmentAngle / 2 + 90} 50 50) translate(0, -30)`}>
                          <foreignObject x="45" y="45" width="10" height="10">
                            <div className="flex items-center justify-center w-full h-full">
                              {prize.svg}
                            </div>
                          </foreignObject>
                        </g>
                        <text
                          x="50"
                          y="50"
                          fill="#1F2937"
                          fontSize="2.5"
                          fontWeight="bold"
                          textAnchor="middle"
                          transform={`rotate(${startAngle + segmentAngle / 2 + 90} 50 50) translate(0, -23)`}
                        >
                          {prize.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-truffle-gold rounded-full shadow-xl flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center">
            {!hasSurveyCompleted ? (
              <div className="bg-blue-50 border-2 border-blue-300 text-blue-800 p-6 rounded-xl flex items-center gap-3">
                <Lock className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-bold">🔒 Roleta Bloqueada</p>
                  <p className="text-sm">Complete a pesquisa de satisfação primeiro para acessar a roleta!</p>
                </div>
              </div>
            ) : hasSpinned ? (
              <motion.button
                disabled
                className="btn-primary opacity-50 cursor-not-allowed"
              >
                ✅ Você já girou! Obrigado!
              </motion.button>
            ) : (
              <motion.button
                onClick={spinWheel}
                disabled={isSpinning || spinError}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn-primary ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles />
                    </motion.div>
                    Girando...
                  </span>
                ) : (
                  '🎲 GIRAR A ROLETA'
                )}
              </motion.button>
            )}
          </div>


        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowResult(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3
                  }}
                  className="mb-4 flex justify-center"
                >
                  <div className="w-24 h-24 flex items-center justify-center">
                    {result.svg}
                  </div>
                </motion.div>

                <h3 className="font-playfair font-bold text-4xl text-truffle-dark mb-4">
                  {result.name}
                </h3>

                {result.name === 'Tente Novamente' ? (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-6">
                    <p className="text-lg text-gray-700">
                      Não foi dessa vez, mas obrigado por participar! 💝
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Continue nos acompanhando nas redes sociais!
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl mb-6">
                    <p className="text-xl font-bold mb-2">🎉 Parabéns! 🎉</p>
                    <p className="text-lg">
                      Mostre esta tela para resgatar seu prêmio em sua próxima compra!
                    </p>
                    {result.name.includes('Trufa') && (
                      <p className="text-sm mt-2 opacity-90">
                        Escolha seu sabor favorito: Brigadeiro, Beijinho ou Doce de Leite! 🍫
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  Continue nos acompanhando nas redes sociais para mais promoções!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WheelOfFortune
