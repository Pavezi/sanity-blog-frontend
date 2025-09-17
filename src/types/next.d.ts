// src/types/next.d.ts
declare module "next" {
  export interface PageProps<
    TParams extends Record<string, string> = Record<string, string>,
    TSearchParams extends Record<
      string,
      string | string[] | undefined
    > = Record<string, string | string[] | undefined>
  > {
    params?: TParams;
    searchParams?: TSearchParams;
  }
}
