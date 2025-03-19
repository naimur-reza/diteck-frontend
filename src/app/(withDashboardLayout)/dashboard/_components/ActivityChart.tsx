import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Activity = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>
          Visual representation of platform activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ActivityChart />
        </div>
      </CardContent>
    </Card>
  );
};

// Simple activity chart component
function ActivityChart() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between px-4">
        <div className="space-x-2">
          <span className="inline-block h-3 w-3 rounded-full bg-primary"></span>
          <span className="text-xs text-muted-foreground">Applications</span>
        </div>
        <div className="space-x-2">
          <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-muted-foreground">Users</span>
        </div>
        <div className="space-x-2">
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="text-xs text-muted-foreground">Reviews</span>
        </div>
        <div className="space-x-2">
          <span className="inline-block h-3 w-3 rounded-full bg-purple-500"></span>
          <span className="text-xs text-muted-foreground">Queries</span>
        </div>
      </div>
      <div className="mt-6 flex h-[220px] items-end gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex w-full flex-col items-center gap-2">
            <div className="flex h-full w-full flex-col justify-end gap-1">
              <div
                className="w-full rounded-sm bg-blue-500"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
              <div
                className="w-full rounded-sm bg-green-500"
                style={{ height: `${Math.random() * 80}%` }}
              ></div>
              <div
                className="w-full rounded-sm bg-yellow-500"
                style={{ height: `${Math.random() * 60}%` }}
              ></div>
              <div
                className="w-full rounded-sm bg-purple-500"
                style={{ height: `${Math.random() * 40}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
