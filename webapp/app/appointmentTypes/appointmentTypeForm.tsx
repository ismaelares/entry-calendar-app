"use client";

import { FormEvent, useState } from "react";
import {
  AppointmentType,
  CreateAppointmentType,
} from "../types/appointmentType";
import { appointmentTypesService } from "../services/appointmentsTypes.service";

interface AppointmentTypeFormProps {
  appointmentType?: AppointmentType;
  onSuccess?: (appointmentType: AppointmentType) => void;
  onCancel?: () => void;
}

const DEFAULT_COLOR = "#3B82F6";

export default function AppointmentTypeForm({
  appointmentType,
  onSuccess,
  onCancel,
}: AppointmentTypeFormProps) {
  const isEditing = Boolean(appointmentType);

  const [name, setName] = useState(appointmentType?.name ?? "");

  const [color, setColor] = useState(appointmentType?.color ?? DEFAULT_COLOR);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Appointment type name is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data: CreateAppointmentType = {
        name: trimmedName,
        color,
      };

      let result: AppointmentType;

      if (appointmentType) {
        result = await appointmentTypesService.update(appointmentType.id, data);
      } else {
        result = await appointmentTypesService.create(data);
      }

      onSuccess?.(result);
    } catch (error) {
      console.error(error);
      setError(
        isEditing
          ? "Unable to update appointment type."
          : "Unable to create appointment type.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="appointment-type-name"
          className="mb-2 block text-sm font-medium text-white-700"
        >
          Name
        </label>

        <input
          id="appointment-type-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Meeting"
          disabled={loading}
          className="
            w-full rounded-lg border border-gray-300
            px-4 py-2.5 text-sm
            text-white-900
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
      </div>

      {/* Color */}
      <div>
        <label
          htmlFor="appointment-type-color"
          className="mb-2 block text-sm font-medium text-white-700"
        >
          Color
        </label>

        <div className="flex items-center gap-3">
          <input
            id="appointment-type-color"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            disabled={loading}
            className="
              h-11 w-16 cursor-pointer
              rounded-lg border border-white-300
               p-1
              disabled:cursor-not-allowed
            "
          />

          <div
            className="h-10 w-10 rounded-full border border-white-200 shadow-sm"
            style={{ backgroundColor: color }}
          />

          <span className="font-mono text-sm uppercase text-gray-600">
            {color}
          </span>
        </div>
      </div>

      {/* Error */}
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

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-lg 
              bg-red-800 px-4 py-2.5
              text-sm font-medium text-white-700
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-gray-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg bg-blue-600
            px-5 py-2.5
            text-sm font-medium text-white
            shadow-sm
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : isEditing ? "Update type" : "Create type"}
        </button>
      </div>
    </form>
  );
}
