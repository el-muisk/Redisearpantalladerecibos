import { CreditCard } from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";

export function AutoPaymentBanner() {
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  return (
    <div className="bg-[#dfeaff] rounded-xl p-4 mb-5">
      <div className="flex items-start gap-3">
        <div className="bg-white rounded-lg p-2 flex-shrink-0">
          <CreditCard className="size-5 text-[#2d6df6]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0033a0] text-[13px] leading-relaxed mb-3">
            <span className="font-['Sura_Sans:Bold',sans-serif]">Activa tu suscripción</span> y paga automáticamente cada mes con débito o crédito. ¡Despreocúpate!
          </p>
          <Switch
            checked={autoPayEnabled}
            onCheckedChange={setAutoPayEnabled}
          />
        </div>
      </div>
    </div>
  );
}