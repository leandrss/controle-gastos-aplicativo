"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "./components/LoginScreen"
import { SignupScreen } from "./components/SignupScreen"
import { Dashboard } from "./components/Dashboard"
import { TransactionForm } from "./components/TransactionForm"
import { CategoriesScreen } from "./components/CategoriesScreen"
import { ProfileScreen } from "./components/ProfileScreen"
import { TransactionsScreen } from "./components/TransactionsScreen"
import { SubscriptionScreen } from "./components/SubscriptionScreen"

type Screen = "subscription" | "login" | "signup" | "dashboard" | "add-transaction" | "categories" | "profile" | "transactions"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("subscription")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFirstAccess, setIsFirstAccess] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  // Verifica assinatura e primeiro acesso ao carregar o app
  useEffect(() => {
    try {
      const subscribed = localStorage.getItem("finflow_subscribed")
      const hasAccount = localStorage.getItem("finflow_has_account")
      
      if (subscribed === "true") {
        setIsSubscribed(true)
        
        if (hasAccount === "true") {
          setIsFirstAccess(false)
          setCurrentScreen("login")
        } else {
          setIsFirstAccess(true)
          setCurrentScreen("signup")
        }
      } else {
        setIsSubscribed(false)
        setCurrentScreen("subscription")
      }
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao carregar dados do localStorage"])
      console.error("Erro ao carregar dados:", error)
    }
  }, [])

  const handleSubscribed = () => {
    try {
      localStorage.setItem("finflow_subscribed", "true")
      setIsSubscribed(true)
      setCurrentScreen("signup")
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao salvar assinatura"])
      console.error("Erro ao salvar assinatura:", error)
    }
  }

  const handleLogin = (email: string, password: string) => {
    try {
      // Validação básica
      if (!email || !password) {
        setErrors(prev => [...prev, "Email e senha são obrigatórios"])
        return false
      }

      // Simula validação de login
      const savedEmail = localStorage.getItem("finflow_user_email")
      const savedPassword = localStorage.getItem("finflow_user_password")

      if (email === savedEmail && password === savedPassword) {
        setIsAuthenticated(true)
        setCurrentScreen("dashboard")
        return true
      } else {
        setErrors(prev => [...prev, "Email ou senha incorretos"])
        return false
      }
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao fazer login"])
      console.error("Erro ao fazer login:", error)
      return false
    }
  }

  const handleSignup = (name: string, email: string, password: string) => {
    try {
      // Validação básica
      if (!name || !email || !password) {
        setErrors(prev => [...prev, "Todos os campos são obrigatórios"])
        return false
      }

      if (password.length < 6) {
        setErrors(prev => [...prev, "Senha deve ter no mínimo 6 caracteres"])
        return false
      }

      // Salva dados do usuário
      localStorage.setItem("finflow_has_account", "true")
      localStorage.setItem("finflow_user_name", name)
      localStorage.setItem("finflow_user_email", email)
      localStorage.setItem("finflow_user_password", password)
      
      // Inicializa dados vazios
      localStorage.setItem("finflow_balance", "0")
      localStorage.setItem("finflow_income", "0")
      localStorage.setItem("finflow_expenses", "0")
      localStorage.setItem("finflow_transactions", JSON.stringify([]))
      
      setIsAuthenticated(true)
      setIsFirstAccess(false)
      setCurrentScreen("dashboard")
      return true
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao criar conta"])
      console.error("Erro ao criar conta:", error)
      return false
    }
  }

  const handleLogout = () => {
    try {
      setIsAuthenticated(false)
      setCurrentScreen("login")
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao fazer logout"])
      console.error("Erro ao fazer logout:", error)
    }
  }

  const navigateTo = (screen: Screen) => {
    try {
      setCurrentScreen(screen)
    } catch (error) {
      setErrors(prev => [...prev, "Erro ao navegar"])
      console.error("Erro ao navegar:", error)
    }
  }

  // Tela de assinatura - aparece primeiro
  if (!isSubscribed) {
    return <SubscriptionScreen onSubscribed={handleSubscribed} />
  }

  // Telas de autenticação - aparecem após assinatura
  if (!isAuthenticated) {
    return (
      <>
        {currentScreen === "signup" && (
          <SignupScreen 
            onSignup={handleSignup}
            onBackToLogin={() => setCurrentScreen("login")}
            isFirstAccess={isFirstAccess}
          />
        )}
        {currentScreen === "login" && (
          <LoginScreen 
            onLogin={handleLogin}
            onSignup={() => setCurrentScreen("signup")}
          />
        )}
      </>
    )
  }

  // App principal - aparece após autenticação
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Error Display (para debug) */}
      {errors.length > 0 && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          {errors.map((error, index) => (
            <div key={index} className="bg-red-500 text-white px-4 py-2 rounded-lg mb-2 shadow-lg">
              {error}
            </div>
          ))}
        </div>
      )}

      {currentScreen === "dashboard" && (
        <Dashboard 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          isFirstAccess={isFirstAccess}
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
