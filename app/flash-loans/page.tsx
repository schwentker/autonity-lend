"use client"

import { useState } from "react"
import { ArrowLeft, Play, Code, Zap, TrendingUp, RefreshCw, Calculator, Settings, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: any;
  code: string;
  estimatedGas: number;
  profitPotential: string;
}

interface Step {
  id: number;
  action: string;
  params: any;
}

const strategyTemplates: Strategy[] = [
  {
    id: "arbitrage",
    name: "Cross-DEX Arbitrage",
    description: "Exploit price differences between DEXs",
    icon: TrendingUp,
    code: `// Cross-DEX Arbitrage Strategy
function executeArbitrage(flashAmount, tokenA, tokenB) {
  // 1. Flash loan tokenA
  flashLoan(tokenA, flashAmount);
  
  // 2. Swap on DEX1 (lower price)
  const amountOut = swapOnDEX1(tokenA, tokenB, flashAmount);
  
  // 3. Swap back on DEX2 (higher price)
  const finalAmount = swapOnDEX2(tokenB, tokenA, amountOut);
  
  // 4. Repay flash loan + fee
  repayFlashLoan(tokenA, flashAmount + fee);
  
  // 5. Keep profit
  return finalAmount - (flashAmount + fee);
}`,
    estimatedGas: 450000,
    profitPotential: "Medium-High",
  },
  {
    id: "liquidation",
    name: "Liquidation Bot",
    description: "Liquidate undercollateralized positions",
    icon: Zap,
    code: `// Liquidation Strategy
function executeLiquidation(borrower, collateralAsset, debtAsset) {
  // 1. Flash loan debt asset
  const debtAmount = getDebtAmount(borrower, debtAsset);
  flashLoan(debtAsset, debtAmount);
  
  // 2. Liquidate position
  const collateralReceived = liquidate(borrower, debtAsset, debtAmount);
  
  // 3. Swap collateral to debt asset
  const swapAmount = swap(collateralAsset, debtAsset, collateralReceived);
  
  // 4. Repay flash loan
  repayFlashLoan(debtAsset, debtAmount + fee);
  
  // 5. Keep liquidation bonus
  return swapAmount - (debtAmount + fee);
}`,
    estimatedGas: 380000,
    profitPotential: "High",
  },
  {
    id: "refinancing",
    name: "Debt Refinancing",
    description: "Move debt to better rates",
    icon: RefreshCw,
    code: `// Debt Refinancing Strategy
function executeRefinancing(oldProtocol, newProtocol, debtAmount, collateralAmount) {
  // 1. Flash loan to repay old debt
  flashLoan(debtAsset, debtAmount);
  
  // 2. Repay debt on old protocol
  repayDebt(oldProtocol, debtAsset, debtAmount);
  
  // 3. Withdraw collateral
  withdrawCollateral(oldProtocol, collateralAsset, collateralAmount);
  
  // 4. Supply collateral to new protocol
  supplyCollateral(newProtocol, collateralAsset, collateralAmount);
  
  // 5. Borrow on new protocol
  borrowDebt(newProtocol, debtAsset, debtAmount);
  
  // 6. Repay flash loan
  repayFlashLoan(debtAsset, debtAmount + fee);
}`,
    estimatedGas: 520000,
    profitPotential: "Low-Medium",
  },
]

const assets = [
  { symbol: "ATN", name: "Autonity", balance: "1,250.00", price: "$0.85" },
  { symbol: "NTN", name: "Newton", balance: "850.00", price: "$1.20" },
  { symbol: "LNTN", name: "Liquid Newton", balance: "420.00", price: "$1.18" },
  { symbol: "USDC", name: "USD Coin", balance: "5,000.00", price: "$1.00" },
]

