"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };
  const encryptedKey =
    typeof window !== undefined
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else setOpen(true);
    }
  }, [encryptedKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      router.push("/admin");
    } else setError("Please enter a valid passkey");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 bg-gray-700 border-gray-500 outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin Access Varification
            <Image
              src={"/assets/icons/close.svg"}
              height={20}
              width={20}
              alt="close"
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            To access the admin page, please enter the admin passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="w-full flex justify-around">
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={0}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={1}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={2}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={3}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={4}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-700 rounded-lg size-16 gap-4"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="mt-4 text-[16px] flex justify-center text-red-400">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="bg-green-500 text-white w-full hover:bg-green-500/80 cursor-pointer"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
