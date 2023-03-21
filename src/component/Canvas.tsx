import * as React from "react";

const Canvas = (props: any) => {
  return <canvas hidden ref={props.canvasref} {...props} />;
};

export default Canvas;
