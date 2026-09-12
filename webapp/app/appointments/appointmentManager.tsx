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

  const [error, setError] = useState<string | null>(null);

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
      // Update existing appointment
      setAppointments((current) =>
        current.map((item) =>
          item.id === appointment.id ? appointment : item,
        ),
      );
    } else {
      // Add new appointment
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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-900">Appointments</h1>

          <p className="mt-1 text-sm text-white-500">
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

      {/* Error */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-lg border border-white-200  p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-white-900">
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

      {/* Table */}
      {!showForm && (
        <AppointmentsTable
          appointments={appointments}
          appointmentTypes={appointmentTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
}
