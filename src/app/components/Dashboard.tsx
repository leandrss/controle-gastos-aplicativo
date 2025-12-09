"use client"

import { Plus, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Car, Home, Coffee, Heart, GraduationCap, MoreHorizontal, Menu, User, List, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  onNavigate: (screen: "dashboard" | "add-transaction" | "categories" | "profile" | "transactions") => void
  onLogout: () => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const transactions = [
    { id: 1, title: "Supermercado", category: "Alimentação", amount: -150.00, date: "Hoje", icon: ShoppingBag, color: "text-green-600 bg-green-50" },
    { id: 2, title: "Salário", category: "Receita", amount: 5000.00, date: "Ontem", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { id: 3, title: "Uber", category: "Transporte", amount: -25.50, date: "Ontem", icon: Car, color: "text-blue-600 bg-blue-50" },
    { id: 4, title: "Aluguel", category: "Casa", amount: -1200.00, date: "2 dias atrás", icon: Home, color: "text-purple-600 bg-purple-50" },
    { id: 5, title: "Café", category: "Alimentação", amount: -12.00, date: "3 dias atrás", icon: Coffee, color: "text-amber-600 bg-amber-50" },
  ]

  const categories = [
    { name: "Alimentação", amount: 450, percentage: 30, color: "bg-green-500" },
    { name: "Transporte", amount: 280, percentage: 18, color: "bg-blue-500" },
    { name: "Casa", amount: 1200, percentage: 40, color: "bg-purple-500" },
    { name: "Lazer", amount: 180, percentage: 12, color: "bg-pink-500" },
  ]

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-8 pb-32 rounded-b-[3rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Bem-vindo de volta</p>
              <h1 className="text-white text-xl font-bold">João Silva</h1>
            </div>
          </div>
          <button 
            onClick={() => onNavigate("profile")}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <p className="text-gray-600 text-sm mb-2">Saldo Total</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">R$ 3.432,50</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-600 text-sm">Receitas</span>
              </div>
              <p className="text-xl font-bold text-gray-900">R$ 5.000,00</p>
            </div>
            
            <div className="bg-red-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-600 text-sm">Despesas</span>
              </div>
              <p className="text-xl font-bold text-gray-900">R$ 1.567,50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-20">
        {/* Spending by Category */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Gastos por Categoria</h3>
            <button 
              onClick={() => onNavigate("categories")}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
            >
              Ver todas
            </button>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{category.name}</span>
                  <span className="text-gray-900 font-bold">R$ {category.amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Transações Recentes</h3>
            <button 
              onClick={() => onNavigate("transactions")}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
            >
              Ver todas
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                <div className={`w-12 h-12 ${transaction.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <transaction.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{transaction.title}</p>
                  <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => onNavigate("dashboard")}
            className="flex flex-col items-center gap-1 text-indigo-600"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          
          <button 
            onClick={() => onNavigate("transactions")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <List className="w-6 h-6" />
            <span className="text-xs font-medium">Transações</span>
          </button>
          
          <button 
            onClick={() => onNavigate("add-transaction")}
            className="w-14 h-14 -mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>
          
          <button 
            onClick={() => onNavigate("categories")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <Folder className="w-6 h-6" />
            <span className="text-xs font-medium">Categorias</span>
          </button>
          
          <button 
            onClick={() => onNavigate("profile")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button - Alternative position */}
      <button 
        onClick={() => onNavigate("add-transaction")}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 md:hidden"
      >
        <Plus className="w-8 h-8 text-white" />
      </button>
    </div>
  )
}
