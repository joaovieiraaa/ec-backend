import { APILogic, ApiResponse } from "@/axios";
import { generateResponse } from "@/helpers";

export async function active(context: string, id: number, payload: any) {
  let response = new ApiResponse();

  try {
    response = await APILogic.patch(`/api/${context}/${id}`, {
      field: payload.field,
      value: !payload.value,
    });
  } catch (errors: any) {
    response = errors.response;
  }

  return generateResponse(response);
}

export async function destroy(
  context: string,
  contextParameter: any,
  id: number
) {
  let response = new ApiResponse();

  try {
    response = await APILogic.delete(
      `/api/${context}/${id}${contextParameter}`
    );
  } catch (errors: any) {
    response = errors.response;
  }

  return generateResponse(response);
}
