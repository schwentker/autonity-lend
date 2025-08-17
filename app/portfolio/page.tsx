"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  TrendingUp,
  Download,
  FileText,
  Shield,
  Target,
  Zap,
  AlertTriangle,
  BarChart3,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Cell, PieChart as RechartsPieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock portfolio data
const portfolioOverview = {
  totalValue: "$685,000",
  totalSupplied: "$450,000",
  totalBorrowed: "$150,000",
  netWorth: "$535,000",
  totalEarned: "$12,450",
  healthFactor: 2.85,
  utilizationRate: 33.3,
}

// Mock P&L data
const plData = [
  { date: "2024-01", supply: 2100, borrow: -850, staking: 1200, total: 2450 },
  { date: "2024-02", supply: 2350, borrow: -920, staking: 1350, total: 2780 },
  { date: "2024-03", supply: 2180, borrow: -780, staking: 1180, total: 2580 },
  { date: "2024-04", supply: 2420, borrow: -1100, staking: 1420, total: 2740 },
  { date: "2024-05", supply: 2650, borrow: -1250, staking: 1580, total: 2980 },
  { date: "2024-06", supply: 2890, borrow: -1180, staking: 1650, total: 3360 },
]

// Mock positions data
const positions = [
  {
    asset: "ATN",
    type: "Supply",
    amount: "125,000",
    value: "$125,000",
    apy: "4.8%",
    earned: "$2,450",
    risk: "Low",
    healthContribution: 0.45,
  },
  {
    asset: "NTN",
    type: "Borrow",
    amount: "50,000",
    value: "$50,000",
    apy: "7.2%",
    cost: "$1,200",
    risk: "Medium",
    healthContribution: -0.18,
  },
  {
    asset: "LNTN",
    type: "Supply + Staking",
    amount: "75,000",
    value: "$87,500",
    apy: "5.1% + 8.2%",
    earned: "$4,850",
    risk: "Low",
    healthContribution: 0.32,
    stakingRewards: "$2,100",
  },
  {
    asset: "USDC",
    type: "Supply",
    amount: "250,000",
    value: "$250,000",
    apy: "3.9%",
    earned: "$3,250",
    risk: "Very Low",
    healthContribution: 0.28,
  },
]

// Mock staking data
const stakingPositions = [
  {
    validator: "Validator Alpha",
    stakedAmount: "45,000 LNTN",
    rewards: "$1,250",
    apy: "8.2%",
    risk: "A+",
    uptime: "99.8%",
    commission: "5%",
  },
  {
    validator: "Validator Beta",
    stakedAmount: "30,000 LNTN",
    rewards: "$850",
    apy: "8.1%",
    risk: "A",
    uptime: "99.5%",
    commission: "7%",
  },
]

// Mock yield farming opportunities
const yieldOpportunities = [
  {
    protocol: "AutonityLend LP",
    pair: "ATN/USDC",
    apy: "12.5%",
    tvl: "$2.1M",
    risk: "Medium",
    rewards: "ATN + LNTN",
  },
  {
    protocol: "Autonity Staking",
    pair: "LNTN Delegation",
    apy: "8.2%",
    tvl: "$15.2M",
    risk: "Low",
    rewards: "LNTN",
  },
  {
    protocol: "RWA Vault",
    pair: "Treasury Bills",
    apy: "4.8%",
    tvl: "$5.8M",
    risk: "Very Low",
    rewards: "USDC",
  },
]

// Mock risk metrics
const riskMetrics = {
  portfolioRisk: "Medium",
  concentrationRisk: "Low",
  liquidationRisk: "Very Low",
  smartContractRisk: "Low",
  validatorRisk: "Low",
}

