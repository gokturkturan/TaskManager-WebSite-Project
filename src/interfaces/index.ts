export interface taskInterface {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Done";
  category: "Work" | "Hobby" | "Personal" | "Other";
  dateToStart: string;
  dateToFinish: string;
  reference: string;
  priority: "Low" | "Medium" | "High";

  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
