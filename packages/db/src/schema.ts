import * as log from "./schema/log";
import * as label from "./schema/label";
import * as logLabelRecord from "./schema/logLabelRecord";

export const schema = {
  ...log,
  ...label,
  ...logLabelRecord,
};
