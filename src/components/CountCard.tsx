import Link from "next/link";
import React from "react";

const CountCard = ({
  title,
  count,
  color,
  path,
  queryParams,
}: {
  title: string;
  count: number;
  color: string;
  path: string;
  queryParams?: any;
}) => {
  return (
    <Link
      className="flex flex-col gap-5 p-5 border border-gray-300 items-center justify-center"
      href={{ pathname: path, query: queryParams }}
    >
      <h1 className="text-xl font-semibold text-gray-600">{title}</h1>
      <h1 className={`text-7xl font-semibold ${color}`}>{count}</h1>
    </Link>
  );
};

export default CountCard;
