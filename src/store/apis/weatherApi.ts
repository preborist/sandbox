import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { hosts } from '@src/lib/http/hosts';
import * as Types from '@src/types';

const PATHNAME = '/v1/forecast';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: hosts.weather }),
  endpoints: build => ({
    getByCoordinates: build.query<Types.GetByCoordinatesResponse, Types.GetByCoordinatesRequest>({
      query: props => ({ url: PATHNAME, params: { ...props } }),
    }),
  }),
});

export const { useLazyGetByCoordinatesQuery } = weatherApi