import ApiLogic from "@/services/index";
import { generateResponse, type IResponse } from "@/utils/axios";

export async function login(payload: any): Promise<IResponse> {
  let response: IResponse;

  try {
    response = await ApiLogic.post(`login/auth`, payload);
  } catch (error: any) {
    response = error;
  }

  return generateResponse(response);
}

export async function validate(
  email: string,
  token: string
): Promise<IResponse> {
  let response: IResponse;

  try {
    response = await ApiLogic.post(`login/validate`, { email, token });
  } catch (error: any) {
    response = error;
  }

  return generateResponse(response);
}
