import { useCallback, useEffect, useState } from "react";
import axios from "axios";

if (process.env.NODE_ENV === "development")
  process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3003";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 20000,
  withCredentials: true,
});

const useRequest = (method, url, prefetchParameters = null) => {
  const [prefetchSent, setPrefetchSent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const send = useCallback(
    (...params) => {
      setLoading(true);
      return new Promise((resolve, reject) =>
        instance[method.toLowerCase()](url, ...params)
          .then(
            (res) => {
              if (res) {
                setResponse(res);
                setError(null);
                resolve(res);
              } else {
                const error = new Error("No response found");
                setResponse(null);
                setError(error);
                reject(error);
              }
            },
            (err) => {
              setResponse(null);
              setError(err);
              reject(err);
            }
          )
          .finally(() => {
            setLoading(false);
          })
      );
    },
    [method, setResponse, setError]
  );

  const clear = useCallback(() => {
    setResponse(null);
  }, [setResponse]);

  const refresh = useCallback(() => {
    send(...prefetchParameters);
  }, [prefetchParameters, send]);

  useEffect(() => {
    if (!prefetchSent && Array.isArray(prefetchParameters)) {
      setPrefetchSent(true);
      send(...prefetchParameters);
    }
  }, [prefetchSent, prefetchParameters, setPrefetchSent, send]);

  return {
    error,
    response,
    isLoading,
    send,
    clear,
    refresh,
  };
};

export default useRequest;