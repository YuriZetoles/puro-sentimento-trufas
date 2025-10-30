import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import WheelOfFortune from './components/WheelOfFortune'
import Survey from './components/Survey'
import Videos from './components/Videos'
import Footer from './components/Footer'
import { UserProvider } from './context/UserContext'

function AppContent() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <About />
      <Products />
      <Survey />
      <WheelOfFortune />
      <Videos />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
