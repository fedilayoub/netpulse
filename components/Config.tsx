'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Config() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-test" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Auto-run tests
        </Label>
        <Switch id="auto-test" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="test-interval" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Test Interval
        </Label>
        <Select>
          <SelectTrigger id="test-interval">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">Every 15 minutes</SelectItem>
            <SelectItem value="30">Every 30 minutes</SelectItem>
            <SelectItem value="60">Every hour</SelectItem>
            <SelectItem value="120">Every 2 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="server-location" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Server Location
        </Label>
        <Select>
          <SelectTrigger id="server-location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto (Nearest)</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

