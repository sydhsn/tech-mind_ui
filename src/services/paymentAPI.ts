import { METHOD, PAYMENT_ACTIONS } from "@/page/constants";
import { apiGateway } from "./apiGateway";

interface SavePaymentRequest {
  courseId: string;
  userId: string;
  amount: number;
  currency: string;
}

const PaymentAPIService = apiGateway.injectEndpoints({
  endpoints: (build) => ({
    getCreateOrder: build.mutation<any, SavePaymentRequest>({
      query: (paymentData) => ({
        actionName: `${PAYMENT_ACTIONS.COURSE_PHURCHASE}/create-order`,
        methodType: METHOD.POST,
        body: paymentData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    confirmPayment: build.mutation<
      any,
      { paymentId: string; razorpayOrderId: string }
    >({
      query: ({ paymentId, razorpayOrderId }) => ({
        actionName: `${PAYMENT_ACTIONS.COURSE_PHURCHASE}/confirm`,
        methodType: METHOD.POST,
        headers: { "Content-Type": "application/json" },
        body: { paymentId, razorpayOrderId },
      }),
    }),
  }),
});

export const { useGetCreateOrderMutation, useConfirmPaymentMutation } =
  PaymentAPIService;
