import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, Calendar, FileText, ChevronRight } from "lucide-react";

export interface Receipt {
  id: string;
  insuranceType: string;
  insuranceId: string; // Para agrupar múltiples recibos del mismo seguro
  plan: string;
  receiptNumber: string;
  policyNumber: string;
  paymentDate: string;
  amount: string;
  status: "at-risk" | "available" | "disabled";
  selected: boolean;
  dueDate?: string;
  periodStart?: string;
  periodEnd?: string;
}

interface ReceiptCardProps {
  receipt: Receipt;
  onToggleSelect: (id: string) => void;
  isGrouped?: boolean;
  relatedReceiptsCount?: number;
}

export function ReceiptCard({ receipt, onToggleSelect, isGrouped, relatedReceiptsCount }: ReceiptCardProps) {
  const isAtRisk = receipt.status === "at-risk";
  const isAvailable = receipt.status === "available";
  const isDisabled = receipt.status === "disabled";

  return (
    <Card 
      onClick={() => !isDisabled && onToggleSelect(receipt.id)}
      className={`p-4 transition-all active:scale-[0.98] cursor-pointer ${
        receipt.selected 
          ? isAtRisk
            ? 'border-[#d12d35] border-2 bg-gradient-to-br from-[#fff4f3] to-white shadow-lg'
            : 'border-[#2d6df6] border-2 bg-gradient-to-br from-[#f0f5ff] to-white shadow-lg'
          : isAtRisk 
            ? 'border-[#d12d35] border bg-white' 
            : 'border-[#e5e9ea] bg-white'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Header compacto con checkbox y estado */}
      <div className="flex items-start gap-3 mb-4">
        <Checkbox
          checked={receipt.selected}
          onCheckedChange={(e) => {
            e.stopPropagation();
            onToggleSelect(receipt.id);
          }}
          disabled={isDisabled}
          className={`mt-0.5 flex-shrink-0 ${
            receipt.selected 
              ? isAtRisk 
                ? "border-[#d12d35] data-[state=checked]:bg-[#d12d35]" 
                : "border-[#2d6df6] data-[state=checked]:bg-[#2d6df6]"
              : "border-[#878789]"
          }`}
        />
        <div className="flex-1 min-w-0">
          {isAtRisk && (
            <Badge variant="destructive" className="bg-[#d12d35] text-white hover:bg-[#d12d35] mb-2 text-[10px] px-2 py-0.5">
              <AlertCircle className="size-3 mr-1" />
              En riesgo
            </Badge>
          )}
          <p className={`text-[15px] leading-tight mb-1 ${isAtRisk ? 'text-[#d12d35]' : 'text-[#0033a0]'}`}>
            {receipt.insuranceType}
          </p>
          <p className="text-[#0d0d0d]/60 text-[12px] mb-2">
            {receipt.plan}
          </p>
          
          {/* Mostrar si hay múltiples recibos del mismo seguro */}
          {isGrouped && relatedReceiptsCount && relatedReceiptsCount > 1 && (
            <div className="flex items-center gap-1 text-[#2d6df6] text-[11px] mt-1">
              <FileText className="size-3" />
              <span>{relatedReceiptsCount} recibos pendientes de este seguro</span>
            </div>
          )}
        </div>
      </div>

      {/* Monto destacado - más compacto en mobile */}
      <div className="bg-gradient-to-r from-[#f8f9fa] to-transparent rounded-lg p-3 mb-3">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[#0d0d0d]/60 text-[10px] uppercase tracking-wider mb-0.5">
              Monto
            </p>
            <p className={`text-[24px] leading-none ${isAtRisk ? 'text-[#d12d35]' : 'text-[#2d6df6]'}`}>
              {receipt.amount}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#0d0d0d]/60 text-[10px] uppercase tracking-wider mb-0.5">
              Vence
            </p>
            <p className="text-[#0d0d0d] text-[12px] leading-none">
              {receipt.paymentDate.split('/')[0]} {receipt.paymentDate.split('/')[1]}
            </p>
          </div>
        </div>
      </div>

      {/* Detalles colapsados - solo lo esencial */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#0d0d0d]/60">Póliza</span>
          <span className="text-[#0d0d0d]">{receipt.policyNumber}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#0d0d0d]/60">Recibo</span>
          <span className="text-[#0d0d0d]">{receipt.receiptNumber}</span>
        </div>
      </div>

      {/* Indicador de selección */}
      {receipt.selected && (
        <div className="mt-3 pt-3 border-t border-[#e5e9ea] flex items-center justify-center gap-2">
          <CheckCircle className="size-4 text-[#2d6df6]" />
          <span className="text-[#2d6df6] text-[12px]">Seleccionado para pagar</span>
        </div>
      )}
    </Card>
  );
}