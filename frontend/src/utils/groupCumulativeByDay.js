import dayjs from "dayjs";

export const groupCumulativeByDay = (items) => {
    // createdAt'e göre sıralayalım
    const sortedItems = [...items].sort((a, b) =>
        dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1
    );

    const grouped = {};
    let count = 0;

    sortedItems.forEach((item) => {
        const day = dayjs(item.createdAt).format("D MMM"); // örnek: 22 Apr
        count += 1;
        grouped[day] = count; // her gün toplamı güncelliyoruz
    });

    // Kümülatif doldurma: önceki günlerde veri yoksa boşluğu dolduralım
    const allDays = Object.keys(grouped);
    const result = [];

    for (let i = 0; i < allDays.length; i++) {
        const day = allDays[i];
        const value = grouped[day];
        result.push({ label: day, value });
    }

    return result;
};
