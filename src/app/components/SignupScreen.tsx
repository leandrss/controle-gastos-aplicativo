"use client"

import { useState } from "react"
import { Mail, Lock, User, TrendingUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupScreenProps {
  onSignup: () => void
  onBackToLogin: () => void
}

export function SignupScreen({ onSignup, onBackToLogin }: SignupScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      onSignup()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTggMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAgMjRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em04IDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="w-full max-w-md relative">
        {/* Back Button */}
        <button 
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-white mb-6 hover:text-indigo-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4">
            <TrendingUp className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FinFlow</h1>
          <p className="text-indigo-100">Crie sua conta gratuitamente</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Conta</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
              <span className="text-gray-600">
                Concordo com os <span className="text-indigo-600 font-medium">Termos de Uso</span> e <span className="text-indigo-600 font-medium">Política de Privacidade</span>
              </span>
            </div>

            <Button 
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <button 
                onClick={onBackToLogin}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
