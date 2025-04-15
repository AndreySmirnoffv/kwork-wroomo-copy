export type TypeProduct = {
    id: bigint
    brand: string
    title: string
    model: string
    type: string
    description: string
    year: number
    ps: number
    pricePerDay: number
    color: string
    isApproved: boolean
    photoUrls: string[]
    rentStart: Date
    rentEnd: Date
}