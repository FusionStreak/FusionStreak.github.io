import type { Metadata } from "next";
import { BattlesnakeStats } from "@/components/battlesnake-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code2, Brain, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Battlesnake Stats - Sayfullah Eid",
  description:
    "Live statistics and information about my Battlesnake competitive programming bot",
};

export default function BattlesnakePage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Battlesnake <span className="text-primary">Statistics</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          My competitive programming snake bot built with Rust and Actix Web
        </p>
      </div>

      {/* Live Stats */}
      <div className="w-full max-w-4xl">
        <BattlesnakeStats />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">API-Based Control</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Snakes are controlled via HTTP API endpoints that respond to
                game state with strategic moves.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Strategic Algorithms</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Requires pathfinding, threat assessment, and survival strategies
                to outmaneuver opponents.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Real-Time Performance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Decisions must be made in milliseconds as the game progresses
                turn by turn.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Competitive Ladders</h4>
              </div>
              <p className="text-sm text-muted-foreground">
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
              <h4 className="font-semibold mb-2">Tech Stack</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
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
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Efficient pathfinding with collision avoidance</li>
                <li>Food targeting with health management</li>
                <li>Opponent prediction and threat assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