// Asset allocation data for pie chart
const allocationData = [
  { name: "ATN", value: 125000, color: "#3B82F6" },
  { name: "LNTN", value: 87500, color: "#8B5CF6" },
  { name: "USDC", value: 250000, color: "#10B981" },
  { name: "NTN (Borrowed)", value: -50000, color: "#EF4444" },
]

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState("6M")
  const [selectedMetric, setSelectedMetric] = useState("total")

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Very Low":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "Low":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "High":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "Critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-slate-400 bg-slate-500/20 border-slate-500/30"
    }
  }

  const getHealthFactorColor = (healthFactor) => {
    if (healthFactor >= 2.0) return "text-green-400"
    if (healthFactor >= 1.5) return "text-yellow-400"
    if (healthFactor >= 1.2) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
              <p className="text-slate-400">Comprehensive view of your positions and performance</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-24 bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent border-slate-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              <Shield className="h-3 w-3 mr-1" />
              Institutional
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{portfolioOverview.totalValue}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">+8.2% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{portfolioOverview.netWorth}</div>
              <div className="text-sm text-slate-400">
                Supplied: {portfolioOverview.totalSupplied} | Borrowed: {portfolioOverview.totalBorrowed}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm">Total Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-2">{portfolioOverview.totalEarned}</div>
              <div className="text-sm text-slate-400">Supply + Staking rewards</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm">Health Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-2 ${getHealthFactorColor(portfolioOverview.healthFactor)}`}>
                {portfolioOverview.healthFactor}
              </div>
              <div className="text-sm text-green-400">Safe</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* P&L Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Profit & Loss Tracking</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={selectedMetric === "total" ? "default" : "outline"}
                      onClick={() => setSelectedMetric("total")}
                      className="h-8 text-xs"
                    >
                      Total
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedMetric === "supply" ? "default" : "outline"}
                      onClick={() => setSelectedMetric("supply")}
                      className="h-8 text-xs"
                    >
                      Supply
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedMetric === "staking" ? "default" : "outline"}
                      onClick={() => setSelectedMetric("staking")}
                      className="h-8 text-xs"
                    >
                      Staking
                    </Button>
                  </div>
                </div>
                <CardDescription>Monthly earnings breakdown across all positions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    total: { label: "Total P&L", color: "rgb(34, 197, 94)" },
                    supply: { label: "Supply Earnings", color: "rgb(59, 130, 246)" },
                    borrow: { label: "Borrow Costs", color: "rgb(239, 68, 68)" },
                    staking: { label: "Staking Rewards", color: "rgb(168, 85, 247)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={plData}>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke={`var(--color-${selectedMetric})`}
                        fill={`var(--color-${selectedMetric})`}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Asset Allocation */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Asset Allocation</CardTitle>
              <CardDescription>Portfolio distribution by asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <RechartsPieChart width={200} height={200}>
                  <RechartsPieChart data={allocationData.filter((item) => item.value > 0)}>
                    {allocationData
                      .filter((item) => item.value > 0)
                      .map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </div>
              <div className="space-y-2 mt-4">
                {allocationData
                  .filter((item) => item.value > 0)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-white">${(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Positions */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Current Positions</CardTitle>
            <CardDescription>Detailed view of all active positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-slate-700/50 bg-slate-700/20 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{position.asset}</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{position.asset}</div>
                        <div className="text-sm text-slate-400">{position.type}</div>
                      </div>
                    </div>
                    <Badge className={getRiskColor(position.risk)}>{position.risk}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Amount</div>
                      <div className="text-white font-medium">{position.amount}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Value</div>
                      <div className="text-white font-medium">{position.value}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">APY</div>
                      <div className="text-white font-medium">{position.apy}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">{position.type.includes("Borrow") ? "Cost" : "Earned"}</div>
                      <div
                        className={`font-medium ${position.type.includes("Borrow") ? "text-red-400" : "text-green-400"}`}
                      >
                        {position.earned || position.cost}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Health Impact</div>
                      <div
                        className={`font-medium ${position.healthContribution > 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {position.healthContribution > 0 ? "+" : ""}
                        {position.healthContribution}
                      </div>
                    </div>
                  </div>

                  {position.stakingRewards && (
                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Staking Rewards:</span>
                        <span className="text-purple-400 font-medium">{position.stakingRewards}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LNTN Staking Integration */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                LNTN Staking Positions
              </CardTitle>
              <CardDescription>Validator-specific risk analysis and rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stakingPositions.map((stake, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-white">{stake.validator}</div>
                    <Badge className={getRiskColor(stake.risk === "A+" ? "Low" : "Medium")}>Risk: {stake.risk}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Staked</div>
                      <div className="text-white">{stake.stakedAmount}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Rewards</div>
                      <div className="text-purple-400">{stake.rewards}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">APY</div>
                      <div className="text-white">{stake.apy}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Uptime</div>
                      <div className="text-green-400">{stake.uptime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Risk Analysis
              </CardTitle>
              <CardDescription>Comprehensive risk assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(riskMetrics).map(([key, value], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <Badge className={getRiskColor(value)}>{value}</Badge>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <div className="text-sm text-slate-400 mb-2">Utilization Rate</div>
                <Progress value={portfolioOverview.utilizationRate} className="h-2 mb-1" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span className="text-white">{portfolioOverview.utilizationRate}%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yield Farming Opportunities */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              Yield Farming Opportunities
            </CardTitle>
            <CardDescription>Discover new earning opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yieldOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 rounded-lg border border-slate-700/50 bg-slate-700/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-white">{opportunity.protocol}</div>
                    <Badge className={getRiskColor(opportunity.risk)}>{opportunity.risk}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pair:</span>
                      <span className="text-white">{opportunity.pair}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">APY:</span>
                      <span className="text-green-400 font-semibold">{opportunity.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">TVL:</span>
                      <span className="text-white">{opportunity.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rewards:</span>
                      <span className="text-purple-400">{opportunity.rewards}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600">
                    Participate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Institutional Reporting */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-400" />
              Institutional Reporting
            </CardTitle>
            <CardDescription>Compliance and audit-ready reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="bg-transparent border-slate-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Tax Report
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-700 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance Report
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Risk Assessment
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Monthly Statement
              </Button>
            </div>
            <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="text-sm text-slate-300">
                All reports are generated in real-time and include detailed transaction history, yield calculations, and
                risk metrics for regulatory compliance.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
