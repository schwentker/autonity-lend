"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Bot, Calculator, Settings, Eye, Zap, Shield, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for at-risk positions
const atRiskPositions = [
  {
    id: "0x1234...5678",
    borrower: "0x1234567890abcdef1234567890abcdef12345678",
    collateralAsset: "NTN",
    collateralAmount: "125,000",
    collateralValue: "$150,000",
    debtAsset: "USDC",
    debtAmount: "140,000",
    healthFactor: 1.07,
    liquidationThreshold: 1.0,
    maxLiquidatable: "$70,000",
    estimatedProfit: "$3,500",
    riskLevel: "Critical",
    timeToLiquidation: "2h 15m",
  },
  {
    id: "0x2345...6789",
    borrower: "0x2345678901bcdef12345678901bcdef123456789",
    collateralAsset: "ATN",
    collateralAmount: "200,000",
    collateralValue: "$170,000",
    debtAsset: "LNTN",
    debtAmount: "140,000",
    healthFactor: 1.21,
    liquidationThreshold: 1.0,
    maxLiquidatable: "$85,000",
    estimatedProfit: "$4,250",
    riskLevel: "High",
    timeToLiquidation: "6h 45m",
  },
  {
    id: "0x3456...7890",
    borrower: "0x3456789012cdef123456789012cdef1234567890",
    collateralAsset: "LNTN",
    collateralAmount: "95,000",
    collateralValue: "$112,100",
    debtAsset: "USDC",
    debtAmount: "85,000",
    healthFactor: 1.32,
    liquidationThreshold: 1.0,
    maxLiquidatable: "$42,500",
    estimatedProfit: "$2,125",
    riskLevel: "Medium",
    timeToLiquidation: "12h 30m",
  },
]

// Mock liquidation history data
const liquidationHistoryData = [
  { time: "00:00", liquidations: 2, volume: 45000, profit: 2250 },
  { time: "04:00", liquidations: 1, volume: 25000, profit: 1250 },
  { time: "08:00", liquidations: 4, volume: 85000, profit: 4250 },
  { time: "12:00", liquidations: 3, volume: 65000, profit: 3250 },
  { time: "16:00", liquidations: 2, volume: 35000, profit: 1750 },
  { time: "20:00", liquidations: 5, volume: 125000, profit: 6250 },
  { time: "24:00", liquidations: 1, volume: 15000, profit: 750 },
]

// Mock bot performance data
const botPerformanceData = [
  { metric: "Success Rate", value: "94.2%", change: "+2.1%" },
  { metric: "Avg Profit", value: "$3,250", change: "+15.3%" },
  { metric: "Gas Efficiency", value: "87.5%", change: "+5.2%" },
  { metric: "Response Time", value: "1.2s", change: "-0.3s" },
]

