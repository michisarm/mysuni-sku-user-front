import { useEffect } from "react";
import { requestPisAgreement } from "../service/requestPisAgreement";

export function useRequestPisAgreement() {
  useEffect(() => {
    // TODO :: 현재 하드코딩 => 변경 예정
    const agreementFormId = '20210622-1';
    const serviceId = 'SUNI';
    requestPisAgreement(agreementFormId, serviceId);
  }, []);
}