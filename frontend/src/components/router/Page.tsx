/*eslint-disable*/
import React from "react";

const Page = (props: any) => {
  React.useEffect(() => {
    document.title = props.title;
  });

  return props.component;
};

export default Page;
