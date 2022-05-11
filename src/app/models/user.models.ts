export interface UserData {
  entityNo: RolesEntityNo;
  firstName: string;
  lastName: string;
}

export enum RolesEntityNo {
  patient = 1000000003,
  doctor = 1100000333,
}

export enum SidebarButtons {
  dashboard = 'dashboard',
  doctors = 'doctors',
  upcomingConsultations = 'upcoming consultations',
  healthRecords = 'health records',
  consultationRequests = 'requests',
  patients = 'patients'
}
