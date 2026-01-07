import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { hosts } from '@src/lib/http/hosts';
import * as Types from '@src/types';

const PATHNAME = '/v1/search';

export const geocodingApi = createApi({
  reducerPath: 'geocodingApi',
  baseQuery: fetchBaseQuery({ baseUrl: hosts.geocoding }),
  endpoints: build => ({
    getByCityName: build.query<Types.GetByCityNameResponse, string>({
      query: name => ({ url: PATHNAME, params: { name, count: 1, format: 'json', lang: 'en' } }),
    }),
  }),
});

export const { useLazyGetByCityNameQuery } = geocodingApi