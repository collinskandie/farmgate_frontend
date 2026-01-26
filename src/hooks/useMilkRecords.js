import { useEffect, useState } from "react";
import API from "services/Api";
import dayjs from "dayjs";

const useMilkRecords = (selectedDate) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);

        const params = selectedDate
          ? `?date=${dayjs(selectedDate).format("YYYY-MM-DD")}`
          : "";

        const res = await API(`production/milk-records/${params}`, "GET");
        const raw = res.data;
        const recordsArray = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
            ? raw.data
            : [];

        setRecords(recordsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedDate]);


  const safeRecords = Array.isArray(records) ? records : [];

  const total = safeRecords.reduce(
    (sum, r) => sum + Number(r?.quantity_in_liters || 0),
    0
  );


  const weeklyMap = {};
  records.forEach(r => {
    const day = dayjs(r.date).format("ddd");
    weeklyMap[day] = (weeklyMap[day] || 0) + Number(r.quantity_in_liters);
  });

  const weeklySeries = [{
    name: "Milk (Litres)",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
      d => Number((weeklyMap[d] || 0).toFixed(2))
    ),
  }];

  const milkingCows = new Set(records.map(r => r.cow)).size;
  const avgPerCow = milkingCows
    ? Number((total / milkingCows).toFixed(1))
    : 0;

  return {
    records,
    loading,
    total,
    weeklySeries,
    milkingCows,
    avgPerCow,
  };
};

export default useMilkRecords;
