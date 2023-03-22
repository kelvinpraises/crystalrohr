import * as React from "react";

const Canvas = (props: any) => {
  return <canvas hidden ref={props.canvasRef} {...props} />;
};

export default Canvas;
