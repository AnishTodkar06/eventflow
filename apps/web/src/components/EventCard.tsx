interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: number;
}

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function EventCard({ title, date, location, price }: EventCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <p className="mb-1 text-gray-700 dark:text-gray-300">
        Date: <time dateTime={date}>{date}</time>
      </p>
      <p className="mb-1 text-gray-700 dark:text-gray-300">Location: {location}</p>
      <p className="text-gray-700 dark:text-gray-300">Price: {formatter.format(price)}</p>
    </div>
  );
}