import type { Metadata } from 'next'
import { BattlesnakeStats } from '@/components/battlesnake-stats'
import { BattlesnakeHistoryChart } from '@/components/battlesnake-history-chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Code2, Brain, Zap, Shield } from 'lucide-react'
import BattlesnakeEasterEgg from '@/components/battlesnake-easter-egg'

export const metadata: Metadata = {
  title: 'Battlesnake Stats - Sayfullah Eid',
  description:
    'Live statistics and information about my Battlesnake competitive programming bot',
}

export default function BattlesnakePage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Hidden Easter Egg listener: Konami code opens a dialog with a Pixel Snake mini-game */}
      <BattlesnakeEasterEgg />
      {/* Header Section */}
      <div className="max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Battlesnake <span className="text-primary">Statistics</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          My competitive programming snake bot built with Rust and Actix Web
        </p>
      </div>

      {/* Live Stats */}
      <div className="w-full max-w-4xl">
        <BattlesnakeStats />
      </div>

      {/* Game History Chart */}
      <div className="w-full max-w-4xl">
        <BattlesnakeHistoryChart />
      </div>

      {/* About Battlesnake */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>What is Battlesnake?</CardTitle>
          <CardDescription>
            A competitive multiplayer programming game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Battlesnake is a competitive programming game where developers build
            web-based AIs to compete against each other in a snake-themed arena.
            Each snake must navigate the board, avoid collisions, and outlast
            opponents while managing health through food consumption.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code2 className="text-primary h-5 w-5" />
                <h4 className="font-semibold">API-Based Control</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Snakes are controlled via HTTP API endpoints that respond to
                game state with strategic moves.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="text-primary h-5 w-5" />
                <h4 className="font-semibold">Strategic Algorithms</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Requires pathfinding, threat assessment, and survival strategies
                to outmaneuver opponents.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <h4 className="font-semibold">Real-Time Performance</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Decisions must be made in milliseconds as the game progresses
                turn by turn.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="text-primary h-5 w-5" />
                <h4 className="font-semibold">Competitive Ladders</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Compete in ranked matches across multiple game modes and climb
                global leaderboards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>My Implementation</CardTitle>
          <CardDescription>
            Built for performance and reliability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="mb-2 font-semibold">Tech Stack</h4>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                <li>
                  <strong className="text-foreground">Rust</strong> - For
                  blazing-fast execution and memory safety
                </li>
                <li>
                  <strong className="text-foreground">Actix</strong> - Modern
                  async web framework for handling game API requests
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Key Features</h4>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                <li>Efficient pathfinding with collision avoidance</li>
                <li>Food targeting with health management</li>
                <li>Opponent prediction and threat assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
