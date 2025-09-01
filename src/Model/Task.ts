export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  deadline: Date;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  category?: string;
};
