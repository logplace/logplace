export const TOAST_SEARCH_PARAM = "toast";
export const TOAST_TYPE_SEARCH_PARAM = "toast_type";

// must be value in: https://github.com/emilkowalski/sonner/blob/main/src/state.ts
export type ToastType = "success" | "info" | "warning" | "error";

export function encodeToastSearchParams(
  message: string,
  toastType: ToastType | undefined
): string {
  const enc = encodeURIComponent;
  let res = `${TOAST_SEARCH_PARAM}=${enc(message)}`;
  if (toastType) {
    res += `&${TOAST_TYPE_SEARCH_PARAM}=${enc(toastType)}`;
  }
  return res;
}
