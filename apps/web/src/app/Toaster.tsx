"use client";

import { Toaster as SonnerToaster, toast } from "sonner";
import {
  useSearchParams,
  useRouter,
  usePathname,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect } from "react";

const TOAST_SEARCH_PARAM = "toast";
const TOAST_TYPE_SEARCH_PARAM = "toast_type";

// must be value in: https://github.com/emilkowalski/sonner/blob/main/src/state.ts
type ToastType = "success" | "info" | "warning" | "error";

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

export function Toaster() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getToastSearchParams = (
    searchParams: ReadonlyURLSearchParams
  ): [string | null, ToastType | null, URLSearchParams] => {
    const toastMsg = searchParams.get(TOAST_SEARCH_PARAM);
    const type = searchParams.get(TOAST_TYPE_SEARCH_PARAM) as ToastType | null;
    const decodedToastMsg = toastMsg ? decodeURIComponent(toastMsg) : null;
    const editableSearchParams = new URLSearchParams(searchParams.toString());
    editableSearchParams.delete(TOAST_SEARCH_PARAM);
    editableSearchParams.delete(TOAST_TYPE_SEARCH_PARAM);
    return [decodedToastMsg, type, editableSearchParams];
  };

  useEffect(() => {
    const [toastMsg, type, updatedSearchParams] =
      getToastSearchParams(searchParams);
    if (toastMsg) {
      const toastFunc = type ? toast[type] : toast;
      toastFunc(toastMsg);
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    }
  }, [searchParams, pathname, router]);

  return <SonnerToaster richColors />;
}
