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

export const ValidatorError = (obj: { [key: string]: string }) => {
  return {
    error: 'ValidatorError',
    message: Object.keys(obj).map(prop =>
      createValidationResponse(prop, obj[prop]),
    ),
  };
};
