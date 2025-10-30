import { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

const FirebaseDebug = () => {
  const [status, setStatus] = useState('testando...')
  const [error, setError] = useState(null)
  const [config, setConfig] = useState({})

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Mostrar configuração (sem API key por segurança)
        setConfig({
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY
        })

        // Tentar ler surveys
        const surveysRef = collection(db, 'surveys')
        const snapshot = await getDocs(surveysRef)
        
        setStatus(`✅ Conectado! ${snapshot.size} pesquisas`)
        setError(null)
      } catch (err) {
        setStatus('❌ Erro')
        setError(err.message)
        console.error('Firebase Error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      background: '#fff',
      border: '2px solid #333',
      borderRadius: 8,
      padding: 16,
      maxWidth: 400,
      fontSize: 12,
      zIndex: 9999,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
        🔥 Firebase Debug
      </div>
      <div>Status: {status}</div>
      <div style={{ marginTop: 8, fontSize: 10 }}>
        <div>Project ID: {config.projectId || 'não configurado'}</div>
        <div>Auth Domain: {config.authDomain || 'não configurado'}</div>
        <div>API Key: {config.hasApiKey ? '✅ Configurada' : '❌ Faltando'}</div>
      </div>
      {error && (
        <div style={{
          marginTop: 8,
          padding: 8,
          background: '#fee',
          borderRadius: 4,
          color: '#c00',
          fontSize: 10
        }}>
          <strong>Erro:</strong> {error}
        </div>
      )}
    </div>
  )
}

export default FirebaseDebug
