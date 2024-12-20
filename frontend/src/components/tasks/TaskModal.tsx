import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePostSubTaskList } from "../../common/services/useTask";
import { URLS } from "../../common/constants/urls";
import { useUpdateTaskList } from "../../common/services/useTaskList";
import { queryClient } from "../../common/services/queryClient";
import { useTaskData } from "../../provider/taskProvider";
import { getUpdatedTaskData } from "../../common/utils/util";

interface TaskModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  isEdit?: boolean;
  selectedTask?: any;
}

const TaskModal: React.FC<TaskModalProps> = ({
  show,
  onHide,
  title,
  isEdit = false,
  selectedTask,
}) => {
  const { state, dispatch } = useTaskData();

  const [taksTitle, setTaskTitle] = useState<string>(
    selectedTask?.description || "",
  );
  const { mutate, isSuccess } = usePostSubTaskList(URLS.SUB_TASK_CREATE);
  const { mutate: mutateUpdate, isSuccess: isTaskUpdate } = useUpdateTaskList(
    selectedTask
      ? URLS.SUB_TASK_UPDATE + `${selectedTask?.id}`
      : URLS.SUB_TASK_UPDATE,
  );

  const handleCreateTask = () => {
    if (isEdit) {
      mutateUpdate({
        task_id: state?.selectedTaskList?.id,
        description: taksTitle,
      });
    } else {
      mutate({ task_id: state?.selectedTaskList?.id, description: taksTitle });
    }
  };

  useEffect(() => {
    if (isSuccess || isTaskUpdate) {
      onHide();
      queryClient.invalidateQueries({ queryKey: ["GET_TASK"] });
    }
  }, [isSuccess, isTaskUpdate]);

  useEffect(() => {
    if (isSuccess) {
      const updatedTaskList = getUpdatedTaskData(
        state?.taskData,
        state?.selectedTaskList,
        "ADD",
      );
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: updatedTaskList,
        },
      });
    }
  }, [isSuccess]);

  // Prevent form submission on enter key press
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taksTitle}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateTask}
          disabled={!taksTitle}
          type="button"
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
