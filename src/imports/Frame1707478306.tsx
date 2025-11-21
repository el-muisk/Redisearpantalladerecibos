export default function Frame1707478306() {
  return (
    <div className="bg-white relative rounded-xl w-full h-full shadow-md border border-[#dfeaff] flex flex-col" data-name="PSE">
      <div className="w-full p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        {/* Descripción */}
        <div className="space-y-1.5 sm:space-y-2 text-[#0033a0] flex-1">
          <p className="font-['Sura_Sans:Bold',sans-serif] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
            Haz el pago de tu seguro de forma manual.
          </p>
          <p className="font-['Sura_Sans:Regular',sans-serif] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed">
            Ten en cuenta que deberás repetir este proceso cada mes para tener tu seguro al día.
          </p>
        </div>

        {/* Botón */}
        <button className="w-full border-2 border-[#0033a0] text-[#0033a0] hover:bg-[#0033a0]/5 rounded-full py-2.5 sm:py-3 px-4 sm:px-6 transition-colors font-['Sura_Sans:Bold',sans-serif] text-[13px] sm:text-[14px] md:text-[15px] mt-auto">
          Pagar con PSE
        </button>
      </div>
    </div>
  );
}
