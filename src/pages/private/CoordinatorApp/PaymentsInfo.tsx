import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Edit3,
  Save,
  X,
  Check,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  CreditCard,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { Operator } from "../../../interfaces/models.ts";
import { toast } from "sonner";
import api from "../../../utils/axiosInstance.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";

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

interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  totalPaid: number;
  totalDue: number;
  branch: string;
}

// Dummy data
const dummyStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@email.com",
    phoneNumber: "+1234567890",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9ff6f87?w=400",
    totalPaid: 800,
    totalDue: 400,
    branch: "Downtown",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@email.com",
    phoneNumber: "+1234567891",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    totalPaid: 600,
    totalDue: 600,
    branch: "Uptown",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@email.com",
    phoneNumber: "+1234567892",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    totalPaid: 1200,
    totalDue: 0,
    branch: "Downtown",
  },
];

const dummyPaymentFees: PaymentFee[] = [
  { id: "1", name: "Registration Fee", amount: 200 },
  { id: "2", name: "Theory Classes", amount: 300 },
  { id: "3", name: "Practical Lessons", amount: 500 },
  { id: "4", name: "Test Fee", amount: 100 },
  { id: "5", name: "License Processing", amount: 80 },
  { id: "6", name: "Extra Practice", amount: 150 },
];

const dummyPayments: Payment[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Alice Johnson",
    amount: 200,
    feeType: "Registration Fee",
    date: "2024-01-15",
    method: "card",
    description: "Initial registration payment",
  },
  {
    id: "2",
    studentId: "1",
    studentName: "Alice Johnson",
    amount: 300,
    feeType: "Theory Classes",
    date: "2024-01-20",
    method: "online",
  },
  {
    id: "3",
    studentId: "2",
    studentName: "Bob Smith",
    amount: 200,
    feeType: "Registration Fee",
    date: "2024-01-10",
    method: "cash",
  },
  {
    id: "4",
    studentId: "3",
    studentName: "Carol Davis",
    amount: 1200,
    feeType: "Full Course Package",
    date: "2024-01-25",
    method: "bank_transfer",
  },
];

