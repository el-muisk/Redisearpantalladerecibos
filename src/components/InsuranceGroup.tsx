import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, AlertCircle, Calendar, FileText, Building2 } from "lucide-react";
import { Receipt } from "./ReceiptCard";

interface InsuranceGroupProps {
  insuranceId: string;
  insuranceName: string;
  plan: string;
  policyNumber: string;
  receipts: Receipt[];
  onToggleReceipt: (id: string) => void;
  onToggleAllInGroup: (insuranceId: string) => void;
  defaultExpanded?: boolean;
}

export function InsuranceGroup({
  insuranceId,
  insuranceName,
  plan,
  policyNumber,
  receipts,
  onToggleReceipt,
  onToggleAllInGroup,
  defaultExpanded = false,
}: InsuranceGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const checkboxRef = useRef<HTMLButtonElement>(null);
  
  // Calcular estadísticas del grupo
  const totalReceipts = receipts.length;
  const selectedReceipts = receipts.filter(r => r.selected).length;
  const atRiskReceipts = receipts.filter(r => r.status === "at-risk").length;
  const allSelected = receipts.every(r => r.selected);
  const someSelected = receipts.some(r => r.selected) && !allSelected;
  
  // Establecer estado indeterminate del checkbox
  useEffect(() => {
    if (checkboxRef.current) {
      const checkboxElement = checkboxRef.current.querySelector('input');
      if (checkboxElement) {
        checkboxElement.indeterminate = someSelected;
      }
    }
  }, [someSelected]);
  
  const totalAmount = receipts.reduce((sum, receipt) => {
    const amount = parseInt(receipt.amount.replace(/[$.]/g, ""));
    return sum + amount;
  }, 0);

  const oldestReceipt = receipts.sort((a, b) => {
    // Simple sorting by payment date - in production use proper date parsing
    return a.paymentDate.localeCompare(b.paymentDate);
  })[0];

  const hasAtRisk = atRiskReceipts > 0;

  return (
    <Card className={`overflow-hidden transition-all ${
      hasAtRisk 
        ? 'border-[#d12d35] border-2 shadow-md' 
        : selectedReceipts > 0
        ? 'border-[#2d6df6] border-2 shadow-md'
        : 'border-[#e5e9ea]'
    }`}>
      {/* Header del grupo - siempre visible */}
      <div 
        className="p-4 cursor-pointer active:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox para seleccionar todo el grupo */}
          <div 
            ref={checkboxRef}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={allSelected}
              onCheckedChange={() => {
                onToggleAllInGroup(insuranceId);
              }}
              className={`mt-0.5 flex-shrink-0 ${
                allSelected || someSelected
                  ? "border-[#2d6df6] data-[state=checked]:bg-[#2d6df6]"
                  : "border-[#878789]"
              }`}
            />
          </div>

          {/* Información del seguro */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <Building2 className={`size-4 mt-0.5 flex-shrink-0 ${hasAtRisk ? 'text-[#d12d35]' : 'text-[#0033a0]'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-[15px] leading-tight mb-1 ${hasAtRisk ? 'text-[#d12d35]' : 'text-[#0033a0]'}`}>
                  {insuranceName}
                </p>
                <p className="text-[#0d0d0d]/60 text-[11px] mb-1">
                  {plan} • Póliza {policyNumber}
                </p>
              </div>
            </div>

            {/* Badges de estado */}
            <div className="flex flex-wrap gap-2 mb-3">
              {hasAtRisk && (
                <Badge variant="destructive" className="bg-[#d12d35] text-white hover:bg-[#d12d35] text-[10px] px-2 py-0.5">
                  <AlertCircle className="size-3 mr-1" />
                  {atRiskReceipts} en riesgo
                </Badge>
              )}
              <Badge className="bg-[#e1ebff] text-[#0033a0] hover:bg-[#e1ebff] text-[10px] px-2 py-0.5">
                {totalReceipts} {totalReceipts === 1 ? 'recibo' : 'recibos'}
              </Badge>
              {selectedReceipts > 0 && (
                <Badge className="bg-[#2d6df6] text-white hover:bg-[#2d6df6] text-[10px] px-2 py-0.5">
                  {selectedReceipts} seleccionado{selectedReceipts !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Resumen financiero */}
            <div className="flex items-baseline justify-between bg-[#f8f9fa] rounded-lg p-2.5">
              <div>
                <p className="text-[#0d0d0d]/60 text-[9px] uppercase tracking-wider mb-0.5">
                  Total pendiente
                </p>
                <p className={`text-[20px] leading-none ${hasAtRisk ? 'text-[#d12d35]' : 'text-[#0033a0]'}`}>
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              {oldestReceipt && (
                <div className="text-right">
                  <p className="text-[#0d0d0d]/60 text-[9px] uppercase tracking-wider mb-0.5">
                    Próximo vence
                  </p>
                  <p className="text-[#0d0d0d] text-[11px] leading-none">
                    {oldestReceipt.paymentDate.split('/')[0]} {oldestReceipt.paymentDate.split('/')[1]}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Icono de expansión */}
          <div className="flex-shrink-0 mt-1">
            {isExpanded ? (
              <ChevronUp className="size-5 text-[#0d0d0d]/40" />
            ) : (
              <ChevronDown className="size-5 text-[#0d0d0d]/40" />
            )}
          </div>
        </div>
      </div>

      {/* Lista de recibos - colapsable */}
      {isExpanded && (
        <div className="border-t border-[#e5e9ea] bg-[#fafbfc]">
          <div className="p-3 space-y-2">
            {receipts.map((receipt, index) => (
              <div
                key={receipt.id}
                onClick={() => onToggleReceipt(receipt.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all active:scale-[0.98] ${
                  receipt.selected
                    ? 'bg-white border-2 border-[#2d6df6] shadow-sm'
                    : 'bg-white border border-[#e5e9ea] hover:border-[#2d6df6]/40'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={receipt.selected}
                      onCheckedChange={() => {
                        onToggleReceipt(receipt.id);
                      }}
                      className={`mt-0.5 flex-shrink-0 ${
                        receipt.selected
                          ? "border-[#2d6df6] data-[state=checked]:bg-[#2d6df6]"
                          : "border-[#878789]"
                      }`}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="size-3.5 text-[#0d0d0d]/40" />
                        <p className="text-[12px] text-[#0d0d0d]/60">
                          Recibo #{index + 1}
                        </p>
                        {receipt.status === "at-risk" && (
                          <Badge variant="destructive" className="bg-[#d12d35] text-white hover:bg-[#d12d35] text-[9px] px-1.5 py-0">
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <p className={`text-[16px] ${receipt.status === "at-risk" ? 'text-[#d12d35]' : 'text-[#0033a0]'}`}>
                        {receipt.amount}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3 text-[#0d0d0d]/40" />
                        <span className="text-[#0d0d0d]/60">Vence:</span>
                        <span className="text-[#0d0d0d]">{receipt.paymentDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}