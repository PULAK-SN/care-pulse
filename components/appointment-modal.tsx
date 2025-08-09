"use state";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import AppointmentForm from "./forms/appointment-form";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            `capitalize ${type === "schedule" && "text-green-500"}`
          )}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-700 border-gray-600">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription className="text-white">
            Please fill in the following details to
            <span
              className={`${type === "schedule" && "text-green-500"} ${
                type === "cancel" && "text-red-500"
              } mx-2 text-[16px]`}
            >
              {type}
            </span>
            an appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment!}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
