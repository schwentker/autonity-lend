"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, DollarSign } from "lucide-react"
import Link from "next/link"

const borrowableAssets = [
  {
    symbol: "ATN",
    name: "Autonity Token",
    balance: "0.00",
    borrowRate: "4.2%",
    utilizationRate: 68,
    available: "1,250,000",
    collateralFactor: "75%",
    riskTier: "Low",
    institutionalRate: "3.8%",
    maxBorrow: "500,000",
  },
  {
    symbol: "NTN",
    name: "Newton Token",
    balance: "0.00",
    borrowRate: "3.8%",
    utilizationRate: 45,
    available: "850,000",
    collateralFactor: "100%",
    riskTier: "Ultra Low",
    institutionalRate: "3.2%",
    maxBorrow: "1,000,000",
    highlight: true,
  },
  {
    symbol: "LNTN",
    name: "Liquid Newton Token",
    balance: "0.00",
    borrowRate: "4.5%",
    utilizationRate: 72,
    available: "650,000",
    collateralFactor: "100%",
    riskTier: "Ultra Low",
    institutionalRate: "4.0%",
    maxBorrow: "750,000",
    highlight: true,
  },
  {
    symbol: "RWA-1",
    name: "Real World Asset Token 1",
    balance: "0.00",
    borrowRate: "6.8%",
    utilizationRate: 35,
    available: "2,500,000",
    collateralFactor: "65%",
    riskTier: "Medium",
    institutionalRate: "6.2%",
    maxBorrow: "2,000,000",
    rwaEligible: true,
  },
]

export default function BorrowPage() {
  const [selectedAsset, setSelectedAsset] = useState(borrowableAssets[0])
  const [borrowAmount, setBorrowAmount] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const borrowAmountNum = Number.parseFloat(borrowAmount) || 0
  const healthFactor = borrowAmountNum > 0 ? Math.max(0.5, 2.5 - borrowAmountNum / 100000) : 2.5
  const borrowCapacity = 850000 // Mock borrow capacity
  const utilizationPercent = (borrowAmountNum / borrowCapacity) * 100

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case "Ultra Low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "Low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2) return "text-emerald-400"
    if (factor >= 1.5) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Borrow Assets
            </h1>
            <p className="text-slate-400 mt-1">Access institutional-grade borrowing with competitive rates</p>
          </div>
        </div>

        {/* Institutional Status Bar */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">KYC Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">Institutional Tier</span>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">RWA Eligible</Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Credit Limit</div>
                <div className="text-xl font-bold text-white">$5,000,000</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Asset Selection */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Select Asset to Borrow</CardTitle>
                <CardDescription>Choose from available borrowable assets with institutional rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {borrowableAssets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAsset.symbol === asset.symbol
                        ? "border-blue-500/50 bg-blue-500/10"
                        : "border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50"
                    } ${asset.highlight ? "ring-1 ring-emerald-500/30" : ""}`}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {asset.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{asset.symbol}</span>
                            <Badge className={getRiskColor(asset.riskTier)}>{asset.riskTier}</Badge>
                            {asset.highlight && (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                1:1 Ratio
                              </Badge>
                            )}
                            {asset.rwaEligible && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">RWA</Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-400">{asset.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{asset.borrowRate}</div>
                        <div className="text-sm text-emerald-400">Inst: {asset.institutionalRate}</div>
                        <div className="text-xs text-slate-400">Available: {asset.available}</div>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Collateral Factor: </span>
                        <span className="text-white font-medium">{asset.collateralFactor}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Utilization: </span>
                        <span className="text-white font-medium">{asset.utilizationRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Borrow Amount */}
            <Card className="mt-6 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Borrow Amount</CardTitle>
                <CardDescription>Enter the amount you want to borrow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="borrow-amount" className="text-slate-300">
                    Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="borrow-amount"
                      type="number"
                      placeholder="0.00"
                      value={borrowAmount}
                      onChange={(e) => setBorrowAmount(e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50 text-white pr-20"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                        onClick={() => setBorrowAmount((borrowCapacity * 0.8).toString())}
                      >
                        80%
                      </Button>
                      <span className="text-slate-400 text-sm">{selectedAsset.symbol}</span>
                    </div>
                  </div>
                </div>

                {/* Health Factor */}
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Health Factor</span>
                    <span className={`font-bold ${getHealthFactorColor(healthFactor)}`}>{healthFactor.toFixed(2)}</span>
                  </div>
                  <Progress value={Math.min(100, (healthFactor / 3) * 100)} className="h-2" />
                  <div className="text-xs text-slate-400 mt-1">
                    {healthFactor >= 2 ? "Safe" : healthFactor >= 1.5 ? "Moderate Risk" : "High Risk"}
                  </div>
                </div>

                {/* Borrow Capacity */}
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Borrow Capacity Used</span>
                    <span className="text-white font-bold">{utilizationPercent.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(100, utilizationPercent)} className="h-2" />
                  <div className="text-xs text-slate-400 mt-1">
                    ${borrowAmountNum.toLocaleString()} of ${borrowCapacity.toLocaleString()} available
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Preview */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Transaction Preview</CardTitle>
                <CardDescription>Review your borrowing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Asset</span>
                    <span className="text-white font-medium">{selectedAsset.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Borrow Amount</span>
                    <span className="text-white font-medium">
                      {borrowAmountNum.toLocaleString()} {selectedAsset.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Borrow APY</span>
                    <span className="text-white font-medium">{selectedAsset.institutionalRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual Interest</span>
                    <span className="text-white font-medium">
                      {((borrowAmountNum * Number.parseFloat(selectedAsset.institutionalRate)) / 100).toLocaleString()}{" "}
                      {selectedAsset.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Health Factor</span>
                    <span className={`font-medium ${getHealthFactorColor(healthFactor)}`}>
                      {healthFactor.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-600/50 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Ensure sufficient collateral to maintain health factor above 1.0</span>
                  </div>

                  <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={!borrowAmount || borrowAmountNum <= 0}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Borrow {selectedAsset.symbol}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Confirm Borrow Transaction</DialogTitle>
                        <DialogDescription>Review the details of your borrowing transaction</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-700/50 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Borrowing</span>
                            <span className="text-white font-medium">
                              {borrowAmountNum.toLocaleString()} {selectedAsset.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Interest Rate</span>
                            <span className="text-white font-medium">{selectedAsset.institutionalRate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">New Health Factor</span>
                            <span className={`font-medium ${getHealthFactorColor(healthFactor)}`}>
                              {healthFactor.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Estimated Gas</span>
                            <span className="text-white font-medium">0.0024 ATN (~$2.40)</span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Confirm Borrow
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
