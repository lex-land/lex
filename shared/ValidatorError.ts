import { ValidationError } from 'class-validator';

export interface ValidationResponse {
  error?: string;
  message?: ValidationError[];
}

export function createValidationResponse(property: string, message: string) {
  return {
    property,
    constraints: { [`${property}Error`]: message },
    children: [],
  };
}

export function createValidationError(obj: { [key: string]: string }) {
  return {
    error: 'ValidationError',
    message: Object.keys(obj).map(prop =>
      createValidationResponse(prop, obj[prop]),
    ),
  };
}
