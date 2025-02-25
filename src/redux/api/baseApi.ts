import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = baseApi;
