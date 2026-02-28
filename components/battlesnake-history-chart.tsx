'use client'

import { useEffect, useState } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/chart'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Percent } from 'lucide-react'

const LIMIT_OPTIONS = [25, 50, 75, 100] as const
type Limit = (typeof LIMIT_OPTIONS)[number]

// ── Types matching the API schema ──────────────────────────────────────

interface StatsHistoryRecord {
  game_id: string
  won: boolean
  is_draw: boolean
  total_turns: number
  total_food_eaten: number
  recorded_at: string
  cumulative_wins: number
  cumulative_games: number
  cumulative_win_rate: string
}

interface PaginatedStatsHistory {
  data: StatsHistoryRecord[]
  count: number
}

// ── Transformed data point for the chart ───────────────────────────────

interface ChartDataPoint {
  index: number
  winRate: number
  turns: number
  outcome: 'Win' | 'Loss' | 'Draw'
  date: string
  foodEaten: number
  gameId: string
}

// ── Chart config ───────────────────────────────────────────────────────

const chartConfig = {
  winRate: {
    label: 'Win Rate %',
    color: 'var(--color-primary)',
  },
  turns: {
    label: 'Turns',
    color: 'var(--color-muted-foreground)',
  },
} satisfies ChartConfig

// ── Custom tooltip ─────────────────────────────────────────────────────

function HistoryTooltipContent({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: ChartDataPoint }>
}) {
  if (!active || !payload?.length) return null

  const data = payload[0].payload

  const outcomeColor =
    data.outcome === 'Win'
      ? 'text-green-500'
      : data.outcome === 'Loss'
        ? 'text-red-500'
        : 'text-yellow-500'

  return (
    <div className="border-border/50 bg-background min-w-[10rem] rounded-lg border px-3 py-2 text-xs shadow-xl">
      <div className="mb-1.5 flex items-center justify-between gap-3 font-medium">
        <span>{data.date}</span>
        <span className={`font-semibold ${outcomeColor}`}>{data.outcome}</span>
      </div>
      <div className="text-muted-foreground grid gap-1">
        <div className="flex justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            Win Rate
          </span>
          <span className="text-foreground font-mono font-medium tabular-nums">
            {data.winRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--color-muted-foreground)' }}
            />
            Turns
          </span>
          <span className="text-foreground font-mono font-medium tabular-nums">
            {data.turns}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Food Eaten</span>
          <span className="text-foreground font-mono font-medium tabular-nums">
            {data.foodEaten}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────

export function BattlesnakeHistoryChart() {
  const [limit, setLimit] = useState<Limit>(25)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetch(`https://fusionsnake.sayfullaheid.me/stats/history?limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch game history')
        return res.json() as Promise<PaginatedStatsHistory>
      })
      .then((json) => {
        // API returns newest first — reverse so the chart reads left-to-right chronologically
        const sorted = [...json.data].reverse()

        const points: ChartDataPoint[] = sorted.map((record, i) => ({
          index: i + 1,
          winRate: parseFloat(record.cumulative_win_rate),
          turns: record.total_turns,
          outcome: record.is_draw ? 'Draw' : record.won ? 'Win' : 'Loss',
          date: new Date(record.recorded_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          foodEaten: record.total_food_eaten,
          gameId: record.game_id,
        }))

        setChartData(points)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [limit])

  // ── Limit selector (shown in all states) ─────────────────────────────

  const limitSelector = (
    <Tabs
      value={String(limit)}
      onValueChange={(v) => setLimit(Number(v) as Limit)}
      className="hidden sm:block"
    >
      <TabsList className="h-8">
        {LIMIT_OPTIONS.map((n) => (
          <TabsTrigger key={n} value={String(n)} className="px-2.5 text-xs">
            {n}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )

  // ── Loading state ────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Recent Games
              </CardTitle>
              <CardDescription>Loading game history...</CardDescription>
            </div>
            {limitSelector}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center">
            <div className="text-muted-foreground animate-pulse">
              Fetching data...
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // ── Error / empty state ──────────────────────────────────────────────

  if (error || !chartData.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Recent Games
              </CardTitle>
              <CardDescription>
                {error
                  ? 'Game history temporarily unavailable.'
                  : 'No game history recorded yet.'}
              </CardDescription>
            </div>
            {limitSelector}
          </div>
        </CardHeader>
      </Card>
    )
  }

  // ── Chart ────────────────────────────────────────────────────────────

  const maxTurns = Math.max(...chartData.map((d) => d.turns))

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Percent className="text-primary h-5 w-5" />
              Recent Games
            </CardTitle>
            <CardDescription>
              Last {chartData.length} games — cumulative win rate &amp; turns
              played
            </CardDescription>
          </div>
          {limitSelector}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
          >
            <defs>
              <linearGradient id="fillWinRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-winRate)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-winRate)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="index"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              hide={true}
            />

            {/* Left axis — Win Rate % */}
            <YAxis
              yAxisId="rate"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(v) => `${v}%`}
            />

            {/* Right axis — Turns */}
            <YAxis
              yAxisId="turns"
              orientation="right"
              domain={[0, Math.ceil(maxTurns * 1.1)]}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
            />

            <ChartTooltip
              content={<HistoryTooltipContent />}
              cursor={{ strokeDasharray: '4 4' }}
            />

            <Area
              yAxisId="rate"
              dataKey="winRate"
              type="monotone"
              stroke="var(--color-winRate)"
              strokeWidth={2}
              fill="url(#fillWinRate)"
              dot={false}
              activeDot={{ r: 4 }}
            />

            <Line
              yAxisId="turns"
              dataKey="turns"
              type="monotone"
              stroke="var(--color-turns)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 3 }}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
