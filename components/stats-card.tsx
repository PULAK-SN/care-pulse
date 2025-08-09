import { cn } from "@/lib/utils";
import Image from "next/image";

interface StatCardProps {
  count: number;
  icon: string;
  label: string;
  type: "appointments" | "pending" | "cancelled";
}

const StatCard = ({ count = 0, icon, label, type }: StatCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-[url(/assets/images/appointments-bg.png)]":
            type === "appointments",
          "bg-[url(/assets/images/cancelled-bg.png)]": type === "cancelled",
          "bg-[url(/assets/images/pending-bg.png)]": type === "pending",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={8}
          width={8}
          alt="label"
          className="size-8 w-fit"
        />
        <h2 className="text-[32px] font-bold text-white">{count}</h2>
      </div>
      <p className="text-[14px]">{label}</p>
    </div>
  );
};

export default StatCard;
