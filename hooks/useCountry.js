import { useEffect, useState } from "react";

export function useCountry() {
    const [countryCode, setCountryCode] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchUserCountry = async () => {
            try {
                const response = await fetch("https://api.ipify.org?format=json", {
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch IP: ${response.status}`);
                }
                const data = await response.json();
                const userIP = data.ip;

                const [codeRes, nameRes] = await Promise.all([
                    fetch(`https://ipapi.co/${userIP}/country/`, {
                        signal: abortController.signal
                    }),
                    fetch(`https://ipapi.co/${userIP}/country_name/`, {
                        signal: abortController.signal
                    }),
                ]);

                if (!codeRes.ok || !nameRes.ok) {
                    throw new Error('Failed to fetch country information');
                }

                const code = await codeRes.text();
                const name = await nameRes.text();

                setCountryCode(code);
                setCountryName(name);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCountry();

        return () => abortController.abort();
    }, []);

    return { countryCode, countryName, loading, error };
}
