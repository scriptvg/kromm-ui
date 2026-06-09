"use client";

import * as React from "react";

type UseControllableStateParams<T> = {
  /** Valor controlado. Si se define, el hook es controlado y no guarda estado interno. */
  value?: T;
  /** Valor inicial cuando es no-controlado. */
  defaultValue?: T;
  /** Se llama en cada cambio, tanto en modo controlado como no-controlado. */
  onChange?: (value: T) => void;
};

/**
 * Estado controlable: soporta los dos modos (controlado por `value` /
 * no-controlado por `defaultValue`) con la misma API. Patrón equivalente al de
 * Radix; extraído como hook reutilizable (estilo `use-mobile`) para no
 * duplicarlo en cada componente compound (banner, dialog, etc.).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = React.useState<T | undefined>(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = (isControlled ? value : internalValue) as T;

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
