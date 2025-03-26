/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from "@atproto/lexicon";
import { validate as _validate } from "../../../lexicons";
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from "../../../util";

const is$typed = _is$typed,
  validate = _validate;
const id = "xyz.logplace.log";

export interface Record {
  $type: "xyz.logplace.log";
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  labels?: string[];
  [k: string]: unknown;
}

const hashRecord = "main";

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord);
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true);
}
