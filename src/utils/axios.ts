export interface IResponse {
  data: { [key: string]: any };
  errors: string[][];
  hasErrors: boolean;
  status: number;
}

export function generateResponse(event: any) {
  const responseData = event.data ?? event.request.response ?? null;
  const errorMessages = event.data?.errors?.message ?? event.code ?? null;
  const hasErrors =
    event.response?.status > 204 ||
    !!event.data?.errors ||
    event.request?.status === 0;
  const status = event.status ?? event.code ?? null;

  return {
    data: responseData,
    errors: Array.isArray(errorMessages) ? errorMessages : [errorMessages],
    hasErrors: hasErrors,
    status: status,
  };
}
