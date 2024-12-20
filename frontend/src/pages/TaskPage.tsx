import TaskPageWrapper from "../components/tasks/TaskPageWrapper";
import { TaskDataProvider } from "../provider/taskProvider";

const TaskPage: React.FC = () => {
  return (
    <TaskDataProvider>
      <TaskPageWrapper />
    </TaskDataProvider>
  );
};

export default TaskPage;
