import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import Membresia from "../imports/Membresia";
import Frame1707478306 from "../imports/Frame1707478306";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  selectedAmount: number;
  onPayWithCard: () => void;
  onPayWithPSE: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  selectedCount,
  selectedAmount,
  onPayWithCard,
  onPayWithPSE,
}: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[500px] md:max-w-[700px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-5 md:p-6 pb-3 sm:pb-4 border-b border-[#e5e9ea] text-left">
          <DialogTitle className="text-[#0033a0] text-[18px] sm:text-[20px] md:text-[22px] mb-1.5">
            Elige tu método de pago
          </DialogTitle>
          <DialogDescription className="text-[#0d0d0d]/60 text-[13px] sm:text-[14px] md:text-[15px]">
            {selectedCount} recibo{selectedCount !== 1 ? 's' : ''} · ${selectedAmount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        {/* Contenido - Opciones de pago */}
        <div className="p-4 sm:p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Opción 1: Tarjeta con débito automático */}
          <div onClick={onPayWithCard} className="cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-[0.98] h-full">
            <Membresia />
          </div>

          {/* Opción 2: PSE (pago manual) */}
          <div onClick={onPayWithPSE} className="cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-[0.98] h-full">
            <Frame1707478306 />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}