import { ReadonlyURLSearchParams } from "next/navigation";

export const defaultDate = (
  params: ReadonlyURLSearchParams,
  param: string
): Date => {
  const currentDate = new Date();
  if (params.get(param)) {
    const storedDate = new Date(params.get(param) as string);
    if (storedDate > currentDate) {
      return storedDate;
    }
  }
  return param === "checkIn"
    ? currentDate
    : new Date(currentDate.setDate(currentDate.getDate() + 1));
};

export const defaultDateSSR = (
  param: 'checkIn' | 'checkOut',
  searchParam: string | undefined
) => {
  const currentDate = new Date();
  if (searchParam) {
    const storedDate = new Date(searchParam);
    if (storedDate > currentDate) {
      return storedDate;
    }
  }
  return param === "checkIn"
    ? currentDate
    : new Date(currentDate.setDate(currentDate.getDate() + 1));
};
