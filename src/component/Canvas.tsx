import * as React from "react";

const Canvas = (props: any) => {
  return <canvas ref={props.canvasRef} {...props} />;
};

export default Canvas;
