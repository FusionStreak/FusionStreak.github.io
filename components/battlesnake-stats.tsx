'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ExternalLink,
  Activity,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  BookText,
  Crown,
  Swords,
  Apple,
  Cherry,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CountUp from './CountUp'

interface BattlesnakeStats {
  average_food_eaten: string
  average_turns: string
  draws: number
  last_played: string | null
  longest_game: number
  losses: number
  shortest_game: number
  total_food_eaten: number
  total_games: number
  total_turns: number
  win_rate: string
  wins: number
}

export function BattlesnakeStats() {
  const [stats, setStats] = useState<BattlesnakeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://fusionsnake.sayfullaheid.me/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stats')
        return res.json()
      })
      .then((data) => {
        setStats(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Battlesnake Stats
          </CardTitle>
          <CardDescription>Loading live statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <div className="text-muted-foreground animate-pulse">
              Fetching data...
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stats) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Battlesnake Stats
          </CardTitle>
          <CardDescription>
            My competitive programming snake bot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Stats temporarily unavailable. Check out my Battlesnake profiles:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/profile/fusionstreak"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/leaderboard/standard/fusionstreak/stats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Standard Stats
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/leaderboard/standard-duels/fusionstreak/stats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Target className="mr-2 h-4 w-4" />
                Duels Stats
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const winRate = parseFloat(stats.win_rate)
  const hasPlayed = stats.total_games > 0

  return (
    <Card className="from-background to-muted/20 w-full bg-gradient-to-br">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-primary h-5 w-5" />
              Battlesnake Stats
            </CardTitle>
            <CardDescription>
              Live stats from my competitive bot snake, since October 2025.
            </CardDescription>
          </div>
          <Badge variant={hasPlayed ? 'default' : 'secondary'}>
            {hasPlayed ? 'Active' : 'No Games Yet'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Crown className="h-3 w-3" />
              <span>Win Rate</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={winRate}
                duration={1.5}
                className="inline"
              />
              %
            </div>
            <div className="text-muted-foreground text-xs">
              <CountUp
                from={0}
                to={stats.wins}
                duration={1}
                className="inline"
              />
              W /{' '}
              <CountUp
                from={0}
                to={stats.losses}
                duration={1}
                className="inline"
              />
              L /{' '}
              <CountUp
                from={0}
                to={stats.draws}
                duration={1}
                className="inline"
              />
              D
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span>Total Games</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={stats.total_games}
                separator=","
                duration={1.5}
              />
            </div>
            <div className="text-muted-foreground text-xs">
              <CountUp
                from={0}
                to={stats.total_turns}
                separator=","
                duration={1}
                className="inline"
              />{' '}
              turns
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>Avg Turns</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={parseFloat(stats.average_turns)}
                duration={1.5}
              />
            </div>
            <div className="text-muted-foreground text-xs">per game</div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>Longest Game</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={stats.longest_game}
                separator=","
                duration={1.5}
              />{' '}
              <span className="text-muted-foreground text-sm">turns</span>
            </div>
            <div className="text-muted-foreground text-xs">
              shortest:{' '}
              <CountUp
                from={0}
                to={stats.shortest_game}
                separator=","
                duration={1}
                className="inline"
              />
            </div>
          </div>
        </div>

        {/* Food Stats Grid */}
        <div className="grid grid-cols-2 gap-4 border-t pt-2">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Apple className="h-3 w-3" />
              <span>Total Food Eaten</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={stats.total_food_eaten}
                separator=","
                duration={1.5}
              />
            </div>
            <div className="text-muted-foreground text-xs">all time</div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Cherry className="h-3 w-3" />
              <span>Avg Food Per Game</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={parseFloat(stats.average_food_eaten)}
                duration={1.5}
              />
            </div>
            <div className="text-muted-foreground text-xs">per game</div>
          </div>
        </div>

        {/* Last Played */}
        {stats.last_played && (
          <div className="text-muted-foreground border-t pt-2 text-center text-xs">
            Last played: {new Date(stats.last_played).toLocaleDateString()}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://play.battlesnake.com/profile/fusionstreak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://play.battlesnake.com/leaderboard/standard/fusionstreak/stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Standard
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://play.battlesnake.com/leaderboard/standard-duels/fusionstreak/stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Swords className="mr-2 h-4 w-4" />
              Duels
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://docs.battlesnake.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookText className="mr-2 h-4 w-4" />
              Learn More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
