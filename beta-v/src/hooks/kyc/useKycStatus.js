import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAuthUse } from "../user/getAuthUse";

export const useKycStatus = () => {
  const { getLoggedinuser } = getAuthUse();
  const { getaccesstoken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await getLoggedinuser(getaccesstoken);
        const kycStatus = res?.data?.user?.kyc?.status;

        setStatus(kycStatus);
        setIsApproved(kycStatus === "approved");
      } catch (err) {
        console.error("KYC check failed:", err);
        setStatus("pending");
        setIsApproved(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [getaccesstoken, getLoggedinuser]);

  return { loading, isApproved, status };
};
