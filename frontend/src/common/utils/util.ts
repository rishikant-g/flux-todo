export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUpdatedTaskData = (
  taskData: any,
  selectedTaskList: any,
  actionType: string,
) => {
  const arr: any = [];
  taskData?.forEach((d: any) => {
    if (d.id === selectedTaskList?.id) {
      if (actionType === "ADD") {
        d.items_count = d.items_count + 1;
      } else if (actionType == "DELETE") {
        d.items_count = d.items_count - 1;
      } else if (actionType == "COMPLETED") {
        d.checked_items = d.checked_items + 1;
      } else if (actionType == "UNCOMPLETED") {
        d.checked_items = d.checked_items - 1;
      }
      arr.push(d);
    } else {
      arr.push(d);
    }
  });
  return arr;
};

export const debounce = (fn: any, delay = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
