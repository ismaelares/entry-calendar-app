"use client";

import { Appointment } from "../types/appointment";
import { AppointmentType } from "../types/appointmentType";

interface AppointmentsTableProps {
  appointments: Appointment[];
  appointmentTypes: AppointmentType[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

export default function AppointmentsTable({
  appointments,
  appointmentTypes,
  onEdit,
  onDelete,
  deletingId,
}: AppointmentsTableProps) {
  const getAppointmentType = (appointmentTypeId: number) => {
    return appointmentTypes.find((type) => type.id === appointmentTypeId);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="textPrimary">No appointments found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-lg border borders cards shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="cards">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Title
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Type
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Start
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  End
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Location
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider textPrimary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => {
                const appointmentType = getAppointmentType(
                  appointment.appointment_type_id,
                );

                const isDeleting = deletingId === appointment.id;

                return (
                  <tr
                    key={appointment.id}
                    className={isDeleting ? "opacity-50" : ""}
                  >
                    {/* Title */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium textPrimary">
                        {appointment.title}
                      </div>

                      {appointment.description && (
                        <div className="max-w-xs truncate text-sm textSecondary">
                          {appointment.description}
                        </div>
                      )}
                    </td>

                    {/* Type */}
                    <td className="whitespace-nowrap px-6 py-4">
                      {appointmentType ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: appointmentType.color,
                            }}
                          />

                          <span className="text-sm textSecondary">
                            {appointmentType.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm textSecondary">
                          Unknown type
                        </span>
                      )}
                    </td>

                    {/* Start */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm textSecondary">
                      {formatDate(appointment.starts_at)}
                    </td>

                    {/* End */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm textSecondary">
                      {formatDate(appointment.ends_at)}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm textSecondary">
                      {appointment.location || "—"}
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(appointment)}
                          disabled={isDeleting}
                          className="rounded-md border borders bg-blue-600 px-3 py-1.5 text-sm font-medium textPrimary transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(appointment.id)}
                          disabled={isDeleting}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {appointments.map((appointment) => {
          const appointmentType = getAppointmentType(
            appointment.appointment_type_id,
          );

          const isDeleting = deletingId === appointment.id;

          return (
            <div
              key={appointment.id}
              className={`rounded-lg border borders cards p-4 shadow-sm ${
                isDeleting ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold textPrimary">
                    {appointment.title}
                  </h3>

                  {appointment.description && (
                    <p className="mt-1 line-clamp-2 text-sm textSecondary">
                      {appointment.description}
                    </p>
                  )}
                </div>

                {appointmentType && (
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border borders"
                    style={{
                      backgroundColor: appointmentType.color,
                    }}
                    title={appointmentType.name}
                  />
                )}
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2 text-sm">
                {appointmentType && (
                  <div className="flex items-start gap-2">
                    <span className="w-20 shrink-0 font-medium textPrimary">
                      Type
                    </span>

                    <span className="textSecondary">
                      {appointmentType.name}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <span className="w-20 shrink-0 font-medium textPrimary">
                    Start
                  </span>

                  <span className="textSecondary">
                    {formatDate(appointment.starts_at)}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-20 shrink-0 font-medium textPrimary">
                    End
                  </span>

                  <span className="textSecondary">
                    {formatDate(appointment.ends_at)}
                  </span>
                </div>

                {appointment.location && (
                  <div className="flex items-start gap-2">
                    <span className="w-20 shrink-0 font-medium textPrimary">
                      Location
                    </span>

                    <span className="textSecondary">
                      {appointment.location}
                    </span>
                  </div>
                )}

                {appointment.people_of_interest && (
                  <div className="flex items-start gap-2">
                    <span className="w-20 shrink-0 font-medium textPrimary">
                      People
                    </span>

                    <span className="textSecondary">
                      {appointment.people_of_interest}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 border-t borders pt-4">
                <button
                  type="button"
                  onClick={() => onEdit(appointment)}
                  disabled={isDeleting}
                  className="flex-1 rounded-md border borders bg-blue-600 px-3 py-2 text-sm font-medium textPrimary transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(appointment.id)}
                  disabled={isDeleting}
                  className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
