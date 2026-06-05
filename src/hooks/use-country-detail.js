import { useEffect, useState } from "react";

import { fetchCountryDetail } from "@/services/countriesApi";

export function useCountryDetail(code) {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(code));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) {
      setCountry(null);
      setIsLoading(false);
      setError("No country code was provided.");
      return;
    }

    let isMounted = true;

    async function loadCountryDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const countryDetail = await fetchCountryDetail(code);

        if (isMounted) {
          setCountry(countryDetail);
        }
      } catch (currentError) {
        if (isMounted) {
          setCountry(null);
          setError(currentError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCountryDetail();

    return () => {
      isMounted = false;
    };
  }, [code]);

  return { country, isLoading, error };
}
