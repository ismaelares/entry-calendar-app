"use client";

import { AppointmentType } from "../types/appointmentType";

interface Props {
  appointmentTypes: AppointmentType[];
}

export default function AppointmentTypesTable({ appointmentTypes }: Props) {
  return (
    <div>
      {appointmentTypes.map((type) => (
        <div key={type.id}>{type.name}</div>
      ))}
    </div>
  );
}
