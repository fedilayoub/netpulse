"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SpeedTestService } from "@/lib/useSpeedTest"
import { ArrowDown, ArrowUp, Play } from "lucide-react"
import { useEffect, useState } from "react"
import Spinner from "./ui/spinner"

export default function SpeedTest() {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null)
  // const [uploadSpeedResult, setUploadSpeedResult] = useState<number | null>(
  //   null
  // )
  const speedTestService = new SpeedTestService()
  const { runSpeedTest, loading, error, result } =
    speedTestService.useSpeedTest()

  useEffect(() => {
    if (result) {
      console.log("result", result)
      setDownloadSpeed(result.download)
      // setUploadSpeedResult(result.upload)
    }
  }, [result])

  return (
    <div className="space-y-4">
      <Button onClick={runSpeedTest} disabled={loading} className="w-full">
        {loading ? "Running Test..." : "Start Speed Test"}
        <Play className="w-4 h-4 ml-2" />
      </Button>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <ArrowDown className="w-8 h-8 mb-2 text-blue-500" />
            <p className="text-sm text-gray-400">Download</p>
            {loading ? (
              <Spinner />
            ) : (
              <p className="text-xl font-bold">
                {downloadSpeed ? `${downloadSpeed.toFixed(2)} Mbps` : "0 Mbps"}
              </p>
            )}
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <ArrowUp className="w-8 h-8 mb-2 text-green-500" />
            <p className="text-sm text-gray-400">Upload</p>
            {loading ? (
              <Spinner />
            ) : (
              <p className="text-xl font-bold">
              {uploadSpeedResult
                ? `${uploadSpeedResult.toFixed(2)} Mbps`
                : "--"}
            </p>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
