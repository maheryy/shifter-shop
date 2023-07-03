import { createContext, ReactNode, useRef, useState } from "react";
import useComponentUpdate from "@/hooks/componentUpdate";
import { useAuthContext } from "@/hooks/context";

export const DownloadContext = createContext<DownloadContextProps | null>(null);

const DownloadProvider = ({ children }: DownloadProviderProps) => {
  const [data, setData] = useState<DownloadLinkData>();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const { token } = useAuthContext();

  useComponentUpdate(() => {
    if (data) {
      ref.current?.click();
    }
  }, [data]);

  const getDownloadLink = async (
    endpoint: string,
    { data, filename, method = "GET" }: DownloadLinkProps,
  ): Promise<DownloadLinkData> => {
    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    if (method === "POST") {
      headers.append("Accept", "application/json");
    }

    const response = await fetch(endpoint, {
      method,
      headers,
      ...(method === "POST"
        ? {
            body: data ? JSON.stringify(data) : null,
          }
        : {}),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const headerFilename = response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.*)"/) as string[];

    const blob = await response.blob();

    if (blob.size === 0) {
      throw new Error("Error retrieving data for download");
    }

    return {
      href: window.URL.createObjectURL(blob),
      download: filename || (headerFilename ? headerFilename[1]! : "download"),
    };
  };

  const download = async (
    endpoint: string,
    { data, filename, method = "GET" }: DownloadLinkProps,
  ) => {
    try {
      setIsLoading(true);

      const linkData = await getDownloadLink(endpoint, {
        data,
        filename,
        method,
      });

      setData(linkData);
    } catch (error) {
      console.error(error);
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DownloadContext.Provider value={{ download, isLoading }}>
      {children}
      <a aria-hidden="true" ref={ref} tabIndex={-1} {...data} />
    </DownloadContext.Provider>
  );
};

interface DownloadLinkProps {
  data?: Record<string, unknown>;
  method?: "GET" | "POST";
  filename?: string;
}

interface DownloadLinkData {
  href: string;
  download: string;
}

interface DownloadProviderProps {
  children: ReactNode;
}

interface DownloadContextProps {
  download: (endpoint: string, options: DownloadLinkProps) => Promise<void>;
  isLoading: boolean;
}

export default DownloadProvider;
