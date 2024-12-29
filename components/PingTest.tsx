"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import usePingTest from "@/lib/usePingTest"
import { Activity } from "lucide-react"
import { useState, useEffect } from "react"
import Spinner from "./ui/spinner"

export default function PingTest() {
  const [pingResult, setPingResult] = useState<number | null>(null)

  const { runPingTest, loading, error, result } = usePingTest()
  
  useEffect(() => {
    if (result) {
      console.log("result", result)
      setPingResult(result.latency)
    }
  }, [result])
  

  return (
    <div className="space-y-4">
      <Button
        onClick={() => runPingTest("https://google.com")}
        disabled={loading}
        className="w-full">
        {loading ? "Testing Ping..." : "Start Ping Test"}
        <Activity className="w-4 h-4 ml-2" />
      </Button>
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <Activity className="w-12 h-12 mb-2 text-purple-500" />
          <p className="text-sm text-gray-400">Ping</p>
          {loading ? (
            <Spinner /> 
          ) : (
            <p className="text-3xl font-bold">
              {pingResult ? `${pingResult.toFixed(2)} ms` : "0 ms"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
