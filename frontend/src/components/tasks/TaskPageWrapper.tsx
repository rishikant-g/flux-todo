import { Button, Col, Form } from "react-bootstrap";
import { useTaskData } from "../../provider/taskProvider";
import TaskList from "./TaskList";
import Task from "./Task";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../../common/utils/util";
import { useGetTaskList } from "../../common/services/useTaskList";
import { URLS } from "../../common/constants/urls";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { SmallLoader } from "../common/Loader";

const TaskPageWrapper: React.FC = () => {
  const { state, dispatch } = useTaskData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setsortBy] = useState<string>("asc");

  const {
    data,
    isLoading,
    isFetching,
    isSuccess: isSuccessTaskList,
  } = useGetTaskList(URLS.TASK_LIST, searchQuery, sortBy);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: data,
          isOpenSubTask: false,
        },
      });
    }
  }, [isLoading, isSuccessTaskList, data]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_FIELDS",
      payload: {
        selectedTaskList: {},
        isOpenSubTask: false,
      },
    });
  }, [sortBy, searchQuery]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-5 px-4">
            <Form className="d-flex align-items-center justify-content-between gap-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Form.Group>
              <Button
                className="d-inline-block"
                onClick={() => {
                  if (sortBy === "asc") {
                    setsortBy("desc");
                  } else {
                    setsortBy("asc");
                  }
                }}
              >
                {sortBy === "asc" ? (
                  <BsSortAlphaUp size={20} />
                ) : (
                  <BsSortAlphaDown size={20} />
                )}
              </Button>
            </Form>
            {isFetching && (
              <div className="text-center mt-5">
                <SmallLoader />
              </div>
            )}
          </div>

          <div className="col-sm-12 col-md-7"></div>

          <Col sm={12} md={6}>
            <div className="task-list">
              {data && !data.length && (
                <Form.Label className="px-4"> No record found</Form.Label>
              )}

              <TaskList />
            </div>
          </Col>
          <Col sm={12} md={6}>
            {state.isOpenSubTask && (
              <div className="mt-5">
                <Task />
              </div>
            )}
          </Col>
        </div>
      </div>
    </>
  );
};

export default TaskPageWrapper;
