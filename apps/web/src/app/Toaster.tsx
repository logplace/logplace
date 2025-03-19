"use client";

import { Toaster as SonnerToaster, toast } from "sonner";
import {
  useSearchParams,
  useRouter,
  usePathname,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import {
  TOAST_SEARCH_PARAM,
  TOAST_TYPE_SEARCH_PARAM,
  ToastType,
} from "@/utils/toast";

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
