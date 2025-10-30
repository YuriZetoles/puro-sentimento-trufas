import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import WheelOfFortune from './components/WheelOfFortune'
import Survey from './components/Survey'
import Videos from './components/Videos'
import Footer from './components/Footer'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Products />
        <Survey />
        <WheelOfFortune />
        <Videos />
        <Footer />
      </div>
    </UserProvider>
  )
}

export default App
