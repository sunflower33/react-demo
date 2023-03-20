import React from "react";
export default function PropsComponent (props) {
    const { title, isShown } = props;
    return (
      <>
        <div>props: {title}</div>
        <div>{isShown ? "显示" : "隐藏"}</div>
      </>
    );
}

