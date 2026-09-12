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
      <div className="rounded-lg border border-gray-200  p-8 text-center">
        <p className="text-white-500">No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white-500">
                Title
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white-500">
                Type
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white-500">
                Start
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white-500">
                End
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white-500">
                Location
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-white-500">
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
                    <div className="text-sm font-medium text-white-900">
                      {appointment.title}
                    </div>

                    {appointment.description && (
                      <div className="max-w-xs truncate text-sm text-gray-500">
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

                        <span className="text-sm text-white-700">
                          {appointmentType.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-white-400">
                        Unknown type
                      </span>
                    )}
                  </td>

                  {/* Start */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white-600">
                    {formatDate(appointment.starts_at)}
                  </td>

                  {/* End */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white-600">
                    {formatDate(appointment.ends_at)}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-white-600">
                    {appointment.location || "—"}
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(appointment)}
                        disabled={isDeleting}
                        className="rounded-md border bg-blue-600 border-gray-300 px-3 py-1.5 font-medium text-white-700 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(appointment.id)}
                        disabled={isDeleting}
                        className="rounded-md bg-red-600 px-3 py-1.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
  );
}
