import "storybook-chromatic";
import { addParameters, configure } from "@storybook/react";

addParameters({
  options: {
    name: "@formik-formly/formik-formly",
    url: "https://github.com/nkovacic/formik-formly",
    hierarchySeparator: "/",
    showAddonPanel: false,
  },
});

// Automatically import all files ending in *.stories.tsx
const req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
