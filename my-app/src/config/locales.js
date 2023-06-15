import { GlobalRegistry } from "@designable/core";
import cnLocales from "../locales/cn";
import enLocales from "../locales/en";
GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: cnLocales,
  },
  "en-US": {
    sources: enLocales,
  },
});
