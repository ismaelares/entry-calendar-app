import { appointmentTypesService } from "../services/appointmentsTypes.service";
import AppointmentTypesTable from "./appointmentTypesTable";

export default async function AppointmentTypesPage() {
  const appointmentTypes = await appointmentTypesService.getAll();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Appointment Types Page</h1>
      <p className="text-lg text-gray-600">
        This is the appointment types page of the application.
      </p>
      <AppointmentTypesTable appointmentTypes={appointmentTypes} />
    </div>
  );
}
