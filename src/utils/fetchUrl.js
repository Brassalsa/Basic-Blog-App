"use client";

import useSWR from "swr";
import fetcher from "./fetcher";

export default function useFetchUrl(url) {
  return useSWR(url, fetcher);
}
