"use client"

import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti"
import confetti from "canvas-confetti"
import type { ReactNode } from "react"
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"

import { Button } from "@/components/ui/button"

type Api = {
  fire: (options?: ConfettiOptions) => void
}

type ConfettiVariant = "default" | "pro" | "success";

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions
  globalOptions?: ConfettiGlobalOptions
  manualstart?: boolean
  children?: ReactNode
  variant?: ConfettiVariant
}

export type ConfettiRef = Api | null

const ConfettiContext = createContext<Api>({} as Api)

const getVariantDefaults = (variant?: ConfettiVariant): ConfettiOptions => {
  switch (variant) {
    case "pro":
      return {
        colors: ["#2563eb", "#9333ea", "#000000", "#ffffff"], // Blue, Purple, Black, White
        shapes: ["square", "circle"],
        particleCount: 150,
        spread: 90,
      }
    case "success":
      return {
        colors: ["#16a34a", "#2563eb", "#d97706", "#ffffff"], // Green, Blue, Amber, White
        shapes: ["circle"],
        particleCount: 120,
        spread: 70,
        gravity: 1.2,
      }
    default:
      return {
        colors: ["#2563eb", "#16a34a", "#db2777", "#9333ea", "#d97706"], // Brand mix
        shapes: ["square", "circle"],
        particleCount: 100,
        spread: 70,
      }
  }
}

// Define component first
const ConfettiComponent = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    variant,
    ...rest
  } = props
  const instanceRef = useRef<ConfettiInstance | null>(null)

  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        if (instanceRef.current) return
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        })
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset()
          instanceRef.current = null
        }
      }
    },
    [globalOptions]
  )

  const fire = useCallback(
    async (opts = {}) => {
      try {
        const variantDefaults = getVariantDefaults(variant);
        await instanceRef.current?.({ ...variantDefaults, ...options, ...opts })
      } catch (error) {
        console.error("Confetti error:", error)
      }
    },
    [options, variant]
  )

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire]
  )

  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    if (!manualstart) {
      ; (async () => {
        try {
          await fire()
        } catch (error) {
          console.error("Confetti effect error:", error)
        }
      })()
    }
  }, [manualstart, fire])

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  )
})

// Set display name immediately
ConfettiComponent.displayName = "Confetti"

// Export as Confetti
export const Confetti = ConfettiComponent

interface ConfettiButtonProps extends React.ComponentProps<"button"> {
  options?: ConfettiOptions &
  ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }
  variant?: ConfettiVariant
}

const ConfettiButtonComponent = ({
  options,
  children,
  variant,
  ...props
}: ConfettiButtonProps) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const variantDefaults = getVariantDefaults(variant);

      await confetti({
        ...variantDefaults,
        ...options,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      })
    } catch (error) {
      console.error("Confetti button error:", error)
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}

ConfettiButtonComponent.displayName = "ConfettiButton"

export const ConfettiButton = ConfettiButtonComponent
