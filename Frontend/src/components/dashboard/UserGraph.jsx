const UserGraph = () => {
  const data = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 500 },
    { name: "Thu", value: 200 },
    { name: "Fri", value: 600 },
    { name: "Sat", value: 700 },
    { name: "Sun", value: 450 },
  ];

  return (
    <div className="bg-[#0e0d0d] rounded-xl p-4 h-96 w-full flex flex-col">
      <h2 className="text-white text-3xl mb-4">Portfolio Value</h2>

      {/* chart wrapper */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
