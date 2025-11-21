import { Card } from "./ui/card";
import { AlertCircle, FileText, CheckCircle2, TrendingUp } from "lucide-react";

interface PaymentSummaryProps {
  totalReceipts: number;
  atRiskCount: number;
  totalAmount: string;
  selectedAmount: string;
  selectedCount: number;
  totalInsurances: number;
}

export function PaymentSummary({
  totalReceipts,
  atRiskCount,
  totalAmount,
  selectedAmount,
  selectedCount,
  totalInsurances,
}: PaymentSummaryProps) {
  // Calcular cuántas cards mostrar
  const showAtRisk = atRiskCount > 0;
  const showSelected = selectedCount > 0;
  const totalCards = 1 + (showAtRisk ? 1 : 0) + (showSelected ? 1 : 0); // Resumen + opcionales
  
  return (
    <div className="mb-5">
      {/* Grid dinámico - todas las cards al mismo nivel */}
      <div className={`grid gap-2.5 ${
        totalCards === 1 ? 'grid-cols-1' :
        totalCards === 2 ? 'grid-cols-2' :
        'grid-cols-3'
      }`}>
        
        {/* Card 1: Resumen principal - siempre visible */}
        <Card className="p-2.5 bg-gradient-to-br from-[#0033a0] to-[#002266] text-white">
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp className="size-3.5 flex-shrink-0" />
            <p className="text-[9px] uppercase tracking-wider">Resumen</p>
          </div>
          <div className="space-y-1.5">
            <div>
              <p className="text-[18px] leading-none mb-0.5">{totalInsurances}</p>
              <p className="text-white/90 text-[9px]">
                {totalInsurances === 1 ? 'seguro' : 'seguros'}
              </p>
            </div>
            <div className="pt-1.5 border-t border-white/20">
              <p className="text-[18px] leading-none mb-0.5">{totalReceipts}</p>
              <p className="text-white/90 text-[9px]">
                {totalReceipts === 1 ? 'recibo' : 'recibos'}
              </p>
            </div>
          </div>
        </Card>

        {/* Card 2: Alerta de riesgo - condicional */}
        {showAtRisk && (
          <Card className="p-2.5 bg-gradient-to-br from-[#d12d35] to-[#b71c1c] text-white">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="size-3.5 flex-shrink-0" />
              <p className="text-[9px] uppercase tracking-wider">Urgente</p>
            </div>
            <p className="text-[18px] leading-none mb-0.5">{atRiskCount}</p>
            <p className="text-white/90 text-[9px]">
              {atRiskCount === 1 ? 'En riesgo' : 'En riesgo'}
            </p>
          </Card>
        )}

        {/* Card 3: Seleccionados para pagar - condicional */}
        {showSelected && (
          <Card className="p-2.5 bg-gradient-to-br from-[#2d6df6] to-[#1e4ec9] text-white">
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="size-3.5 flex-shrink-0" />
              <p className="text-[9px] uppercase tracking-wider">A pagar</p>
            </div>
            <p className="text-[18px] leading-none mb-0.5">{selectedCount}</p>
            <p className="text-white/90 text-[9px]">
              {selectedAmount}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}