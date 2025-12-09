"use client"

import { ArrowLeft, User, Mail, Lock, Bell, Moon, Globe, Download, Shield, LogOut, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileScreenProps {
  onBack: () => void
  onLogout: () => void
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const menuItems = [
    {
      section: "Conta",
      items: [
        { icon: User, label: "Editar Perfil", action: () => {} },
        { icon: Mail, label: "Email", value: "joao@email.com", action: () => {} },
        { icon: Lock, label: "Alterar Senha", action: () => {} },
      ]
    },
    {
      section: "Preferências",
      items: [
        { icon: Bell, label: "Notificações", toggle: true, action: () => {} },
        { icon: Moon, label: "Modo Escuro", toggle: true, action: () => {} },
        { icon: Globe, label: "Moeda", value: "BRL (R$)", action: () => {} },
      ]
    },
    {
      section: "Dados",
      items: [
        { icon: Download, label: "Exportar Dados", action: () => {} },
        { icon: Shield, label: "Backup em Nuvem", toggle: true, action: () => {} },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-8 pb-16 rounded-b-[3rem]">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Perfil</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
              JS
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">João Silva</h2>
              <p className="text-gray-600">joao@email.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Transações</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-sm text-gray-600">Categorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Meses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 -mt-8 space-y-6">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {section.section}
            </h3>
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    index !== section.items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{item.label}</p>
                    {item.value && (
                      <p className="text-sm text-gray-500">{item.value}</p>
                    )}
                  </div>
                  {item.toggle ? (
                    <div className="w-12 h-7 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          className="w-full h-14 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-semibold shadow-lg transition-all duration-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da Conta
        </Button>

        {/* App Info */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">FinFlow</span>
          </div>
          <p className="text-sm text-gray-500">Versão 1.0.0</p>
          <p className="text-xs text-gray-400 mt-2">© 2024 FinFlow. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
