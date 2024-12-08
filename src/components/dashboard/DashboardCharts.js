import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format, parseISO, startOfDay } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const DashboardCharts = () => {
  const { articles = [] } = useSelector((state) => state.news);

  // Calculating statistics
  const totalArticles = articles.length;
  const uniqueAuthors = new Set(articles.map((a) => a.author)).size;
  const uniqueSources = new Set(articles.map((a) => a.source?.name)).size;

  // Getting articles per source data
  const sourceData = articles.reduce((acc, article) => {
    const source = article.source?.name || "Unknown";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  const sourceChartData = Object.entries(sourceData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Getting articles per day data
  const articlesByDate = articles.reduce((acc, article) => {
    const date = startOfDay(parseISO(article.publishedAt));
    const dateStr = format(date, "MMM dd");
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const timelineData = Object.entries(articlesByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => parseISO(a.date) - parseISO(b.date));

  // Getting authors with most articles
  const authorData = articles.reduce((acc, article) => {
    const author = article.author || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const topAuthorsData = Object.entries(authorData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Stats Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalArticles}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueAuthors}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">News Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueSources}</div>
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Articles Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Source Distribution */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Articles by Source</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Authors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Authors</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topAuthorsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topAuthorsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
