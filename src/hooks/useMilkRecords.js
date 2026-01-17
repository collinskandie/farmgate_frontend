import { useEffect, useState } from "react";
import API from "services/Api";
import dayjs from "dayjs";

const useMilkRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // const userDetails = localStorage.getItem("userDetails");
        // const userAccount = userDetails ? JSON.parse(userDetails).account : null;

        // if (!userAccount) return;
        setLoading(true);
        const res = await API(`production/milk-records/`, "GET");
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const today = dayjs().format("YYYY-MM-DD");

  const todayRecords = records.filter(r => r.date === today);

  const totalToday = todayRecords.reduce(
    (sum, r) => sum + Number(r.quantity_in_liters),
    0
  );

  const weeklyMap = {};
  records.forEach(r => {
    const day = dayjs(r.date).format("ddd");
    weeklyMap[day] = (weeklyMap[day] || 0) + Number(r.quantity_in_liters);
  });

  const weeklySeries = [{
    name: "Milk (Litres)",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => weeklyMap[d] || 0),
  }];

  const milkingCows = new Set(records.map(r => r.cow)).size;
  const avgPerCow = milkingCows ? (totalToday / milkingCows).toFixed(1) : 0;

  return {
    records,
    loading,
    totalToday,
    weeklySeries,
    milkingCows,
    avgPerCow,
  };
};

export default useMilkRecords;
