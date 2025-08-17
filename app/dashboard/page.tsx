"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Zap,
  Shield,
  Target,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"

// Mock data for interest rates chart
const interestRatesData = [
  { time: "00:00", supply: 4.2, borrow: 6.8 },
  { time: "04:00", supply: 4.5, borrow: 7.1 },
  { time: "08:00", supply: 4.3, borrow: 6.9 },
  { time: "12:00", supply: 4.7, borrow: 7.3 },
  { time: "16:00", supply: 4.4, borrow: 7.0 },
  { time: "20:00", supply: 4.6, borrow: 7.2 },
  { time: "24:00", supply: 4.8, borrow: 7.4 },
]

// Mock positions data
const positions = [
  { asset: "ATN", supplied: "125,000", borrowed: "0", apy: "4.8%", type: "supply" },
  { asset: "NTN", supplied: "0", borrowed: "50,000", apy: "7.2%", type: "borrow" },
  { asset: "LNTN", supplied: "75,000", borrowed: "0", apy: "5.1%", type: "supply" },
  { asset: "USDC", supplied: "250,000", borrowed: "100,000", apy: "3.9%", type: "both" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            <span className="font-montserrat font-bold text-xl">AutonityLend</span>
          </div>

          <nav className="space-y-2">
            <Button
              variant="secondary"
              className="w-full justify-start bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Link href="/lend" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              >
                <TrendingUp className="mr-3 h-4 w-4" />
                Lend
              </Button>
            </Link>
            <Link href="/borrow" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              >
                <TrendingDown className="mr-3 h-4 w-4" />
                Borrow
              </Button>
            </Link>
            <Link href="/liquidate" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              >
                <Target className="mr-3 h-4 w-4" />
                Liquidate
              </Button>
            </Link>
            <Link href="/portfolio" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              >
                <PieChart className="mr-3 h-4 w-4" />
                Portfolio
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-montserrat font-bold text-3xl mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your lending and borrowing positions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>

        {/* Token Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">ATN Balance</CardTitle>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                  Staking: 6.2%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">1,250,000 ATN</div>
              <div className="text-sm text-muted-foreground">≈ $125,000 USD</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">NTN Balance</CardTitle>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                  Staking: 8.1%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">850,000 NTN</div>
              <div className="text-sm text-muted-foreground">≈ $85,000 USD</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">LNTN Balance</CardTitle>
                <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-400">
                  Staking: 5.7%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">500,000 LNTN</div>
              <div className="text-sm text-muted-foreground">≈ $50,000 USD</div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                Total Supplied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">$450,000</div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                +12.5% this month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                Total Borrowed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">$150,000</div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                +5.2% this month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
                Available Liquidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">$2.1M</div>
              <div className="text-sm text-muted-foreground">Across all pools</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Shield className="mr-2 h-4 w-4 text-purple-500" />
                Health Factor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">2.85</div>
              <div className="text-sm text-green-500">Safe</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Positions */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-montserrat font-bold">Current Positions</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positions.map((position, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{position.asset}</span>
                        </div>
                        <div>
                          <div className="font-medium">{position.asset}</div>
                          <div className="text-sm text-muted-foreground">
                            {position.type === "supply" && "Supply Only"}
                            {position.type === "borrow" && "Borrow Only"}
                            {position.type === "both" && "Supply & Borrow"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-4">
                          {position.supplied !== "0" && (
                            <div>
                              <div className="text-sm text-muted-foreground">Supplied</div>
                              <div className="font-medium text-green-500">{position.supplied}</div>
                            </div>
                          )}
                          {position.borrowed !== "0" && (
                            <div>
                              <div className="text-sm text-muted-foreground">Borrowed</div>
                              <div className="font-medium text-red-500">{position.borrowed}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-sm text-muted-foreground">APY</div>
                            <div className="font-medium">{position.apy}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interest Rates Chart & Quick Actions */}
          <div className="space-y-6">
            {/* Interest Rates Chart */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-lg">Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    supply: {
                      label: "Supply APY",
                      color: "rgb(34, 197, 94)",
                    },
                    borrow: {
                      label: "Borrow APY",
                      color: "rgb(239, 68, 68)",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={interestRatesData}>
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="supply" stroke="var(--color-supply)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="borrow" stroke="var(--color-borrow)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/lend">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Supply Assets
                  </Button>
                </Link>
                <Link href="/borrow">
                  <Button
                    variant="outline"
                    className="w-full border-purple-600/50 text-purple-400 hover:bg-purple-600/20 bg-transparent"
                  >
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Borrow Assets
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-border/50 hover:bg-background/50 bg-transparent">
                  <Zap className="mr-2 h-4 w-4" />
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
