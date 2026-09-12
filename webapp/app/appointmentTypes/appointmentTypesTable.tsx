"use client";

import { AppointmentType } from "../types/appointmentType";

interface Props {
  appointmentTypes: AppointmentType[];
  onEdit: (appointmentType: AppointmentType) => void;
  onDelete: (appointmentType: AppointmentType) => void;
  deletingId: number | null;
}

export default function AppointmentTypesTable({
  appointmentTypes,
  onEdit,
  onDelete,
  deletingId,
}: Props) {
  if (appointmentTypes.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">No appointment types found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white-200  shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black-50">
            <tr>
              <th
                scope="col"
                className="
                  px-6 py-3
                  text-left text-xs font-medium
                  uppercase tracking-wider text-white-500
                "
              >
                Name
              </th>

              <th
                scope="col"
                className="
                  px-6 py-3
                  text-left text-xs font-medium
                  uppercase tracking-wider text-white-500
                "
              >
                Color
              </th>

              <th
                scope="col"
                className="
                  px-6 py-3
                  text-right text-xs font-medium
                  uppercase tracking-wider text-white-500
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {appointmentTypes.map((appointmentType) => {
              const isDeleting = deletingId === appointmentType.id;

              return (
                <tr key={appointmentType.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm font-medium text-white-900">
                      {appointmentType.name}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-6 w-6 rounded-full border border-white-200"
                        style={{
                          backgroundColor: appointmentType.color,
                        }}
                      />

                      <span className="font-mono text-xs uppercase text-white-500">
                        {appointmentType.color}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => onEdit(appointmentType)}
                        disabled={isDeleting}
                        className="
                          text-sm font-medium text-blue-600
                          hover:text-blue-800
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(appointmentType)}
                        disabled={isDeleting}
                        className="
                          text-sm font-medium text-red-600
                          hover:text-red-800
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
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
