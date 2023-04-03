import { ReactNode, createContext, useRef, useState } from "react";
import useComponentUpdate from "../hooks/componentUpdate";

export const DownloadContext = createContext<DownloadContextProps>(null!);

const DownloadProvider = ({ children }: DownloadProviderProps) => {
  const [data, setData] = useState<DownloadLinkData>();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useComponentUpdate(() => {
    if (data) {
      ref.current?.click();
    }
  }, [data]);

  const getDownloadLink = async (
    endpoint: string,
    { data, filename, method = "GET" }: DownloadLinkProps
  ): Promise<DownloadLinkData> => {
    const response = await fetch(endpoint, {
      method,
      ...(method === "POST"
        ? {
            headers: { "Content-Type": "application/json" },
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
      throw new Error(
        "Erreur lors de la récupération des données à télécharger"
      );
    }

    return {
      href: window.URL.createObjectURL(blob),
      download: filename || (headerFilename ? headerFilename[1] : "download"),
    };
  };

  const download = async (
    endpoint: string,
    { data, filename, method = "GET" }: DownloadLinkProps
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
      <a aria-hidden="true" tabIndex={-1} ref={ref} {...data} />
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
  download: (enpoint: string, options: DownloadLinkProps) => Promise<void>;
  isLoading: boolean;
}

export default DownloadProvider;
