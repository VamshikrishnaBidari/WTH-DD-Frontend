import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  DollarSign,
  Calendar,
  CreditCard,
  Receipt,
  TrendingUp,
  Check,
  AlertCircle,
} from "lucide-react";
import { User as UserType } from "../../../interfaces/models.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";
import api from "../../../utils/axiosInstance.ts";
import { toast } from "sonner";

// Types
interface PaymentFee {
  id: string;
  name: string;
  amount: number;
}

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  feeType: string;
  date: string;
  method: "cash" | "card" | "online" | "bank_transfer";
  description?: string;
}

// Dummy data for user-specific payments
const dummyPaymentFees: PaymentFee[] = [
  { id: "1", name: "Registration Fee", amount: 200 },
  { id: "2", name: "Theory Classes", amount: 300 },
  { id: "3", name: "Practical Lessons", amount: 500 },
  { id: "4", name: "Test Fee", amount: 100 },
  { id: "5", name: "License Processing", amount: 80 },
  { id: "6", name: "Extra Practice", amount: 150 },
];

const dummyUserPayments: Payment[] = [
  {
    id: "1",
    studentId: "user123",
    studentName: "Current User",
    amount: 200,
    feeType: "Registration Fee",
    date: "2024-01-15",
    method: "card",
    description: "Initial registration payment",
  },
  {
    id: "2",
    studentId: "user123",
    studentName: "Current User",
    amount: 300,
    feeType: "Theory Classes",
    date: "2024-01-20",
    method: "online",
    description: "Theory classes payment",
  },
  {
    id: "3",
    studentId: "user123",
    studentName: "Current User",
    amount: 250,
    feeType: "Practical Lessons",
    date: "2024-02-10",
    method: "card",
    description: "Partial payment for practical lessons",
  },
];

const Payments: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) as UserType;
  const [paymentFees, setPaymentFees] =
    useState<PaymentFee[]>(dummyPaymentFees);
  const [payments, setPayments] = useState<Payment[]>(dummyUserPayments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserPayments = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        // console.log("Fetching payments for user:", user.id);
        await getPaymentHistory(user.id);
        await getPaymentFees(user.id);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPayments();
  }, [user?.id]);

  const getPaymentHistory = useCallback(async (studentId: string) => {
    try {
      const response = await api.post("/payment/get-payment-history", {
        userId: studentId,
      });
      if (response.data.success) {
        const data = response.data.data;
        setPayments(
          data.map((payment: any) => ({
            id: payment.id,
            studentId: payment.userId,
            studentName: payment.user.name,
            amount: payment.amount,
            feeType: payment.feeType,
            date: payment.Date,
            method: payment.paymentMethod as Payment["method"],
            description: payment.description,
          })),
        );
      } else {
        toast.error("Failed to fetch payment history");
      }
    } catch (error) {
      toast.error("Error fetching payment history");
      console.error("Error fetching payment history:", error);
    }
  }, []);

  const getPaymentFees = useCallback(async (studentId: string) => {
    try {
      const response = await api.post("/users/fetch-amount", {
        userId: studentId,
      });
      if (response.data.success) {
        const data = response.data.data;
        setPaymentFees([
          {
            id: "1",
            name: "Course Fee",
            amount: data.courseFee || 0,
          },
          {
            id: "2",
            name: "License Fee",
            amount: data.licenseFee || 0,
          },
          {
            id: "3",
            name: "Extra Fee",
            amount: data.extraFee || 0,
          },
        ]);
      } else {
        toast.error("Failed to fetch payment fees");
      }
    } catch (error) {
      toast.error("Error fetching payment fees");
      console.error("Error fetching payment fees:", error);
    }
  }, []);

  // Calculate payment summary
  const paymentSummary = useMemo(() => {
    const totalPaid = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );
    const totalFee = paymentFees.reduce((sum, fee) => sum + fee.amount, 0);
    const pendingFee = totalFee - totalPaid;

    return { totalFee, totalPaid, pendingFee };
  }, [payments, paymentFees]);

  // Sort payments by date (newest first)
  const sortedPayments = useMemo(() => {
    return [...payments].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [payments]);

  const getMethodIcon = (method: Payment["method"]) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "cash":
        return <DollarSign className="w-4 h-4" />;
      case "online":
        return <Receipt className="w-4 h-4" />;
      case "bank_transfer":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getMethodBadgeColor = (method: Payment["method"]) => {
    switch (method) {
      case "card":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200";
      case "cash":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200";
      case "online":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200";
      case "bank_transfer":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200";
      default:
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading payment information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your payment history and fee summary for your driving course
          </p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Fee Card */}
          <div className="bg-gradient-to-br from-main to-mainLight rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Receipt className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm font-medium">Course Fee</p>
                <p className="text-xs text-white/60">Total Amount</p>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">
                Rs. {paymentSummary.totalFee.toLocaleString()}
              </h3>
              <p className="text-white/80 text-sm">Total Fee</p>
            </div>
          </div>

          {/* Amount Paid Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Check className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm font-medium">Paid</p>
                <p className="text-xs text-white/60">
                  {(
                    (paymentSummary.totalPaid / paymentSummary.totalFee) *
                    100
                  ).toFixed(0)}
                  % Complete
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">
                Rs. {paymentSummary.totalPaid.toLocaleString()}
              </h3>
              <p className="text-white/80 text-sm">Amount Paid</p>
            </div>
          </div>

          {/* Pending Fee Card */}
          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm font-medium">Pending</p>
                <p className="text-xs text-white/60">
                  {paymentSummary.pendingFee > 0 ? "Payment Due" : "Fully Paid"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">
                Rs. {Math.max(0, paymentSummary.pendingFee).toLocaleString()}
              </h3>
              <p className="text-white/80 text-sm">Pending Fee</p>
            </div>
          </div>
        </div>

        {/* Payment Progress Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Payment Progress
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {(
                (paymentSummary.totalPaid / paymentSummary.totalFee) *
                100
              ).toFixed(1)}
              % Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-main to-mainLight h-3 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.min((paymentSummary.totalPaid / paymentSummary.totalFee) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Rs. 0</span>
            <span>Rs. {paymentSummary.totalFee.toLocaleString()}</span>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction History
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>
                {sortedPayments.length} transaction
                {sortedPayments.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Payments List */}
          {sortedPayments.length > 0 ? (
            <div className="space-y-4">
              {sortedPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-main/10 dark:bg-main/20 rounded-lg">
                      {getMethodIcon(payment.method)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {payment.feeType}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodBadgeColor(payment.method)}`}
                        >
                          {payment.method.replace("_", " ").toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(payment.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {payment.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {payment.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Rs. {payment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No payment records found
              </p>
              <p className="text-gray-400 dark:text-gray-500">
                Your payment history will appear here once you make your first
                payment
              </p>
            </div>
          )}
        </div>

        {/* Payment Information Card */}
        <div className="mt-8 bg-gradient-to-r from-main/10 to-mainLight/10 dark:from-main/20 dark:to-mainLight/20 rounded-xl p-6 border border-main/20">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-main/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-main" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Payment Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  • Payments can be made through cash, card, online transfer, or
                  bank transfer
                </p>
                <p>
                  • Contact your coordinator for payment assistance or to update
                  payment information
                </p>
                {paymentSummary.pendingFee > 0 && (
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    • You have a pending payment of Rs.{" "}
                    {paymentSummary.pendingFee.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
