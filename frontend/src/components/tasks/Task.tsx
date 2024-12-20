import { Button, Card, Form } from "react-bootstrap";
import { URLS } from "../../common/constants/urls";
import { useGetTask } from "../../common/services/useTask";
import { useTaskData } from "../../provider/taskProvider";
import TaskModal from "./TaskModal";
import { useEffect, useState } from "react";
import {
  useDeleteTaskList,
  useUpdateTaskList,
} from "../../common/services/useTaskList";
import { queryClient } from "../../common/services/queryClient";
import { getUpdatedTaskData } from "../../common/utils/util";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { SmallLoader } from "../common/Loader";

const Task: React.FC = () => {
  const { state, dispatch } = useTaskData();
  const [selectedTask, setSelectedTask] = useState({} as any);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [updateId, setUpdateId] = useState<number>();
  const [markIsCompleted, setMarkIsCompleted] = useState(false);

  const { data, isLoading } = useGetTask(
    URLS.TASK_ITEMS + `/${state?.selectedTaskList?.id}`,
    state?.selectedTaskList?.id,
    { enabled: !!state?.selectedTaskList?.id },
  );

  const { mutate: mutateDelete, isSuccess: isDeleteSuccess } =
    useDeleteTaskList(URLS.SUB_TASK_DELETE + `${deleteId}`);

  const {
    mutate: mutateUpdate,
    isSuccess: isTaskUpdate,
    isPending,
  } = useUpdateTaskList(URLS.SUB_TASK_UPDATE + `${updateId}`);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedTask({});
  };

  const handleEdit = (selectedTask: any) => {
    setSelectedTask(selectedTask);
    setShowModal(true);
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    mutateDelete({ task_id: id });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setUpdateId(id);
    const isChecked = event.target.checked;
    setMarkIsCompleted(isChecked);
    if (isChecked) {
      mutateUpdate({ task_id: id, is_completed: true });
    } else {
      mutateUpdate({ task_id: id, is_completed: false });
    }
  };

  useEffect(() => {
    if (isDeleteSuccess || isTaskUpdate) {
      queryClient.invalidateQueries({ queryKey: ["GET_TASK"] });
    }
  }, [isDeleteSuccess, isTaskUpdate]);

  useEffect(() => {
    if (isTaskUpdate) {
      const updatedTaskList = getUpdatedTaskData(
        state?.taskData,
        state?.selectedTaskList,
        markIsCompleted ? "COMPLETED" : "UNCOMPLETED",
      );
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: updatedTaskList,
        },
      });
    }
  }, [isTaskUpdate]);

  useEffect(() => {
    if (isDeleteSuccess) {
      const updatedTaskList = getUpdatedTaskData(
        state?.taskData,
        state?.selectedTaskList,
        "DELETE",
      );
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: updatedTaskList,
        },
      });
    }
  }, [isDeleteSuccess]);

  return (
    <>
      {showModal && (
        <TaskModal
          show={showModal}
          onHide={handleClose}
          title={
            isEdit ? "Edit" : `Add task to ${state.selectedTaskList?.title}`
          }
          isEdit={isEdit}
          selectedTask={selectedTask}
        />
      )}
      <div className="d-flex justify-content-end align-items-center my-2">
        <Button onClick={handleShow}>Add New Task</Button>
      </div>
      {(isLoading || isPending) && (
        <div className="text-center my-4">
          <SmallLoader />
        </div>
      )}
      {data?.data.length == 0 && (
        <div className="text-center mt-5">No subtask added yet!</div>
      )}
      {state.isOpenSubTask && (
        <>
          <div className="pt-2">
            {data?.data?.map((task: any) => (
              <>
                <Card className="mb-3">
                  <Card.Body className="d-flex justify-content-start align-items-baseline gap-4">
                    <Form>
                      <Form.Check
                        type="checkbox"
                        id={`check-${task.id}`}
                        checked={task.is_completed ? true : false}
                        onChange={(e: any) => handleCheckboxChange(e, task.id)}
                      />
                    </Form>

                    <Card.Text
                      className={
                        task.is_completed ? "text-decoration-line-through" : ""
                      }
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_FIELDS",
                          payload: {
                            selectedTask: task,
                          },
                        })
                      }
                    >
                      {task.description}
                    </Card.Text>
                    <div className="ms-auto d-flex gap-3">
                      <span className="p-0" style={{cursor: 'pointer'}} onClick={() => handleEdit(task)}>
                        <BsFillPencilFill />
                      </span>
                      <span className="p-0" style={{cursor: 'pointer'}} onClick={() => handleDelete(task.id)}>
                        <BsFillTrashFill />
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Task;
