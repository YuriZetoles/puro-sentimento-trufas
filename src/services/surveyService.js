import { db } from '../config/firebase'
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

const SURVEYS_COLLECTION = 'surveys'
const SPINS_COLLECTION = 'spins'

export async function checkEmailExists(email) {
  try {
    const q = query(
      collection(db, SURVEYS_COLLECTION),
      where('email', '==', email.toLowerCase())
    )
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error('Erro ao verificar email:', error)
    throw new Error('Erro ao verificar email. Tente novamente.')
  }
}

export async function submitSurvey(surveyData) {
  try {
    const normalizedEmail = surveyData.email.toLowerCase()
    
    const emailExists = await checkEmailExists(normalizedEmail)
    if (emailExists) {
      throw new Error('Este email já respondeu nossa pesquisa! Cada cliente tem direito a uma resposta.')
    }

    const dataToSubmit = {
      ...surveyData,
      email: normalizedEmail,
      createdAt: serverTimestamp(),
      hasSpinned: false
    }

    const docRef = await addDoc(collection(db, SURVEYS_COLLECTION), dataToSubmit)

    return {
      success: true,
      surveyId: docRef.id,
      email: normalizedEmail
    }
  } catch (error) {
    console.error('Erro ao enviar pesquisa:', error)
    throw error
  }
}

export async function checkIfSpinned(email) {
  try {
    const q = query(
      collection(db, SPINS_COLLECTION),
      where('email', '==', email.toLowerCase())
    )
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error('Erro ao verificar rotação:', error)
    return false
  }
}

export async function recordSpin(email, result) {
  try {
    const spinData = {
      email: email.toLowerCase(),
      result: result,
      createdAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, SPINS_COLLECTION), spinData)

    return {
      success: true,
      spinId: docRef.id
    }
  } catch (error) {
    console.error('Erro ao registrar rotação:', error)
    throw error
  }
}
