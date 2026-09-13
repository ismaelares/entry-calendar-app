"use client";

import { AppointmentType } from "../types/appointmentType";

interface AppointmentTypesTableProps {
  appointmentTypes: AppointmentType[];
  onEdit: (appointmentType: AppointmentType) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

export default function AppointmentTypesTable({
  appointmentTypes,
  onEdit,
  onDelete,
  deletingId,
}: AppointmentTypesTableProps) {
  if (appointmentTypes.length === 0) {
    return (
      <div className="rounded-lg border borders cards p-8 text-center">
        <p className="text-gray-500">No appointment types found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border borders cards shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="cards">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider textPrimary">
                  Color
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider textPrimary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y borders">
              {appointmentTypes.map((appointmentType) => {
                const isDeleting = deletingId === appointmentType.id;

                return (
                  <tr
                    key={appointmentType.id}
                    className={isDeleting ? "opacity-50" : ""}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-sm font-medium textSecondary">
                        {appointmentType.name}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-5 w-5 rounded-full border borders"
                          style={{
                            backgroundColor: appointmentType.color,
                          }}
                        />

                        <span className="text-sm textSecondary">
                          {appointmentType.color}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(appointmentType)}
                          disabled={isDeleting}
                          className="rounded-md border borders bg-blue-600 px-3 py-1.5 text-sm font-medium textPrimary transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(appointmentType.id)}
                          disabled={isDeleting}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium textPrimary transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="space-y-3 md:hidden">
        {appointmentTypes.map((appointmentType) => {
          const isDeleting = deletingId === appointmentType.id;

          return (
            <div
              key={appointmentType.id}
              className={`rounded-lg border borders cards p-4 shadow-sm ${
                isDeleting ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-8 shrink-0 rounded-full border borders"
                  style={{
                    backgroundColor: appointmentType.color,
                  }}
                />

                <div className="min-w-0">
                  <p className="truncate font-medium textPrimary">
                    {appointmentType.name}
                  </p>

                  <p className="text-sm textSecondary">
                    {appointmentType.color}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(appointmentType)}
                  disabled={isDeleting}
                  className="flex-1 rounded-md bg-blue-600 border borders px-3 py-2 text-sm font-medium textPrimary transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(appointmentType.id)}
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
