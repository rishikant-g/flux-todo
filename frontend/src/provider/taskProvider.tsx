import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import ITaskListResponse from "../common/type/model/ITaskListResponse";
import ITaskResponse from "../common/type/model/ITaskResponse";

interface State {
  selectedTaskList: ITaskListResponse;
  selectedTask: ITaskResponse;
  isOpenSubTask: boolean;
  taskData?: any[];
}

const INITIAL_VALUES: State = {
  selectedTaskList: {},
  selectedTask: {},
  isOpenSubTask: false,
  taskData: [],
};

type Action =
  | { type: "UPDATE_FIELDS"; payload: Partial<State> }
  | { type: "RESET" };

const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return { ...state, ...action.payload };
    case "RESET":
      return INITIAL_VALUES;
    default:
      return state;
  }
};

const DataContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const TaskDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_VALUES);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useTaskData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
