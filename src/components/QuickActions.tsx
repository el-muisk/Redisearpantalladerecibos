import {
  ChevronRight,
  CheckSquare,
  XSquare,
} from "lucide-react";

interface QuickActionsProps {
  allSelected: boolean;
  onSelectAll: () => void;
  hasAtRisk: boolean;
  onSelectAtRisk: () => void;
}

export function QuickActions({
  allSelected,
  onSelectAll,
  hasAtRisk,
  onSelectAtRisk,
}: QuickActionsProps) {
  return (
    <div className="mb-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        <p className="text-[#0d0d0d]/60 text-[11px] uppercase tracking-wider px-1 lg:px-0">
          Acciones rápidas
        </p>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 flex-1 lg:flex-initial lg:max-w-2xl">
          {/* Seleccionar todos */}
          <button
            onClick={onSelectAll}
            className="flex-1 text-left p-3 rounded-lg bg-white border border-[#e5e9ea] hover:border-[#2d6df6] transition-all active:scale-[0.98] flex items-center justify-between group lg:min-w-[200px]"
          >
            <div className="flex items-center gap-2.5">
              {allSelected ? (
                <XSquare className="size-4 text-[#d12d35] flex-shrink-0" />
              ) : (
                <CheckSquare className="size-4 text-[#2d6df6] flex-shrink-0" />
              )}
              <span className="text-[#0d0d0d] text-[13px]">
                {allSelected
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </span>
            </div>
            <ChevronRight className="size-4 text-[#0d0d0d]/40 group-hover:text-[#2d6df6] transition-colors" />
          </button>

          {/* Seleccionar solo los urgentes */}
          {hasAtRisk && (
            <button
              onClick={onSelectAtRisk}
              className="flex-1 text-left p-3 rounded-lg bg-white border border-[#e5e9ea] hover:border-[#d12d35] transition-all active:scale-[0.98] flex items-center justify-between group lg:min-w-[200px]"
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className="size-4 text-[#d12d35] flex-shrink-0" />
                <span className="text-[#0d0d0d] text-[13px]">
                  Seleccionar urgentes
                </span>
              </div>
              <ChevronRight className="size-4 text-[#0d0d0d]/40 group-hover:text-[#d12d35] transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}