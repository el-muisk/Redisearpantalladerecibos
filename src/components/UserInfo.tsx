import { User } from "lucide-react";

interface UserInfoProps {
  name: string;
  idNumber: string;
  email: string;
}

export function UserInfo({ name, idNumber, email }: UserInfoProps) {
  return (
    <div className="border-b border-[#e5e9ea] pb-4 mb-5">
      <div className="flex items-center gap-3">
        <div className="bg-[#2d6df6] rounded-full p-2.5 shadow-sm flex-shrink-0">
          <User className="size-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0033a0]/60 text-[10px] uppercase tracking-wider mb-0.5">
            Hola
          </p>
          <h1 className="text-[#0033a0] text-[20px] lg:text-[24px] leading-tight mb-1 truncate">
            {name}
          </h1>
          <p className="text-[#0d0d0d]/60 text-[12px] truncate">
            ID: {idNumber}
          </p>
        </div>
      </div>
    </div>
  );
}