"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, Tag } from "lucide-react"

// Replace the Price interface with the correct one
interface Price {
    basePrice: number
    currency: string
    customPricingAvailable: boolean
    _id: string
}

export interface TService {
    price: Price
    turnAroundTime: string
    status: string
    serviceCategory: string
}

interface ServiceCardProps {
    service: TService
}

export default function ServicePricingCard({ service }: ServiceCardProps) {
    const { price, turnAroundTime, status, serviceCategory } = service

    // Determine status color
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "inactive":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    return (
        <Card className="w-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">{serviceCategory}</CardTitle>
                    <Badge className={getStatusColor(status)}>{status}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    Service
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-2 py-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                        Turnaround: <span className="font-medium">{turnAroundTime}</span>
                    </span>
                </div>
            </CardContent>
            {/* Replace the CardFooter section with: */}
            <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-4">
                <div className="flex items-center gap-1">
                    <DollarSign className="h-5 w-5 text-primary" />
                    {/* <span className="text-lg font-bold">{formattedPrice}</span> */}
                    <span className="text-lg font-bold">{price.basePrice}</span>
                </div>
                {price.customPricingAvailable && (
                    <Badge variant="outline" className="text-xs">
                        Custom pricing available
                    </Badge>
                )}
            </CardFooter>
        </Card>
    )
}

