import dayjs from "dayjs";

export const groupCumulativeByDay = (items) => {
    if (!items || items.length === 0) return [];

    // createdAt'e göre sıralama
    const sortedItems = [...items].sort((a, b) =>
        dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1
    );

    const grouped = {};
    let count = 0;

    sortedItems.forEach((item) => {
        const day = dayjs(item.createdAt).format("D MMM"); // Örnek: "22 Apr"
        count += 1;
        grouped[day] = count;
    });

    const result = Object.entries(grouped).map(([label, value]) => ({
        label,
        value,
    }));

    return result;
};
