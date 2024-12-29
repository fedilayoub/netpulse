'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Gauge, Settings } from 'lucide-react'
import SpeedTest from '@/components/SpeedTest'
import PingTest from '@/components/PingTest'
import Config from '@/components/Config'
import '@/assets/styles.css'
export default function Popup() {
  return (
    <div className="w-[400px] p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">NetPulse</h1>
      <Tabs defaultValue="speed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="speed">
            <Gauge className="w-4 h-4 mr-2" />
            Speed
          </TabsTrigger>
          <TabsTrigger value="ping">
            <Activity className="w-4 h-4 mr-2" />
            Ping
          </TabsTrigger>
          {/* <TabsTrigger value="config">
            <Settings className="w-4 h-4 mr-2" />
            Config
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="speed">
          <SpeedTest />
        </TabsContent>
        <TabsContent value="ping">
          <PingTest />
        </TabsContent>
        {/* <TabsContent value="config">
          <Config />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

