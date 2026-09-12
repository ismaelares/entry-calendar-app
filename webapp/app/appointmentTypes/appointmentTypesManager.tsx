"use client";

import { useState } from "react";
import { AppointmentType } from "../types/appointmentType";
import AppointmentTypeForm from "./appointmentTypeForm";
import AppointmentTypesTable from "./appointmentTypesTable";
import { appointmentTypesService } from "../services/appointmentsTypes.service";

interface Props {
  initialAppointmentTypes: AppointmentType[];
}

export default function AppointmentTypesManager({
  initialAppointmentTypes,
}: Props) {
  const [appointmentTypes, setAppointmentTypes] = useState(
    initialAppointmentTypes,
  );

  const [showForm, setShowForm] = useState(false);

  const [editingAppointmentType, setEditingAppointmentType] =
    useState<AppointmentType | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingAppointmentType(null);
    setShowForm(true);
    setError(null);
  };

  const handleEdit = (appointmentType: AppointmentType) => {
    setEditingAppointmentType(appointmentType);
    setShowForm(true);
    setError(null);
  };

  const handleSuccess = (appointmentType: AppointmentType) => {
    setAppointmentTypes((current) => {
      const exists = current.some((item) => item.id === appointmentType.id);

      if (exists) {
        return current.map((item) =>
          item.id === appointmentType.id ? appointmentType : item,
        );
      }

      return [...current, appointmentType];
    });

    setShowForm(false);
    setEditingAppointmentType(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAppointmentType(null);
  };

  const handleDelete = async (appointmentType: AppointmentType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${appointmentType.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(appointmentType.id);
      setError(null);

      await appointmentTypesService.delete(appointmentType.id);

      setAppointmentTypes((current) =>
        current.filter((item) => item.id !== appointmentType.id),
      );
    } catch (error) {
      console.error(error);
      setError("Unable to delete the appointment type.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white-900">
            Appointment Types
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the types of appointments available.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="
            rounded-lg bg-blue-600
            px-4 py-2.5
            text-sm font-medium text-white
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30
          "
        >
          + New type
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="
            rounded-lg border border-red-200
            bg-red-50 px-4 py-3
            text-sm text-red-700
          "
        >
          {error}
        </div>
      )}

      {showForm && (
        <div className="rounded-xl border border-white-200  p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-white-900">
            {editingAppointmentType
              ? "Edit Appointment Type"
              : "New Appointment Type"}
          </h2>

          <AppointmentTypeForm
            appointmentType={editingAppointmentType ?? undefined}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      <AppointmentTypesTable
        appointmentTypes={appointmentTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </div>
  );
}
