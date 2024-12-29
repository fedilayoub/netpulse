import { useState, useCallback } from "react";
import Ping from "ping.js";

type PingTestResult = {
  latency: number | null; // in milliseconds
  timestamp: Date;
};

type UsePingTestReturn = {
  runPingTest: (url: string) => Promise<PingTestResult>;
  loading: boolean;
  error: string | null;
  result: PingTestResult | null;
};

/**
 * React Hook for measuring ping to a specific server or URL
 */
const usePingTest = (): UsePingTestReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PingTestResult | null>(null);

  const runPingTest = useCallback(async (url: string): Promise<PingTestResult> => {
    setLoading(true);
    setError(null);

    try {
      const ping = new Ping();
      const startTime = performance.now();

      await new Promise((resolve, reject) => {
        ping.ping(url, (err, latency) => {
          if (err) {
            console.log('ping error',err);
            reject(err);
          } else {
            console.log('latency',latency);
            resolve(latency);
          }
        });
      });

      const latency = performance.now() - startTime;
      const pingResult: PingTestResult = {
        latency: Number(latency.toFixed(2)),
        timestamp: new Date(),
      };

      setResult(pingResult);
      setLoading(false);
      return pingResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ping test failed");
      setLoading(false);
      throw err;
    }
  }, []);

  return { runPingTest, loading, error, result };
};

export default usePingTest;
