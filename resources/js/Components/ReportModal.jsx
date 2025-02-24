import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function ReportModal({ postId, onClose }) {
    const [reason, setReason] = useState("");
    const reportOptions = [
        "ปัญหาที่เกี่ยวข้องกับบุคคลที่อายุต่ำกว่า 18 ปี",
        "การกลั่นแกล้ง การคุกคาม หรือการใช้งานที่ไม่เหมาะสม",
        "การฆ่าตัวตายหรือการทำร้ายตนเอง",
        "เนื้อหารุนแรง แสดงความเกลียดชัง หรือรบกวนจิตใจ",
        "ขายหรือโปรโมทสินค้าที่ถูกจำกัด",
        "เนื้อหาสำหรับผู้ใหญ่",
        "การหลอกลวง การฉ้อโกง หรือข้อมูลเท็จ",
        "ฉันไม่ต้องการเห็นสิ่งนี้"
    ];

    const handleSubmit = () => {
        if (!reason) {
            alert("กรุณาเลือกเหตุผลในการรายงาน");
            return;
        }
        router.post(route("report.store"), { post_id: postId, reason }, {
            onSuccess: () => {
                alert("การรายงานของคุณถูกส่งเรียบร้อยแล้ว");
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">รายงาน</h2>
                <p className="text-sm text-gray-600 mb-4">
                    หากมีคนตกอยู่ในอันตรายเร่งด่วน โปรดขอความช่วยเหลือก่อนรายงานให้ Facebook ทราบ อย่ารอช้า
                </p>
                <div className="space-y-2">
                    {reportOptions.map((option, index) => (
                        <label key={index} className="block p-2 border rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                                type="radio"
                                name="report_reason"
                                value={option}
                                onChange={(e) => setReason(e.target.value)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">ยกเลิก</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded-lg">ส่งรายงาน</button>
                </div>
            </div>
        </div>
    );
}