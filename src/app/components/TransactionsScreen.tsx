"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, ShoppingBag, Car, Home, Coffee, Heart, TrendingUp, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TransactionsScreenProps {
  onBack: () => void
}

export function TransactionsScreen({ onBack }: TransactionsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">("all")

  const transactions = [
    { id: 1, title: "Supermercado Extra", category: "Alimentação", amount: -150.00, date: "2024-01-15", time: "14:30", icon: ShoppingBag, color: "text-green-600 bg-green-50" },
    { id: 2, title: "Salário Janeiro", category: "Receita", amount: 5000.00, date: "2024-01-14", time: "09:00", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { id: 3, title: "Uber - Centro", category: "Transporte", amount: -25.50, date: "2024-01-14", time: "18:45", icon: Car, color: "text-blue-600 bg-blue-50" },
    { id: 4, title: "Aluguel Apartamento", category: "Casa", amount: -1200.00, date: "2024-01-13", time: "10:00", icon: Home, color: "text-purple-600 bg-purple-50" },
    { id: 5, title: "Café da Manhã", category: "Alimentação", amount: -12.00, date: "2024-01-12", time: "08:15", icon: Coffee, color: "text-amber-600 bg-amber-50" },
    { id: 6, title: "Academia - Mensalidade", category: "Saúde", amount: -120.00, date: "2024-01-11", time: "07:00", icon: Heart, color: "text-red-600 bg-red-50" },
    { id: 7, title: "Restaurante Italiano", category: "Alimentação", amount: -85.00, date: "2024-01-10", time: "20:30", icon: Coffee, color: "text-amber-600 bg-amber-50" },
    { id: 8, title: "Uber - Shopping", category: "Transporte", amount: -18.00, date: "2024-01-10", time: "15:20", icon: Car, color: "text-blue-600 bg-blue-50" },
    { id: 9, title: "Freelance - Design", category: "Receita", amount: 800.00, date: "2024-01-09", time: "16:00", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    { id: 10, title: "Mercado Local", category: "Alimentação", amount: -67.50, date: "2024-01-08", time: "11:00", icon: ShoppingBag, color: "text-green-600 bg-green-50" },
  ]

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let label = ""
    if (date.toDateString() === today.toDateString()) {
      label = "Hoje"
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Ontem"
    } else {
      label = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    }

    if (!acc[label]) {
      acc[label] = []
    }
    acc[label].push(transaction)
    return acc
  }, {} as Record<string, typeof transactions>)

  const filteredTransactions = Object.entries(groupedTransactions).reduce((acc, [date, trans]) => {
    const filtered = trans.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterType === "all" ||
                          (filterType === "expense" && t.amount < 0) ||
                          (filterType === "income" && t.amount > 0)
      return matchesSearch && matchesFilter
    })
    if (filtered.length > 0) {
      acc[date] = filtered
    }
    return acc
  }, {} as Record<string, typeof transactions>)

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-8 pb-8 rounded-b-[3rem]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Transações</h1>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-indigo-100 text-sm mb-1">Receitas</p>
            <p className="text-white text-xl font-bold">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-indigo-100 text-sm mb-1">Despesas</p>
            <p className="text-white text-xl font-bold">R$ {totalExpense.toFixed(2)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar transações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white rounded-2xl border-0 focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 py-2 rounded-xl font-medium transition-all ${
              filterType === "all"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterType("expense")}
            className={`flex-1 py-2 rounded-xl font-medium transition-all ${
              filterType === "expense"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setFilterType("income")}
            className={`flex-1 py-2 rounded-xl font-medium transition-all ${
              filterType === "income"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Receitas
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-6 space-y-6">
        {Object.entries(filteredTransactions).map(([date, transactions]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{date}</h3>
            </div>
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    index !== transactions.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className={`w-12 h-12 ${transaction.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <transaction.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{transaction.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(filteredTransactions).length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Nenhuma transação encontrada</p>
            <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros ou busca</p>
          </div>
        )}
      </div>
    </div>
  )
}
