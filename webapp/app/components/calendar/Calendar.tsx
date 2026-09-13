"use client";

import { useMemo, useState } from "react";

import { Appointment } from "../../types/appointment";
import { AppointmentType } from "../../types/appointmentType";

interface MonthlyCalendarProps {
  appointments: Appointment[];
  appointmentTypes: AppointmentType[];
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

export default function Calendar({
  appointments,
  appointmentTypes,
}: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days: CalendarDay[] = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month, -i),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  const getDateKey = (date: Date) => {
    const dateYear = date.getFullYear();
    const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
    const dateDay = String(date.getDate()).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  const getAppointmentType = (appointmentTypeId: number) => {
    return appointmentTypes.find((type) => type.id === appointmentTypeId);
  };

  const getAppointmentsForDay = (date: Date) => {
    const dateKey = getDateKey(date);

    return appointments.filter((appointment) => {
      if (!appointment.starts_at) {
        return false;
      }

      return getDateKey(new Date(appointment.starts_at)) === dateKey;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const formatTime = (date: string | null) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="overflow-hidden rounded-lg border borders cards  shadow-sm">
      <div className="flex flex-col gap-4 border-b borders p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold textPrimary ">{monthName}</h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-md border borders px-3 py-2 text-sm font-medium textPrimary "
            aria-label="Previous month"
          >
            ←
          </button>

          <button
            type="button"
            onClick={goToToday}
            className="rounded-md border borders px-3 py-2 text-sm font-medium textPrimary "
          >
            Today
          </button>

          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-md border borders px-3 py-2 text-sm font-medium textPrimary "
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="border-r borders px-2 py-3 text-center text-xs font-semibold uppercase textPrimary  last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }) => {
          const dayAppointments = getAppointmentsForDay(date);

          return (
            <div
              key={getDateKey(date)}
              className="min-h-32 border-b border-r borders p-2"
            >
              <div className="mb-2 flex justify-end">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isToday(date)
                      ? "bg-blue-600 font-semibold text-white"
                      : isCurrentMonth
                        ? "textPrimary "
                        : "textSecondary"
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>

              <div className="space-y-1">
                {dayAppointments.map((appointment) => {
                  const appointmentType = getAppointmentType(
                    appointment.appointment_type_id,
                  );

                  return (
                    <div
                      key={appointment.id}
                      className="truncate rounded px-2 py-1 text-xs textPrimary  shadow-sm"
                      style={{
                        backgroundColor: appointmentType?.color || "#6B7280",
                      }}
                      title={appointment.title}
                    >
                      <div className="truncate font-medium">
                        {appointment.title}
                      </div>

                      {appointment.starts_at && (
                        <div className="truncate opacity-90">
                          {formatTime(appointment.starts_at)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
