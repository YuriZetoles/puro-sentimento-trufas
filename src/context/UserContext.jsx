import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null)
  const [hasSurveyCompleted, setHasSurveyCompleted] = useState(false)
  const [hasSpinned, setHasSpinned] = useState(false)

  const completesurvey = (email) => {
    setUserEmail(email)
    setHasSurveyCompleted(true)
  }

  const spinWheel = () => {
    setHasSpinned(true)
  }

  const resetUser = () => {
    setUserEmail(null)
    setHasSurveyCompleted(false)
    setHasSpinned(false)
  }

  return (
    <UserContext.Provider value={{
      userEmail,
      hasSurveyCompleted,
      hasSpinned,
      completesurvey,
      spinWheel,
      resetUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider')
  }
  return context
}
