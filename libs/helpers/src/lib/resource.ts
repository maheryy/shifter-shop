import fetch from "node-fetch";
import { Registry } from "@shifter-shop/registry";
import { UService } from "@shifter-shop/dictionary";

export const joinResources = async <R extends T, T>(
  initialData: T[],
  resources: Resource<T, R>[]
): Promise<R[]> => {
  const res: R[] = [];

  for (const datum of initialData) {
    const extendedDatum = await extendResource(datum, resources);
    res.push(extendedDatum);
  }

  return res;
};

const fetchResource = async <T>(service: UService, resourceId: string) => {
  try {
    const res = await fetch(`${Registry.get(service).url}/${resourceId}`);
    return res.ok ? ((await res.json()) as T) : null;
  } catch (err) {
    console.error(
      `\x1b[31mError while fetching resource ${resourceId} from ${service}\x1b[0m`
    );
    return null;
  }
};

const extendResource = async <R extends T, T>(
  data: T,
  resources: Resource<T, R>[]
) => {
  const res = { ...data } as R;

  for (const resource of resources) {
    const { key, addKey } = resource;
    if (!Object.prototype.hasOwnProperty.call(res, key)) {
      continue;
    }
    const resourceId = res[key] as string;
    const resourceValue = await fetchResource<R[keyof T]>(
      resource.service,
      resourceId
    );
    res[addKey] = resourceValue!;
  }

  return res;
};

interface Resource<T, N> {
  service: UService;
  key: keyof T;
  addKey: keyof N;
}
