import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type MutationFn<TData, TParams> = (args: {
  params?: TParams;
  signal?: AbortSignal;
}) => Promise<TData>;

export const useMutationApi = <TData = any, TParams = any>(
  apiFn: MutationFn<TData, TParams>,
  options?: UseMutationOptions<TData, any, TParams>,
) => {
  return useMutation({
    mutationFn: (params: TParams) => apiFn({ params }),
    ...options,
  });
};
