"use client"

import { useState } from "react"
import { ArrowLeft, Info, Shield, TrendingUp, Zap, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

const assets = [
  {
    symbol: "ATN",
    name: "Autonity Token",
    balance: "1,250.00",
    apy: "8.5",
    collateralFactor: "75",
    riskTier: "Low",
    icon: "🔷",
  },
  {
    symbol: "NTN",
    name: "Newton Token",
    balance: "850.50",
    apy: "12.3",
    collateralFactor: "70",
    riskTier: "Medium",
    icon: "⚡",
  },
  {
    symbol: "LNTN",
    name: "Liquid Newton",
    balance: "2,100.75",
    apy: "15.8",
    collateralFactor: "65",
    riskTier: "Medium",
    icon: "💧",
    isYieldBearing: true,
  },
  {
    symbol: "RWA-1",
    name: "Real Estate Token",
    balance: "500.00",
    apy: "6.2",
    collateralFactor: "60",
    riskTier: "High",
    icon: "🏢",
  },
]

export default function LendPage() {
  const [selectedAsset, setSelectedAsset] = useState(assets[0])
  const [amount, setAmount] = useState("")
  const [useAsCollateral, setUseAsCollateral] = useState(true)
  const [lntnYieldToggle, setLntnYieldToggle] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleMaxClick = () => {
    setAmount(selectedAsset.balance)
  }

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const calculateInterest = () => {
    const principal = Number.parseFloat(amount) || 0
    const rate = Number.parseFloat(selectedAsset.apy) / 100
    return (principal * rate).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="text-white font-semibold text-lg">AutonityLend</span>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Supply Assets</h1>
                  <p className="text-slate-400">Earn interest by supplying assets to the protocol</p>
                </div>

                {/* KYC Status Indicator */}
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">Institutional KYC Verified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Asset Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Select Asset</CardTitle>
                    <CardDescription className="text-slate-400">Choose the asset you want to supply</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assets.map((asset) => (
                        <div
                          key={asset.symbol}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedAsset.symbol === asset.symbol
                              ? "bg-blue-500/20 border-blue-500/50"
                              : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50"
                          }`}
                          onClick={() => setSelectedAsset(asset)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{asset.icon}</span>
                              <div>
                                <div className="text-white font-semibold">{asset.symbol}</div>
                                <div className="text-slate-400 text-sm">{asset.name}</div>
                              </div>
                            </div>
                            <Badge className={getRiskColor(asset.riskTier)}>{asset.riskTier}</Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Balance:</span>
                              <span className="text-white">{asset.balance}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Supply APY:</span>
                              <span className="text-green-400 font-semibold">{asset.apy}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Collateral Factor:</span>
                              <span className="text-blue-400">{asset.collateralFactor}%</span>
                            </div>
                          </div>

                          {asset.isYieldBearing && (
                            <div className="mt-3 p-2 bg-purple-500/20 border border-purple-500/30 rounded text-xs">
                              <div className="flex items-center gap-1 text-purple-400">
                                <Zap className="w-3 h-3" />
                                Yield-bearing collateral available
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Amount Input */}
                <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Supply Amount</CardTitle>
                    <CardDescription className="text-slate-400">Enter the amount you want to supply</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Amount</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="bg-slate-700/50 border-slate-600/50 text-white pr-20"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                          onClick={handleMaxClick}
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="text-sm text-slate-400">
                        Balance: {selectedAsset.balance} {selectedAsset.symbol}
                      </div>
                    </div>

                    {/* Collateral Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-white">Use as collateral</span>
                        <Info className="w-4 h-4 text-slate-400" />
                      </div>
                      <Switch checked={useAsCollateral} onCheckedChange={setUseAsCollateral} />
                    </div>

                    {/* LNTN Yield Toggle */}
                    {selectedAsset.symbol === "LNTN" && (
                      <div className="flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-purple-400" />
                          <span className="text-white">Enable yield-bearing collateral</span>
                          <Info className="w-4 h-4 text-slate-400" />
                        </div>
                        <Switch checked={lntnYieldToggle} onCheckedChange={setLntnYieldToggle} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Transaction Preview */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Transaction Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Supply Amount:</span>
                        <span className="text-white">
                          {amount || "0.00"} {selectedAsset.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Supply APY:</span>
                        <span className="text-green-400 font-semibold">{selectedAsset.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Annual Interest:</span>
                        <span className="text-green-400">
                          ~{calculateInterest()} {selectedAsset.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Collateral Factor:</span>
                        <span className="text-blue-400">{selectedAsset.collateralFactor}%</span>
                      </div>
                      {useAsCollateral && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Borrowing Power:</span>
                          <span className="text-blue-400">
                            +
                            {(
                              ((Number.parseFloat(amount) || 0) * Number.parseFloat(selectedAsset.collateralFactor)) /
                              100
                            ).toFixed(2)}{" "}
                            USD
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Estimated Gas:</span>
                        <span className="text-white">~0.002 ATN</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={() => setShowConfirmModal(true)}
                      disabled={!amount || Number.parseFloat(amount) <= 0}
                    >
                      Supply {selectedAsset.symbol}
                    </Button>
                  </CardContent>
                </Card>

                {/* Risk Information */}
                <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Risk Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300">Supplied assets can be used as collateral for borrowing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300">
                          Interest rates are variable and may change based on market conditions
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-300">
                          Assets used as collateral may be liquidated if health factor drops below 1.0
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Supply Transaction</DialogTitle>
            <DialogDescription className="text-slate-400">
              Please review your transaction details before confirming
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-slate-700/50 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Asset:</span>
                <span className="text-white">{selectedAsset.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="text-white">
                  {amount} {selectedAsset.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Supply APY:</span>
                <span className="text-green-400">{selectedAsset.apy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Use as Collateral:</span>
                <span className="text-white">{useAsCollateral ? "Yes" : "No"}</span>
              </div>
              {selectedAsset.symbol === "LNTN" && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Yield-bearing:</span>
                  <span className="text-purple-400">{lntnYieldToggle ? "Enabled" : "Disabled"}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Gas Fee:</span>
                <span className="text-white">~0.002 ATN ($0.45)</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => {
                setShowConfirmModal(false)
                // Handle transaction submission here
              }}
            >
              Confirm Supply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
