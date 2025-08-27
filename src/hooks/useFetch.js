import { useEffect, useState } from "react";
import { fetchJSON } from "../api/fetchData";

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJSON(path)
      .then(json => { if (mounted) { setData(json); setError(null); } })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [path]);

  return { data, loading, error };
}
