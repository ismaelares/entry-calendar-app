export interface Appointment {
  id: number;
  title: string;
  description: string | null;
  notes: string | null;
  appointment_type_id: number;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  people_of_interest: string | null;
}

export interface CreateAppointment {
  title: string;
  description?: string;
  notes?: string;
  appointment_type_id: number;
  starts_at?: string;
  ends_at?: string;
  location?: string;
  people_of_interest?: string;
}

export interface UpdateAppointment extends CreateAppointment {}
