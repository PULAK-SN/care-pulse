import { StatusIcon } from "@/constans";
import { cn } from "@/lib/utils";
import Image from "next/image";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        height={24}
        width={24}
        className="h-fit w-3"
      />
      <p
        className={cn("text-[12px] font-semibold capitalize", {
          "text-green-300": status === "scheduled",
          "text-blue-300": status === "pending",
          "text-red-300": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
