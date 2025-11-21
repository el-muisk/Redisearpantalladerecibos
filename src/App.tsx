import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UserInfo } from "./components/UserInfo";
import { Receipt } from "./components/ReceiptCard";
import { PaymentSummary } from "./components/PaymentSummary";
import { InsuranceGroup } from "./components/InsuranceGroup";
import { QuickActions } from "./components/QuickActions";
import { PaymentModal } from "./components/PaymentModal";
import { Button } from "./components/ui/button";

// Interfaz para agrupar seguros
interface InsuranceGroupData {
  id: string;
  name: string;
  plan: string;
  policyNumber: string;
  receipts: Receipt[];
}

export default function App() {
  const [receipts, setReceipts] = useState<Receipt[]>([
    // Seguro 1: Carro con 2 recibos (uno en riesgo)
    {
      id: "1",
      insuranceType: "Seguro de carro",
      insuranceId: "car-1",
      plan: "Plan Esencial",
      receiptNumber: "1000000014005",
      policyNumber: "****00001466",
      paymentDate: "25/Mayo/2025",
      amount: "$150.000",
      status: "at-risk",
      selected: false,
    },
    {
      id: "2",
      insuranceType: "Seguro de carro",
      insuranceId: "car-1",
      plan: "Plan Esencial",
      receiptNumber: "1000000014006",
      policyNumber: "****00001466",
      paymentDate: "25/Junio/2025",
      amount: "$150.000",
      status: "available",
      selected: false,
    },
    // Seguro 2: Moto con 1 recibo
    {
      id: "3",
      insuranceType: "Seguro de moto",
      insuranceId: "moto-1",
      plan: "Plan Básico",
      receiptNumber: "1000000014007",
      policyNumber: "****00001467",
      paymentDate: "28/Mayo/2025",
      amount: "$85.000",
      status: "available",
      selected: false,
    },
    // Seguro 3: Arriendo con 1 recibo
    {
      id: "7",
      insuranceType: "Seguro de arriendo",
      insuranceId: "rent-1",
      plan: "Plan Protección Total",
      receiptNumber: "1000000014011",
      policyNumber: "****00001469",
      paymentDate: "15/Junio/2025",
      amount: "$200.000",
      status: "available",
      selected: false,
    },
  ]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Agrupar recibos por seguro
  const groupedInsurances: InsuranceGroupData[] = Object.values(
    receipts.reduce((acc, receipt) => {
      if (!acc[receipt.insuranceId]) {
        acc[receipt.insuranceId] = {
          id: receipt.insuranceId,
          name: receipt.insuranceType,
          plan: receipt.plan,
          policyNumber: receipt.policyNumber,
          receipts: [],
        };
      }
      acc[receipt.insuranceId].receipts.push(receipt);
      return acc;
    }, {} as Record<string, InsuranceGroupData>)
  );

  // Ordenar: primero los que tienen recibos en riesgo
  const sortedInsurances = groupedInsurances.sort((a, b) => {
    const aHasRisk = a.receipts.some(r => r.status === "at-risk");
    const bHasRisk = b.receipts.some(r => r.status === "at-risk");
    if (aHasRisk && !bHasRisk) return -1;
    if (!aHasRisk && bHasRisk) return 1;
    return 0;
  });

  const handleToggleReceipt = (id: string) => {
    setReceipts(
      receipts.map((receipt) =>
        receipt.id === id
          ? { ...receipt, selected: !receipt.selected }
          : receipt
      )
    );
  };

  const handleToggleAllInGroup = (insuranceId: string) => {
    const groupReceipts = receipts.filter(r => r.insuranceId === insuranceId);
    const allSelected = groupReceipts.every(r => r.selected);
    
    setReceipts(
      receipts.map((receipt) =>
        receipt.insuranceId === insuranceId
          ? { ...receipt, selected: !allSelected }
          : receipt
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = receipts.every((r) => r.selected || r.status === "disabled");
    setReceipts(
      receipts.map((receipt) =>
        receipt.status !== "disabled"
          ? { ...receipt, selected: !allSelected }
          : receipt
      )
    );
  };

  const handleSelectAtRisk = () => {
    setReceipts(
      receipts.map((receipt) =>
        receipt.status === "at-risk"
          ? { ...receipt, selected: true }
          : { ...receipt, selected: false }
      )
    );
  };

  const handlePaySelected = () => {
    if (selectedCount === 0) {
      return;
    }
    // Abrir modal de métodos de pago
    setIsPaymentModalOpen(true);
  };

  const handlePayWithCard = () => {
    const selectedReceipts = receipts.filter((r) => r.selected);
    const total = selectedReceipts.reduce((sum, receipt) => {
      const amount = parseInt(receipt.amount.replace(/[$.]/g, ""));
      return sum + amount;
    }, 0);
    
    const groupedByInsurance = selectedReceipts.reduce((acc, receipt) => {
      if (!acc[receipt.insuranceType]) {
        acc[receipt.insuranceType] = 0;
      }
      acc[receipt.insuranceType]++;
      return acc;
    }, {} as Record<string, number>);

    const insuranceBreakdown = Object.entries(groupedByInsurance)
      .map(([name, count]) => `${name}: ${count} recibo${count > 1 ? 's' : ''}`)
      .join('\n');

    setIsPaymentModalOpen(false);
    alert(
      `💳 Procesando pago con TARJETA\n\n✅ Débito automático activado\n\nTotal: $${total.toLocaleString()}\nRecibos: ${selectedReceipts.length}\n\n${insuranceBreakdown}`
    );
  };

  const handlePayWithPSE = () => {
    const selectedReceipts = receipts.filter((r) => r.selected);
    const total = selectedReceipts.reduce((sum, receipt) => {
      const amount = parseInt(receipt.amount.replace(/[$.]/g, ""));
      return sum + amount;
    }, 0);
    
    const groupedByInsurance = selectedReceipts.reduce((acc, receipt) => {
      if (!acc[receipt.insuranceType]) {
        acc[receipt.insuranceType] = 0;
      }
      acc[receipt.insuranceType]++;
      return acc;
    }, {} as Record<string, number>);

    const insuranceBreakdown = Object.entries(groupedByInsurance)
      .map(([name, count]) => `${name}: ${count} recibo${count > 1 ? 's' : ''}`)
      .join('\n');

    setIsPaymentModalOpen(false);
    alert(
      `🏦 Procesando pago con PSE\n\n⚠️ Pago manual - Deberás repetir cada mes\n\nTotal: $${total.toLocaleString()}\nRecibos: ${selectedReceipts.length}\n\n${insuranceBreakdown}`
    );
  };

  const selectedCount = receipts.filter((r) => r.selected).length;
  const atRiskCount = receipts.filter((r) => r.status === "at-risk").length;
  
  const totalAmount = receipts.reduce((sum, receipt) => {
    const amount = parseInt(receipt.amount.replace(/[$.]/g, ""));
    return sum + amount;
  }, 0);

  const selectedAmount = receipts
    .filter((r) => r.selected)
    .reduce((sum, receipt) => {
      const amount = parseInt(receipt.amount.replace(/[$.]/g, ""));
      return sum + amount;
    }, 0);

  const allSelected = receipts.every((r) => r.selected || r.status === "disabled");

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />

      <main className="flex-1 w-full px-4 py-4 pb-32 lg:px-6 lg:py-8 lg:pb-8">
        {/* Layout de 2 columnas en desktop */}
        <div className="max-w-[480px] lg:max-w-7xl mx-auto lg:grid lg:grid-cols-[1fr_380px] lg:gap-6 xl:gap-8">
          
          {/* Columna izquierda - Contenido principal */}
          <div className="lg:min-w-0">
            {/* Información del usuario */}
            <div className="mb-4 lg:mb-6">
              <UserInfo
                name="Carlos Andrés González"
                idNumber="****5678"
                email="carlos.gonzalez@email.com"
              />
            </div>

            {/* Resumen de pagos - Solo mobile */}
            <div className="lg:hidden">
              <PaymentSummary
                totalReceipts={receipts.length}
                atRiskCount={atRiskCount}
                totalAmount={`$${totalAmount.toLocaleString()}`}
                selectedAmount={`$${selectedAmount.toLocaleString()}`}
                selectedCount={selectedCount}
                totalInsurances={groupedInsurances.length}
              />
            </div>

            {/* Acciones rápidas */}
            <QuickActions
              allSelected={allSelected}
              onSelectAll={handleSelectAll}
              hasAtRisk={atRiskCount > 0}
              onSelectAtRisk={handleSelectAtRisk}
            />

            {/* Lista de seguros agrupados */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-1">
                <h2 className="text-[#0033a0] text-[14px] lg:text-[18px]">
                  Tus seguros
                </h2>
                <div className="bg-[#0033a0] text-white rounded-full px-2 py-0.5 text-[11px] flex-shrink-0">
                  {groupedInsurances.length}
                </div>
              </div>

              <div className="space-y-3">
                {sortedInsurances.map((insurance) => {
                  const hasAtRisk = insurance.receipts.some(r => r.status === "at-risk");
                  return (
                    <InsuranceGroup
                      key={insurance.id}
                      insuranceId={insurance.id}
                      insuranceName={insurance.name}
                      plan={insurance.plan}
                      policyNumber={insurance.policyNumber}
                      receipts={insurance.receipts}
                      onToggleReceipt={handleToggleReceipt}
                      onToggleAllInGroup={handleToggleAllInGroup}
                      defaultExpanded={hasAtRisk} // Auto-expandir si tiene riesgo
                    />
                  );
                })}
              </div>
            </div>

            {/* Mensaje informativo si no hay selección - Solo mobile */}
            {selectedCount === 0 && (
              <div className="bg-[#e1ebff] rounded-lg p-4 text-center lg:hidden">
                <p className="text-[#0033a0] text-[13px] leading-relaxed">
                  Selecciona los recibos que deseas pagar. Puedes seleccionar múltiples recibos de diferentes seguros.
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha - Resumen sticky (solo desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              {/* Resumen de pagos */}
              <PaymentSummary
                totalReceipts={receipts.length}
                atRiskCount={atRiskCount}
                totalAmount={`$${totalAmount.toLocaleString()}`}
                selectedAmount={`$${selectedAmount.toLocaleString()}`}
                selectedCount={selectedCount}
                totalInsurances={groupedInsurances.length}
              />

              {/* Card de acción */}
              <div className="bg-white rounded-lg p-5 shadow-md border border-[#e5e9ea]">
                <div className="space-y-4">
                  {/* Info de selección */}
                  {selectedCount > 0 ? (
                    <div className="bg-[#f0f5ff] rounded-lg p-4 border border-[#2d6df6]/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[#0033a0]/70 text-[10px] uppercase tracking-wider mb-1">
                            Seleccionados
                          </p>
                          <p className="text-[#0033a0] text-[16px]">
                            {selectedCount} recibo{selectedCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#0033a0]/70 text-[10px] uppercase tracking-wider mb-1">
                            Total a pagar
                          </p>
                          <p className="text-[#2d6df6] text-[22px]">
                            ${selectedAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-[#0033a0]/70 text-[13px]">
                        No hay recibos seleccionados
                      </p>
                    </div>
                  )}
                  
                  {/* Botón de acción - siempre visible */}
                  <Button
                    onClick={handlePaySelected}
                    disabled={selectedCount === 0}
                    size="lg"
                    className="w-full bg-[#2d6df6] hover:bg-[#2559cc] text-white shadow-lg h-12 text-[15px] rounded-full font-['Sura_Sans:Bold',sans-serif] transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2d6df6]"
                  >
                    Pagar recibos seleccionados
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Botón de pago flotante - Solo mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent p-4 pb-safe z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="max-w-[480px] mx-auto">
          {/* Info box encima del botón */}
          {selectedCount > 0 ? (
            <div className="bg-[#f0f5ff] rounded-lg p-3 mb-3 border border-[#2d6df6]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#0033a0]/70 text-[11px] uppercase tracking-wider mb-0.5">
                    Seleccionados
                  </p>
                  <p className="text-[#0033a0] text-[14px]">
                    {selectedCount} recibo{selectedCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#0033a0]/70 text-[11px] uppercase tracking-wider mb-0.5">
                    Total a pagar
                  </p>
                  <p className="text-[#2d6df6] text-[20px]">
                    ${selectedAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#f5f5f5] rounded-lg p-3 mb-3 border border-[#e5e9ea]">
              <p className="text-[#0033a0]/70 text-[13px] text-center">
                No hay recibos seleccionados
              </p>
            </div>
          )}
          
          {/* Botón de acción - siempre visible */}
          <Button
            onClick={handlePaySelected}
            disabled={selectedCount === 0}
            size="lg"
            className="w-full bg-[#2d6df6] hover:bg-[#2559cc] text-white shadow-xl h-14 text-[16px] rounded-full font-['Sura_Sans:Bold',sans-serif] transition-all hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2d6df6]"
          >
            Pagar recibos seleccionados
          </Button>
        </div>
      </div>

      {/* Modal de métodos de pago */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedCount={selectedCount}
        selectedAmount={selectedAmount}
        onPayWithCard={handlePayWithCard}
        onPayWithPSE={handlePayWithPSE}
      />

      <Footer />
    </div>
  );
}