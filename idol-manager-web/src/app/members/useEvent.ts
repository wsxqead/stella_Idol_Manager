import { useEffect, useState } from "react";
import { fanEvents } from "@/lib/constants";

export function useEvent() {
  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
      });
    }, 60000); // 1분마다 월이 증가

    return () => clearInterval(interval);
  }, []);

  const triggerFanEvent = () => {
    const randomEvent = fanEvents[Math.floor(Math.random() * fanEvents.length)];
    setEventMessage(randomEvent.message);
    setTimeout(() => setEventMessage(null), 3000);
  };

  return {
    eventMessage,
    currentDate,
    triggerFanEvent,
  };
}
