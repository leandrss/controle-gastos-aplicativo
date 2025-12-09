"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"

interface SubscriptionScreenProps {
  onSubscribed: () => void
}

export function SubscriptionScreen({ onSubscribed }: SubscriptionScreenProps) {
  useEffect(() => {
    // Carrega o script do Mercado Pago
    function $MPC_load() {
      if (window.$MPC_loaded !== true) {
        const s = document.createElement("script")
        s.type = "text/javascript"
        s.async = true
        s.src = document.location.protocol + "//secure.mlstatic.com/mptools/render.js"
        const x = document.getElementsByTagName('script')[0]
        x.parentNode?.insertBefore(s, x)
        window.$MPC_loaded = true
      }
    }

    if (window.$MPC_loaded !== true) {
      if (window.attachEvent) {
        window.attachEvent('onload', $MPC_load)
      } else {
        window.addEventListener('load', $MPC_load, false)
      }
    }

    // Listener para mensagem de sucesso do Mercado Pago
    function $MPC_message(event: MessageEvent) {
      // Quando o modal de pagamento fechar com sucesso
      if (event.data && event.data.preapproval_id) {
        // Salva que o usuário assinou
        localStorage.setItem("finflow_subscribed", "true")
        localStorage.setItem("finflow_preapproval_id", event.data.preapproval_id)
        onSubscribed()
      }
    }

    window.addEventListener("message", $MPC_message)

    return () => {
      window.removeEventListener("message", $MPC_message)
    }
  }, [onSubscribed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              FinFlow
            </h1>
            <p className="text-gray-600 mt-2">Controle Financeiro Inteligente</p>
          </div>

          {/* Título */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Assine para começar
            </h2>
            <p className="text-gray-600">
              Tenha acesso completo ao melhor app de controle financeiro
            </p>
          </div>

          {/* Benefícios */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Controle total de gastos</p>
                <p className="text-sm text-gray-600">Acompanhe todas as suas transações</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Gráficos e relatórios</p>
                <p className="text-sm text-gray-600">Visualize seus gastos por categoria</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Metas financeiras</p>
                <p className="text-sm text-gray-600">Defina e alcance seus objetivos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Segurança total</p>
                <p className="text-sm text-gray-600">Seus dados protegidos e criptografados</p>
              </div>
            </div>
          </div>

          {/* Botão de Assinatura Mercado Pago */}
          <div className="pt-4">
            <a 
              href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=58a0cfcf8f9e4da0847c3ec0f6e02b15" 
              name="MP-payButton" 
              className="block w-full bg-[#3483FA] hover:bg-[#2a68c8] text-white text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Assinar Agora
            </a>
          </div>

          {/* Informações adicionais */}
          <div className="text-center text-sm text-gray-500 pt-2">
            <p>Pagamento seguro via Mercado Pago</p>
            <p className="mt-1">Cancele quando quiser</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .blue-button {
          background-color: #3483FA;
          color: white;
          padding: 10px 24px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          font-size: 16px;
          transition: background-color 0.3s;
          font-family: Arial, sans-serif;
        }
        .blue-button:hover {
          background-color: #2a68c8;
        }
      `}</style>
    </div>
  )
}

declare global {
  interface Window {
    $MPC_loaded?: boolean
    attachEvent?: any
  }
}
