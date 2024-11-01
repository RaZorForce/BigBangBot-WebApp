'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { FileBox, Wifi, LayoutDashboard, Box, Wallet, Settings, Share2, ChevronDown, Eye, EyeOff, Plus, CreditCard, Import, Upload, ArrowRightLeft, Trash2, Play, Pause, RefreshCw } from "lucide-react"

export function App() {
  const [activeTab, setActiveTab] = React.useState("bundler")
  const [settingsTab, setSettingsTab] = React.useState("general")
  const [walletsTab, setWalletsTab] = React.useState("volume")
  const [proxiesTab, setProxiesTab] = React.useState("http")
  const [bundlerTab, setBundlerTab] = React.useState("active")
  const [wallets, setWallets] = React.useState([])
  const [proxies, setProxies] = React.useState([])
  const [bundlerTasks, setBundlerTasks] = React.useState([])
  const [newWalletCount, setNewWalletCount] = React.useState(1)
  const [newProxy, setNewProxy] = React.useState("")
  const [newBundlerTask, setNewBundlerTask] = React.useState({
    name: "",
    token: "",
    amount: "",
    wallets: "",
    proxies: ""
  })
  const [showRpcUrl, setShowRpcUrl] = React.useState(false)
  const [showWebSocketUrl, setShowWebSocketUrl] = React.useState(false)
  const [showCapSolverApiKey, setShowCapSolverApiKey] = React.useState(false)
  const [showJitoTipPrivateKey, setShowJitoTipPrivateKey] = React.useState(false)
  const [showFunderPrivateKey, setShowFunderPrivateKey] = React.useState(false)
  const [devBuy, setDevBuy] = React.useState("1")
  const [minBuyAmount, setMinBuyAmount] = React.useState("")
  const [maxBuyAmount, setMaxBuyAmount] = React.useState("")
  const [useJitoProxyless, setUseJitoProxyless] = React.useState("false")
  const [jitoTipAmount, setJitoTipAmount] = React.useState("0.005")
  const [blocEndpoint, setBlocEndpoint] = React.useState("https://my.solana.dex.bhrhdn.com")

  const generateWallets = (count) => {
    const newWallets = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      address: `Wallet${Math.random().toString(36).substr(2, 9)}`,
      balance: (Math.random() * 10).toFixed(2),
    }))
    setWallets([...wallets, ...newWallets])
  }

  const addProxy = () => {
    if (newProxy) {
      setProxies([...proxies, { id: Date.now(), address: newProxy }])
      setNewProxy("")
    }
  }

  const addBundlerTask = () => {
    if (newBundlerTask.name && newBundlerTask.token && newBundlerTask.amount && newBundlerTask.wallets && newBundlerTask.proxies) {
      setBundlerTasks([...bundlerTasks, { ...newBundlerTask, id: Date.now(), status: "Idle" }])
      setNewBundlerTask({ name: "", token: "", amount: "", wallets: "", proxies: "" })
    }
  }

  const renderBundlerContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Bundler Tasks</h3>
            <p className="text-sm text-gray-400">{bundlerTasks.length} tasks</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-800 hover:bg-gray-700">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bundler Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input
                    id="task-name"
                    value={newBundlerTask.name}
                    onChange={(e) => setNewBundlerTask({...newBundlerTask, name: e.target.value})}
                    placeholder="Enter task name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <Input
                    id="token"
                    value={newBundlerTask.token}
                    onChange={(e) => setNewBundlerTask({...newBundlerTask, token: e.target.value})}
                    placeholder="Enter token address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={newBundlerTask.amount}
                    onChange={(e) => setNewBundlerTask({...newBundlerTask, amount: e.target.value})}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallets">Wallets</Label>
                  <Input
                    id="wallets"
                    value={newBundlerTask.wallets}
                    onChange={(e) => setNewBundlerTask({...newBundlerTask, wallets: e.target.value})}
                    placeholder="Enter wallet addresses"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxies">Proxies</Label>
                  <Input
                    id="proxies"
                    value={newBundlerTask.proxies}
                    onChange={(e) => setNewBundlerTask({...newBundlerTask, proxies: e.target.value})}
                    placeholder="Enter proxy addresses"
                  />
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700" onClick={addBundlerTask}>Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Play className="mr-2 h-4 w-4" />
            Start All
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Pause className="mr-2 h-4 w-4" />
            Pause All
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Wallets</TableHead>
              <TableHead>Proxies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bundlerTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.token}</TableCell>
                <TableCell>{task.amount}</TableCell>
                <TableCell>{task.wallets}</TableCell>
                <TableCell>{task.proxies}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  const renderWalletsContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Bundler</h3>
            <p className="text-sm text-gray-400">{wallets.length} wallets | Total Balance: {wallets.reduce((sum, wallet) => sum + parseFloat(wallet.balance), 0).toFixed(2)} SOL</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-800 hover:bg-gray-700">
                <Plus className="mr-2 h-4 w-4" />
                Gen Wallets
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New Wallets</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="wallet-count">Number of Wallets</Label>
                  <Input
                    id="wallet-count"
                    type="number"
                    value={newWalletCount}
                    onChange={(e) => setNewWalletCount(parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700" onClick={() => generateWallets(newWalletCount)}>Generate</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <CreditCard className="mr-2 h-4 w-4" />
            Check Balances
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">Create Profiles</Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Import className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Upload className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell>{wallet.address}</TableCell>
                <TableCell>{wallet.balance} SOL</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Send SOL to Wallets
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">Return to Main Wallet</Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">Transfer SPL to Main Wallet</Button>
          <Button variant="destructive" className="bg-red-900 hover:bg-red-800">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      </div>
    )
  }

  const renderProxiesContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Proxies</h3>
            <p className="text-sm text-gray-400">{proxies.length} proxies</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-800 hover:bg-gray-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Proxy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Proxy</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-proxy">Proxy Address</Label>
                  <Input
                    id="new-proxy"
                    value={newProxy}
                    onChange={(e) => setNewProxy(e.target.value)}
                    placeholder="ip:port or ip:port:user:pass"
                  />
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700" onClick={addProxy}>Add</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div  className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Import className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Upload className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            Test Proxies
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proxies.map((proxy) => (
              <TableRow key={proxy.id}>
                <TableCell>{proxy.address}</TableCell>
                <TableCell>Untested</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800">Edit</Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-800 text-red-500">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-2">
          <Button variant="destructive" className="bg-red-900 hover:bg-red-800">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
          <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
            Clear All
          </Button>
        </div>
      </div>
    )
  }

  const renderSettingsContent = () => {
    switch (settingsTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Discord Webhook</Label>
              <p className="text-sm text-gray-400">This allows you to receive information in your discord server</p>
              <Input placeholder="Discord Webhook" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">RPC URL</Label>
              <p className="text-sm text-gray-400">This URL allows applications to send requests and receive responses</p>
              <div className="relative">
                <Input
                  type={showRpcUrl ? "text" : "password"}
                  placeholder="RPC URL"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowRpcUrl(!showRpcUrl)}
                >
                  {showRpcUrl ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">WebSocket URL</Label>
              <p className="text-sm text-gray-400">This URL establishes a continuous connection to the blockchain</p>
              <div className="relative">
                <Input
                  type={showWebSocketUrl ? "text" : "password"}
                  placeholder="WebSocket URL"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowWebSocketUrl(!showWebSocketUrl)}
                >
                  {showWebSocketUrl ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">Block Engine URL</Label>
              <p className="text-sm text-gray-400">Block Engines are currently operating in Amsterdam, Frankfurt, NY and Tokyo</p>
              <Select defaultValue="my.mainnet.block-engine.jito.wtf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="my.mainnet.block-engine.jito.wtf">my.mainnet.block-engine.jito.wtf</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "volume":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="jito-tip-private-key">Jito Tip Private Key</Label>
              <div className="relative">
                <Input
                  id="jito-tip-private-key"
                  type={showJitoTipPrivateKey ? "text" : "password"}
                  placeholder="Jito Tip Private Key"
                  className="border-red-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowJitoTipPrivateKey(!showJitoTipPrivateKey)}
                >
                  {showJitoTipPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-red-500 mt-1">This field is required</p>
            </div>
            <div>
              <Label htmlFor="jito-tip-amount">Jito Tip Amount</Label>
              <Input id="jito-tip-amount" value={jitoTipAmount} onChange={(e) => setJitoTipAmount(e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">Higher tip = higher transaction success (but more expensive), 0.005 recommended</p>
            </div>
            <div>
              <Label htmlFor="funder-private-key">Funder Private Key</Label>
              <div className="relative">
                <Input
                  id="funder-private-key"
                  type={showFunderPrivateKey ? "text" : "password"}
                  placeholder="Funder Private Key"
                  className="border-red-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowFunderPrivateKey(!showFunderPrivateKey)}
                >
                  {showFunderPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-red-500 mt-1">This field is required</p>
            </div>
          </div>
        )
      case "bundler":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="dev-buy">Dev Buy</Label>
              <Input id="dev-buy" value={devBuy} onChange={(e) => setDevBuy(e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">The amount of sol to buy on the dev wallet</p>
            </div>
            <div>
              <Label htmlFor="min-buy-amount">Minimum Buy Amount</Label>
              <Input
                id="min-buy-amount"
                value={minBuyAmount}
                onChange={(e) => setMinBuyAmount(e.target.value)}
                className={minBuyAmount && (!isNaN(parseFloat(minBuyAmount)) && parseFloat(minBuyAmount) > 0 && parseFloat(minBuyAmount) <= 1000 ? "border-green-500" : "border-red-500")}
              />
              <p className="text-xs text-gray-400 mt-1">The minimum amount of sol to buy on bundler wallets</p>
            </div>
            <div>
              <Label htmlFor="max-buy-amount">Maximum Buy Amount</Label>
              <Input
                id="max-buy-amount"
                value={maxBuyAmount}
                onChange={(e) => setMaxBuyAmount(e.target.value)}
                className={maxBuyAmount && (!isNaN(parseFloat(maxBuyAmount)) && parseFloat(maxBuyAmount) > 0 && parseFloat(maxBuyAmount) <= 1000 ? "border-green-500" : "border-red-500")}
              />
              <p className="text-xs text-gray-400 mt-1">The maximum amount of sol to buy on bundler wallets</p>
            </div>
            <div>
              <Label htmlFor="use-jito-proxyless">Use Jito Proxyless</Label>
              <Select value={useJitoProxyless} onValueChange={setUseJitoProxyless}>
                <SelectTrigger id="use-jito-proxyless">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1">Use Jito without proxies (NOT RECOMMENDED)</p>
            </div>
            <div>
              <Label htmlFor="jito-tip-amount">Jito Tip Amount</Label>
              <Input id="jito-tip-amount" value={jitoTipAmount} onChange={(e) => setJitoTipAmount(e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">Higher tip = higher transaction success (but more expensive), 0.005 recommended</p>
            </div>
            <div>
              <Label htmlFor="bloc-endpoint">Bloc Endpoint</Label>
              <Select value={blocEndpoint} onValueChange={setBlocEndpoint}>
                <SelectTrigger id="bloc-endpoint">
                  <SelectValue placeholder="Select Bloc Endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="https://my.solana.dex.bhrhdn.com">https://my.solana.dex.bhrhdn.com</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "bundler":
        return (
          <div className="flex">
            <div className="w-64 border-r border-gray-800 min-h-screen">
              <div className="p-4 space-y-4">
                {["active", "completed", "failed"].map((tab) => (
                  <div
                    key={tab}
                    className={`p-4 cursor-pointer rounded-lg ${
                      bundlerTab === tab ? "bg-gray-800" : "hover:bg-gray-900"
                    }`}
                    onClick={() => setBundlerTab(tab)}
                  >
                    <h3 className="font-medium capitalize">{tab}</h3>
                    <p className="text-sm text-gray-400">View {tab} tasks</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-6 capitalize">{bundlerTab} Bundler Tasks</h2>
              {renderBundlerContent()}
            </div>
          </div>
        )
      case "proxies":
        return (
          <div className="flex">
            <div className="w-64 border-r border-gray-800 min-h-screen">
              <div className="p-4 space-y-4">
                {["http", "socks4", "socks5"].map((tab) => (
                  <div
                    key={tab}
                    className={`p-4 cursor-pointer rounded-lg ${
                      proxiesTab === tab ? "bg-gray-800" : "hover:bg-gray-900"
                    }`}
                    onClick={() => setProxiesTab(tab)}
                  >
                    <h3 className="font-medium capitalize">{tab}</h3>
                    <p className="text-sm text-gray-400">Manage {tab} proxies</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-6 capitalize">{proxiesTab} Proxies</h2>
              {renderProxiesContent()}
            </div>
          </div>
        )
      case "wallets":
        return (
          <div className="flex">
            <div className="w-64 border-r border-gray-800 min-h-screen">
              <div className="p-4 space-y-4">
                {["volume", "bundler", "bumper"].map((tab) => (
                  <div
                    key={tab}
                    className={`p-4 cursor-pointer rounded-lg ${
                      walletsTab === tab ? "bg-gray-800" : "hover:bg-gray-900"
                    }`}
                    onClick={() => setWalletsTab(tab)}
                  >
                    <h3 className="font-medium capitalize">{tab}</h3>
                    <p className="text-sm text-gray-400">Manage {tab} wallets</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-6 capitalize">{walletsTab}</h2>
              {renderWalletsContent()}
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="flex">
            <div className="w-64 border-r border-gray-800 min-h-screen">
              <div className="p-4 space-y-4">
                {["general", "volume", "bundler", "bumper"].map((tab) => (
                  <div
                    key={tab}
                    className={`p-4 cursor-pointer rounded-lg ${
                      settingsTab === tab ? "bg-gray-800" : "hover:bg-gray-900"
                    }`}
                    onClick={() => setSettingsTab(tab)}
                  >
                    <h3 className="font-medium capitalize">{tab}</h3>
                    <p className="text-sm text-gray-400">Configure {tab} settings</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-semibold mb-6 capitalize">{settingsTab} Settings</h2>
              {renderSettingsContent()}
            </div>
          </div>
        )
      default:
        return <div>Content for {activeTab} tab</div>
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Main Sidebar */}
        <div className="w-64 border-r border-gray-800 min-h-screen p-4">
          <div className="flex items-center gap-2 mb-8">
            <FileBox className="h-8 w-8" />
            <div>
              <h1 className="font-semibold">BigBangBot</h1>
              <p className="text-xs text-gray-400">1.4.4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-gray-900 rounded-lg mb-6">
            <Wifi className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400">Connected</span>
          </div>
          
          <nav className="space-y-2">
            <Button variant="ghost" className={`w-full justify-start ${activeTab === "tasks" ? "bg-gray-800" : ""}`} onClick={() => setActiveTab("tasks")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Tasks
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${activeTab === "bundler" ? "bg-gray-800" : ""}`} onClick={() => setActiveTab("bundler")}>
              <Box className="mr-2 h-4 w-4" />
              Bundler
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${activeTab === "wallets" ? "bg-gray-800" : ""}`} onClick={() => setActiveTab("wallets")}>
              <Wallet className="mr-2 h-4 w-4" />
              Wallets
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${activeTab === "proxies" ? "bg-gray-800" : ""}`} onClick={() => setActiveTab("proxies")}>
              <Wifi className="mr-2 h-4 w-4" />
              Proxies
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${activeTab === "settings" ? "bg-gray-800" : ""}`} onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="border-b border-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-gray-800 hover:bg-gray-700 border-gray-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share Success
              </Button>
              <div className="flex items-center gap-2">
                <span>USD</span>
                <ChevronDown className="h-4 w-4" />
                <span>$142.84</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}