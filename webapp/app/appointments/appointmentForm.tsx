"use client";

import { FormEvent, useState } from "react";
import { Appointment, CreateAppointment } from "../types/appointment";
import { AppointmentType } from "../types/appointmentType";
import { appointmentsService } from "../services/appointments.service";

interface AppointmentFormProps {
  appointment?: Appointment;
  appointmentTypes: AppointmentType[];
  onSuccess?: (appointment: Appointment) => void;
  onCancel?: () => void;
}

export default function AppointmentForm({
  appointment,
  appointmentTypes,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const isEditing = Boolean(appointment);

  const [title, setTitle] = useState(appointment?.title ?? "");

  const [description, setDescription] = useState(
    appointment?.description ?? "",
  );

  const [notes, setNotes] = useState(appointment?.notes ?? "");

  const [appointmentTypeId, setAppointmentTypeId] = useState(
    appointment?.appointment_type_id?.toString() ?? "",
  );

  const [startsAt, setStartsAt] = useState(
    appointment?.starts_at ? appointment.starts_at.slice(0, 16) : "",
  );

  const [endsAt, setEndsAt] = useState(
    appointment?.ends_at ? appointment.ends_at.slice(0, 16) : "",
  );

  const [location, setLocation] = useState(appointment?.location ?? "");

  const [peopleOfInterest, setPeopleOfInterest] = useState(
    appointment?.people_of_interest ?? "",
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Appointment title is required.");
      return;
    }

    if (!appointmentTypeId) {
      setError("Appointment type is required.");
      return;
    }

    if (startsAt && endsAt && new Date(startsAt) > new Date(endsAt)) {
      setError("End date and time must be after the start date and time.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data: CreateAppointment = {
        title: trimmedTitle,
        description: description.trim(),
        notes: notes.trim(),
        appointment_type_id: Number(appointmentTypeId),
        starts_at: startsAt || undefined,
        ends_at: endsAt || undefined,
        location: location.trim(),
        people_of_interest: peopleOfInterest.trim(),
      };

      let result: Appointment;

      if (appointment) {
        result = await appointmentsService.update(appointment.id, data);
      } else {
        result = await appointmentsService.create(data);
      }

      onSuccess?.(result);
    } catch (error) {
      console.error(error);

      setError(
        isEditing
          ? "Unable to update appointment."
          : "Unable to create appointment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="appointment-title"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          Title
        </label>

        <input
          id="appointment-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Team meeting"
          disabled={loading}
          className="
            w-full rounded-lg border borders
            px-4 py-2.5 text-sm
            textPrimary outline-none transition
            placeholder:textSecondary
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
      </div>

      <div>
        <label
          htmlFor="appointment-type"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          Appointment Type
        </label>

        <select
          id="appointment-type"
          value={appointmentTypeId}
          onChange={(event) => setAppointmentTypeId(event.target.value)}
          disabled={loading}
          className="
            w-full rounded-lg border borders
            px-4 py-2.5 text-sm
            textPrimary outline-none transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        >
          <option value="">Select an appointment type</option>

          {appointmentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="appointment-start"
            className="mb-2 block text-sm font-medium textPrimary"
          >
            Start date & time
          </label>

          <input
            id="appointment-start"
            type="datetime-local"
            value={startsAt}
            onChange={(event) => setStartsAt(event.target.value)}
            disabled={loading}
            className="
              w-full rounded-lg border borders
              px-4 py-2.5 text-sm
              textPrimary outline-none transition
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>

        <div>
          <label
            htmlFor="appointment-end"
            className="mb-2 block text-sm font-medium textPrimary"
          >
            End date & time
          </label>

          <input
            id="appointment-end"
            type="datetime-local"
            value={endsAt}
            onChange={(event) => setEndsAt(event.target.value)}
            disabled={loading}
            className="
              w-full rounded-lg border borders
              px-4 py-2.5 text-sm
              text-white-900 outline-none transition
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/20
              disabled:cursor-not-allowed
              disabled:bg-white-900
            "
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="appointment-location"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          Location
        </label>

        <input
          id="appointment-location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="e.g. Conference Room A"
          disabled={loading}
          className="
            w-full rounded-lg border borders
            px-4 py-2.5 text-sm
            textPrimary outline-none transition
            placeholder:textSecondary
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
      </div>

      {/* People of Interest */}
      <div>
        <label
          htmlFor="people-of-interest"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          People of Interest
        </label>

        <input
          id="people-of-interest"
          type="text"
          value={peopleOfInterest}
          onChange={(event) => setPeopleOfInterest(event.target.value)}
          placeholder="e.g. John Doe, Jane Smith"
          disabled={loading}
          className="
            w-full rounded-lg border borders
             px-4 py-2.5 text-sm
            textPrimary outline-none transition
            placeholder:textSecondary
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />

        <p className="mt-1.5 text-xs textSecondary">
          Separate multiple people with commas.
        </p>
      </div>
      <div>
        <label
          htmlFor="appointment-description"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          Description
        </label>

        <textarea
          id="appointment-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a description..."
          rows={4}
          disabled={loading}
          className="
            w-full resize-y rounded-lg
            border borders
            px-4 py-2.5 text-sm
            textPrimary outline-none transition
            placeholder:textSecondary
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
      </div>
      <div>
        <label
          htmlFor="appointment-notes"
          className="mb-2 block text-sm font-medium textPrimary"
        >
          Notes
        </label>

        <textarea
          id="appointment-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add additional notes..."
          rows={4}
          disabled={loading}
          className="
            w-full resize-y rounded-lg
            border borders
            px-4 py-2.5 text-sm
            text-white-900 outline-none transition
            placeholder:textSecondary
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />
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
      <div
        className="
          flex justify-end gap-3
          border-t borders pt-5
        "
      >
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
              focus:ring-2 focus:ring-gray-500/20
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
            shadow-sm transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2 focus:ring-blue-500/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update appointment"
              : "Create appointment"}
        </button>
      </div>
    </form>
  );
}
