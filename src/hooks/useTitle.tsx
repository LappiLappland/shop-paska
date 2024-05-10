import { useEffect } from "react";

export default function useTitle(title: string | undefined) {
  useEffect(() => {
    const prevTitle = document.title;

    return () => {
      document.title = prevTitle;
    }
  }, []);
  
  useEffect(() => {
    if (title) document.title = title;
  }, [title])
}