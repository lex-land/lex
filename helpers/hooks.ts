export * from 'react-use';
import { useRouter } from 'next/router';

export function useQuery<T = any>(): T {
  return useRouter().query as any;
}
