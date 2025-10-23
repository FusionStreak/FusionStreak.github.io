"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "./CountUp";

interface BattlesnakeStats {
  average_turns: string;
  draws: number;
  last_played: string | null;
  longest_game: number;
  losses: number;
  shortest_game: number;
  total_games: number;
  total_turns: number;
  win_rate: string;
  wins: number;
}

export function BattlesnakeStats() {
  const [stats, setStats] = useState<BattlesnakeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fusionsnake.sayfullaheid.me/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

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
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-muted-foreground">
              Fetching data...
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
          <p className="text-sm text-muted-foreground">
            Stats temporarily unavailable. Check out my Battlesnake profiles:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/profile/fusionstreak"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/leaderboard/standard/fusionstreak/stats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Standard Stats
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://play.battlesnake.com/leaderboard/standard-duels/fusionstreak/stats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Target className="h-4 w-4 mr-2" />
                Duels Stats
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const winRate = parseFloat(stats.win_rate);
  const hasPlayed = stats.total_games > 0;

  return (
    <Card className="w-full bg-gradient-to-br from-background to-muted/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Battlesnake Stats
            </CardTitle>
            <CardDescription>
              Live stats from my competitive bot snake, since October 2025.
            </CardDescription>
          </div>
          <Badge variant={hasPlayed ? "default" : "secondary"}>
            {hasPlayed ? "Active" : "No Games Yet"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
            <div className="text-xs text-muted-foreground">
              <CountUp
                from={0}
                to={stats.wins}
                duration={1}
                className="inline"
              />
              W /{" "}
              <CountUp
                from={0}
                to={stats.losses}
                duration={1}
                className="inline"
              />
              L /{" "}
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
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
            <div className="text-xs text-muted-foreground">
              <CountUp
                from={0}
                to={stats.total_turns}
                separator=","
                duration={1}
                className="inline"
              />{" "}
              turns
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
            <div className="text-xs text-muted-foreground">per game</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Longest Game</span>
            </div>
            <div className="text-2xl font-bold">
              <CountUp
                from={0}
                to={stats.longest_game}
                separator=","
                duration={1.5}
              />{" "}
              <span className="text-sm text-muted-foreground">turns</span>
            </div>
            <div className="text-xs text-muted-foreground">
              shortest:{" "}
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

        {/* Last Played */}
        {stats.last_played && (
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
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
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://play.battlesnake.com/leaderboard/standard/fusionstreak/stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Standard
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://play.battlesnake.com/leaderboard/standard-duels/fusionstreak/stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Swords className="h-4 w-4 mr-2" />
              Duels
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://docs.battlesnake.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookText className="h-4 w-4 mr-2" />
              Learn More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
