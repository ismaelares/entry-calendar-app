import { api } from "./api";
import {
  AppointmentType,
  CreateAppointmentType,
  UpdateAppointmentType,
} from "../types/appointmentType";

export const appointmentTypesService = {
  async getAll(): Promise<AppointmentType[]> {
    const response = await api.get<AppointmentType[]>("/appointment_types");

    return response.data;
  },

  async getById(id: number): Promise<AppointmentType> {
    const response = await api.get<AppointmentType>(`/appointment_types/${id}`);

    return response.data;
  },

  async create(data: CreateAppointmentType): Promise<AppointmentType> {
    const response = await api.post<AppointmentType>("/appointment_types", {
      appointment_type: data,
    });

    return response.data;
  },

  async update(
    id: number,
    data: UpdateAppointmentType,
  ): Promise<AppointmentType> {
    const response = await api.patch<AppointmentType>(
      `/appointment_types/${id}`,
      {
        appointment_type: data,
      },
    );

    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/appointment_types/${id}`);
  },
};
