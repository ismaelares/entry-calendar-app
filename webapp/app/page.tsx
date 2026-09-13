import { appointmentsService } from "./services/appointments.service";
import { appointmentTypesService } from "./services/appointmentsTypes.service";

export default async function HomePage() {
  const [appointments, appointmentTypes] = await Promise.all([
    appointmentsService.getAll(),
    appointmentTypesService.getAll(),
  ]);

  const now = new Date();

  const upcomingAppointments = appointments
    .filter((appointment) => {
      if (!appointment.starts_at) {
        return false;
      }

      return new Date(appointment.starts_at) >= now;
    })
    .sort((a, b) => {
      return (
        new Date(a.starts_at!).getTime() - new Date(b.starts_at!).getTime()
      );
    });

  const getAppointmentType = (appointmentTypeId: number) => {
    return appointmentTypes.find((type) => type.id === appointmentTypeId);
  };

  const formatDate = (date: string | null) => {
    if (!date) {
      return "No date";
    }

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold textPrimary">
            Upcoming Appointments
          </h1>
          <p className="mt-2 textSecondary">
            Your upcoming appointments, starting from today.
          </p>
        </div>
        {upcomingAppointments.length === 0 && (
          <div className="rounded-lg border border-gray-200 cards p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              No upcoming appointments
            </h2>

            <p className="mt-2 text-sm textSecondary">
              You don't have any upcoming appointments scheduled.
            </p>
          </div>
        )}
        {upcomingAppointments.length > 0 && (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => {
              const appointmentType = getAppointmentType(
                appointment.appointment_type_id,
              );

              return (
                <div
                  key={appointment.id}
                  className="rounded-lg border borders cards p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {appointmentType && (
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{
                              backgroundColor: appointmentType.color,
                            }}
                          />
                        )}

                        <h2 className="text-lg font-semibold textPrimary">
                          {appointment.title}
                        </h2>
                      </div>

                      {appointment.description && (
                        <p className="mt-2 text-sm textSecondary">
                          {appointment.description}
                        </p>
                      )}

                      <div className="mt-4 space-y-2 text-sm textSecondary">
                        <div>
                          <span className="font-medium textPrimary">Date:</span>{" "}
                          {formatDate(appointment.starts_at)}
                        </div>

                        {appointment.ends_at && (
                          <div>
                            <span className="font-medium textPrimary">
                              Ends:
                            </span>{" "}
                            {formatDate(appointment.ends_at)}
                          </div>
                        )}

                        {appointment.location && (
                          <div>
                            <span className="font-medium textPrimary">
                              Location:
                            </span>{" "}
                            {appointment.location}
                          </div>
                        )}

                        {appointment.people_of_interest && (
                          <div>
                            <span className="font-medium textPrimary">
                              People:
                            </span>{" "}
                            {appointment.people_of_interest}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Appointment type */}
                    {appointmentType && (
                      <span
                        className="w-fit rounded-full px-3 py-1 text-xs font-medium text-white"
                        style={{
                          backgroundColor: appointmentType.color,
                        }}
                      >
                        {appointmentType.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
