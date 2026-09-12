import { appointmentTypesService } from "../services/appointmentsTypes.service";
import AppointmentTypesManager from "./appointmentTypesManager";

export default async function AppointmentTypesPage() {
  const appointmentTypes = await appointmentTypesService.getAll();

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <AppointmentTypesManager initialAppointmentTypes={appointmentTypes} />
      </div>
    </main>
  );
}
