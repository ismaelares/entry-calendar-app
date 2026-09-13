import { api } from "./api";
import {
  Appointment,
  CreateAppointment,
  UpdateAppointment,
} from "../types/appointment";

export const appointmentsService = {
  async getAll(): Promise<Appointment[]> {
    const response = await api.get<Appointment[]>("/appointments");

    return response.data;
  },

  async getById(id: number): Promise<Appointment> {
    const response = await api.get<Appointment>(`/appointments/${id}`);

    return response.data;
  },

  async create(data: CreateAppointment): Promise<Appointment> {
    const response = await api.post<Appointment>("/appointments", {
      appointment: data,
    });

    return response.data;
  },

  async update(id: number, data: UpdateAppointment): Promise<Appointment> {
    const response = await api.patch<Appointment>(`/appointments/${id}`, {
      appointment: data,
    });

    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/appointments/${id}`);
  },
};
