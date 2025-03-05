import { METHOD, PAYMENT_ACTIONS } from "@/page/constants";
import { apiGateway } from "./apiGateway";

interface SavePaymentRequest {
  courseId: string;
  userId: string;
  amount: number;
  currency: string;
}

interface SavePaymentResponse {
  success: boolean;
  message: string;
  data?: any;
}

const PaymentAPIService = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    getCreateOrder: build.mutation<SavePaymentResponse, SavePaymentRequest>({
      query: (paymentData) => {
        return {
          actionName: `${PAYMENT_ACTIONS.COURSE_PHURCHASE}/create-order`,
          methodType: METHOD.POST,
          body: paymentData,
        };
      },
    }),
    confirmPayment: build.mutation<SavePaymentResponse, { paymentId: string }>({
      query: (paymentId) => {
        return {
          actionName: `${PAYMENT_ACTIONS.COURSE_PHURCHASE}/confirm`,
          methodType: METHOD.POST,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: paymentId }) as any,
        };
      },
    }),
  }),
});

export const { useGetCreateOrderMutation, useConfirmPaymentMutation } =
  PaymentAPIService;
