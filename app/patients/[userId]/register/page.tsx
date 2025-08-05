import RegisterForm from "@/components/forms/register-form";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen min-h-screen">
      <section className="relative flex-1 overflow-y-auto my-auto px-[5%] xl:-ml-[25%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="justify-items-end py-12 text-gray-400 xl:text-left">
            ©2025 CarePulse
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt="patient"
        className="hidden fixed top-0 right-0 h-full object-cover xl:block max-w-[390px]"
      />
    </div>
  );
};

export default Register;
