import AppointmentForm from "@/components/forms/appointment-form";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const NewAppointment = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen min-h-screen">
      <section className=" relative flex-1 overflow-y-auto my-auto px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="justify-items-end text-gray-700 xl:text-left mt-10 py-10">
            ©2025 CarePulse
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        alt="appointment"
        height={1000}
        width={1000}
        className="hidden object-cover md:block max-w-[390px]"
      />
    </div>
  );
};
export default NewAppointment;
