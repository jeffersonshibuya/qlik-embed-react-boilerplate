import { TaskForm } from "@/features/tasks/components/form";
import { TasksTable } from "@/features/tasks/components/tasks-table";

const TasksPage = () => {
  return (
    <div>
      <h1>Tasks Page</h1>
      <TaskForm />
      <div className="w-full h-full">
        <TasksTable />
      </div>
    </div>
  );
};

export default TasksPage;
