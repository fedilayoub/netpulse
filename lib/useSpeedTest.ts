import { useState, useCallback } from "react";
import FastSpeedtest from "fast-speedtest-api";
// import NetworkSpeed from "network-speed"; 
//TODO: Add upload speed test
const DEFAULT_UPLOAD_SIZE = 10 * 1024 * 1024 ; // 10 MB
const UPLOAD_URL = "https://netpulse-be.onrender.com/upload-test";

type SpeedTestResult = {
  download: number | null; // Mbps
  upload: number | null; // Mbps
  timestamp: Date;
};

type UseSpeedTestReturn = {
  runSpeedTest: () => Promise<SpeedTestResult>;
  loading: boolean;
  error: string | null;
  result: SpeedTestResult | null;
};

export class SpeedTestService {
  private speedtest: any;
  // private uploadSpeed: any;

  constructor() {
    // this.uploadSpeed = new NetworkSpeed();
    this.speedtest = new FastSpeedtest({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // Default token
      verbose: true,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.Mbps,
    });
  }

  async performDownloadSpeedTest(): Promise<number> {
    try {
      const downloadSpeed = await this.speedtest.getSpeed();
      return Number(downloadSpeed.toFixed(2));
    } catch (error) {
      console.error("Download speed test failed:", error);
      throw new Error("Download speed test could not be completed");
    }
  }

  async performUploadSpeedTest(): Promise<number> {
    const data = new Uint8Array(DEFAULT_UPLOAD_SIZE).map(() => Math.floor(Math.random() * 256));
    const startTime = performance.now();

    try {
      await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: Array.from(data) }),
      });

      const duration = (performance.now() - startTime) / 1000; // Time in seconds
      const uploadSpeed = (DEFAULT_UPLOAD_SIZE * 8) / duration / 1000000; // Mbps
      return Number(uploadSpeed.toFixed(2));
    } catch (error) {
      console.error("Upload speed test failed:", error);
      throw new Error("Upload speed test could not be completed");
    }
  }

  useSpeedTest(): UseSpeedTestReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SpeedTestResult | null>(null);

    const runSpeedTest = useCallback(async (): Promise<SpeedTestResult> => {
      setLoading(true);
      setError(null);

      try {
        const downloadSpeed = await this.performDownloadSpeedTest();
        // const uploadSpeed = await this.performUploadSpeedTest();

        const speedTestResult: SpeedTestResult = {
          download: downloadSpeed,
          upload: null,
          timestamp: new Date(),
        };

        setResult(speedTestResult);
        setLoading(false);
        return speedTestResult;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Speed test failed");
        setLoading(false);
        throw err;
      }
    }, []);

    return { runSpeedTest, loading, error, result };
  }
}

export default SpeedTestService;