export default function FlashLoansPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null)
  const [customCode, setCustomCode] = useState("")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [flashAmount, setFlashAmount] = useState("")
  const [selectedAsset, setSelectedAsset] = useState("ATN")
  const [gasLimit, setGasLimit] = useState("500000")
  const [steps, setSteps] = useState<Step[]>([{ id: 1, action: "Flash Loan", params: {} }])
  const [profitEstimate, setProfitEstimate] = useState<number | null>(null)

  const addStep = () => {
    setSteps([...steps, { id: Date.now(), action: "Swap", params: {} }])
  }

  const removeStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const calculateProfit = () => {
    // Mock profit calculation
    const amount = Number.parseFloat(flashAmount) || 0
    const estimatedProfit = amount * 0.02 // 2% profit estimate
    setProfitEstimate(estimatedProfit)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Flash Loans</h1>
              <p className="text-slate-400">Execute complex DeFi strategies with 1-second finality</p>
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
        {/* Mode Toggle */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Execution Mode</h3>
                <p className="text-sm text-slate-400">
                  Choose between template strategies or advanced multi-step builder
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="advanced-mode" className="text-slate-300">
                  Advanced Mode
                </Label>
                <Switch id="advanced-mode" checked={isAdvancedMode} onCheckedChange={(checked) => setIsAdvancedMode(checked === true)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Strategy Selection / Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            {!isAdvancedMode ? (
              <>
                {/* Strategy Templates */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Strategy Templates
                    </CardTitle>
                    <CardDescription>Pre-built strategies optimized for Autonity's 1-second finality</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {strategyTemplates.map((strategy) => {
                      const Icon = strategy.icon
                      return (
                        <div
                          key={strategy.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedStrategy?.id === strategy.id
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
                          }`}
                          onClick={() => setSelectedStrategy(strategy)}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-blue-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{strategy.name}</h4>
                              <p className="text-sm text-slate-400 mb-2">{strategy.description}</p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="text-slate-500">Gas: ~{strategy.estimatedGas.toLocaleString()}</span>
                                <Badge variant="outline" className="text-xs">
                                  {strategy.profitPotential}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Code Preview */}
                {selectedStrategy && (
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Strategy Code</CardTitle>
                      <CardDescription>Review and customize the strategy logic</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                        <pre className="text-slate-300 whitespace-pre-wrap overflow-x-auto">
                          {selectedStrategy.code}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              /* Advanced Multi-Step Builder */
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Multi-Step Transaction Builder
                  </CardTitle>
                  <CardDescription>Build complex flash loan strategies step by step</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <select className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white">
                        <option value="flashloan">Flash Loan</option>
                        <option value="swap">Swap Tokens</option>
                        <option value="supply">Supply Collateral</option>
                        <option value="borrow">Borrow Asset</option>
                        <option value="repay">Repay Debt</option>
                        <option value="liquidate">Liquidate Position</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addStep} variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Execution Panel */}
          <div className="space-y-6">
            {/* Flash Loan Parameters */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Flash Loan Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Asset</Label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full mt-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                  >
                    {assets.map((asset) => (
                      <option key={asset.symbol} value={asset.symbol}>
                        {asset.symbol} - {asset.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-slate-300">Amount</Label>
                  <div className="relative mt-1">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={flashAmount}
                      onChange={(e) => setFlashAmount(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 text-blue-400 hover:text-blue-300"
                      onClick={() => {
                        const asset = assets.find((a) => a.symbol === selectedAsset)
                        if (asset) setFlashAmount(asset.balance.replace(",", ""))
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Gas Limit</Label>
                  <Input
                    type="number"
                    value={gasLimit}
                    onChange={(e) => setGasLimit(e.target.value)}
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profit Estimation */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Profit Estimation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={calculateProfit} variant="outline" className="w-full bg-transparent">
                  Calculate Profit
                </Button>

                {profitEstimate !== null && (
                  <div className="space-y-2 p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Flash Loan Fee:</span>
                      <span className="text-white">0.09%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Gas Cost:</span>
                      <span className="text-white">~$2.50</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-slate-600 pt-2">
                      <span className="text-slate-400">Estimated Profit:</span>
                      <span className={`font-semibold ${profitEstimate > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        ${profitEstimate.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Autonity Features */}
            <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  Autonity Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-300">1-second block finality</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Lower MEV risk</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300">Predictable gas costs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-slate-300">Institutional compliance</span>
                </div>
              </CardContent>
            </Card>

            {/* Execute Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={!flashAmount || (!selectedStrategy && !isAdvancedMode)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Execute Flash Loan
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Flash Loan Execution</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Strategy:</span>
                      <span>{selectedStrategy?.name || "Custom Strategy"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Flash Amount:</span>
                      <span>
                        {flashAmount} {selectedAsset}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Gas Limit:</span>
                      <span>{Number.parseInt(gasLimit).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Estimated Gas:</span>
                      <span>~$2.50</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Confirm & Execute</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
