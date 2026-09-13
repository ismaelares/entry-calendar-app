import { appointmentsService } from "../services/appointments.service";
import { appointmentTypesService } from "../services/appointmentsTypes.service";

import Calendar from "../components/calendar/Calendar";

export default async function CalendarPage() {
  const [appointments, appointmentTypes] = await Promise.all([
    appointmentsService.getAll(),
    appointmentTypesService.getAll(),
  ]);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <Calendar
          appointments={appointments}
          appointmentTypes={appointmentTypes}
        />
      </div>
    </main>
  );
}
