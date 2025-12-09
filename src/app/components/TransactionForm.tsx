"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingBag, Car, Home, Coffee, Heart, GraduationCap, Smartphone, Plane, Gift, MoreHorizontal, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TransactionFormProps {
  onBack: () => void
  onSave: () => void
}

export function TransactionForm({ onBack, onSave }: TransactionFormProps) {
  const [type, setType] = useState<"expense" | "income">("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState("")

  const categories = [
    { id: "food", name: "Alimentação", icon: ShoppingBag, color: "bg-green-500" },
    { id: "transport", name: "Transporte", icon: Car, color: "bg-blue-500" },
    { id: "home", name: "Casa", icon: Home, color: "bg-purple-500" },
    { id: "leisure", name: "Lazer", icon: Coffee, color: "bg-pink-500" },
    { id: "health", name: "Saúde", icon: Heart, color: "bg-red-500" },
    { id: "education", name: "Educação", icon: GraduationCap, color: "bg-indigo-500" },
    { id: "tech", name: "Tecnologia", icon: Smartphone, color: "bg-cyan-500" },
    { id: "travel", name: "Viagem", icon: Plane, color: "bg-orange-500" },
    { id: "gifts", name: "Presentes", icon: Gift, color: "bg-yellow-500" },
    { id: "other", name: "Outros", icon: MoreHorizontal, color: "bg-gray-500" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-8 pb-8 rounded-b-[3rem]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Nova Transação</h1>
        </div>

        {/* Type Toggle */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-1 flex gap-1">
          <button
            onClick={() => setType("expense")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              type === "expense" 
                ? "bg-white text-indigo-600 shadow-lg" 
                : "text-white"
            }`}
          >
            Despesa
          </button>
          <button
            onClick={() => setType("income")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              type === "income" 
                ? "bg-white text-indigo-600 shadow-lg" 
                : "text-white"
            }`}
          >
            Receita
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 -mt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <Label htmlFor="amount" className="text-gray-700 mb-2 block">Valor</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">R$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-16 h-16 text-3xl font-bold border-0 focus:ring-0 bg-transparent"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <Label className="text-gray-700 mb-4 block">Categoria</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    category === cat.id
                      ? "bg-indigo-50 ring-2 ring-indigo-600"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <Label htmlFor="date" className="text-gray-700 mb-2 block">Data</Label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-12 h-14 rounded-xl border-gray-200"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <Label htmlFor="description" className="text-gray-700 mb-2 block">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Adicione uma descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] rounded-xl border-gray-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pb-8">
            <Button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Salvar Transação
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
