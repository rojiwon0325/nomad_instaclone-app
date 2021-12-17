import { useEffect, useState } from "react";


export default function useDateCalc(date: string): string {
    const [result, setResult] = useState("");
    useEffect(() => {
        const now = new Date(Date.now());
        const time = new Date(parseInt(date));
        const month = now.getMonth() - time.getMonth();
        const day = now.getDate() - time.getDate();
        const hour = now.getHours() - time.getHours();
        const minute = now.getMinutes() - time.getMinutes();
        const seconds = now.getSeconds() - time.getSeconds();

        if (month > 1) {
            setResult(time.toLocaleDateString("ko-KR", { year: "numeric", month: "numeric", day: "numeric" }));
        } else if (month === 1) {
            if (day >= 0) {
                setResult(month + "달 전");
            } else {
                setResult((day + 30) + "일 전");
            }

        } else if (day > 1) {
            if (hour >= 0) {
                setResult(day + "일 전");
            } else {
                setResult((day - 1) + "일 전");
            }
        } else if (day === 1) {
            if (hour >= 0) {
                setResult(day + "일 전");
            } else {
                setResult((hour + 60) + "시간 전");
            }

        } else if (hour > 1) {
            if (minute >= 0) {
                setResult(hour + "시간 전");
            } else {
                setResult((hour - 1) + "시간 전");
            }
        } else if (hour === 1) {
            if (minute >= 0) {
                setResult(hour + "시간 전");
            } else {
                setResult((minute + 60) + "분 전");
            }
        } else if (minute > 1) {
            if (seconds >= 0) {
                setResult(minute + "분 전");
            } else {
                setResult((minute - 1) + "분 전");
            }
        } else if (minute === 1 && seconds >= 0) {
            setResult(minute + "분 전");
        } else {
            setResult("방금전");
        }
    }, []);

    return result;
}