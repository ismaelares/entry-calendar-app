"use client";

import { useState } from "react";

import { Appointment } from "../types/appointment";
import { AppointmentType } from "../types/appointmentType";
import { appointmentsService } from "../services/appointments.service";

import AppointmentForm from "./appointmentForm";
import AppointmentsTable from "./appointmentsTable";

interface AppointmentsManagerProps {
  initialAppointments: Appointment[];
  appointmentTypes: AppointmentType[];
}

export default function AppointmentsManager({
  initialAppointments,
  appointmentTypes,
}: AppointmentsManagerProps) {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [showForm, setShowForm] = useState(false);

  const [editingAppointment, setEditingAppointment] = useState<
    Appointment | undefined
  >(undefined);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [error, setError] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((appointment) => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      appointment.title.toLowerCase().includes(search) ||
      appointment.description?.toLowerCase().includes(search) ||
      appointment.notes?.toLowerCase().includes(search)
    );
  });

  const handleCreate = () => {
    setEditingAppointment(undefined);
    setError(null);
    setShowForm(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setError(null);
    setShowForm(true);
  };

  const handleSuccess = (appointment: Appointment) => {
    if (editingAppointment) {
      setAppointments((current) =>
        current.map((item) =>
          item.id === appointment.id ? appointment : item,
        ),
      );
    } else {
      setAppointments((current) => [...current, appointment]);
    }

    setShowForm(false);
    setEditingAppointment(undefined);
    setError(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAppointment(undefined);
    setError(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);

      await appointmentsService.delete(id);

      setAppointments((current) =>
        current.filter((appointment) => appointment.id !== id),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete appointment.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold textPrimary">Appointments</h1>

          <p className="mt-1 text-sm textSecondary">
            Manage your appointments.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleCreate}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Add Appointment
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <div className="rounded-lg border borders p-6 shadow-sm cards">
          <h2 className="mb-6 text-lg font-semibold textPrimary">
            {editingAppointment ? "Edit Appointment" : "Create Appointment"}
          </h2>

          <AppointmentForm
            appointment={editingAppointment}
            appointmentTypes={appointmentTypes}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Search and Table */}
      {!showForm && (
        <>
          <div className="rounded-lg border borders p-4 shadow-sm cards">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search appointments..."
                className="w-full rounded-md border borders px-4 py-2.5 text-sm textPrimary outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white-400 hover:text-white-600"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-2 text-sm textSecondary">
              {searchTerm
                ? `${filteredAppointments.length} result${
                    filteredAppointments.length !== 1 ? "s" : ""
                  } found`
                : `${appointments.length} appointment${
                    appointments.length !== 1 ? "s" : ""
                  }`}
            </div>
          </div>

          <AppointmentsTable
            appointments={filteredAppointments}
            appointmentTypes={appointmentTypes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </>
      )}
    </div>
  );
}
