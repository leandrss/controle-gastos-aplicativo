"use client"

import { useState } from "react"
import { LoginScreen } from "./components/LoginScreen"
import { SignupScreen } from "./components/SignupScreen"
import { Dashboard } from "./components/Dashboard"
import { TransactionForm } from "./components/TransactionForm"
import { CategoriesScreen } from "./components/CategoriesScreen"
import { ProfileScreen } from "./components/ProfileScreen"
import { TransactionsScreen } from "./components/TransactionsScreen"

type Screen = "login" | "signup" | "dashboard" | "add-transaction" | "categories" | "profile" | "transactions"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleSignup = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  if (!isAuthenticated) {
    return (
      <>
        {currentScreen === "login" && (
          <LoginScreen 
            onLogin={handleLogin}
            onSignup={() => setCurrentScreen("signup")}
          />
        )}
        {currentScreen === "signup" && (
          <SignupScreen 
            onSignup={handleSignup}
            onBackToLogin={() => setCurrentScreen("login")}
          />
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentScreen === "dashboard" && (
        <Dashboard 
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "add-transaction" && (
        <TransactionForm 
          onBack={() => setCurrentScreen("dashboard")}
          onSave={() => setCurrentScreen("dashboard")}
        />
      )}
      {currentScreen === "categories" && (
        <CategoriesScreen 
          onBack={() => setCurrentScreen("dashboard")}
        />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen 
          onBack={() => setCurrentScreen("dashboard")}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === "transactions" && (
        <TransactionsScreen 
          onBack={() => setCurrentScreen("dashboard")}
        />
      )}
    </div>
  )
}
