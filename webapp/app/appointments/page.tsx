import { appointmentsService } from "../services/appointments.service";
import { appointmentTypesService } from "../services/appointmentsTypes.service";

import AppointmentsManager from "./appointmentManager";

export default async function AppointmentsPage() {
  const [appointments, appointmentTypes] = await Promise.all([
    appointmentsService.getAll(),
    appointmentTypesService.getAll(),
  ]);

  return (
    <main className="min-h-screen bg-white-50 p-6">
      <div className="mx-auto max-w-7xl">
        <AppointmentsManager
          initialAppointments={appointments}
          appointmentTypes={appointmentTypes}
        />
      </div>
    </main>
  );
}
