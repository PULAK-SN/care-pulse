import Image from "next/image";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitForm = ({ isLoading, className, children }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={
        className ??
        "bg-green-500 hover:bg-green-500/90 cursor-pointer text-white w-full"
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          Loading ...
          <Image
            src={"/assets/icons/loader.svg"}
            alt="loader"
            height={24}
            width={24}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitForm;
