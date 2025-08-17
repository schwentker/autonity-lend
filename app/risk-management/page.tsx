"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Shield, Activity, Settings, Eye, CheckCircle } from "lucide-react"

export default function RiskManagementPage() {
  const [globalRiskLevel, setGlobalRiskLevel] = useState("moderate")
  const [autoLiquidation, setAutoLiquidation] = useState(true)
  const [complianceMode, setComplianceMode] = useState(true)

  const systemMetrics = [
    { label: "Total Value Locked", value: "$2.4B", change: "+5.2%", status: "healthy" },
    { label: "Global Utilization", value: "68%", change: "+2.1%", status: "moderate" },
    { label: "Liquidation Buffer", value: "15.2%", change: "-0.8%", status: "healthy" },
    { label: "Oracle Deviation", value: "0.12%", change: "+0.05%", status: "healthy" },
  ]

  const assetRiskSettings = [
    { asset: "ATN", tier: "Tier 1", ltv: "85%", liquidationThreshold: "90%", penalty: "5%", status: "active" },
    { asset: "NTN", tier: "Tier 1", ltv: "80%", liquidationThreshold: "85%", penalty: "8%", status: "active" },
    { asset: "LNTN", tier: "Tier 2", ltv: "75%", liquidationThreshold: "80%", penalty: "10%", status: "active" },
    { asset: "RWA-BOND", tier: "Tier 3", ltv: "70%", liquidationThreshold: "75%", penalty: "12%", status: "review" },
  ]

  const oracleFeeds = [
    { asset: "ATN/USD", price: "$1.24", deviation: "0.08%", lastUpdate: "2s ago", status: "active" },
    { asset: "NTN/USD", price: "$0.89", deviation: "0.12%", lastUpdate: "1s ago", status: "active" },
    { asset: "LNTN/USD", price: "$1.15", deviation: "0.05%", lastUpdate: "3s ago", status: "active" },
    { asset: "RWA-BOND/USD", price: "$98.50", deviation: "0.15%", lastUpdate: "5s ago", status: "warning" },
  ]

  const riskAlerts = [
    { type: "High Utilization", asset: "NTN", severity: "medium", message: "Utilization approaching 85% threshold" },
    { type: "Oracle Deviation", asset: "RWA-BOND", severity: "high", message: "Price deviation exceeds 0.1% limit" },
    { type: "Large Position", asset: "ATN", severity: "low", message: "Single position exceeds 5% of total supply" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-emerald-400"
      case "moderate":
        return "text-yellow-400"
      case "warning":
        return "text-orange-400"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Risk Management</h1>
            <p className="text-slate-300">Monitor and control system-wide risk parameters</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              <CheckCircle className="w-4 h-4 mr-1" />
              System Healthy
            </Badge>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      metric.status === "healthy"
                        ? "bg-emerald-400"
                        : metric.status === "moderate"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <p className={`text-sm ${getStatusColor(metric.status)}`}>{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="parameters" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="parameters" className="data-[state=active]:bg-blue-600">
              Global Parameters
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-blue-600">
              Asset Settings
            </TabsTrigger>
            <TabsTrigger value="oracles" className="data-[state=active]:bg-blue-600">
              Oracle Feeds
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600">
              Risk Alerts
            </TabsTrigger>
          </TabsList>

          {/* Global Risk Parameters */}
          <TabsContent value="parameters" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Global Risk Controls
                  </CardTitle>
                  <CardDescription>System-wide risk management settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Global Risk Level</Label>
                    <Select value={globalRiskLevel} onValueChange={setGlobalRiskLevel}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Maximum Utilization Rate</Label>
                    <Input type="number" placeholder="85" className="bg-slate-700 border-slate-600 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Liquidation Buffer</Label>
                    <Input type="number" placeholder="15" className="bg-slate-700 border-slate-600 text-white" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Auto Liquidation</Label>
                    <Switch checked={autoLiquidation} onCheckedChange={setAutoLiquidation} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Compliance Mode</Label>
                    <Switch checked={complianceMode} onCheckedChange={setComplianceMode} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Risk Tier Management
                  </CardTitle>
                  <CardDescription>Configure risk tiers and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Tier 1 Assets</p>
                        <p className="text-sm text-slate-400">Blue-chip collateral</p>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Tier 2 Assets</p>
                        <p className="text-sm text-slate-400">Yield-bearing tokens</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">Monitored</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Tier 3 Assets</p>
                        <p className="text-sm text-slate-400">Real-world assets</p>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">Restricted</Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Update Tier Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Asset-Specific Settings */}
          <TabsContent value="assets" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Asset Risk Parameters</CardTitle>
                <CardDescription>Configure individual asset risk settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Asset</TableHead>
                      <TableHead className="text-slate-300">Risk Tier</TableHead>
                      <TableHead className="text-slate-300">LTV</TableHead>
                      <TableHead className="text-slate-300">Liquidation Threshold</TableHead>
                      <TableHead className="text-slate-300">Penalty</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetRiskSettings.map((asset, index) => (
                      <TableRow key={index} className="border-slate-700">
                        <TableCell className="text-white font-medium">{asset.asset}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {asset.tier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{asset.ltv}</TableCell>
                        <TableCell className="text-slate-300">{asset.liquidationThreshold}</TableCell>
                        <TableCell className="text-slate-300">{asset.penalty}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              asset.status === "active"
                                ? "border-emerald-500 text-emerald-400"
                                : "border-yellow-500 text-yellow-400"
                            }
                          >
                            {asset.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Oracle Feeds */}
          <TabsContent value="oracles" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-400" />
                  Oracle Price Feeds
                </CardTitle>
                <CardDescription>Real-time price feed monitoring and status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Asset Pair</TableHead>
                      <TableHead className="text-slate-300">Current Price</TableHead>
                      <TableHead className="text-slate-300">Deviation</TableHead>
                      <TableHead className="text-slate-300">Last Update</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oracleFeeds.map((feed, index) => (
                      <TableRow key={index} className="border-slate-700">
                        <TableCell className="text-white font-medium">{feed.asset}</TableCell>
                        <TableCell className="text-slate-300">{feed.price}</TableCell>
                        <TableCell
                          className={`${Number.parseFloat(feed.deviation) > 0.1 ? "text-red-400" : "text-emerald-400"}`}
                        >
                          {feed.deviation}
                        </TableCell>
                        <TableCell className="text-slate-300">{feed.lastUpdate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                feed.status === "active" ? "bg-emerald-400" : "bg-yellow-400"
                              }`}
                            />
                            <span className={feed.status === "active" ? "text-emerald-400" : "text-yellow-400"}>
                              {feed.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            Monitor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Alerts */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Active Risk Alerts
                </CardTitle>
                <CardDescription>Real-time risk monitoring and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center gap-4">
                      <AlertTriangle
                        className={`w-5 h-5 ${
                          alert.severity === "high"
                            ? "text-red-400"
                            : alert.severity === "medium"
                              ? "text-yellow-400"
                              : "text-blue-400"
                        }`}
                      />
                      <div>
                        <p className="text-white font-medium">{alert.type}</p>
                        <p className="text-sm text-slate-400">{alert.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getSeverityBadge(alert.severity)}
                      <Badge variant="outline" className="border-slate-500 text-slate-300">
                        {alert.asset}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Automated Risk Controls</CardTitle>
                <CardDescription>Configure automatic risk mitigation actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Emergency Pause Threshold</Label>
                    <Input type="number" placeholder="95" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Auto-Liquidation Trigger</Label>
                    <Input type="number" placeholder="90" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-white font-medium">Emergency Circuit Breaker</p>
                    <p className="text-sm text-slate-400">Automatically pause system during extreme conditions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
