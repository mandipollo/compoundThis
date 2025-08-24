// types/ApiResponse.type.ts
export interface ApiSuccess<T> {
	success: true;
	data: T;
}

export interface ApiErrorResponse {
	success: false;
	error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorResponse;
