import { useEffect } from "react";
import { requestProfile } from "../service/requestProfile";

export function useRequestProfile() {
  useEffect(() => {
    requestProfile();
  }, []);
}