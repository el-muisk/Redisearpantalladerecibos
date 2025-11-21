export function Footer() {
  return (
    <div className="bg-[#0033a0] px-4 sm:px-8 md:px-12 lg:px-24 py-8 sm:py-12 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-white text-[12px] sm:text-[14px] mb-6 sm:mb-8 leading-relaxed">
          Para resolver dudas, comentarios y sugerencias, comunícate a la línea de atención en Medellín al 604 4378888, en Bogotá al 601 4278888 y en Cali al 602 4378888; al 01 8000 51 8888 en el resto del país o al #888 sin costo desde tu celular. Se recomienda ver esta página con Internet Explorer 10 (o versiones superiores), Mozilla Firefox o Google Chrome a una resolución mínimo de 1024 x 768. Copyright c 2014. SURA, una marca Suramericana. Todos los derechos reservados. Entiéndase Suramericana como Administrador de Carteras Colectivas Suramericana S.A., Seguros Generales Suramericana S.A. y Seguros de Vida Suramericana S.A.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center justify-center">
          <a 
            href="https://www.suraenlinea.com/terminos-condiciones" 
            className="text-[#81b1ff] text-[14px] sm:text-[16px] underline hover:text-white transition-colors"
          >
            Políticas de uso y seguridad
          </a>
          <div className="bg-white h-[2px] w-[24px] sm:h-[24px] sm:w-[2px] hidden sm:block" />
          <a 
            href="https://www.suraenlinea.com/politicas-privacidad" 
            className="text-[#81b1ff] text-[14px] sm:text-[16px] underline hover:text-white transition-colors"
          >
            Políticas de Privacidad Ley de Datos Personales
          </a>
          <div className="bg-white h-[2px] w-[24px] sm:h-[24px] sm:w-[2px] hidden sm:block" />
          <a 
            href="https://www.suraenlinea.com/empresas-relacionadas" 
            className="text-[#81b1ff] text-[14px] sm:text-[16px] underline hover:text-white transition-colors"
          >
            Empresas Relacionadas
          </a>
        </div>
      </div>
    </div>
  );
}