const PaymentsInfo: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const operator = useSelector(
    (state: RootState) => state.auth.user,
  ) as Operator;
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [paymentFees, setPaymentFees] =
    useState<PaymentFee[]>(dummyPaymentFees);
  const [payments, setPayments] = useState<Payment[]>(dummyPayments);
  const [editingFee, setEditingFee] = useState<string | null>(null);
  // const [editingPayment, setEditingPayment] = useState<string | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({});
  const [newPaymentFee, setNewPaymentFee] = useState<PaymentFee>({
    id: Date.now().toString(),
    name: "",
    amount: 0,
  });

  // Search functionality
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phoneNumber.includes(searchTerm),
    );
  }, [searchTerm]);
  // Filtered payments
  const filteredPayments = useMemo(() => {
    let filtered = payments;
    if (selectedStudent) {
      filtered = filtered.filter((p) => p.studentId === selectedStudent.id);
    }
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [payments, selectedStudent]); // Payment summary calculations
  const paymentSummary = useMemo(() => {
    if (selectedStudent) {
      const studentPayments = payments.filter(
        (p) => p.studentId === selectedStudent.id,
      );
      const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
      const totalFee = paymentFees.reduce((sum, fee) => sum + fee.amount, 0);
      const pendingFee = totalFee - totalPaid;

      return { totalFee, totalPaid, pendingFee };
    }

    const totalStudents = dummyStudents.length;
    return { totalStudents };
  }, [payments, selectedStudent, paymentFees]);

  const getAllStudents = useCallback(async () => {
    try {
      const response = await api.post("/operator/get-all-students", {
        schoolId: operator?.schoolId,
      });
      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error("Error fetching students:", error);
    }
  }, []);

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

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);
  // Handlers
  const handleFeeEdit = (feeId: string, value: any) => {
    const paymentFee = paymentFees.find((fee) => fee.id === feeId);
    if (!paymentFee) return;
    if (value < 0) {
      toast.error("Amount cannot be negative");
      return;
    }
    setNewPaymentFee({
      ...paymentFee,
      amount: value,
    });
    setPaymentFees((prev) =>
      prev.map((fee) => (fee.id === feeId ? { ...fee, amount: value } : fee)),
    );
  };

  // const handleDeleteFee = (feeId: string) => {
  //   setPaymentFees(prev => prev.filter(fee => fee.id !== feeId));
  //   toast.success("Fee deleted successfully");
  // };

  const handleAddPayment = async () => {
    if (!selectedStudent || !newPayment.amount || !newPayment.feeType) {
      toast.error("Please fill all required fields");
      return;
    }

    const payment: Payment = {
      id: Date.now().toString(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      amount: Number(newPayment.amount),
      feeType: newPayment.feeType!,
      date: newPayment.date || new Date().toISOString().split("T")[0],
      method: (newPayment.method as Payment["method"]) || "cash",
      description: newPayment.description,
    };

    const res = window.confirm(
      `Are you sure you want to add this payment of ${payment.amount} Rs for ${payment.feeType}?`,
    );

    if (!res) return;

    const paymentRes = await api.post("/payment/create-payment-history", {
      feeType: payment.feeType,
      amount: payment.amount,
      userId: payment.studentId,
      paymentMethod: payment.method,
      description: payment.description,
      Date: payment.date,
    });

    if (!paymentRes.data.success) {
      toast.error("failed to add payment");
      return;
    }

    setPayments((prev) => [...prev, payment]);
    setNewPayment({});
    setShowAddPayment(false);
    toast.success("Payment added successfully");
  };

  // const handleEditPayment = (paymentId: string, field: string, value: any) => {
  //   setPayments(prev => prev.map(payment =>
  //     payment.id === paymentId ? { ...payment, [field]: value } : payment
  //   ));
  // };

  // const handleDeletePayment = (paymentId: string) => {
  //   setPayments(prev => prev.filter(p => p.id !== paymentId));
  //   toast.success("Payment deleted successfully");
  // };

  const handleSave = async (fee: PaymentFee) => {
    try {
      const res = window.confirm("Are you sure you want to save this fee? ");
      if (!res) {
        getPaymentFees(selectedStudent?.id || "");
        return;
      }
      if (!selectedStudent) return;

      if (newPaymentFee.amount < 0) {
        toast.error("Amount cannot be negative");
        return;
      }

      let courseFee = 0;
      let licenseFee = 0;
      let extraFee = 0;

      if (fee.name === "Course Fee") {
        courseFee = newPaymentFee.amount;
      } else if (fee.name === "License Fee") {
        licenseFee = newPaymentFee.amount;
      } else if (fee.name === "Extra Fee") {
        extraFee = newPaymentFee.amount;
      }

      const response = await api.post("/users/set-amount", {
        userId: selectedStudent?.id,
        courseFee,
        licenseFee,
        extraFee,
      });

      if (response.data.success) {
        setPaymentFees((prev) =>
          prev.map((f) =>
            f.id === fee.id ? { ...f, amount: newPaymentFee.amount } : f,
          ),
        );
        toast.success("Fee updated successfully");
      } else {
        toast.error("Failed to update fee");
      }
    } catch (error) {
      console.error("Error saving fee:", error);
      toast.error("Failed to save fee");
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payments Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student payments, fees, and financial records for your
            driving school
          </p>
        </div>
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            {selectedStudent && (
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Selection
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchTerm && !selectedStudent && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredStudents.length > 0 ? (
                <div className="space-y-2">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student);
                        getPaymentHistory(student.id);
                        getPaymentFees(student.id);
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {student.email} • {student.phoneNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          Paid: &#8377;{student.totalPaid || 0}
                        </p>
                        {student.totalDue > 0 && (
                          <p className="text-sm font-medium text-red-600">
                            Due: &#8377;{student.totalDue}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No students found matching your search
                </p>
              )}
            </div>
          )}

          {/* Selected Student */}
          {selectedStudent && (
            <div className="mt-4 p-4 bg-main/10 dark:bg-main/20 rounded-lg border border-main/20">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedStudent.email} • {selectedStudent.branch}
                  </p>
                </div>
                {/* <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    Total Paid: &#8377;{selectedStudent.totalPaid || 0}
                  </p>
                  {selectedStudent.totalDue > 0 && (
                    <p className="text-sm font-medium text-red-600">
                      Amount Due: &#8377;{selectedStudent.totalDue}
                    </p>
                  )}
                </div> */}
              </div>
            </div>
          )}
        </div>{" "}
        {/* Payments Summary */}
        {selectedStudent ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-main to-mainLight rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Receipt className="w-6 h-6" />
                </div>
                <DollarSign className="w-6 h-6 opacity-80" />
              </div>
              <h3 className="text-2xl font-bold mb-1">
                Rs. {paymentSummary.totalFee?.toLocaleString() || 0}
              </h3>
              <p className="text-white/80 text-sm">Total Fee</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Check className="w-6 h-6" />
                </div>
                <TrendingUp className="w-6 h-6 opacity-80" />
              </div>
              <h3 className="text-2xl font-bold mb-1">
                Rs. {paymentSummary.totalPaid?.toLocaleString() || 0}
              </h3>
              <p className="text-white/80 text-sm">Amount Paid</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <Calendar className="w-6 h-6 opacity-80" />
              </div>
              <h3 className="text-2xl font-bold mb-1">
                Rs. {paymentSummary.pendingFee?.toLocaleString() || 0}
              </h3>
              <p className="text-white/80 text-sm">Pending Fee</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* Payment Summary Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Summary
            </h2>
            {/* <button
              disabled={!selectedStudent}
              onClick={() => {
                const newFee: PaymentFee = {
                  id: Date.now().toString(),
                  name: "New Fee",
                  amount: 0
                };
                setPaymentFees(prev => [...prev, newFee]);
                setEditingFee(newFee.id);
              }}
              className="px-4 py-2 bg-main text-white rounded-lg hover:bg-mainDark transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Fee
            </button> */}
          </div>
          {selectedStudent && (
            <div className="space-y-3">
              {paymentFees.map((fee, index) => (
                <div
                  key={fee.id}
                  className="flex mx-6 items-center justify-between py-0.5 px-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-6 h-6 rounded-full bg-main/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-main">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {fee.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      {editingFee === fee.id ? (
                        <input
                          type="number"
                          value={fee.amount}
                          onChange={(e) =>
                            handleFeeEdit(fee.id, Number(e.target.value))
                          }
                          className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-main focus:outline-none w-24 text-right"
                          placeholder="0"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          ₹{fee.amount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {editingFee === fee.id ? (
                        <>
                          <button
                            onClick={() => {
                              setEditingFee(null);
                              handleSave(fee);
                            }}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          {!(
                            fee.name === "Course Fee" ||
                            fee.name === "License Fee"
                          ) && (
                            <button
                              onClick={() => setEditingFee(fee.id)}
                              className="p-2 text-gray-400 hover:text-main rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                          {/* <button
                              onClick={() => handleDeleteFee(fee.id)}
                              className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Section */}
          {selectedStudent && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-main flex items-center justify-center">
                    <Receipt className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount
                  </h3>
                </div>
                <span className="text-xl font-bold text-main">
                  Rs.{" "}
                  {paymentFees.reduce((total, fee) => total + fee.amount, 0)}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transaction History
              {selectedStudent && (
                <span className="text-base font-normal text-gray-600 dark:text-gray-400 ml-2">
                  for {selectedStudent.name}
                </span>
              )}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              {selectedStudent && (
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="px-4 py-2 bg-main text-white rounded-lg hover:bg-mainDark transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add Payment
                </button>
              )}
            </div>
          </div>

          {/* Add Payment Modal */}
          {showAddPayment && selectedStudent && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Payment for {selectedStudent.name}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddPayment(false);
                      setNewPayment({});
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fee Type
                    </label>
                    <select
                      value={newPayment.feeType || ""}
                      onChange={(e) => {
                        const fee = paymentFees.find(
                          (f) => f.name === e.target.value,
                        );
                        setNewPayment((prev) => ({
                          ...prev,
                          feeType: e.target.value,
                          amount: fee?.amount || prev.amount,
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select fee type</option>
                      {paymentFees.map((fee) => (
                        <option key={fee.id} value={fee.name}>
                          {fee.name}
                        </option>
                      ))}
                      {/* <option value="Other">Other</option> */}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount (&#8377;)
                    </label>
                    <input
                      type="number"
                      value={newPayment.amount || ""}
                      onChange={(e) =>
                        setNewPayment((prev) => ({
                          ...prev,
                          amount: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={newPayment.method || "cash"}
                      onChange={(e) =>
                        setNewPayment((prev) => ({
                          ...prev,
                          method: e.target.value as Payment["method"],
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="online">Online</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={
                        newPayment.date ||
                        new Date().toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        setNewPayment((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={newPayment.description || ""}
                      onChange={(e) =>
                        setNewPayment((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={2}
                      placeholder="Add payment description..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddPayment}
                    className="flex-1 px-4 py-2 bg-main text-white rounded-lg hover:bg-mainDark transition-colors"
                  >
                    Add Payment
                  </button>
                  <button
                    onClick={() => {
                      setShowAddPayment(false);
                      setNewPayment({});
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payments Table */}
          <div className="overflow-x-auto">
            {selectedStudent ? (
              filteredPayments.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Fee Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Method
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Date
                      </th>
                      {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      >
                        <td className="py-4 px-4">
                          <span className="text-gray-900 dark:text-white">
                            {payment.feeType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ₹{payment.amount}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            {getMethodIcon(payment.method)}
                            <span className="capitalize">
                              {payment.method.replace("_", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        {/* <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {editingPayment === payment.id ? (
                              <button
                                onClick={() => setEditingPayment(null)}
                                className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingPayment(payment.id)}
                                className="p-1 text-gray-400 hover:text-main rounded"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeletePayment(payment.id)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                    No payment records found
                  </p>
                  <p className="text-gray-400 dark:text-gray-500">
                    No payment records for {selectedStudent.name}
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                  Select a student to view transaction history
                </p>
                <p className="text-gray-400 dark:text-gray-500">
                  Use the search bar above to find and select a student
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsInfo;
