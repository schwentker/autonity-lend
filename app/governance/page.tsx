"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Vote, Plus, Shield, Building2, TrendingUp } from "lucide-react"

export default function GovernancePage() {
  const [selectedProposal, setSelectedProposal] = useState<any>(null)
  const [votingPower, setVotingPower] = useState(125000)
  const [delegatedPower, setDelegatedPower] = useState(75000)
  const [voteChoice, setVoteChoice] = useState("")
  const [proxyVoting, setProxyVoting] = useState(false)

  const proposals = [
    {
      id: "ALP-001",
      title: "Increase LNTN Collateral Factor to 85%",
      description:
        "Proposal to increase the collateral factor for LNTN tokens from 80% to 85% to improve capital efficiency.",
      status: "active",
      type: "parameter",
      proposer: "0x742d...8f3a",
      created: "2024-01-15",
      endDate: "2024-01-22",
      votesFor: 2450000,
      votesAgainst: 180000,
      quorum: 2000000,
      totalVotes: 2630000,
      compliance: "approved",
      institutionalSupport: 85,
    },
    {
      id: "ALP-002",
      title: "Add RWA Token Support for Real Estate",
      description: "Enable lending and borrowing of tokenized real estate assets with specific risk parameters.",
      status: "pending",
      type: "integration",
      proposer: "0x8a1b...4c2d",
      created: "2024-01-18",
      endDate: "2024-01-25",
      votesFor: 1200000,
      votesAgainst: 450000,
      quorum: 2000000,
      totalVotes: 1650000,
      compliance: "review",
      institutionalSupport: 72,
    },
    {
      id: "ALP-003",
      title: "Treasury Diversification Strategy",
      description: "Allocate 20% of protocol treasury to yield-generating strategies across multiple validators.",
      status: "executed",
      type: "treasury",
      proposer: "0x3f7e...9b1c",
      created: "2024-01-10",
      endDate: "2024-01-17",
      votesFor: 3200000,
      votesAgainst: 120000,
      quorum: 2000000,
      totalVotes: 3320000,
      compliance: "approved",
      institutionalSupport: 94,
    },
  ]

  const delegates = [
    {
      address: "0x742d...8f3a",
      name: "Institutional Validator A",
      votingPower: 450000,
      proposals: 12,
      participation: 95,
      reputation: "excellent",
    },
    {
      address: "0x8a1b...4c2d",
      name: "DeFi Research Group",
      votingPower: 320000,
      proposals: 8,
      participation: 88,
      reputation: "good",
    },
    {
      address: "0x3f7e...9b1c",
      name: "Protocol Development Team",
      votingPower: 280000,
      proposals: 15,
      participation: 92,
      reputation: "excellent",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "executed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "approved":
        return "text-green-400"
      case "review":
        return "text-yellow-400"
      case "rejected":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Governance
            </h1>
            <p className="text-slate-400 mt-2">Participate in AutonityLend protocol governance</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900/95 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-blue-400">Create New Proposal</DialogTitle>
                <DialogDescription>Submit a new governance proposal for community voting</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="proposal-type">Proposal Type</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue placeholder="Select proposal type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="parameter">Parameter Change</SelectItem>
                      <SelectItem value="integration">New Integration</SelectItem>
                      <SelectItem value="treasury">Treasury Management</SelectItem>
                      <SelectItem value="upgrade">Protocol Upgrade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter proposal title" className="bg-slate-800 border-slate-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed proposal description..."
                    className="bg-slate-800 border-slate-600 min-h-[120px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compliance" />
                  <Label htmlFor="compliance" className="text-sm">
                    I confirm this proposal meets institutional compliance requirements
                  </Label>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" className="border-slate-600 bg-transparent">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Submit Proposal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Your Voting Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{votingPower.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">LNTN Staked</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Delegated Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{delegatedPower.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">From 12 Delegators</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Active Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">3</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting Votes</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Participation Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">92%</div>
              <p className="text-xs text-slate-500 mt-1">Last 30 Days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="proposals" className="data-[state=active]:bg-blue-600">
              <Vote className="w-4 h-4 mr-2" />
              Proposals
            </TabsTrigger>
            <TabsTrigger value="delegation" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Delegation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            {/* Institutional Features */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <Building2 className="w-5 h-5 mr-2" />
                  Institutional Governance Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="proxy-voting" checked={proxyVoting} onCheckedChange={(checked) => setProxyVoting(checked === true)} />
                    <Label htmlFor="proxy-voting">Enable Proxy Voting</Label>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    KYC Verified
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Compliance Status:</span>
                    <span className="text-green-400 ml-2">Approved</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Voting Restrictions:</span>
                    <span className="text-blue-400 ml-2">None</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Governance Tier:</span>
                    <span className="text-purple-400 ml-2">Institutional</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposals List */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-400">Active Proposals</CardTitle>
                <CardDescription>Vote on protocol governance proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <Card key={proposal.id} className="bg-slate-800/50 border-slate-600">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                              <Badge variant="outline" className="border-slate-600">
                                {proposal.type}
                              </Badge>
                              <span className="text-xs text-slate-500">#{proposal.id}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
                            <p className="text-slate-400 text-sm">{proposal.description}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="text-sm text-slate-400">Ends: {proposal.endDate}</div>
                            <div className={`text-sm ${getComplianceColor(proposal.compliance)}`}>
                              <Shield className="w-3 h-3 inline mr-1" />
                              {proposal.compliance}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Voting Progress</span>
                            <span className="text-slate-300">
                              {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} votes
                            </span>
                          </div>
                          <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <div className="text-green-400">
                              For: {proposal.votesFor.toLocaleString()} (
                              {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}%)
                            </div>
                            <div className="text-red-400">
                              Against: {proposal.votesAgainst.toLocaleString()} (
                              {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}%)
                            </div>
                          </div>
                          <div className="text-sm text-slate-400">
                            Institutional Support: {proposal.institutionalSupport}%
                          </div>
                        </div>

                        {proposal.status === "active" && (
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
                            <div className="flex items-center space-x-4">
                              <RadioGroup value={voteChoice} onValueChange={setVoteChoice} className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="for" id={`for-${proposal.id}`} />
                                  <Label htmlFor={`for-${proposal.id}`} className="text-green-400">
                                    For
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="against" id={`against-${proposal.id}`} />
                                  <Label htmlFor={`against-${proposal.id}`} className="text-red-400">
                                    Against
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="abstain" id={`abstain-${proposal.id}`} />
                                  <Label htmlFor={`abstain-${proposal.id}`} className="text-slate-400">
                                    Abstain
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <Button
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              disabled={!voteChoice}
                            >
                              Cast Vote ({votingPower.toLocaleString()})
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delegation" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400">Delegate Management</CardTitle>
                <CardDescription>Delegate your voting power to trusted participants</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Delegate</TableHead>
                      <TableHead className="text-slate-400">Voting Power</TableHead>
                      <TableHead className="text-slate-400">Proposals</TableHead>
                      <TableHead className="text-slate-400">Participation</TableHead>
                      <TableHead className="text-slate-400">Reputation</TableHead>
                      <TableHead className="text-slate-400">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {delegates.map((delegate) => (
                      <TableRow key={delegate.address} className="border-slate-700">
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{delegate.name}</div>
                            <div className="text-sm text-slate-400">{delegate.address}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-400">{delegate.votingPower.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-300">{delegate.proposals}</TableCell>
                        <TableCell className="text-green-400">{delegate.participation}%</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              delegate.reputation === "excellent"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }
                          >
                            {delegate.reputation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                            Delegate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Governance Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Proposals Voted</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Participation Rate</span>
                      <span className="text-green-400 font-semibold">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Proposals Created</span>
                      <span className="text-blue-400 font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Delegation Received</span>
                      <span className="text-purple-400 font-semibold">75,000 LNTN</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Token Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Governance Tokens</span>
                      <span className="text-white font-semibold">125,000 LNTN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Staking Rewards</span>
                      <span className="text-green-400 font-semibold">+2,340 LNTN</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Voting Weight</span>
                      <span className="text-blue-400 font-semibold">0.85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Next Reward</span>
                      <span className="text-purple-400 font-semibold">~156 LNTN</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