export default function LiquidatePage() {
  const [botEnabled, setBotEnabled] = useState(true)
  const [autoLiquidation, setAutoLiquidation] = useState(false)
  const [minProfitThreshold, setMinProfitThreshold] = useState("1000")
  const [maxGasPrice, setMaxGasPrice] = useState("50")
  const [selectedPosition, setSelectedPosition] = useState(null)

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "High":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      default:
        return "text-green-400 bg-green-500/20 border-green-500/30"
    }
  }

  const getHealthFactorColor = (healthFactor) => {
    if (healthFactor < 1.1) return "text-red-400"
    if (healthFactor < 1.3) return "text-orange-400"
    return "text-yellow-400"
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
              <h1 className="text-2xl font-bold text-white">Liquidation Dashboard</h1>
              <p className="text-slate-400">Monitor and execute liquidations with automated bots</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              <Zap className="h-3 w-3 mr-1" />
              1s Finality
            </Badge>
            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
              Institutional
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Bot Controls & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Bot Status */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Liquidation Bot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Bot Status</Label>
                <Switch checked={botEnabled} onCheckedChange={(checked) => setBotEnabled(checked === true)} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Auto Execute</Label>
                <Switch checked={autoLiquidation} onCheckedChange={(checked) => setAutoLiquidation(checked === true)} />
              </div>
              <div className="pt-2 border-t border-slate-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Status:</span>
                  <Badge className={botEnabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                    {botEnabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          {botPerformanceData.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-400">{stat.metric}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div
                  className={`text-sm ${stat.change.startsWith("+") ? "text-green-400" : stat.change.startsWith("-") && stat.metric === "Response Time" ? "text-green-400" : "text-red-400"}`}
                >
                  {stat.change} vs last 24h
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* At-Risk Positions Table */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    At-Risk Positions
                  </CardTitle>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    {atRiskPositions.length} Positions
                  </Badge>
                </div>
                <CardDescription>Positions approaching liquidation threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atRiskPositions.map((position) => (
                    <div
                      key={position.id}
                      className="p-4 rounded-lg border border-slate-700/50 bg-slate-700/20 hover:bg-slate-700/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedPosition(position)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{position.collateralAsset}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{position.borrower.slice(0, 10)}...</div>
                            <div className="text-sm text-slate-400">
                              {position.collateralAsset} → {position.debtAsset}
                            </div>
                          </div>
                        </div>
                        <Badge className={getRiskColor(position.riskLevel)}>{position.riskLevel}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Health Factor</div>
                          <div className={`font-semibold ${getHealthFactorColor(position.healthFactor)}`}>
                            {position.healthFactor.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400">Collateral</div>
                          <div className="text-white">{position.collateralValue}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Max Liquidatable</div>
                          <div className="text-white">{position.maxLiquidatable}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Est. Profit</div>
                          <div className="text-green-400 font-semibold">{position.estimatedProfit}</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-400">
                            Time to liquidation: <span className="text-orange-400">{position.timeToLiquidation}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                              <Eye className="h-3 w-3 mr-1" />
                              Monitor
                            </Button>
                            <Button size="sm" className="h-7 text-xs bg-gradient-to-r from-blue-600 to-purple-600">
                              <Target className="h-3 w-3 mr-1" />
                              Liquidate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Liquidation Calculator */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Liquidation Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Position Address</Label>
                  <Input placeholder="0x..." className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label className="text-slate-300">Liquidation Amount</Label>
                  <Input placeholder="0.00" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Calculate Profit</Button>

                <div className="p-3 bg-slate-700/30 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Liquidation Bonus:</span>
                    <span className="text-white">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gas Cost:</span>
                    <span className="text-white">~$3.20</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-600 pt-2">
                    <span className="text-slate-400">Net Profit:</span>
                    <span className="text-green-400 font-semibold">$2,847</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bot Settings */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Bot Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Min Profit Threshold</Label>
                  <div className="relative mt-1">
                    <Input
                      value={minProfitThreshold}
                      onChange={(e) => setMinProfitThreshold(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-12"
                    />
                    <span className="absolute right-3 top-2 text-slate-400 text-sm">USD</span>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">Max Gas Price</Label>
                  <div className="relative mt-1">
                    <Input
                      value={maxGasPrice}
                      onChange={(e) => setMaxGasPrice(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-16"
                    />
                    <span className="absolute right-3 top-2 text-slate-400 text-sm">Gwei</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Update Settings
                </Button>
              </CardContent>
            </Card>

            {/* Institutional Queue */}
            <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Institutional Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-slate-300">Priority access for institutional liquidators</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Queue Position:</span>
                    <span className="text-emerald-400">#2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Est. Wait Time:</span>
                    <span className="text-white">&lt; 30s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Priority Level:</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Tier 1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liquidation History */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Liquidation History (24h)</CardTitle>
              <CardDescription>Volume and frequency of liquidations</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  liquidations: {
                    label: "Liquidations",
                    color: "rgb(59, 130, 246)",
                  },
                  volume: {
                    label: "Volume ($)",
                    color: "rgb(168, 85, 247)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={liquidationHistoryData}>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="liquidations" fill="var(--color-liquidations)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bot Performance */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Bot Performance</CardTitle>
              <CardDescription>Profit and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  profit: {
                    label: "Profit ($)",
                    color: "rgb(34, 197, 94)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liquidationHistoryData}>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Position Detail Modal */}
        {selectedPosition && (
          <Dialog open={!!selectedPosition} onOpenChange={() => setSelectedPosition(null)}>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Position Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-400">Borrower</div>
                      <div className="font-mono text-sm">{selectedPosition.borrower}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Health Factor</div>
                      <div className={`text-lg font-bold ${getHealthFactorColor(selectedPosition.healthFactor)}`}>
                        {selectedPosition.healthFactor.toFixed(3)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Risk Level</div>
                      <Badge className={getRiskColor(selectedPosition.riskLevel)}>{selectedPosition.riskLevel}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-400">Collateral</div>
                      <div>
                        {selectedPosition.collateralAmount} {selectedPosition.collateralAsset}
                      </div>
                      <div className="text-sm text-slate-500">{selectedPosition.collateralValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Debt</div>
                      <div>
                        {selectedPosition.debtAmount} {selectedPosition.debtAsset}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Estimated Profit</div>
                      <div className="text-green-400 font-semibold">{selectedPosition.estimatedProfit}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-slate-400">Liquidation Progress</div>
                  <Progress value={((2.0 - selectedPosition.healthFactor) / 1.0) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Safe (2.0+)</span>
                    <span>Liquidatable (1.0)</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedPosition(null)}>
                    Close
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Target className="h-4 w-4 mr-2" />
                    Execute Liquidation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
