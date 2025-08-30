export enum RoleAdmin {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum WorkerRole{
    DOCTOR='doctor',
    GUARD='guard',
    DELIVER='deliver',
    RESEPTION ='reseption',
    CLEANER='cleaner',
    TECNICAL='tecnical'
}
export enum WorkerStatus{
    ACTIVE='active',
    INACTIVE='inactive'
}
export enum AppointmentStatus {
  SCHEDULED = 'scheduled', // belgilangan
  PENDING = 'pending', // tasdiqlanishi kutilmoqda
  NO_SHOW = 'no_show', // kelmagan
}
export enum RoleAppoinment{
  ADMIN='admin',
  WORKER='worker',
  PATIENT='patient',
}
export enum ScheduleStatus{
  PENDING='pending',
  END='end'
}
