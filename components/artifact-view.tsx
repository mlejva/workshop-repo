import { type ExecutionError, Result } from '@e2b/code-interpreter'
import Image from 'next/image'
import { Terminal } from 'lucide-react'

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert'

function LogsOutput({ stdout, stderr }: {
  stdout: string[]
  stderr: string[]
}) {
  if (stdout.length === 0 && stderr.length === 0) return null

  return (
    <div className="w-full h-32 max-h-32 overflow-y-auto flex flex-col items-start justify-start space-y-1 p-4 bg-[#F5F5F5] rounded">
      {stdout && stdout.length > 0 && stdout.map((out: string, index: number) => (
        <pre key={index} className="text-xs">
          {out}
        </pre>
      ))}
      {stderr && stderr.length > 0 && stderr.map((err: string, index: number) => (
        <pre key={index} className="text-xs text-red-500">
          {err}
        </pre>
      ))}
    </div>
  )
}

export interface CodeExecResult {
  stdout: string[]
  stderr: string[]
  runtimeError?: ExecutionError
  cellResults: Result[]
}

export function ArtifactView({
  result,
}: {
  result?: CodeExecResult
}) {
  if (!result) return null
  console.log('result', result)
  const { cellResults, stdout, stderr, runtimeError } = result

  // The AI-generated code experienced runtime error
  if (runtimeError) {
    const { name, value, tracebackRaw } = runtimeError
    // TODO: Render error message
    return null
  }

  // Cell results can contain text, pdfs, images, and code (html, latex, json)
  // TODO: Show all results
  // TODO: Check other formats than `png`
  if (cellResults.length > 0) {
    const imgInBase64 = cellResults[0].png
    // TODO: Render image
    return null
  }

  // No cell results, but there is stdout or stderr
  if (stdout.length > 0 || stderr.length > 0) {
    // TODO: Render logs
    return null
  }

  return (
    <span>No output or logs</span>
  )
}