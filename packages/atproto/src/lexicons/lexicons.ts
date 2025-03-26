/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from "@atproto/lexicon";
import { type $Typed, is$typed, maybe$typed } from "./util";

export const schemaDict = {
  XyzLogplaceLog: {
    lexicon: 1,
    id: "xyz.logplace.log",
    defs: {
      main: {
        type: "record",
        description: "Log record",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "createdAt"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 64,
            },
            description: {
              type: "string",
              maxLength: 1024,
            },
            createdAt: {
              type: "string",
              format: "datetime",
            },
            updatedAt: {
              type: "string",
              format: "datetime",
            },
            labels: {
              type: "array",
              items: {
                type: "string",
                minLength: 1,
              },
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>;
export const schemas = Object.values(schemaDict) satisfies LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true
): ValidationResult<T>;
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false
): ValidationResult<T>;
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === "main" ? id : `${id}#${hash}`}" $type property`
        ),
      };
}

export const ids = {
  XyzLogplaceLog: "xyz.logplace.log",
} as const;
