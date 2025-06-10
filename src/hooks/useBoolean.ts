import { IUseBoolean } from '@/interfaces'
import { useCallback, useState } from 'react'

export function useBoolean(defaultValue = false): IUseBoolean {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`')
  }
  const [value, setValue] = useState(defaultValue)

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue((x) => !x)
  }, [])

  return { value, setValue, setTrue, setFalse, toggle }
}
