import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type QueryFn<TData, TParams> = (args: { params?: TParams; signal?: AbortSignal }) => Promise<TData>;
type QueryOptions<TData> = Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;

export const useQueryApi = <TData = any, TParams = any>(
  queryKey: any[],
  apiFn: QueryFn<TData, TParams>,
  params?: TParams,
  options?: QueryOptions<TData>,
) => {
  return useQuery({
    queryKey: [...queryKey, params], // 👈 dynamic key
    queryFn: ({ signal }) => apiFn({ params, signal }),
    ...options,
  });
};
