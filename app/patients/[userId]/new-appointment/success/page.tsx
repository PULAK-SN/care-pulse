"use server";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constans";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId } = await params;
  const searchParamsAwaited = await searchParams;
  const appointmentId = (searchParamsAwaited?.appointmentId as string) || "";
  // const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src={"/assets/gifs/success.gif"}
            height={300}
            width={280}
            alt="success"
            className="w-auto"
          />
          <h2 className="text-[28px] font-bold mb-6 text-center">
            Your <span className="text-green-500">appointment request </span>
            has been submitted successfully!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="flex w-full flex-col items-center gap-8 border-y-2 border-gray-700 py-8 md:w-fit md:flex-row">
          <p>Request appointment details :</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || ""}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src={"/assets/icons/calendar.svg"}
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button
          className="bg-green-600 hover:bg-green-600/80 text-white"
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="justify-items-end py-12 text-gray-400 xl:text-left">
          ©2025 CarePulse
        </p>
      </div>
    </div>
  );
};

export default Success;
