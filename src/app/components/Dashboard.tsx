"use client"

import { useState, useEffect } from "react"
import { Plus, TrendingUp, TrendingDown, Home, User, List, Folder, Menu, Inbox } from "lucide-react"

interface DashboardProps {
  onNavigate: (screen: "dashboard" | "add-transaction" | "categories" | "profile" | "transactions") => void
  onLogout: () => void
  isFirstAccess: boolean
}

export function Dashboard({ onNavigate, isFirstAccess }: DashboardProps) {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Carrega dados do localStorage
    try {
      const storedBalance = parseFloat(localStorage.getItem("finflow_balance") || "0")
      const storedIncome = parseFloat(localStorage.getItem("finflow_income") || "0")
      const storedExpenses = parseFloat(localStorage.getItem("finflow_expenses") || "0")
      const storedTransactions = JSON.parse(localStorage.getItem("finflow_transactions") || "[]")
      const storedName = localStorage.getItem("finflow_user_name") || "Usuário"

      setBalance(storedBalance)
      setIncome(storedIncome)
      setExpenses(storedExpenses)
      setTransactions(storedTransactions)
      setUserName(storedName)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const hasTransactions = transactions.length > 0

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
              <p className="text-indigo-100 text-sm">Bem-vindo, {userName.split(' ')[0]}</p>
              <h1 className="text-white text-xl font-bold">FinFlow</h1>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{formatCurrency(balance)}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-600 text-sm">Receitas</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(income)}</p>
            </div>
            
            <div className="bg-red-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-600 text-sm">Despesas</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-20">
        {/* Empty State or Transactions */}
        {!hasTransactions ? (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Comece agora!</h3>
            <p className="text-gray-600 mb-6">
              Adicione sua primeira movimentação para começar a controlar suas finanças.
            </p>
            <button
              onClick={() => onNavigate("add-transaction")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Adicionar Transação
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Resumo Financeiro</h3>
              <button 
                onClick={() => onNavigate("add-transaction")}
                className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
              >
                + Nova
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-700">Total de Transações</span>
                <span className="text-gray-900 font-bold">{transactions.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-gray-700">Receitas</span>
                <span className="text-green-600 font-bold">{formatCurrency(income)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <span className="text-gray-700">Despesas</span>
                <span className="text-red-600 font-bold">{formatCurrency(expenses)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Categories Preview - Empty */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Categorias</h3>
            <button 
              onClick={() => onNavigate("categories")}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
            >
              Ver todas
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Alimentação", amount: 0 },
              { name: "Transporte", amount: 0 },
              { name: "Casa", amount: 0 },
              { name: "Lazer", amount: 0 }
            ].map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{category.name}</span>
                  <span className="text-gray-900 font-bold">{formatCurrency(category.amount)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-200 rounded-full w-0" />
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
          
          {!hasTransactions ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <List className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm">Nenhuma transação registrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
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
    </div>
  )
}
