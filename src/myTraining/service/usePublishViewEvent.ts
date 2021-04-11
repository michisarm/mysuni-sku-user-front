import { useEffect } from "react";
import { ActionEventService } from "../../shared/stores";

export function usePublishViewEvent(menu: string) {
  useEffect(() => {
    ActionEventService.instance.registerViewActionLog({ menu });
  }, []);
}