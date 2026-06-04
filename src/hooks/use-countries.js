import { useEffect, useState } from "react";

import { fetchCountryPreviews } from "@/services/countriesApi";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      try {
        const countryList = await fetchCountryPreviews();

        if (isMounted) {
          setCountries(countryList);
          setError(null);
        }
      } catch (currentError) {
        if (isMounted) {
          setError(currentError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  return { countries, isLoading, error };
}
