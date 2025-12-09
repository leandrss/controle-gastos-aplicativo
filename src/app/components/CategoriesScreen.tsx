"use client"

import { ArrowLeft, ShoppingBag, Car, Home, Coffee, Heart, GraduationCap, Smartphone, Plane, Gift, MoreHorizontal, Plus, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoriesScreenProps {
  onBack: () => void
}

export function CategoriesScreen({ onBack }: CategoriesScreenProps) {
  const categories = [
    { id: "food", name: "Alimentação", icon: ShoppingBag, color: "bg-green-500", spent: 450.00, budget: 600.00 },
    { id: "transport", name: "Transporte", icon: Car, color: "bg-blue-500", spent: 280.00, budget: 400.00 },
    { id: "home", name: "Casa", icon: Home, color: "bg-purple-500", spent: 1200.00, budget: 1200.00 },
    { id: "leisure", name: "Lazer", icon: Coffee, color: "bg-pink-500", spent: 180.00, budget: 300.00 },
    { id: "health", name: "Saúde", icon: Heart, color: "bg-red-500", spent: 120.00, budget: 200.00 },
    { id: "education", name: "Educação", icon: GraduationCap, color: "bg-indigo-500", spent: 350.00, budget: 500.00 },
    { id: "tech", name: "Tecnologia", icon: Smartphone, color: "bg-cyan-500", spent: 200.00, budget: 300.00 },
    { id: "travel", name: "Viagem", icon: Plane, color: "bg-orange-500", spent: 0.00, budget: 500.00 },
    { id: "gifts", name: "Presentes", icon: Gift, color: "bg-yellow-500", spent: 80.00, budget: 150.00 },
    { id: "other", name: "Outros", icon: MoreHorizontal, color: "bg-gray-500", spent: 45.00, budget: 100.00 },
  ]

  const getPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

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
          <h1 className="text-2xl font-bold text-white">Categorias</h1>
        </div>

        {/* Summary */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Total Gasto</p>
              <p className="text-white text-2xl font-bold">R$ 2.905,00</p>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm mb-1">Orçamento</p>
              <p className="text-white text-2xl font-bold">R$ 4.250,00</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "68%" }} />
          </div>
          <p className="text-indigo-100 text-sm mt-2 text-center">68% do orçamento utilizado</p>
        </div>
      </div>

      {/* Categories List */}
      <div className="px-6 -mt-4 space-y-4">
        {categories.map((category) => {
          const percentage = getPercentage(category.spent, category.budget)
          const progressColor = getProgressColor(percentage)
          
          return (
            <div key={category.id} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{category.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      R$ {category.spent.toFixed(2)} de R$ {category.budget.toFixed(2)}
                    </span>
                    <span className={`font-semibold ${
                      percentage >= 90 ? "text-red-600" : 
                      percentage >= 70 ? "text-yellow-600" : 
                      "text-green-600"
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              {percentage >= 90 && (
                <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Atenção: orçamento quase esgotado!</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add Category Button */}
      <div className="px-6 mt-6">
        <Button className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Nova Categoria
        </Button>
      </div>
    </div>
  )
}
