"use client"

import { useState } from "react"
import { ChevronDown, DollarSign, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Store {
  id: number
  name: string
  image: string
}

const stores: Store[] = [
  { id: 1, name: "Store 1", image: "/placeholder.svg" },
  { id: 2, name: "Store 2", image: "/placeholder.svg" },
  { id: 3, name: "Store 3", image: "/placeholder.svg" },
]

export function Navbar() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [spendingLimit, setSpendingLimit] = useState(100)
  const [currentSpending, setCurrentSpending] = useState(35)

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-48">
            {selectedStore ? (
              <div className="flex items-center">
                <img
                  src={selectedStore.image}
                  alt={selectedStore.name}
                  className="w-6 h-6 rounded mr-2 object-cover"
                />
                <span className="truncate">{selectedStore.name}</span>
              </div>
            ) : (
              <span>Select Store</span>
            )}
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {stores.map((store) => (
            <DropdownMenuItem key={store.id}>
              <div className="flex items-center">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-6 h-6 rounded mr-2 object-cover"
                />
                {store.name}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" /> Add Store
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" className="rounded-full">
        <DollarSign className="mr-2 h-4 w-4" />
        <span>
          ${currentSpending} / ${spendingLimit}
        </span>
      </Button>
    </header>
  )
}
