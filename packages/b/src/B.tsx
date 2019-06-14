import React from "react";
import { d } from "@formik-formly/d";

export type BProps = {};

export const B: React.FC<BProps> = ({ children }) => {
  d();
  return <div>B: {children}</div>;
};

// B.defaultProps = {};
// B.propTypes = {};
B.displayName = "B";
