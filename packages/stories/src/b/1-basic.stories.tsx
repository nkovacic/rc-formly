import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import * as React from "react";
import { d } from "@formik-formly/d";
import { B } from "@formik-formly/b";

storiesOf("@formik-formly/b/1. Basic", module).add(
  "first",
  withInfo({ inline: false })(() => {
    return <B>{d()}</B>;
  })
);
