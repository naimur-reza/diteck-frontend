"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import {
    ChevronRight,
    Clock,
    Code,
    Database,
    FileCode,
    Package,
    Palette,
    Server,
    ShoppingCart,
    Star,
    Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TService } from "@/types"

interface ServiceDetailsProps {
    service: TService
}

const ServiceDetailsPageNew = ({ service }: ServiceDetailsProps) => {

    return (
        <div className="container mx-auto px-4 pb-8">
            <div>
                {/* Left Column - Images and Gallery */}
                <div className="space-y-6">
                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
                        <Image
                            src={service?.photo}
                            alt={service?.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right Column - Service Details */}
                <div className="space-y-6 mt-10">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/service" className="hover:underline">
                                Services
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link href={`#`} className="hover:underline">
                                {service?.serviceCategory}
                            </Link>
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">{service?.title}</h1>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <Star className="h-5 w-5 fill-muted text-muted-foreground" />
                                <span className="ml-2 text-sm text-muted-foreground">(4.0)</span>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {service?.turnAroundTime}
                            </Badge>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-baseline justify-between">
                            <div>
                                <p className="text-3xl font-bold">
                                    {service?.price.currency} {service?.price.basePrice.toLocaleString()}
                                </p>
                                {service?.price.customPricingAvailable && (
                                    <p className="text-sm text-muted-foreground">Custom pricing available</p>
                                )}
                            </div>
                            <Button size="lg" className="gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </Button>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3">
                            <h3 className="font-medium">{"What's included:"}</h3>
                            <ul className="space-y-2">
                                {service?.features?.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Description</h2>
                        <p className="text-muted-foreground">{service?.description}</p>
                    </div>
                </div>
            </div>

            {/* Technical Details Tabs */}
            <div className="mt-12">
                <Tabs defaultValue="frontend">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="frontend" className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Frontend
                        </TabsTrigger>
                        <TabsTrigger value="backend" className="flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            Backend
                        </TabsTrigger>
                        <TabsTrigger value="design" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            Design
                        </TabsTrigger>
                        <TabsTrigger value="other" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Other
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="frontend" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TechCard
                                title="Frontend Technologies"
                                icon={<Code className="h-5 w-5" />}
                                items={service?.frontendTech}
                            />
                            <TechCard title="CSS Frameworks" icon={<Palette className="h-5 w-5" />} items={service?.cssFramework} />
                            <TechCard
                                title="Component Libraries"
                                icon={<Package className="h-5 w-5" />}
                                items={service?.componentLibrary}
                            />
                            <TechCard
                                title="Animation Libraries"
                                icon={<Zap className="h-5 w-5" />}
                                items={service?.animationLibrary}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="backend" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TechCard
                                title="Backend Technologies"
                                icon={<Server className="h-5 w-5" />}
                                items={service?.backendTech}
                            />
                            <TechCard title="Databases" icon={<Database className="h-5 w-5" />} items={service?.database} />
                            <TechCard title="File Storage" icon={<FileCode className="h-5 w-5" />} items={service?.fileStorage} />
                            <TechCard
                                title="Payment Gateways"
                                icon={<ShoppingCart className="h-5 w-5" />}
                                items={service?.paymentGateway}
                            />
                            <TechCard title="Testing" icon={<Code className="h-5 w-5" />} items={service?.testing} />
                        </div>
                    </TabsContent>

                    <TabsContent value="design" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TechCard title="CSS Frameworks" icon={<Palette className="h-5 w-5" />} items={service?.cssFramework} />
                            <TechCard
                                title="Animation Libraries"
                                icon={<Zap className="h-5 w-5" />}
                                items={service?.animationLibrary}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="other" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TechCard title="Testing" icon={<Code className="h-5 w-5" />} items={service?.testing} />
                            <TechCard title="File Storage" icon={<FileCode className="h-5 w-5" />} items={service?.fileStorage} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Created By */}
            <div className="mt-12 rounded-lg border bg-card p-6">
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                            src={service?.createdBy?.photo || `https://avatar.iran.liara.run/username?username=${service?.createdBy?.name || "Author"}`}
                            alt={service?.createdBy?.name || ""}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-medium">Created by</h3>
                        <p className="text-sm text-muted-foreground">{service?.createdBy?.name}</p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                        View Profile
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface TechCardProps {
    title: string
    icon: React.ReactNode
    items: string[]
}

function TechCard({ title, icon, items, ...props }: TechCardProps) {
    if (!items || items.length === 0) return null

    return (
        <Card {...props}>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    {icon}
                    <h3 className="font-medium">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <Badge key={index} variant="secondary">
                            {item}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceDetailsPageNew

