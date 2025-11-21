export default function Membresia() {
  return (
    <div className="bg-white relative rounded-xl w-full h-full shadow-md border border-[#dfeaff] flex flex-col" data-name="Membresía">
      <div className="w-full p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        {/* Tag Recomendado */}
        <div className="inline-flex items-center bg-[#e3e829] rounded-full px-2.5 py-0.5 self-start">
          <span className="font-['Sura_Sans:Regular',sans-serif] text-[#0033a0] text-[10px] sm:text-[11px] md:text-[12px] font-medium">
            ¡Recomendado!
          </span>
        </div>

        {/* Descripción */}
        <div className="space-y-1.5 sm:space-y-2 text-[#0033a0] flex-1">
          <p className="font-['Sura_Sans:Bold',sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
            Al hacer clic en "Pagar con tarjeta", aceptas que el cobro mensual se realice automáticamente a tu tarjeta hasta que lo canceles.
          </p>
          <p className="font-['Sura_Sans:Regular',sans-serif] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed">
            Te notificaremos si el valor cambia, tal cual se describe en los{' '}
            <span className="underline decoration-solid">Términos y Condiciones del servicio de SURA</span>.
          </p>
        </div>

        {/* Botón */}
        <button className="w-full bg-[#2d6df6] hover:bg-[#2559cc] text-white rounded-full py-2.5 sm:py-3 px-4 sm:px-6 transition-colors font-['Sura_Sans:Bold',sans-serif] text-[13px] sm:text-[14px] md:text-[15px] mt-auto">
          Pagar con tarjeta
        </button>
      </div>
    </div>
  );
}
