/* eslint-disable @typescript-eslint/no-explicit-any */

// A decorator that does absolutely nothing.
export const NoopDecorator: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => descriptor;

export function DecorateIf(condition: boolean, decorator: MethodDecorator): MethodDecorator {
  return condition ? decorator : NoopDecorator;
}
