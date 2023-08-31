import React from "react";
const style = { fontWeight: "bold" };
function tabFactory({
  label,
  children,
  key,
  closeIcon,
}: {
  label: string;
  children: React.ReactNode;
  key: string;
  closeIcon?: boolean;
}) {
  const rChildren = (
    <div
      style={{
        // margin: "24px 16px",
        padding: "0 24px",
        minHeight: 280,
        background: "white",
      }}
    >
      {children}
    </div>
  );
  if (closeIcon !== undefined)
    return {
      label: <span>{label}</span>,
      children: rChildren,
      key: key,
      closeIcon,
    };
  return { label: <span>{label}</span>, children: rChildren, key: key };
}
export default tabFactory;
