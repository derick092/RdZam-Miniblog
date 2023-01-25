import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = _ => {
    const { search } = useLocation()

    return useMemo(_ => new URLSearchParams(search), [search])
}