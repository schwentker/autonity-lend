"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Building2, TrendingUp, Users, DollarSign } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const router = useRouter()

  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        setIsWalletConnected(true)
      } else {
        alert("Please install MetaMask or another Web3 wallet to continue")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleLaunchApp = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AL</span>
            </div>
            <span className="font-montserrat font-bold text-xl">AutonityLend</span>
          </div>
          <Button variant="outline" className="glass bg-transparent" onClick={handleConnectWallet}>
            {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 lg:px-8 pb-24 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-montserrat font-black text-4xl lg:text-6xl xl:text-7xl leading-tight mb-6">
              Institutional DeFi Lending
              <span className="block text-primary">on Autonity</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Enterprise-grade lending protocol with institutional security, instant finality, and real-world asset
              support. Built for the future of decentralized finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90" onClick={handleLaunchApp}>
                Launch App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 glass bg-transparent"
                onClick={() => window.open("https://docs.autonity.org", "_blank")}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-4">Built for Institutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed for enterprise-level DeFi operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-0 p-8 text-center group hover:bg-card/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-4">1:1 Collateralization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure lending with full collateral backing, ensuring institutional-grade risk management and capital
                  protection.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-8 text-center group hover:bg-card/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/30 transition-colors">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-4">Instant Finality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lightning-fast transaction settlement on Autonity blockchain with immediate confirmation and
                  execution.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-8 text-center group hover:bg-card/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-4">RWA Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bridge traditional finance with DeFi through comprehensive real-world asset integration and
                  tokenization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-4">Protocol Statistics</h2>
            <p className="text-lg text-muted-foreground">Real-time metrics from the AutonityLend ecosystem</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-0 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-montserrat font-bold mb-1">$2.4B</div>
                <div className="text-sm text-muted-foreground">Total Value Locked</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-2xl font-montserrat font-bold mb-1">12,500+</div>
                <div className="text-sm text-muted-foreground">Active Lenders</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-montserrat font-bold mb-1">8.5%</div>
                <div className="text-sm text-muted-foreground">Average APY</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-6 text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-chart-3/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-chart-3" />
                </div>
                <div className="text-2xl font-montserrat font-bold mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6">Ready to Start Lending?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join institutional investors already earning competitive yields on AutonityLend
          </p>
          <Button size="lg" className="text-lg px-12 py-6 bg-primary hover:bg-primary/90" onClick={handleLaunchApp}>
            Launch App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AL</span>
              </div>
              <span className="font-montserrat font-bold text-xl">AutonityLend</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 AutonityLend. Built on Autonity blockchain.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
