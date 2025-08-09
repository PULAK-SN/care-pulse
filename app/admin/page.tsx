import StatCard from "@/components/stats-card";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  return (
    <div className="flex flex-col mx-auto space-y-14 max-w-7xl">
      <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-gray-700 px-[5%] py-5 shadow-lg xl:px-12">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-[16px] font-semibold">Admin Dashboard</p>
      </header>
      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">
        <section className="w-full space-y-4">
          <h1 className="text-[32px] font-bold md:text-[36px]">Welcome</h1>
          <p className="text-dark-700">
            Start a day with managing new appointments
          </p>
        </section>
        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Schedule appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
