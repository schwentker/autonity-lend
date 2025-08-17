"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  TrendingUp,
  Bell,
  Settings,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function MobilePage() {
  const [showBalances, setShowBalances] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(true)
  const [liquidationAlerts, setLiquidationAlerts] = useState(true)

  const portfolioData = {
    totalSupplied: "$125,430",
    totalBorrowed: "$89,250",
    netWorth: "$36,180",
    healthFactor: "2.45",
    apy: "8.2%",
  }

  const positions = [
    { asset: "ATN", type: "Supply", amount: "$45,230", apy: "6.8%", status: "healthy" },
    { asset: "NTN", type: "Borrow", amount: "$32,100", apy: "4.2%", status: "healthy" },
    { asset: "LNTN", type: "Supply", amount: "$80,200", apy: "9.5%", status: "healthy" },
  ]

  const recentTransactions = [
    { type: "Supply", asset: "ATN", amount: "$5,000", time: "2h ago", status: "completed" },
    { type: "Borrow", asset: "NTN", amount: "$3,200", time: "1d ago", status: "completed" },
    { type: "Repay", asset: "NTN", amount: "$1,500", time: "2d ago", status: "completed" },
    { type: "Withdraw", asset: "LNTN", amount: "$2,800", time: "3d ago", status: "completed" },
  ]

  const alerts = [
    { type: "Health Factor", message: "Health factor below 3.0", severity: "medium", time: "1h ago" },
    { type: "Price Alert", message: "ATN price increased 5%", severity: "low", time: "3h ago" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-emerald-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return (
          <Badge variant="outline" className="border-emerald-500 text-emerald-400">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-400">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">AutonityLend</h1>
            <p className="text-sm text-slate-300">Mobile Portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent p-2"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Wallet className="w-5 h-5 text-blue-400" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Total Supplied</p>
                <p className="text-lg font-bold text-white">{showBalances ? portfolioData.totalSupplied : "••••••"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Total Borrowed</p>
                <p className="text-lg font-bold text-white">{showBalances ? portfolioData.totalBorrowed : "••••••"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Net Worth</p>
                <p className="text-xl font-bold text-emerald-400">{showBalances ? portfolioData.netWorth : "••••••"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Health Factor</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-emerald-400">{portfolioData.healthFactor}</p>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
              <div>
                <p className="text-xs text-slate-300">Average APY</p>
                <p className="text-lg font-bold text-white">{portfolioData.apy}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="positions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="positions" className="data-[state=active]:bg-blue-600 text-xs">
              Positions
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-blue-600 text-xs">
              History
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600 text-xs">
              Alerts
            </TabsTrigger>
          </TabsList>

          {/* Current Positions */}
          <TabsContent value="positions" className="space-y-3">
            {positions.map((position, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{position.asset}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{position.asset}</p>
                        <p className="text-xs text-slate-400">{position.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{showBalances ? position.amount : "••••••"}</p>
                      <p className="text-xs text-emerald-400">{position.apy} APY</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                      {position.status}
                    </Badge>
                    <div className="flex gap-1">
                      {position.type === "Supply" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Transaction History */}
          <TabsContent value="transactions" className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === "Supply" || tx.type === "Withdraw" ? "bg-emerald-500/20" : "bg-blue-500/20"
                        }`}
                      >
                        {tx.type === "Supply" ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : tx.type === "Withdraw" ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                        ) : tx.type === "Borrow" ? (
                          <ArrowDownLeft className="w-4 h-4 text-blue-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {tx.type} {tx.asset}
                        </p>
                        <p className="text-xs text-slate-400">{tx.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{showBalances ? tx.amount : "••••••"}</p>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts" className="space-y-3">
            {alerts.map((alert, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 mt-0.5 ${
                        alert.severity === "high"
                          ? "text-red-400"
                          : alert.severity === "medium"
                            ? "text-yellow-400"
                            : "text-blue-400"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-medium text-sm">{alert.type}</p>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{alert.message}</p>
                      <p className="text-xs text-slate-500">{alert.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 h-12">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Supply
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12">
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Borrow
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 text-purple-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Push Notifications</p>
                <p className="text-xs text-slate-400">Receive alerts on your device</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Price Alerts</p>
                <p className="text-xs text-slate-400">Asset price movements</p>
              </div>
              <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Liquidation Alerts</p>
                <p className="text-xs text-slate-400">Health factor warnings</p>
              </div>
              <Switch checked={liquidationAlerts} onCheckedChange={setLiquidationAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* KYC Status */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white font-medium text-sm">Institutional KYC</p>
                  <p className="text-xs text-slate-400">Verified institutional account</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">Verified</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
